import React from 'react';

export const metadata = {
  title: 'Terms of Service | The Rogue Puffin',
  description: 'Terms and conditions for our memory programs.',
};

export default function TermsPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-24 min-h-screen text-slate-300">
            <h1 className="text-4xl font-serif text-white mb-8">Terms of Service</h1>
            <div className="prose prose-invert prose-emerald max-w-none">
                <p className="text-slate-500">Last Updated: {new Date().toLocaleDateString()}</p>
                
                <h3>1. Introduction</h3>
                <p>
                    Welcome to The Rogue Puffin, operated by Authoring Life ("we", "us", "our"). By accessing our platform or purchasing our Reading and Memory Programs, you agree to these Terms.
                </p>

                <h3>2. Educational Disclaimer & Limitation of Liability</h3>
                <p>
                    The articles, content, and Reading and Memory Programs provided on The Rogue Puffin are strictly for educational and informational purposes. While our strategies are designed to help improve study habits and reading retention, individual results vary.
                </p>
                <p>
                    <strong>Authoring Life makes no guarantees or warranties regarding your academic performance, grades, or exam results.</strong> We cannot be held liable for any academic shortcomings or indirect failures resulting from the use or inability to use our programs.
                </p>

                <h3>3. Digital Product Refunds</h3>
                <p>
                    Due to the immediate and digital nature of the Reading and Memory Programs, you explicitly waive your 14-day EU right of withdrawal upon accessing, downloading, or initiating a reading session of the digital content. All digital program sales are final and non-refundable unless otherwise explicitly stated during special promotions.
                </p>

                <h3>4. Acceptable Use</h3>
                <p>
                    When interacting with our platform, you agree not to share your premium login credentials with others or distribute, scrape, or resell our paid curriculum/reading drills to third parties without written permission from Authoring Life.
                </p>

                <h3>5. Governing Law</h3>
                <p>
                    These Terms shall be governed by and construed under the laws of the Netherlands. Any disputes arising from these Terms will be subject to the exclusive jurisdiction of the Dutch courts.
                </p>
            </div>
        </div>
    );
}
