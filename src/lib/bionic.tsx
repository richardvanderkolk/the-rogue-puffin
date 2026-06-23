import React from 'react';

/**
 * Renders a string of text with Bionic Reading rules applied.
 * It segments words, wrapping their initial parts in strong/bold tags.
 * This function returns an array of React elements.
 */
export function renderBionicText(text: string): React.ReactNode[] {
    if (!text) return [];

    // Split by whitespace but capture it so we can reconstruct spacing
    const tokens = text.split(/(\s+)/);

    return tokens.map((token, idx) => {
        // If token is whitespace, return as text
        if (/^\s+$/.test(token)) {
            return <span key={idx}>{token}</span>;
        }

        // Clean punctuation to analyze word length
        // Punctuation is kept, but excluded from length count.
        const cleanWord = token.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "");
        const length = cleanWord.length;

        if (length === 0) {
            return <span key={idx}>{token}</span>;
        }

        // Bionic bold segment length rules
        let boldCount = 1;
        if (length === 4) {
            boldCount = 2;
        } else if (length === 5 || length === 6) {
            boldCount = 3;
        } else if (length >= 7) {
            boldCount = Math.ceil(length * 0.4);
        }

        // Find split index in original word to bold exactly 'boldCount' alphanumeric characters.
        let alphaIndex = 0;
        let splitIndex = 0;
        for (let i = 0; i < token.length; i++) {
            // Check if character is alphanumeric (including basic accents)
            if (/[a-zA-Z0-9\u00C0-\u017F]/.test(token[i])) {
                alphaIndex++;
                if (alphaIndex === boldCount) {
                    splitIndex = i + 1;
                    break;
                }
            }
        }

        // Fallback split index
        if (splitIndex === 0) {
            splitIndex = Math.max(1, Math.min(token.length, boldCount));
        }

        const boldPart = token.slice(0, splitIndex);
        const normalPart = token.slice(splitIndex);

        return (
            <span key={idx} className="inline-block whitespace-pre-wrap">
                <strong className="font-extrabold text-slate-900 dark:text-white">{boldPart}</strong>
                <span className="font-medium text-slate-600 dark:text-slate-400">{normalPart}</span>
            </span>
        );
    });
}
