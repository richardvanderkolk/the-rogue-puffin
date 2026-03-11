import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Imprint | The Rogue Puffin",
    description: "Legal and company information for The Rogue Puffin.",
};

export default function ImprintPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-slate-950">
            <div className="max-w-3xl mx-auto space-y-12">
                <header className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Imprint</h1>
                    <p className="text-xl text-slate-400 font-light">
                        Legal information and company details.
                    </p>
                </header>

                <div className="prose prose-invert prose-slate max-w-none space-y-8">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Company Information</h2>
                        <div className="space-y-2 text-slate-300">
                            <p><strong>Company Name:</strong> Authoring Life</p>
                            <p><strong>Chamber of Commerce (KvK):</strong> 99977516</p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Contact</h2>
                        <div className="space-y-2 text-slate-300">
                            <p>
                                <strong>Email:</strong> <a href="mailto:hello@theroguepuffin.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">hello@theroguepuffin.com</a>
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Disclaimer</h2>
                        <div className="space-y-2 text-slate-300">
                            <p>
                                The information provided on this website is for general informational and educational purposes only.
                                While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
