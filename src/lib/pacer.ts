export interface SmartChunk {
    text: string;
    delayBonus: number; // Additional ms to wait after this chunk
}

export function chunkText(text: string, chunkSize: number = 3): string[] {
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const chunks: string[] = [];

    for (let i = 0; i < words.length; i += chunkSize) {
        chunks.push(words.slice(i, i + chunkSize).join(" "));
    }

    return chunks;
}

export function smartChunkText(text: string, chunkSize: number = 3): SmartChunk[] {
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const chunks: SmartChunk[] = [];

    for (let i = 0; i < words.length; i += chunkSize) {
        const slice = words.slice(i, i + chunkSize);
        const chunkText = slice.join(" ");
        const lastWord = slice[slice.length - 1];

        let delayBonus = 0;

        // Analyze last character of the chunk for punctuation
        if (/[.!?]$/.test(lastWord)) {
            delayBonus = 300; // Strong pause for sentence end
        } else if (/[,;:]$/.test(lastWord)) {
            delayBonus = 150; // Medium pause for commas
        } else if (chunkText.length > 20 && chunkSize === 1) {
            // Slight pause for very long words if in single-word mode
            delayBonus = 50;
        }

        chunks.push({ text: chunkText, delayBonus });
    }

    return chunks;
}

export function calculateInterval(wpm: number, wordsPerChunk: number): number {
    if (wpm <= 0) return 1000;
    // wpm / 60 = words per second
    // interval = wordsPerChunk / (words per second) * 1000
    return Math.round((wordsPerChunk / (wpm / 60)) * 1000);
}
