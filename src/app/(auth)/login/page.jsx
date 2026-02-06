"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast"; // Added Toast
import { loginUser } from "@/services/AuthService";

export default function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // --- Validation Rules ---
    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Password: min 8 chars, at least 1 uppercase, 1 symbol
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }

        if (!passwordRegex.test(formData.password)) {
            toast.error("Password must be 8+ characters with at least one uppercase letter and one symbol.");
            return false;
        }

        return true;
    };

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                toast.success("Login Successful! Welcome back.", {
                    style: { background: '#161618', color: '#fff', border: '1px solid #a855f7' },
                    iconTheme: { primary: '#a855f7', secondary: '#fff' },
                });

                // Delay redirect slightly so user sees the success toast
                setTimeout(() => router.push("/dashboard"), 1200);
            }
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || "Invalid email or password";
            toast.error(errorMessage, {
                style: { background: '#161618', color: '#fff', border: '1px solid #ef4444' }
            });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Run validation before triggering mutation
        if (validateForm()) {
            loginMutation.mutate(formData);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="min-h-screen bg-[#0A0A0B] flex font-sans text-slate-200">
            {/* 1. Add Toaster Container */}
            <Toaster position="top-center" reverseOrder={false} />

            {/* FORM SECTION */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-purple-600/5 blur-[120px] pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-md mx-auto lg:mx-0">
                    <Link href="/" className="flex items-center gap-2 mb-12 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                            <span className="text-white text-xl font-bold">Z</span>
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white">Zenith</span>
                    </Link>

                    <div className="mb-10">
                        <h1 className="text-4xl font-black text-white mb-3">Welcome Back</h1>
                        <p className="text-slate-400">Log in to manage your transactions and insights.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                            <input
                                type="email"
                                required
                                disabled={loginMutation.isPending}
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                placeholder="name@email.com"
                                className="w-full bg-[#161618] border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-slate-600 text-white disabled:opacity-50"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
                                <Link href="#" className="text-[10px] font-bold text-purple-400 uppercase tracking-widest hover:text-purple-300">Forgot?</Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    disabled={loginMutation.isPending}
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    placeholder="••••••••"
                                    className="w-full bg-[#161618] border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-slate-600 text-white pr-14 disabled:opacity-50"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-purple-400 transition-colors p-2"
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{showPassword ? "Hide" : "Show"}</span>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-500/20 transition-all active:scale-[0.98] mt-4 flex justify-center items-center"
                        >
                            {loginMutation.isPending ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Verifying...</span>
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center lg:text-left text-slate-500 text-sm">
                        New to Zenith?{" "}
                        <Link href="/signup" className="text-purple-400 font-bold hover:text-purple-300 transition-colors">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>

            {/* VISUAL SIDEBAR */}
            <div className="hidden lg:flex w-[55%] bg-[#0F0F11] border-l border-white/5 relative items-center justify-center overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"></div>

                <div className="relative z-10 w-full max-w-xl px-12">
                    <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 shadow-2xl overflow-hidden group">
                        <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:rotate-12 transition-transform duration-500">
                            🛡️
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight mb-4">Secure & Private</h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10">
                            We use banking-grade encryption to ensure your financial data is always protected and visible only to you.
                        </p>
                        <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">End-to-End Encrypted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}