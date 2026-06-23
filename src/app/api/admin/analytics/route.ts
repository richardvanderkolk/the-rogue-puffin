import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const passkey = searchParams.get('passkey');

    if (passkey !== 'thepuffin2024!') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Get Landing Page views (path = '/' and path = '/speed-reading')
    const { data: landingViewsData, error: landingViewsError } = await supabase
        .from('page_views')
        .select('views')
        .in('path', ['/', '/speed-reading']);
    if (landingViewsError) {
        console.error("Error fetching landing page views:", landingViewsError);
    }
    let landingViews = 0;
    if (landingViewsData) {
        landingViewsData.forEach(pv => {
            landingViews += (pv.views || 0);
        });
    }

    // 2. Get Test Starts (path = '/rogue-session/start' + path = '/free-test')
    const { data: testStartsData, error: testStartsError } = await supabase
        .from('page_views')
        .select('path, views')
        .in('path', ['/rogue-session/start', '/free-test']);
    if (testStartsError) {
        console.error("Error fetching test starts views:", testStartsError);
    }
    let testStarts = 0;
    if (testStartsData) {
        testStartsData.forEach(pv => {
            testStarts += (pv.views || 0);
        });
    }

    // 3. Get Test Completions (anonymous_tests + benchmarks where test_type = 'baseline')
    const { count: anonBaselineCount, error: anonBaselineError } = await supabase
        .from('anonymous_tests')
        .select('*', { count: 'exact', head: true })
        .eq('test_type', 'baseline');
    if (anonBaselineError) {
        console.error("Error fetching anon baseline completions:", anonBaselineError);
    }

    const { count: authBaselineCount, error: authBaselineError } = await supabase
        .from('benchmarks')
        .select('*', { count: 'exact', head: true })
        .eq('test_type', 'baseline');
    if (authBaselineError) {
        console.error("Error fetching auth baseline completions:", authBaselineError);
    }

    const testCompletions = (anonBaselineCount || 0) + (authBaselineCount || 0);

    // 4. Get total leads (Free Test Takes/Email captured)
    const { count: leadsCount, error: leadsError } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });

    if (leadsError) {
        console.error("Error fetching leads count:", leadsError);
    }

    // 5. Get purchases / revenue
    const { data: purchases, error: purchasesError } = await supabase
        .from('purchases')
        .select('*');

    if (purchasesError) {
         console.error("Error fetching purchases, table might not exist yet:", purchasesError);
    }

    let totalRevenueCents = 0;
    let bootcampsSold = 0;
    const revenueByCurrency: Record<string, number> = {};

    if (purchases) {
        purchases.forEach(p => {
            const rawAmount = p.amount_total || 0;
            const currencyCode = (p.currency || 'usd').toLowerCase();
            totalRevenueCents += rawAmount;
            if (p.product === 'bootcamp') bootcampsSold++;
            
            revenueByCurrency[currencyCode] = (revenueByCurrency[currencyCode] || 0) + (rawAmount / 100);
        });
    }

    // Assume 15,000 baseline unique visitors to make the conversion math look realistic for now
    // until we properly integrate a traffic analytics tool like Plausible or Google Analytics.
    const uniqueVisitors = landingViews;

    // 3. Benchmarks analysis (Legacy + Anonymous)
    const { data: benchmarks, error: benchmarksError } = await supabase
        .from('benchmarks')
        .select('user_id, wpm, comprehension_score, test_type, created_at')
        .in('test_type', ['baseline', 'rogue_session', 'final'])
        .order('created_at', { ascending: true });

    if (benchmarksError) {
        console.error("Error fetching benchmarks:", benchmarksError);
    }
    
    const { data: anonymousTests, error: anonymousTestsError } = await supabase
        .from('anonymous_tests')
        .select('visitor_id, wpm, comprehension_score, test_type, created_at')
        .order('created_at', { ascending: true });
        
    if (anonymousTestsError) {
        console.error("Error fetching anonymous tests:", anonymousTestsError);
    }

    const calculateStats = (increasesWpm: number[], increasesComp: number[]) => {
        let stats = {
            count: increasesWpm.length,
            wpmRaw: 0, compRaw: 0,
            wpmAdj: 0, compAdj: 0
        };

        if (stats.count > 0) {
            const sortedWpm = [...increasesWpm].sort((a, b) => a - b);
            const sortedComp = [...increasesComp].sort((a, b) => a - b);
            const trimCount = Math.floor(stats.count * 0.10);

            stats.wpmRaw = sortedWpm.reduce((a, b) => a + b, 0) / stats.count;
            stats.compRaw = sortedComp.reduce((a, b) => a + b, 0) / stats.count;

            const trimmedWpm = sortedWpm.slice(trimCount, stats.count - trimCount);
            const trimmedComp = sortedComp.slice(trimCount, stats.count - trimCount);

            if (trimmedWpm.length > 0) {
                stats.wpmAdj = trimmedWpm.reduce((a, b) => a + b, 0) / trimmedWpm.length;
                stats.compAdj = trimmedComp.reduce((a, b) => a + b, 0) / trimmedComp.length;
            } else {
                stats.wpmAdj = stats.wpmRaw;
                stats.compAdj = stats.compRaw;
            }
        }
        return stats;
    };

    let outcomes30Min = null;
    let outcomes14Day = null;

    if (benchmarks || anonymousTests) {
        const userGroups: Record<string, { baseline?: any, rogue_session?: any, final?: any }> = {};
        
        if (benchmarks) {
            benchmarks.forEach(b => {
                if (!userGroups[b.user_id]) userGroups[b.user_id] = {};
                // Since it's ascending, the first 'baseline' we encounter is the earliest one. 
                // We only set baseline once, but we overwrite rogue_session/final with the latest one.
                if (b.test_type === 'baseline' && !userGroups[b.user_id].baseline) userGroups[b.user_id].baseline = b;
                if (b.test_type === 'rogue_session') userGroups[b.user_id].rogue_session = b;
                if (b.test_type === 'final') userGroups[b.user_id].final = b;
            });
        }
        
        if (anonymousTests) {
            anonymousTests.forEach(b => {
                if (!userGroups[b.visitor_id]) userGroups[b.visitor_id] = {};
                if (b.test_type === 'baseline' && !userGroups[b.visitor_id].baseline) userGroups[b.visitor_id].baseline = b;
                if (b.test_type === 'rogue_session') userGroups[b.visitor_id].rogue_session = b;
                if (b.test_type === 'final') userGroups[b.visitor_id].final = b;
            });
        }

        const shortTermWpm: number[] = [];
        const shortTermComp: number[] = [];
        const longTermWpm: number[] = [];
        const longTermComp: number[] = [];

        Object.values(userGroups).forEach(group => {
            if (group.baseline && group.rogue_session) {
                shortTermWpm.push(group.rogue_session.wpm - group.baseline.wpm);
                shortTermComp.push(group.rogue_session.comprehension_score - group.baseline.comprehension_score);
            }
            if (group.baseline && group.final) {
                longTermWpm.push(group.final.wpm - group.baseline.wpm);
                longTermComp.push(group.final.comprehension_score - group.baseline.comprehension_score);
            }
        });

        outcomes30Min = calculateStats(shortTermWpm, shortTermComp);
        outcomes14Day = calculateStats(longTermWpm, longTermComp);
    }
    
    // 4. Learning Styles
    const { data: learningStyles } = await supabase.from('learning_style_tests').select('primary_style');
    const styleDistribution: Record<string, number> = {};
    if (learningStyles) {
        learningStyles.forEach(s => {
            styleDistribution[s.primary_style] = (styleDistribution[s.primary_style] || 0) + 1;
        });
    }
    
    // 5. Memory Tests
    const { data: memoryTests } = await supabase.from('memory_tests').select('baseline_score, retest_score');
    let memoryBaselineAvg = 0;
    let memoryRetestAvg = 0;
    if (memoryTests && memoryTests.length > 0) {
        let baselineSum = 0;
        let retestSum = 0;
        let count = 0;
        memoryTests.forEach(m => {
            if (m.baseline_score !== null && m.retest_score !== null) {
                baselineSum += m.baseline_score;
                retestSum += m.retest_score;
                count++;
            }
        });
        if (count > 0) {
            memoryBaselineAvg = baselineSum / count;
            memoryRetestAvg = retestSum / count;
        }
    }

    return NextResponse.json({
        totalLeads: leadsCount || 0,
        totalRevenue: totalRevenueCents / 100, // Convert cents to dollars
        revenueByCurrency,
        bootcampsSold,
        uniqueVisitors,
        landingViews,
        testStarts,
        testCompletions,
        outcomes30Min,
        outcomes14Day,
        styleDistribution,
        memoryStats: {
            baselineAvg: memoryBaselineAvg,
            retestAvg: memoryRetestAvg
        }
    });
}
