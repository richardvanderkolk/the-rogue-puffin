"use client";

import { motion } from "framer-motion";
import { Lock, CheckCircle2, Play, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";
import { COURSE_CONTENT, DayContent } from "@/lib/course-content";

interface CourseTimelineProps {
    completedDays: number; // 0 to 7
}

export default function CourseTimeline({ completedDays = 0 }: CourseTimelineProps) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    7-Day Speed Coach
                </h2>
                <span className="text-sm text-slate-400 font-medium">
                    {completedDays} / 7 Days Complete
                </span>
            </div>

            <div className="relative border-l-2 border-slate-800 ml-4 md:ml-6 space-y-8 pb-4">
                {COURSE_CONTENT.map((day, index) => {
                    const isCompleted = index < completedDays;
                    const isCurrent = index === completedDays;
                    const isLocked = index > completedDays;

                    return (
                        <div key={day.day} className="relative pl-8 md:pl-10">
                            {/* Timeline Dot */}
                            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 transition-colors duration-300 z-10 ${isCompleted ? "bg-green-500 border-green-500" :
                                    isCurrent ? "bg-indigo-500 border-indigo-500 animate-pulse" :
                                        "bg-slate-900 border-slate-700"
                                }`}>
                                {isCompleted && <CheckCircle2 className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                            </div>

                            {/* Content Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`rounded-xl border p-5 transition-all duration-300 group ${isCurrent ? "bg-slate-800/50 border-indigo-500/50 shadow-lg shadow-indigo-500/10" :
                                        isLocked ? "bg-slate-900/30 border-slate-800/50 opacity-60" :
                                            "bg-slate-900/80 border-slate-700"
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-xs font-bold uppercase tracking-wider ${isCurrent ? "text-indigo-400" : "text-slate-500"
                                                }`}>Day {day.day}</span>
                                            <span className="text-xs text-slate-500">• {day.duration}</span>
                                            {isCurrent && <span className="text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full">Up Next</span>}
                                        </div>
                                        <h3 className={`font-bold text-lg ${isLocked ? "text-slate-400" : "text-white"}`}>
                                            {day.title}
                                        </h3>
                                    </div>
                                    {isLocked && <Lock className="w-4 h-4 text-slate-600 mt-1" />}
                                </div>

                                <p className="text-sm text-slate-400 mb-4 line-clamp-2 md:line-clamp-none">
                                    {day.description}
                                </p>

                                {/* Action Button */}
                                {!isLocked && (
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex gap-2">
                                            {day.skills.slice(0, 2).map(skill => (
                                                <span key={skill} className="text-[10px] text-slate-500 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>

                                        {isCurrent ? (
                                            <Link href={`/train/day/${day.day}`}>
                                                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors group-hover:scale-105 active:scale-95 duration-200">
                                                    <Play className="w-4 h-4 fill-current" /> Start
                                                </button>
                                            </Link>
                                        ) : (
                                            <Link href={`/train/day/${day.day}`}>
                                                <button className="text-sm text-slate-400 font-medium hover:text-white transition-colors flex items-center gap-1">
                                                    Review <ChevronRight className="w-3 h-3" />
                                                </button>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
