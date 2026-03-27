"use client";

import { useState } from 'react';
import ReadingTestEngine from '@/components/engines/ReadingTestEngine';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock } from 'lucide-react';

const TEST_TEXT = `Reading is a complex cognitive process of decoding symbols in order to look to derive meaning. It is a means of language acquisition, of communication, and of sharing information and ideas. Like all language, it is a complex interaction between the text and the reader which is shaped by the reader’s prior knowledge, experiences, attitude, and language community which is culturally and socially situated. The reading process requires continuous practice, development, and refinement. In addition, reading requires creativity and critical analysis. Consumers of literature make ventures with each piece, innately deviating from literal words to create images that make sense to them in the unfamiliar places the texts describe. Because reading is such a complex process, it cannot be controlled or restricted to one or two interpretations. There are no concrete laws in reading, but rather allows readers an escape to produce their own products introspectively. This promotes deep exploration of texts during interpretation. Readers use a variety of reading strategies to assist with decoding (to translate symbols into sounds or visual representations of speech) and comprehension. Readers may use context clues to identify the meaning of unknown words. Readers integrate the words they have read into their existing framework of knowledge or schema (schemata theory).`;

const TEST_QUESTIONS = [
    { id: 1, text: "What is reading described as?", options: ["A simple task", "A complex cognitive process", "A physical exercise", "A visual trick"], correctIndex: 1 },
    { id: 2, text: "What shapes the interaction between text and reader?", options: ["The font size", "The length of the book", "Prior knowledge and experience", "The lighting in the room"], correctIndex: 2 },
    { id: 3, text: "Readers use context clues to:", options: ["Skip pages", "Identify unknown words", "Read faster", "Guess the ending"], correctIndex: 1 }
];

export default function FreeTestPage() {
    const [step, setStep] = useState<'intro' | 'test' | 'capture' | 'results'>('intro');
    const [results, setResults] = useState({ wpm: 0, comprehension: 0 });
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTestComplete = (data: { wpm: number; comprehension: number }) => {
        setResults(data);
        setStep('capture');
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    wpm: results.wpm,
                    comprehension: results.comprehension
                })
            });
            
            if (!res.ok) {
                console.error("Failed to save lead:", await res.text());
            }
        } catch (err) {
            console.error("Network error saving lead:", err);
        }

        setIsSubmitting(false);
        setStep('results');
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">

            {step === 'intro' && (
                <div className="max-w-xl text-center space-y-8">
                    <h1 className="text-4xl font-bold">The 3-Minute Speed Test</h1>
                    <p className="text-slate-400 text-lg">
                        Discover your true baseline reading speed and comprehension level.
                    </p>
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-left space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold">1</div>
                            <span className="text-slate-300">Read a short passage at your normal pace.</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold">2</div>
                            <span className="text-slate-300">Answer 3 simple questions.</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold">3</div>
                            <span className="text-slate-300">Get your detailed report instantly.</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setStep('test')}
                        className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform"
                    >
                        Start Test
                    </button>
                </div>
            )}

            {step === 'test' && (
                <div className="w-full max-w-2xl">
                    <ReadingTestEngine
                        title="Baseline Assessment"
                        text={TEST_TEXT}
                        questions={TEST_QUESTIONS}
                        onComplete={handleTestComplete}
                    />
                </div>
            )}

            {step === 'capture' && (
                <div className="max-w-md w-full text-center space-y-8">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h2 className="text-3xl font-bold">Analysis Complete</h2>
                    <p className="text-slate-400">
                        Your results are ready. Enter your email to unlock your full report and see how you compare to the global average.
                    </p>
                    <form onSubmit={handleLeadSubmit} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-white placeholder-slate-600"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? 'Processing...' : 'Unlock Results'} <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                    <p className="text-xs text-slate-600">We respect your privacy. No spam.</p>
                </div>
            )}

            {step === 'results' && (
                <div className="max-w-xl w-full text-center space-y-8">
                    <h2 className="text-3xl font-bold">Your Baseline</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                            <div className="text-6xl font-bold text-white mb-2">{results.wpm}</div>
                            <div className="text-xs text-slate-500 uppercase tracking-widest">WPM</div>
                        </div>
                        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                            <div className="text-6xl font-bold text-emerald-400 mb-2">{results.comprehension}%</div>
                            <div className="text-xs text-slate-500 uppercase tracking-widest">Comprehension</div>
                        </div>
                    </div>

                    <div className="bg-indigo-900/10 border border-indigo-500/30 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-indigo-400 mb-2">Analysis</h3>
                        <p className="text-slate-300">
                            You are reading at {results.wpm > 300 ? 'an above average' : 'an average'} speed.
                            Your bottleneck is likely {
                                results.wpm < 250 ? 'Subvocalization (saying words in your head)' :
                                    results.wpm < 400 ? 'Regression (re-reading)' : 'Efficiency'
                            }.
                        </p>
                    </div>

                    <div className="space-y-4 pt-4">
                        <p className="text-slate-400">Fix this bottleneck in 30 minutes.</p>
                        <a
                            href="/rogue-session"
                            className="block w-full py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform"
                        >
                            Start Rogue Session ($5)
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
