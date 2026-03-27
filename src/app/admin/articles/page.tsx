"use client";

import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, Save, CheckCircle, ArrowLeft } from "lucide-react";

export default function ArticlesCMS() {
    const [authData, setAuthData] = useState({ authenticated: false, passkey: "" });
    const [passwordInput, setPasswordInput] = useState("");
    
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<any | null>(null);
    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");

    useEffect(() => {
        const savedKey = localStorage.getItem("rogue_admin_key");
        if (savedKey) {
            setAuthData({ authenticated: true, passkey: savedKey });
            fetchArticles();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/articles');
            const data = await res.json();
            setArticles(data || []);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === "thepuffin2024!") {
            localStorage.setItem("rogue_admin_key", passwordInput);
            setAuthData({ authenticated: true, passkey: passwordInput });
            fetchArticles();
        } else {
            alert("Incorrect passkey");
        }
    };

    const handleSave = async () => {
        if (!editing) return;
        setSaving(true);
        try {
            const res = await fetch('/api/admin/articles', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ passkey: authData.passkey, article: editing })
            });
            const data = await res.json();
            if (data.success) {
                setSaveMessage("Saved!");
                setTimeout(() => setSaveMessage(""), 2000);
                
                setArticles(articles.map(a => a.slug === editing.slug ? editing : a));
            } else {
                alert("Failed to save: " + data.error);
            }
        } catch (err) {
            alert("Network error while saving");
        }
        setSaving(false);
    };

    if (loading && !articles.length) return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading Content...</div>;

    if (!authData.authenticated) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white font-sans">
                <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
                    <Lock className="w-8 h-8 text-indigo-400" />
                </div>
                <form onSubmit={handleLogin} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-6 w-full max-w-sm shadow-2xl">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-2">CMS Login</h1>
                        <p className="text-slate-400 text-sm">Enter the secret passkey</p>
                    </div>
                    <input 
                        type="password" 
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 text-white px-4 py-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-center tracking-widest"
                    />
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-bold py-4 rounded-xl">Unlock Editor</button>
                    <a href="/admin" className="text-sm text-slate-500 hover:text-white block text-center pt-2">Back to Analytics</a>
                </form>
            </div>
        );
    }

    if (!editing) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-6 md:p-12">
                <div className="max-w-5xl mx-auto space-y-8">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-6">
                        <div>
                            <div className="flex items-center gap-4 mb-1">
                                <a href="/admin" className="text-slate-500 hover:text-white"><ArrowLeft className="w-5 h-5" /></a>
                                <h1 className="text-3xl font-bold text-white">Articles CMS</h1>
                            </div>
                            <p className="text-slate-400 mt-1">Manage all {articles.length} articles from the database.</p>
                        </div>
                        <button 
                            onClick={() => { localStorage.removeItem("rogue_admin_key"); window.location.reload(); }}
                            className="text-sm font-bold text-slate-500 hover:text-white transition-colors"
                        >
                            Lock CMS
                        </button>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
                                <tr>
                                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Article</th>
                                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs w-32 text-center">Status</th>
                                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs w-32 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {articles.map(article => (
                                    <tr key={article.slug} className="hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white text-base">{article.title}</div>
                                            <div className="text-xs text-slate-500 mt-1">/blog/{article.slug}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {article.published ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
                                                    <Eye className="w-3 h-3" /> Live
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-500/10 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                                                    <EyeOff className="w-3 h-3" /> Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => setEditing({ ...article })}
                                                className="px-4 py-2 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors text-xs"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-slate-950 text-slate-200 font-sans flex flex-col overflow-hidden">
            <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between shrink-0">
                <button 
                    onClick={() => setEditing(null)}
                    className="flex items-center gap-2 text-slate-400 hover:text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setEditing({ ...editing, published: !editing.published })}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-colors border ${
                            editing.published ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-slate-800 border-slate-700 text-slate-400"
                        }`}
                    >
                        {editing.published ? <><Eye className="w-4 h-4"/> Published</> : <><EyeOff className="w-4 h-4"/> Draft</>}
                    </button>
                    
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors disabled:opacity-50 min-w-[120px] justify-center"
                    >
                        {saving ? "Saving..." : saveMessage ? <><CheckCircle className="w-4 h-4"/> {saveMessage}</> : <><Save className="w-4 h-4"/> Save</>}
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-12 pb-32">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Article Title</label>
                        <input 
                            value={editing.title}
                            onChange={e => setEditing({...editing, title: e.target.value})}
                            className="w-full bg-slate-900 border border-slate-800 text-white text-3xl font-bold px-4 py-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                    <div className="flex gap-6">
                        <div className="space-y-2 flex-1">
                            <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest">URL Slug</label>
                            <input value={editing.slug} disabled className="w-full bg-slate-950 border border-slate-800 text-slate-500 text-sm font-mono px-4 py-3 rounded-lg cursor-not-allowed" />
                        </div>
                        <div className="space-y-2 flex-1">
                            <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Category</label>
                            <input 
                                value={editing.category}
                                onChange={e => setEditing({...editing, category: e.target.value})}
                                className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Short Excerpt</label>
                        <textarea 
                            value={editing.excerpt}
                            onChange={e => setEditing({...editing, excerpt: e.target.value})}
                            rows={2}
                            className="w-full bg-slate-900 border border-slate-800 text-slate-300 text-sm leading-relaxed px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-y"
                        />
                    </div>
                    <div className="space-y-2 pt-4">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest">HTML Body Content</label>
                        </div>
                        <textarea 
                            value={editing.content}
                            onChange={e => setEditing({...editing, content: e.target.value})}
                            className="w-full bg-slate-900 border border-slate-800 text-emerald-400/90 font-mono text-sm leading-relaxed p-6 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-y min-h-[50vh]"
                            spellCheck={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
