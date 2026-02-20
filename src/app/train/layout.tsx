export default function TrainingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="fixed inset-0 w-full h-full bg-slate-950 text-slate-100 overflow-hidden flex flex-col">
            {/* 
        This layout forces the viewport to be fixed (no scrolling).
        Content inside must handle its own overflow if needed, 
        but the goal is to fit everything on one screen.
      */}
            <main className="flex-1 w-full h-full relative">
                {children}
            </main>
        </div>
    );
}
