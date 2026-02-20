
export interface RefundCheckResult {
    eligible: boolean;
    reason: string;
}

export function checkRefundEligibility(purchaseDate: Date, sessionsCompleted: number): RefundCheckResult {
    const NOW = new Date();
    const DAYS_SINCE_PURCHASE = (NOW.getTime() - purchaseDate.getTime()) / (1000 * 3600 * 24);

    if (DAYS_SINCE_PURCHASE > 14) {
        return { eligible: false, reason: "Purchase exceeds 14-day window." };
    }

    if (sessionsCompleted < 7) {
        return { eligible: false, reason: "Minimum 7 sessions required to verify effort." };
    }

    return { eligible: true, reason: "Eligible for full refund." };
}

export const EMAIL_TRIGGERS = {
    BASELINE_COMPLETE: 'trigger_baseline_complete',
    SESSION_COMPLETE: 'trigger_session_complete',
    ABANDONED_CART: 'trigger_abandoned_cart',
    PROTOCOL_COMPLETE: 'trigger_protocol_complete',
    CERTIFICATION_UNLOCKED: 'trigger_cert_unlocked'
};

export async function triggerEmailEvent(eventName: string, userEmail: string, metadata: any = {}) {
    // This is where you would call your Email Provider API (ConvertKit, MailerLite, etc)
    console.log(`[EMAIL EVENT] ${eventName} -> ${userEmail}`, metadata);

    // Mocked API Call
    return true;
}
