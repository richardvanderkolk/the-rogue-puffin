import React from 'react';

export const metadata = {
  title: 'Privacy Policy | The Rogue Puffin',
  description: 'How we manage and protect your data.',
};

export default function PrivacyPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-24 min-h-screen text-slate-300">
            <h1 className="text-4xl font-serif text-white mb-8">Privacy Policy</h1>
            <div className="prose prose-invert prose-emerald max-w-none">
                <p className="text-slate-500">Last Updated: {new Date().toLocaleDateString()}</p>
                
                <h3>1. Data Controller</h3>
                <p>
                    The Rogue Puffin is operated by <strong>Authoring Life</strong>, a sole proprietorship registered in the Netherlands. We are committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR).
                </p>
                <ul>
                    <li><strong>KVK Number:</strong> 99977516</li>
                    <li><strong>Email:</strong> info@authoringlife.com</li>
                </ul>

                <h3>2. Data Processing for Minors (Under 16)</h3>
                <p>
                    In the Netherlands, the digital age of consent is 16. Our Reading and Memory Programs are designed for students. If you are under the age of 16, you must have your parent or legal guardian's permission to create an account or provide any personal information to us. By creating an account, you confirm that you are at least 16 years old or have obtained explicit parental consent.
                </p>

                <h3>3. The Data We Collect & Why</h3>
                <p>We collect minimal personal data to operate our educational platform:</p>
                <ul>
                    <li><strong>Account Data:</strong> Your name and email address when you sign up for our programs or newsletters.</li>
                    <li><strong>Payment Data:</strong> Handled completely securely via Stripe. We never store your raw credit card data.</li>
                    <li><strong>Analytics:</strong> Anonymous usage and reading speed data to improve our educational content.</li>
                </ul>

                <h3>4. Third-Party Sub-Processors</h3>
                <p>We share necessary data securely with compliant third parties:</p>
                <ul>
                    <li><strong>Stripe:</strong> For processing payments for our premium memory programs.</li>
                    <li><strong>Vercel & AWS:</strong> For secure cloud hosting and database storage.</li>
                </ul>

                <h3>5. Data Retention & Your Rights</h3>
                <p>
                    Under GDPR, you have the "Right to be Forgotten." If you wish to delete your account, cancel your program access, and have all your personal data permanently erased from our servers, email us at info@authoringlife.com.
                </p>
                
                <h3>6. Cookies</h3>
                <p>
                    We use strictly necessary cookies to keep you logged into your reading sessions.
                </p>
            </div>
        </div>
    );
}
