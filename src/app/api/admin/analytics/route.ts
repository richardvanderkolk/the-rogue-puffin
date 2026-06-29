import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const passkey = searchParams.get('passkey');
    const timeframe = searchParams.get('timeframe') || 'all'; // 'day', 'week', 'month', 'year', 'all'

    if (passkey !== 'thepuffin2024!') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    let startDate: string | null = null;
    const now = new Date();
    if (timeframe === 'day') {
        const d = new Date(now);
        d.setDate(d.getDate() - 1);
        startDate = d.toISOString();
    } else if (timeframe === 'week') {
        const d = new Date(now);
        d.setDate(d.getDate() - 7);
        startDate = d.toISOString();
    } else if (timeframe === 'month') {
        const d = new Date(now);
        d.setMonth(d.getMonth() - 1);
        startDate = d.toISOString();
    } else if (timeframe === 'year') {
        const d = new Date(now);
        d.setFullYear(d.getFullYear() - 1);
        startDate = d.toISOString();
    }

    // 1. Get Landing Page views (path = '/', '/speed-reading', '/learning-mastery')
    // Note: page_views are lifetime aggregates, only return if timeframe === 'all'
    let landingViews = 0;
    let mainLandingViews = 0;
    let speedReadingViews = 0;
    let learningMasteryViews = 0;
    let testStarts = 0;
    let mainTestStarts = 0;
    let freeTestStarts = 0;

    if (timeframe === 'all') {
        const { data: landingViewsData, error: landingViewsError } = await supabase
            .from('page_views')
            .select('path, views')
            .in('path', ['/', '/speed-reading', '/learning-mastery']);
        if (landingViewsError) {
            console.error("Error fetching landing page views:", landingViewsError);
        }
        if (landingViewsData) {
            landingViewsData.forEach(pv => {
                const v = pv.views || 0;
                if (pv.path === '/') mainLandingViews = v;
                if (pv.path === '/speed-reading') speedReadingViews = v;
                if (pv.path === '/learning-mastery') learningMasteryViews = v;
                landingViews += v;
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
        if (testStartsData) {
            testStartsData.forEach(pv => {
                const v = pv.views || 0;
                if (pv.path === '/rogue-session/start') mainTestStarts = v;
                if (pv.path === '/free-test') freeTestStarts = v;
                testStarts += v;
            });
        }
    }

    // 3. Get Test Completions (anonymous_tests + benchmarks where test_type = 'baseline')
    let anonBaselineQuery = supabase
        .from('anonymous_tests')
        .select('*', { count: 'exact', head: true })
        .eq('test_type', 'baseline');
        
    let authBaselineQuery = supabase
        .from('benchmarks')
        .select('*', { count: 'exact', head: true })
        .eq('test_type', 'baseline');

    if (startDate) {
        anonBaselineQuery = anonBaselineQuery.gte('created_at', startDate);
        authBaselineQuery = authBaselineQuery.gte('created_at', startDate);
    }

    const { count: anonBaselineCount, error: anonBaselineError } = await anonBaselineQuery;
    if (anonBaselineError) {
        console.error("Error fetching anon baseline completions:", anonBaselineError);
    }

    const { count: authBaselineCount, error: authBaselineError } = await authBaselineQuery;
    if (authBaselineError) {
        console.error("Error fetching auth baseline completions:", authBaselineError);
    }

    const testCompletions = (anonBaselineCount || 0) + (authBaselineCount || 0);

    // 4. Get total leads (Free Test Takes/Email captured)
    let leadsQuery = supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });

    if (startDate) {
        leadsQuery = leadsQuery.gte('created_at', startDate);
    }
    const { count: leadsCount, error: leadsError } = await leadsQuery;
    if (leadsError) {
        console.error("Error fetching leads count:", leadsError);
    }

    // 5. Get purchases / revenue
    let purchasesQuery = supabase
        .from('purchases')
        .select('*');

    if (startDate) {
        purchasesQuery = purchasesQuery.gte('created_at', startDate);
    }
    const { data: purchases, error: purchasesError } = await purchasesQuery;
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

    const uniqueVisitors = timeframe === 'all' ? landingViews : null;

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

    const calculateStats = (records: Array<{ baselineWpm: number, finalWpm: number, baselineComp: number, finalComp: number }>) => {
        const count = records.length;
        if (count === 0) {
            return {
                count: 0,
                baselineWpmRaw: 0, baselineWpmAdj: 0,
                finalWpmRaw: 0, finalWpmAdj: 0,
                increaseWpmRaw: 0, increaseWpmAdj: 0,
                percentageWpmRaw: 0, percentageWpmAdj: 0,
                baselineCompRaw: 0, baselineCompAdj: 0,
                finalCompRaw: 0, finalCompAdj: 0,
                changeCompRaw: 0, changeCompAdj: 0
            };
        }

        const baselineWpms = records.map(r => r.baselineWpm);
        const finalWpms = records.map(r => r.finalWpm);
        const absoluteWpmDiffs = records.map(r => r.finalWpm - r.baselineWpm);
        const percentWpmDiffs = records.map(r => ((r.finalWpm - r.baselineWpm) / r.baselineWpm) * 100);

        const baselineComps = records.map(r => r.baselineComp);
        const finalComps = records.map(r => r.finalComp);
        const absoluteCompDiffs = records.map(r => r.finalComp - r.baselineComp);

        const trimCount = Math.floor(count * 0.10);

        const getMean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
        const getTrimmedMean = (arr: number[]) => {
            if (arr.length <= 2) return getMean(arr);
            const sorted = [...arr].sort((a, b) => a - b);
            const trimmed = sorted.slice(trimCount, arr.length - trimCount);
            return trimmed.length > 0 ? getMean(trimmed) : getMean(arr);
        };

        return {
            count,
            baselineWpmRaw: getMean(baselineWpms),
            baselineWpmAdj: getTrimmedMean(baselineWpms),
            finalWpmRaw: getMean(finalWpms),
            finalWpmAdj: getTrimmedMean(finalWpms),
            increaseWpmRaw: getMean(absoluteWpmDiffs),
            increaseWpmAdj: getTrimmedMean(absoluteWpmDiffs),
            percentageWpmRaw: getMean(percentWpmDiffs),
            percentageWpmAdj: getTrimmedMean(percentWpmDiffs),
            baselineCompRaw: getMean(baselineComps),
            baselineCompAdj: getTrimmedMean(baselineComps),
            finalCompRaw: getMean(finalComps),
            finalCompAdj: getTrimmedMean(finalComps),
            changeCompRaw: getMean(absoluteCompDiffs),
            changeCompAdj: getTrimmedMean(absoluteCompDiffs)
        };
    };

    let outcomes30Min = null;
    let outcomes14Day = null;

    if (benchmarks || anonymousTests) {
        const userGroups: Record<string, { baseline?: any, rogue_session?: any, final?: any }> = {};
        
        if (benchmarks) {
            benchmarks.forEach(b => {
                if (!userGroups[b.user_id]) userGroups[b.user_id] = {};
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

        const shortTermRecords: Array<{ baselineWpm: number, finalWpm: number, baselineComp: number, finalComp: number }> = [];
        const longTermRecords: Array<{ baselineWpm: number, finalWpm: number, baselineComp: number, finalComp: number }> = [];

        Object.values(userGroups).forEach(group => {
            if (group.baseline && group.rogue_session) {
                const sessionDate = new Date(group.rogue_session.created_at);
                if (!startDate || sessionDate >= new Date(startDate)) {
                    shortTermRecords.push({
                        baselineWpm: group.baseline.wpm,
                        finalWpm: group.rogue_session.wpm,
                        baselineComp: group.baseline.comprehension_score,
                        finalComp: group.rogue_session.comprehension_score
                    });
                }
            }
            if (group.baseline && group.final) {
                const finalDate = new Date(group.final.created_at);
                if (!startDate || finalDate >= new Date(startDate)) {
                    longTermRecords.push({
                        baselineWpm: group.baseline.wpm,
                        finalWpm: group.final.wpm,
                        baselineComp: group.baseline.comprehension_score,
                        finalComp: group.final.comprehension_score
                    });
                }
            }
        });

        outcomes30Min = calculateStats(shortTermRecords);
        outcomes14Day = calculateStats(longTermRecords);
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
        landingViewsBreakdown: {
            main: mainLandingViews,
            speedReading: speedReadingViews,
            learningMastery: learningMasteryViews
        },
        testStartsBreakdown: {
            main: mainTestStarts,
            freeTest: freeTestStarts
        },
        outcomes30Min,
        outcomes14Day,
        styleDistribution,
        memoryStats: {
            baselineAvg: memoryBaselineAvg,
            retestAvg: memoryRetestAvg
        }
    });
}
