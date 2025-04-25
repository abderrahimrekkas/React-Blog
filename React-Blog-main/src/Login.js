import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // For v5, use useHistory

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory(); // Initialize useHistory

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/Autorization', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Login failed');
            }

            const data = await response.json();
            history.push('/Home'); 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-pink-50 via-white to-pink-100 min-h-screen flex items-center justify-center p-4">
           
            <div className="w-full max-w-md">
              
                <div className="text-center mb-8">
                    <div className="bg-gradient-to-r from-pink-600 to-pink-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-white text-4xl">🔑</span> 
                    </div>
                </div>

              
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-8 transition-all duration-500 hover:shadow-xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">Welcome Back</h2>
                        <p className="text-gray-500 mt-2">Please sign in to continue</p>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div className="relative">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full bg-gradient-to-r from-pink-600 to-pink-400 text-white py-3 rounded-xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

