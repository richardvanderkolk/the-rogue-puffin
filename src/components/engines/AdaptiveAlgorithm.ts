export interface SessionStats {
    wpm: number;
    comprehension: number; // 0-100
    stability: number; // 0-100, based on variance
    fatigueEvents: number; // Count of significant drops
}

export interface AdaptiveResult {
    nextSpeed: number;
    message: string;
    action: 'increase' | 'maintain' | 'decrease';
}

export class AdaptiveAlgorithm {
    private baselineWpm: number;

    constructor(baselineWpm: number) {
        this.baselineWpm = baselineWpm;
    }

    calculateNextSpeed(currentStats: SessionStats, currentSpeed: number): AdaptiveResult {
        const { comprehension, fatigueEvents } = currentStats;
        const maxSpeed = this.baselineWpm * 1.8;

        // 1. Fatigue Check
        if (fatigueEvents >= 3) {
            return {
                nextSpeed: Math.max(this.baselineWpm, currentSpeed * 0.85),
                action: 'decrease',
                message: "We detected some fatigue. Let's dial it back to rebuild momentum."
            };
        }

        // 2. Comprehension Logic
        if (comprehension >= 85) {
            // High performance: Increase 8-12%
            const increase = 1.08 + (Math.random() * 0.04);
            let next = Math.round(currentSpeed * increase);

            // Cap at 1.8x baseline
            if (next > maxSpeed) {
                next = Math.round(maxSpeed);
                return {
                    nextSpeed: next,
                    action: 'maintain',
                    message: "You are at peak efficient speed. Let's stabilize here."
                };
            }

            return {
                nextSpeed: next,
                action: 'increase',
                message: "Excellent comprehension. Pushing pace by ~10%."
            };
        }

        else if (comprehension >= 75) {
            // Moderate performance: Increase 3-5%
            const increase = 1.03 + (Math.random() * 0.02);
            const next = Math.round(currentSpeed * increase);
            const capped = Math.min(next, maxSpeed);

            return {
                nextSpeed: capped,
                action: 'increase',
                message: "Good steadiness. Micro-increase to test limits."
            };
        }

        else {
            // Low performance: Decrease 5-10%
            const decrease = 0.90 + (Math.random() * 0.05);
            const next = Math.round(currentSpeed * decrease);

            // Don't fall below baseline too easily, but allow it if needed
            const floor = this.baselineWpm * 0.8;
            const final = Math.max(next, floor);

            return {
                nextSpeed: final,
                action: 'decrease',
                message: "Comprehension dipped. Reducing speed to regain clarity."
            };
        }
    }

    estimateSustainableSpeed(recentSessions: SessionStats[]): number {
        // Filter for valid sessions (comprehension >= 80%)
        const valid = recentSessions.filter(s => s.comprehension >= 80);
        if (valid.length === 0) return this.baselineWpm;

        // Calculate weighted average, favoring recent sessions
        const totalWpm = valid.reduce((acc, s) => acc + s.wpm, 0);
        return Math.round(totalWpm / valid.length);
    }
}
