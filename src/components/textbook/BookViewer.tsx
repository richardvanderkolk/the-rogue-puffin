"use client";

import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface BookViewerProps {
 children: ReactNode;
 onClose: () => void;
}

export default function BookViewer({ children, onClose }: BookViewerProps) {
 const [currentSpread, setCurrentSpread] = useState(0);
 const [totalSpreads, setTotalSpreads] = useState(1);
 const contentRef = useRef<HTMLDivElement>(null);

 // 3D Flip State
 const [isFlipping, setIsFlipping] = useState(false);
 const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
 const [actualSpread, setActualSpread] = useState(0); // The spread currently visible underneath
 const [targetSpread, setTargetSpread] = useState(0); // The spread we are flipping to
 const hasSnapped = useRef(false);
 
 // Scrubber state
 const [scrubberValue, setScrubberValue] = useState(0);
 const [isScrubbing, setIsScrubbing] = useState(false);

 useEffect(() => {
 if (!isScrubbing) {
 setScrubberValue(currentSpread);
 }
 }, [currentSpread, isScrubbing]);

 // Book Dimensions
 const SPREAD_WIDTH = 1000;
 const SPREAD_HEIGHT = 700;
 const COLUMN_WIDTH = 420;
 const COLUMN_GAP = 80;
 const PADDING_X = 40;
 const PADDING_Y = 50;

 const [scale, setScale] = useState(1);
 const [phaseMap, setPhaseMap] = useState<{name: string, offset: number}[]>([]);

 const calculatePagesAndScale = () => {
 if (contentRef.current) {
 const scrollW = contentRef.current.scrollWidth;
 const spreads = Math.max(1, Math.ceil(scrollW / SPREAD_WIDTH));
 setTotalSpreads(spreads);

 // Map out the pixel offsets of each Phase for the running header
 const phases = Array.from(contentRef.current.querySelectorAll('[id^="phase-"]')).map(el => {
 const h1 = el.querySelector('h1');
 const h5 = el.querySelector('h5');
 const name = h5 ? `${h5.innerText.split(':')[0]} - ${h1 ? h1.innerText : ''}` : (h1 ? h1.innerText : "THE 1% LEARNER'S BLUEPRINT");
 return {
 name: name.toUpperCase(),
 offset: (el as HTMLElement).offsetLeft
 };
 });
 setPhaseMap(phases);
 }
 
 // Calculate dynamic scale to fit screen
 const safeWidth = window.innerWidth - 64; // 32px padding on each side
 const safeHeight = window.innerHeight - 128; // Top bar and bottom padding
 const scaleW = safeWidth / SPREAD_WIDTH;
 const scaleH = safeHeight / SPREAD_HEIGHT;
 setScale(Math.min(1, scaleW, scaleH));
 };

 useEffect(() => {
 calculatePagesAndScale();
 const timeoutId = setTimeout(calculatePagesAndScale, 500); // Recalculate after fonts/images load
 
 window.addEventListener('resize', calculatePagesAndScale);
 return () => {
 clearTimeout(timeoutId);
 window.removeEventListener('resize', calculatePagesAndScale);
 };
 }, [children]);

 // Intercept TOC link clicks to navigate spreads
 useEffect(() => {
 const handleClick = (e: MouseEvent) => {
 const target = e.target as HTMLElement;
 const a = target.closest('a');
 if (a && a.hash && a.hash.startsWith('#')) {
 const id = a.hash.slice(1);
 const el = document.getElementById(id);
 if (el && contentRef.current) {
 e.preventDefault();
 
 const containerRect = contentRef.current.getBoundingClientRect();
 const elRect = el.getBoundingClientRect();
 
 // Since both container and element are transformed by the same translateX,
 // their difference gives the absolute un-translated X coordinate!
 const absoluteX = elRect.left - containerRect.left;
 let spreadIndex = Math.floor(absoluteX / SPREAD_WIDTH);
 
 // Enforce bounds to prevent blank pages
 if (spreadIndex < 0) spreadIndex = 0;
 if (spreadIndex >= totalSpreads) spreadIndex = totalSpreads - 1;
 
 // Trigger the 3D flip to the target spread!
 if (spreadIndex !== actualSpread) {
 setTargetSpread(spreadIndex);
 setFlipDirection(spreadIndex > actualSpread ? 'next' : 'prev');
 setIsFlipping(true);
 hasSnapped.current = false;
 }
 }
 }
 };

 const ref = contentRef.current;
 if (ref) {
 ref.addEventListener('click', handleClick);
 return () => ref.removeEventListener('click', handleClick);
 }
 }, [actualSpread]);

 // Synthesize a realistic paper rustle sound using Web Audio API
 const playPageTurnSound = () => {
 try {
 const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
 if (!AudioContext) return;
 const audioCtx = new AudioContext();
 
 // 200ms burst of noise
 const bufferSize = audioCtx.sampleRate * 0.2; 
 const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
 const data = buffer.getChannelData(0);

 // Generate brown noise for a thicker, lower-pitched paper sound
 let lastOut = 0;
 for (let i = 0; i < bufferSize; i++) {
 const white = Math.random() * 2 - 1;
 data[i] = (lastOut + (0.02 * white)) / 1.02;
 lastOut = data[i];
 data[i] *= 3.5; // compensate for gain
 }

 const noise = audioCtx.createBufferSource();
 noise.buffer = buffer;

 // Bandpass filter to isolate the paper rustle frequencies
 const filter = audioCtx.createBiquadFilter();
 filter.type = 'bandpass';
 filter.frequency.value = 1200; // 1.2kHz
 filter.Q.value = 0.8;

 // Amplitude envelope
 const gainNode = audioCtx.createGain();
 gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
 // Quick attack
 gainNode.gain.linearRampToValueAtTime(0.6, audioCtx.currentTime + 0.03);
 // Slow exponential decay
 gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

 noise.connect(filter);
 filter.connect(gainNode);
 gainNode.connect(audioCtx.destination);

 noise.start();
 } catch (e) {
 console.error("Audio playback failed", e);
 }
 };

 const handleNext = () => {
 if (currentSpread < totalSpreads - 1 && !isFlipping) {
 playPageTurnSound();
 setFlipDirection('next');
 setTargetSpread(currentSpread + 1);
 hasSnapped.current = false;
 setIsFlipping(true);
 setCurrentSpread(prev => prev + 1);
 }
 };

 const handlePrev = () => {
 if (currentSpread > 0 && !isFlipping) {
 playPageTurnSound();
 setFlipDirection('prev');
 setTargetSpread(currentSpread - 1);
 hasSnapped.current = false;
 setIsFlipping(true);
 setCurrentSpread(prev => prev - 1);
 }
 };

 // Keyboard navigation
 useEffect(() => {
 const handleKeyDown = (e: KeyboardEvent) => {
 if (e.key === 'ArrowRight') handleNext();
 if (e.key === 'ArrowLeft') handlePrev();
 if (e.key === 'Escape') onClose();
 };
 window.addEventListener('keydown', handleKeyDown);
 return () => window.removeEventListener('keydown', handleKeyDown);
 }, [currentSpread, totalSpreads, onClose]);

 return (
 <div className="fixed inset-0 z-[100] bg-stone-900 flex flex-col items-center justify-center p-4 sm:p-8 backdrop-blur-sm overflow-hidden">
 
 {/* Top Bar */}
 <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
 <div className="text-stone-400 font-bold uppercase tracking-widest text-xs flex items-center gap-4">
 <span>The 1% Learner's Blueprint</span>
 <span className="w-1.5 h-1.5 rounded-full bg-stone-700"></span>
 <span>Spread {currentSpread + 1} of {totalSpreads}</span>
 </div>
 <button 
 onClick={onClose}
 className="flex items-center gap-2 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-full transition-colors text-xs font-bold uppercase tracking-wider"
 >
 <X className="w-4 h-4" /> Close Book
 </button>
 </div>

 {/* Navigation Buttons */}
 <button 
 onClick={handlePrev}
 disabled={currentSpread === 0}
 className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 p-4 rounded-full bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white disabled:opacity-0 disabled:pointer-events-none transition-all z-50 shadow-2xl"
 >
 <ChevronLeft className="w-8 h-8" />
 </button>

 <button 
 onClick={handleNext}
 disabled={currentSpread >= totalSpreads - 1}
 className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 p-4 rounded-full bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white disabled:opacity-0 disabled:pointer-events-none transition-all z-50 shadow-2xl"
 >
 <ChevronRight className="w-8 h-8" />
 </button>

 {/* The Book Stage (scales to fit screen) */}
 <div className="relative w-full h-full max-w-full max-h-full flex items-center justify-center">
 
 {/* CSS Aspect Ratio scaling container */}
 <div 
 className="relative shrink-0 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden flex items-center origin-center transition-transform duration-300"
 style={{ 
 width: SPREAD_WIDTH, 
 height: SPREAD_HEIGHT,
 backgroundColor: '#f8f5f0', // Off-white paper color
 transform: `scale(${scale})`
 }}
 >
 {/* Deep Gutter Shadow (Left side) */}
 <div className="absolute right-1/2 top-0 bottom-0 w-[60px] bg-gradient-to-l from-black/10 via-black/5 to-transparent pointer-events-none mix-blend-multiply z-20"></div>
 {/* The Book Container */}
 <div className="w-full max-w-[2000px] aspect-[1.414/1] bg-[#fdfbf7] relative shadow-2xl rounded-sm overflow-hidden flex ring-1 ring-black/5 mx-auto">
 {/* Book Spine Shadow */}
 <div className="absolute top-0 bottom-0 left-[calc(50%-40px)] right-[calc(50%-40px)] bg-gradient-to-r from-transparent via-black/10 to-transparent z-30 pointer-events-none mix-blend-multiply"></div>
 <div className="absolute top-0 bottom-0 left-1/2 w-[2px] -ml-[1px] bg-black/20 z-30 pointer-events-none mix-blend-multiply"></div>
 <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/30 z-30 pointer-events-none"></div>

 {/* Soft Ambient Light (Left Page) */}
 <div className="absolute left-0 top-0 bottom-0 right-1/2 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/60 via-transparent to-black/5 pointer-events-none mix-blend-overlay z-20"></div>
 
 {/* Soft Ambient Light (Right Page) */}
 <div className="absolute right-0 top-0 bottom-0 left-1/2 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-white/60 via-transparent to-black/5 pointer-events-none mix-blend-overlay z-20"></div>

 {/* Running Headers */}
 <div className="absolute top-8 left-12 text-stone-400 uppercase tracking-widest text-[0.55rem] font-bold z-20 pointer-events-none opacity-60">
 THE 1% LEARNER'S BLUEPRINT
 </div>
 <div className="absolute top-8 right-12 text-stone-400 uppercase tracking-widest text-[0.55rem] font-bold z-20 pointer-events-none opacity-60 text-right">
 {[...phaseMap].reverse().find(p => p.offset <= (actualSpread * SPREAD_WIDTH) + (SPREAD_WIDTH/2))?.name || "THE 1% LEARNER'S BLUEPRINT"}
 </div>

 {/* Page Numbers */}
 <div className="absolute bottom-8 left-12 text-stone-400 font-serif text-sm z-20 pointer-events-none opacity-80">
 {(actualSpread * 2) + 1}
 </div>
 <div className="absolute bottom-8 right-12 text-stone-400 font-serif text-sm z-20 pointer-events-none opacity-80">
 {(actualSpread * 2) + 2}
 </div>

 {/* Window to clip the sliding content */}
 <div className="w-full h-full relative overflow-hidden z-10" style={{ paddingLeft: PADDING_X, paddingRight: PADDING_X, paddingTop: PADDING_Y, paddingBottom: PADDING_Y }}>
 
 {/* 3D Page Flip Overlay */}
 <motion.div
 initial={false}
 animate={{ 
 rotateY: flipDirection === 'next' ? (isFlipping ? -180 : 0) : (isFlipping ? 180 : 0),
 opacity: isFlipping ? [0, 1, 1, 0] : 0,
 zIndex: isFlipping ? 40 : -1
 }}
 transition={{ duration: 0.6, ease: "easeInOut", times: [0, 0.1, 0.9, 1] }}
 onUpdate={(latest) => {
 // Snap the underlying content halfway through the flip when the page is perfectly vertical (invisible)
 if (isFlipping) {
 const rotation = latest.rotateY;
 if (typeof rotation === 'number') {
 if (flipDirection === 'next' && rotation <= -90 && !hasSnapped.current) {
 hasSnapped.current = true;
 setActualSpread(targetSpread);
 } else if (flipDirection === 'prev' && rotation >= 90 && !hasSnapped.current) {
 hasSnapped.current = true;
 setActualSpread(targetSpread);
 }
 }
 }
 }}
 onAnimationComplete={() => {
 if (isFlipping) setIsFlipping(false);
 }}
 className={`absolute top-0 bottom-0 w-1/2 bg-[#f8f5f0] border-black/5 ${
 flipDirection === 'next' 
 ? 'left-1/2 origin-left border-l shadow-[-20px_0_50px_rgba(0,0,0,0.2)]' 
 : 'right-1/2 origin-right border-r shadow-[20px_0_50px_rgba(0,0,0,0.2)]'
 }`}
 style={{ 
 backfaceVisibility: 'hidden',
 transformStyle: 'preserve-3d',
 transform: 'perspective(2000px)'
 }}
 >
 <div className={`absolute inset-0 pointer-events-none mix-blend-multiply ${
 flipDirection === 'next' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
 } from-black/10 to-transparent`} />
 </motion.div>

 {/* Backside of the flipping page */}
 <motion.div
 initial={false}
 animate={{ 
 rotateY: flipDirection === 'next' ? (isFlipping ? -180 : 0) : (isFlipping ? 180 : 0),
 opacity: isFlipping ? [0, 1, 1, 0] : 0,
 zIndex: isFlipping ? 39 : -1
 }}
 transition={{ duration: 0.6, ease: "easeInOut", times: [0, 0.1, 0.9, 1] }}
 className={`absolute top-0 bottom-0 w-1/2 bg-[#f4f1eb] border-black/5 ${
 flipDirection === 'next' 
 ? 'left-1/2 origin-left border-r' 
 : 'right-1/2 origin-right border-l'
 }`}
 style={{ 
 transformStyle: 'preserve-3d',
 transform: 'perspective(2000px)'
 }}
 >
 <div className={`absolute inset-0 pointer-events-none mix-blend-multiply ${
 flipDirection === 'next' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
 } from-black/10 to-transparent`} />
 </motion.div>

 {/* The Columns Engine */}
 <div
 ref={contentRef}
 className="h-full prose prose-sm prose-stone prose-p:text-stone-700 prose-p:leading-relaxed prose-p:tracking-normal prose-headings:text-stone-900 prose-headings:font-bold prose-headings:tracking-tight max-w-none prose-img:rounded-xl prose-img:shadow-md prose-hr:border-stone-300"
 style={{
 transform: `translateX(${-(actualSpread * SPREAD_WIDTH)}px)`,
 columnCount: 2,
 columnGap: '80px',
 columnFill: 'auto',
 }}
 >
 {/* Override prose styles for the book theme to ensure dark text on light paper */}
 <style dangerouslySetInnerHTML={{__html: `
 .prose {
 --tw-prose-body: #44403c;
 --tw-prose-headings: #1c1917;
 --tw-prose-bold: #1c1917;
 --tw-prose-links: #4f46e5;
 }
 /* Ensure elements don't break awkwardly across columns */
 .prose h1, .prose h2, .prose h3, .prose h4, .prose h5 {
 break-after: avoid;
 page-break-after: avoid;
 }
 .prose p, .prose ul, .prose ol {
 break-inside: avoid-page;
 orphans: 3;
 widows: 3;
 }
 .prose img {
 break-inside: avoid;
 max-height: 300px;
 object-fit: contain;
 }
 /* Force action boxes and custom components to stay whole */
 .break-inside-avoid {
 break-inside: avoid !important;
 page-break-inside: avoid !important;
 margin-bottom: 2rem;
 }
 /* Drop Caps for the first paragraph of every article */
 .book-view-override p.lead:first-of-type::first-letter {
 float: left;
 font-size: 3.5rem;
 line-height: 0.8;
 padding-top: 0.25rem;
 padding-right: 0.4rem;
 font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
 font-weight: 900;
 color: #4f46e5 !important;
 }
 /* Custom light-theme overrides for nested components */
 .book-view-override [class*="bg-slate-900"],
 .book-view-override [class*="bg-indigo-950"],
 .book-view-override [class*="bg-emerald-950"],
 .book-view-override [class*="bg-purple-950"],
 .book-view-override [class*="bg-amber-950"] {
 background-color: #ffffff !important;
 border: 1px solid #e7e5e4 !important;
 border-left: 4px solid #1c1917 !important;
 box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05) !important;
 border-radius: 8px !important;
 padding: 1.5rem !important;
 position: relative;
 break-inside: avoid !important;
 page-break-inside: avoid !important;
 -webkit-column-break-inside: avoid !important;
 display: inline-block;
 width: 100%;
 margin-top: 2rem !important;
 margin-bottom: 2rem !important;
 }
 .book-view-override [class*="bg-slate-900"] *,
 .book-view-override [class*="bg-indigo-950"] *,
 .book-view-override [class*="bg-emerald-950"] *,
 .book-view-override [class*="bg-purple-950"] *,
 .book-view-override [class*="bg-amber-950"] * {
 color: #1c1917 !important;
 }
 .book-view-override blockquote {
 background: transparent !important;
 border: none !important;
 border-left: 4px solid #1c1917 !important;
 padding: 1rem 0 1rem 2rem !important;
 margin: 3rem 0 !important;
 break-inside: avoid !important;
 page-break-inside: avoid !important;
 -webkit-column-break-inside: avoid !important;
 display: inline-block;
 width: 100%;
 border-radius: 0 !important;
 box-shadow: none !important;
 color: #1c1917 !important;
 font-size: 1.25rem !important;
 line-height: 1.5 !important;
 }
 .book-view-override blockquote * {
 color: #1c1917 !important;
 font-size: 1.25rem !important;
 line-height: 1.5 !important;
 }
 .book-view-override [id^="phase-"] > div {
 margin-bottom: 0 !important;
 break-after: column !important;
 }
 .book-view-override [class*="bg-slate-900"]::before,
 .book-view-override [class*="bg-indigo-950"]::before {
 content: '💡 INSIGHT';
 position: absolute;
 top: -10px;
 left: 16px;
 background: #ffffff;
 padding: 0 8px;
 font-size: 0.7rem;
 font-weight: 800;
 text-transform: uppercase;
 letter-spacing: 0.1em;
 color: #1c1917;
 border: 1px solid #e7e5e4;
 border-radius: 4px;
 }
 .prose mark {
 background-color: transparent;
 background-image: linear-gradient(to right, rgba(253, 224, 71, 0.4), rgba(253, 224, 71, 0.9) 5%, rgba(253, 224, 71, 0.9) 95%, rgba(253, 224, 71, 0.4));
 color: #1c1917 !important;
 padding: 0.1em 0.3em;
 border-radius: 0.25em 0.1em 0.2em 0.25em;
 font-weight: 700;
 box-decoration-break: clone;
 -webkit-box-decoration-break: clone;
 }
 .book-view-override h1,
 .book-view-override h2,
 .book-view-override h3 {
 color: #1c1917 !important;
 }
 .book-view-override p,
 .book-view-override .text-slate-200,
 .book-view-override .text-slate-300,
 .book-view-override .text-slate-400,
 .book-view-override .text-white {
 color: #44403c !important;
 }
 .book-view-override .text-slate-500 {
 color: #57534e !important;
 }
 .book-view-override .text-indigo-400,
 .book-view-override .text-indigo-300 {
 color: #4f46e5 !important;
 }
 .book-view-override .text-emerald-400,
 .book-view-override .text-emerald-300 {
 color: #059669 !important;
 }
 .book-view-override .bg-slate-800,
 .book-view-override .bg-slate-900 {
 background-color: #e7e5e4 !important;
 }
 
  .book-view-override .no-insight-tab::before {
    content: none !important;
    display: none !important;
  }
`}} />
 <div className="book-view-override">
 {children}
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Scrubber Bar */}
 <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 flex flex-col items-center z-50 transition-opacity duration-300">
 <div className="w-full max-w-2xl flex items-center gap-4 bg-stone-800/80 hover:bg-stone-800/95 backdrop-blur px-6 py-4 rounded-full shadow-2xl border border-white/10 transition-colors">
 <button 
 onClick={() => {
 if (currentSpread === 0) return;
 setTargetSpread(0);
 setFlipDirection('prev');
 hasSnapped.current = false;
 setIsFlipping(true);
 setCurrentSpread(0);
 }} 
 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-white mr-2 transition-colors"
 title="Jump to Table of Contents"
 >
 TOC
 </button>
 <span className="text-stone-400 text-xs font-bold w-12 text-right">{scrubberValue + 1}</span>
 <input 
 type="range" 
 min={0} 
 max={totalSpreads > 0 ? totalSpreads - 1 : 0} 
 value={scrubberValue}
 onChange={(e) => setScrubberValue(parseInt(e.target.value))}
 onMouseDown={() => setIsScrubbing(true)}
 onMouseUp={(e) => {
 setIsScrubbing(false);
 const newSpread = parseInt(e.currentTarget.value);
 if (newSpread !== currentSpread) {
 setFlipDirection(newSpread > currentSpread ? 'next' : 'prev');
 setTargetSpread(newSpread);
 hasSnapped.current = false;
 setIsFlipping(true);
 setCurrentSpread(newSpread);
 }
 }}
 onTouchStart={() => setIsScrubbing(true)}
 onTouchEnd={(e) => {
 setIsScrubbing(false);
 const newSpread = scrubberValue;
 if (newSpread !== currentSpread) {
 setFlipDirection(newSpread > currentSpread ? 'next' : 'prev');
 setTargetSpread(newSpread);
 hasSnapped.current = false;
 setIsFlipping(true);
 setCurrentSpread(newSpread);
 }
 }}
 className="flex-1 accent-stone-300 h-1.5 bg-stone-700 rounded-full appearance-none cursor-pointer"
 />
 <span className="text-stone-400 text-xs font-bold w-12">{totalSpreads}</span>
 </div>
 </div>
 </div>
 );
}
