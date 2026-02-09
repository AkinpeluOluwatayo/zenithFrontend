"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import { registerUser } from "@/services/AuthService";

export default function Signup() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });


    const validateForm = () => {

        const nameRegex = /^[A-Za-z\s]+$/;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

        if (!nameRegex.test(formData.fullName)) {
            toast.error("Full Name should only contain alphabets.");
            return false;
        }

        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }

        if (!passwordRegex.test(formData.password)) {
            toast.error("Password must be 8+ characters with an uppercase letter, a number, and a symbol.");
            return false;
        }

        return true;
    };

    const signupMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                toast.success("Account created! Welcome to Zenith ✨", {
                    style: { background: '#161618', color: '#fff', border: '1px solid #a855f7' }
                });


                setTimeout(() => router.push("/dashboard"), 1500);
            }
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || "Registration failed. Please check your details.";
            toast.error(errorMessage, {
                style: { background: '#161618', color: '#fff', border: '1px solid #ef4444' }
            });
        }
    });

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            signupMutation.mutate(formData);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0B] flex font-sans text-slate-200">

            <Toaster position="top-center" reverseOrder={false} />

            {/* LEFT SIDE: THE FORM */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-purple-600/5 blur-[120px] lg:hidden"></div>

                <div className="relative z-10 w-full max-w-md mx-auto lg:mx-0">
                    <Link href="/" className="flex items-center gap-2 mb-12 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                            <span className="text-white text-xl font-bold">Z</span>
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white">Zenith</span>
                    </Link>

                    <div className="mb-10">
                        <h1 className="text-4xl font-black text-white mb-3">Create Account</h1>
                        <p className="text-slate-400">Start your journey toward financial freedom today.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                            <input
                                type="text"
                                required
                                disabled={signupMutation.isPending}
                                value={formData.fullName}
                                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                placeholder="Enter full name"
                                className="w-full bg-[#161618] border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-slate-600 text-white disabled:opacity-50"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                            <input
                                type="email"
                                required
                                disabled={signupMutation.isPending}
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                placeholder="Enter email address"
                                className="w-full bg-[#161618] border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-slate-600 text-white disabled:opacity-50"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    disabled={signupMutation.isPending}
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
                                    <span className="text-xs font-bold uppercase">{showPassword ? "Hide" : "Show"}</span>
                                </button>
                            </div>

                            <div className="mt-3 p-4 bg-purple-500/5 border border-purple-500/10 rounded-xl space-y-1">
                                <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">Security Checklist:</p>
                                <ul className="text-[11px] text-slate-400 space-y-1">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-purple-500"></div>
                                        Alphabets only for name
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-purple-500"></div>
                                        Min. 8 chars with 1 Uppercase & 1 Number
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-purple-500"></div>
                                        Include 1 special character (!@#)
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={signupMutation.isPending}
                            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-500/20 transition-all active:scale-[0.98] mt-4 flex justify-center items-center"
                        >
                            {signupMutation.isPending ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center lg:text-left text-slate-500 text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="text-purple-400 font-bold hover:text-purple-300 transition-colors">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE: VISUAL SHOWCASE */}
            <div className="hidden lg:flex w-[55%] bg-[#0F0F11] border-l border-white/5 relative items-center justify-center overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"></div>

                <div className="relative z-10 w-full max-w-xl px-12">
                    <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden group hover:border-purple-500/30 transition-colors duration-500">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-2xl">✨</div>
                            <h2 className="text-3xl font-black text-white tracking-tight">Financial Intelligence</h2>
                        </div>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10">
                            Join 50,000+ users who have automated their savings and taken control of their future.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}