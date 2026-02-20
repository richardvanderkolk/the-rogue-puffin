"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SocialVideo() {
    const [step, setStep] = useState(0);

    // The Script / Timeline
    const sequence = [
        { text: "School", duration: 0.5, style: "text-white" },
        { text: "taught you", duration: 0.5, style: "text-white" },
        { text: "to read", duration: 0.5, style: "text-white" },
        { text: "LIKE", duration: 0.4, style: "text-red-500 font-black" },
        { text: "THIS", duration: 1.5, style: "text-white" }, // Pause for emphasis
        { text: "But", duration: 0.2, style: "text-slate-400" },
        { text: "your", duration: 0.2, style: "text-slate-400" },
        { text: "brain", duration: 0.2, style: "text-indigo-400 font-bold" },
        { text: "can", duration: 0.1, style: "text-white" },
        { text: "actually", duration: 0.1, style: "text-white" },
        { text: "process", duration: 0.1, style: "text-white" },
        { text: "information", duration: 0.1, style: "text-white" },
        { text: "MUCH", duration: 0.1, style: "text-emerald-400 font-black scale-125" },
        { text: "FASTER", duration: 0.1, style: "text-emerald-400 font-black scale-150" },
        { text: "THAN", duration: 0.1, style: "text-white" },
        { text: "YOU", duration: 0.1, style: "text-white" },
        { text: "THINK", duration: 1.0, style: "text-white font-black text-9xl" },
        { text: "The Rogue Puffin", duration: 2.0, style: "text-indigo-500 font-heading" },
        { text: "Double Your Speed", duration: 0, style: "text-white text-4xl" } // End state
    ];

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (step < sequence.length - 1) {
            timeout = setTimeout(() => {
                setStep(prev => prev + 1);
            }, sequence[step].duration * 1000);
        }

        return () => clearTimeout(timeout);
    }, [step]);

    const currentFrame = sequence[step];

    return (
        <div className="h-screen w-screen bg-black flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.5, filter: "blur(5px)" }}
                    transition={{ duration: 0.1, ease: "circOut" }}
                    className={`text-7xl md:text-9xl text-center px-4 ${currentFrame.style}`}
                >
                    {currentFrame.text}
                </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-8 text-slate-800 text-xs font-mono">
                Frame: {step} / {sequence.length}
            </div>
        </div>
    );
}
