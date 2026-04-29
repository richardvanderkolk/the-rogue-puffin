"use client";
import { useState, useEffect } from "react";
import { CheckCircle2, Circle } from "lucide-react";

export function ActionCheckbox({ id, steps }: { id: string, steps: string[] }) {
    const [checkedState, setCheckedState] = useState<boolean[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(`action_${id}`);
        if (saved) {
            setCheckedState(JSON.parse(saved));
        } else {
            setCheckedState(new Array(steps.length).fill(false));
        }
    }, [id, steps.length]);

    const toggle = (index: number) => {
        const nextState = [...checkedState];
        nextState[index] = !nextState[index];
        setCheckedState(nextState);
        localStorage.setItem(`action_${id}`, JSON.stringify(nextState));
    };

    if (checkedState.length === 0) return null; // Avoid hydration mismatch

    const allChecked = checkedState.every(Boolean);

    return (
        <div className="space-y-2 mt-4 relative">
            {allChecked && (
                <div className="absolute -top-12 right-0 print:hidden text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full animate-in fade-in slide-in-from-bottom-2">
                    Protocol Completed!
                </div>
            )}
            
            {steps.map((step, index) => {
                const isChecked = checkedState[index];
                return (
                    <button 
                        key={index}
                        onClick={() => toggle(index)}
                        className={`flex items-start gap-3 w-full text-left group transition-all p-3 rounded-xl border print:p-0 print:border-none print:mb-3 ${isChecked ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-slate-950/50 print:bg-transparent border-white/5 print:border-transparent hover:bg-white/5'}`}
                    >
                        <div className="mt-0.5 shrink-0">
                            {isChecked ? (
                                <CheckCircle2 className="w-5 h-5 text-indigo-400 print:text-indigo-600" />
                            ) : (
                                <Circle className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 print:text-slate-400" />
                            )}
                        </div>
                        <span className={`text-sm leading-relaxed ${isChecked ? 'text-indigo-200 print:text-indigo-900 font-medium' : 'text-slate-300 print:text-slate-800'}`}>
                            {step}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
