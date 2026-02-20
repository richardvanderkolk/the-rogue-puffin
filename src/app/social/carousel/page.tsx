"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

// Images from logical order based on timestamps
const BRIEF_IMAGES = [
    "/uploads/media__1770633679906.jpg",
    "/uploads/media__1770633679918.jpg",
    "/uploads/media__1770633688763.jpg",
    "/uploads/media__1770633688764.jpg",
    "/uploads/media__1770633688768.jpg",
    "/uploads/media__1770633697625.jpg",
    "/uploads/media__1770633697626.jpg",
    "/uploads/media__1770633706976.jpg",
    "/uploads/media__1770633706977.jpg",
    "/uploads/media__1770633716347.jpg",
    "/uploads/media__1770633729169.jpg",
    "/uploads/media__1770633729170.jpg",
    "/uploads/media__1770633729174.jpg"
];

// Duration per slide in seconds
const SLIDE_DURATION = 3;

export default function VideoGenerator() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => {
                    if (prev >= BRIEF_IMAGES.length - 1) {
                        setIsPlaying(false); // Stop at end
                        return prev;
                    }
                    return prev + 1;
                });
            }, SLIDE_DURATION * 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const togglePlay = () => setIsPlaying(!isPlaying);
    const reset = () => {
        setIsPlaying(false);
        setCurrentSlide(0);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
            {/* Video Frame */}
            <div
                ref={videoRef}
                className="relative w-[1080px] h-[1920px] max-h-[80vh] aspect-[9/16] bg-black border border-slate-800 shadow-2xl overflow-hidden"
            >
                <img
                    key={currentSlide}
                    src={BRIEF_IMAGES[currentSlide]}
                    alt={`Slide ${currentSlide + 1}`}
                    className="w-full h-full object-contain animate-ken-burns transition-opacity duration-500"
                    style={{
                        animation: isPlaying ? `ken-burns ${SLIDE_DURATION}s ease-out` : 'none'
                    }}
                />

                {/* Optional Progress Bar for recording cue */}
                <div className="absolute bottom-0 left-0 h-1 bg-red-600 transition-all duration-[3000ms] linear"
                    style={{ width: isPlaying ? '100%' : '0%', opacity: isPlaying ? 1 : 0 }}
                />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6 mt-8">
                <button onClick={togglePlay} className="p-4 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 transition">
                    {isPlaying ? <Pause /> : <Play />}
                </button>
                <button onClick={reset} className="p-4 bg-slate-800 rounded-full text-white hover:bg-slate-700 transition">
                    <RotateCcw />
                </button>
                <span className="text-slate-400 font-mono">
                    Slide {currentSlide + 1} / {BRIEF_IMAGES.length}
                </span>
            </div>

            <style jsx global>{`
        @keyframes ken-burns {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
      `}</style>

        </div>
    );
}
