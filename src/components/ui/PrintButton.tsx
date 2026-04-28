'use client';

import { Printer } from 'lucide-react';

export function PrintButton() {
    return (
        <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition"
        >
            <Printer className="w-4 h-4" /> Save as PDF
        </button>
    );
}
