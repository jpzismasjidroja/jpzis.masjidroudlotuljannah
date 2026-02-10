import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TurnstileWidget from '../components/TurnstileWidget';

const AdminLogin = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!turnstileToken) {
            alert('Harap verifikasi bahwa Anda bukan robot.');
            return;
        }
        setLoading(true);
        const success = await onLogin(email, password);
        setLoading(false);
        if (success) navigate('/admin');
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#022c22]">
            <div className="max-w-md w-full bg-white p-10 rounded-[2rem] shadow-2xl border-4 border-amber-500/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-300 to-amber-600"></div>
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-[#022c22] font-serif">Admin Portal</h2>
                    <p className="text-slate-500 mt-2 font-serif italic">Masjid Roudlotul Jannah</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            placeholder="Email Admin"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-4 bg-amber-50 border border-amber-200 rounded-xl outline-none"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 bg-amber-50 border border-amber-200 rounded-xl outline-none"
                            required
                        />
                    </div>
                    <TurnstileWidget onVerify={setTurnstileToken} />
                    <button type="submit" disabled={loading || !turnstileToken} className="w-full bg-[#064e3b] text-white py-4 rounded-xl font-bold hover:bg-[#022c22] transition shadow-lg font-serif tracking-wider disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? 'MEMUAT...' : 'MASUK'}
                    </button>
                </form>

                <Link to="/" className="w-full mt-6 text-slate-400 text-sm hover:text-[#064e3b] transition block text-center">Kembali ke Beranda</Link>
            </div>
        </div>
    );
};

export default AdminLogin;
