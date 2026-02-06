"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import { getCurrentUser } from "@/services/AuthService";
import {
    getAllTransactions,
    createTransaction,
    deleteTransaction
} from "@/services/DashboardService";


function ProtectedRoute({ children }) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.replace("/login");
        } else {
            setIsAuthorized(true);
        }
    }, [router]);

    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return children;
}

function DashboardContent() {
    const router = useRouter();
    const queryClient = useQueryClient();

    // UI State
    const [showAddModal, setShowAddModal] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [monthlyBudget, setMonthlyBudget] = useState(100000);
    const [newTx, setNewTx] = useState({
        description: "",
        amount: "",
        category: "General"
    });

    // Queries
    const { data: user } = useQuery({
        queryKey: ["authUser"],
        queryFn: getCurrentUser,
        staleTime: 10 * 60 * 1000,
    });

    const { data: transactions = [], isLoading } = useQuery({
        queryKey: ["transactions"],
        queryFn: getAllTransactions,
        retry: 1,
    });

    // Mutations
    const addMutation = useMutation({
        mutationFn: createTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            setShowAddModal(false);
            setNewTx({ description: "", amount: "", category: "General" });
            toast.success("Expense logged! ₦", {
                style: { background: '#161618', color: '#fff', border: '1px solid #22c55e' }
            });
        },
        onError: () => toast.error("Failed to add transaction")
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            setDeleteId(null);
            toast.success("Log removed", { icon: '🗑️', style: { background: '#161618', color: '#fff' } });
        },
        onError: () => {
            setDeleteId(null);
            toast.error("Could not delete record");
        }
    });

    const handleAddSubmit = (e) => {
        e.preventDefault();
        const numericAmount = parseFloat(newTx.amount);
        const finalAmount = numericAmount > 0 ? -numericAmount : numericAmount;
        addMutation.mutate({ ...newTx, amount: finalAmount });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.replace("/login");
    };

    // Calculations
    const totalSpent = transactions
        .filter(t => t.amount < 0)
        .reduce((acc, curr) => acc + Math.abs(curr.amount), 0);

    const budgetUsagePercent = Math.min((totalSpent / monthlyBudget) * 100, 100);
    const isOverBudget = totalSpent > monthlyBudget;

    return (
        <div className="min-h-screen bg-[#0A0A0B] text-slate-200 flex flex-col md:flex-row font-sans">
            <Toaster position="top-right" reverseOrder={false} />

            {/* MOBILE HEADER */}
            <div className="md:hidden flex items-center justify-between p-6 bg-[#0D0D0E] border-b border-white/5">
                <div className="flex items-center gap-2 text-xl font-black text-white">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-sm shadow-lg shadow-purple-500/20">Z</div>
                    Zenith
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-400">
                    {isMobileMenuOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* SIDEBAR */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0D0D0E] border-r border-white/5 p-8 flex flex-col gap-8 transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="hidden md:flex items-center gap-3 text-2xl font-black text-white">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">Z</div>
                    Zenith
                </div>

                <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-5 mt-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 ml-1">Account</p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
                            {user?.fullName?.charAt(0) || "U"}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-white truncate">{user?.fullName || "User"}</p>
                            <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                </div>

                <nav className="space-y-2">
                    <div className="text-purple-400 bg-purple-500/10 p-4 rounded-2xl font-bold border border-purple-500/20">Expense Tracker</div>
                    <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Monthly Budget</label>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-400 font-bold text-sm">₦</span>
                            <input
                                type="number"
                                value={monthlyBudget}
                                onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                                className="bg-transparent text-white font-bold text-sm w-full outline-none focus:text-purple-400 transition-colors"
                            />
                        </div>
                    </div>
                </nav>

                <button onClick={handleLogout} className="mt-auto flex items-center gap-3 text-slate-500 p-4 hover:text-red-400 hover:bg-red-500/5 rounded-2xl transition-all font-bold text-sm uppercase tracking-widest">
                    Logout
                </button>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
                <header className="mb-12 space-y-6">
                    <div className={`bg-gradient-to-br ${isOverBudget ? 'from-red-600/20 border-red-500/40' : 'from-purple-500/10 border-purple-500/20'} p-10 rounded-[3rem] shadow-2xl relative overflow-hidden transition-all duration-500`}>
                        <div className="relative z-10">
                            <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-80">
                                {isOverBudget ? "⚠️ BUDGET EXCEEDED" : "Total Naira Spent"}
                            </p>
                            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                                ₦{totalSpent.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                            </h2>
                            <div className="mt-8 space-y-2">
                                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <span>Spending Progress</span>
                                    <span>{budgetUsagePercent.toFixed(1)}%</span>
                                </div>
                                <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
                                    <div
                                        className={`h-full transition-all duration-1000 ease-out rounded-full ${isOverBudget ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-purple-500'}`}
                                        style={{ width: `${budgetUsagePercent}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
                    <div>
                        <h3 className="text-3xl font-black text-white tracking-tight">Expense Logs</h3>
                    </div>
                    <button onClick={() => setShowAddModal(true)} className="w-full sm:w-auto bg-white text-black hover:bg-slate-200 px-8 py-4 rounded-2xl font-bold shadow-xl transition-all hover:-translate-y-0.5 active:scale-95">
                        + Log New Expense
                    </button>
                </div>

                {/* TABLE SECTION */}
                <div className="bg-[#161618] border border-white/5 rounded-[2.5rem] overflow-x-auto shadow-2xl">
                    <table className="w-full text-left min-w-[700px]">
                        <thead className="border-b border-white/5 bg-white/[0.01]">
                        <tr>
                            <th className="p-8 text-[10px] font-black uppercase text-slate-500 tracking-widest">Description</th>
                            <th className="p-8 text-[10px] font-black uppercase text-slate-500 tracking-widest">Category</th>
                            <th className="p-8 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Amount</th>
                            <th className="p-8 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Action</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                        {isLoading ? (
                            <tr><td colSpan="4" className="p-24 text-center text-slate-500 animate-pulse font-bold tracking-widest uppercase text-xs">Syncing Ledger...</td></tr>
                        ) : transactions.length === 0 ? (
                            <tr><td colSpan="4" className="p-24 text-center text-slate-500 italic">No expenses recorded yet.</td></tr>
                        ) : (
                            [...transactions].reverse().map((t) => (
                                <tr key={t.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="p-8 font-bold text-white text-lg">{t.description}</td>
                                    <td className="p-8">
                                            <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                {t.category}
                                            </span>
                                    </td>
                                    <td className="p-8 text-right font-mono font-bold text-lg text-red-400">
                                        -₦{Math.abs(t.amount).toLocaleString('en-NG')}
                                    </td>
                                    <td className="p-8 text-right">
                                        <button onClick={() => setDeleteId(t.id)} className="text-slate-600 hover:text-red-500 font-black text-[10px] uppercase transition-colors">
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* ADD EXPENSE MODAL */}
            {showAddModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-black/70" onClick={() => setShowAddModal(false)}></div>
                    <form onSubmit={handleAddSubmit} className="relative bg-[#161618] border border-white/10 p-10 rounded-[3rem] w-full max-w-md space-y-8 animate-in zoom-in duration-200">
                        <div className="text-center">
                            <h2 className="text-3xl font-black text-white">Log Expense</h2>
                        </div>
                        <div className="space-y-5">
                            <input required value={newTx.description} onChange={(e) => setNewTx({...newTx, description: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-purple-500/50" placeholder="e.g. Fuel for generator" />
                            <input type="number" step="0.01" required value={newTx.amount} onChange={(e) => setNewTx({...newTx, amount: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-purple-500/50" placeholder="Amount (₦)" />
                            <select value={newTx.category} onChange={(e) => setNewTx({...newTx, category: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white outline-none">
                                <option value="General">General</option>
                                <option value="Food">Food & Drink</option>
                                <option value="Data/Airtime">Data & Airtime</option>
                                <option value="Transport">Transport (Bolt/Uber)</option>
                                <option value="Power">Power/Electricity</option>
                            </select>
                        </div>
                        <button disabled={addMutation.isPending} className="w-full bg-purple-600 hover:bg-purple-500 py-5 rounded-2xl font-black text-white uppercase text-xs tracking-[0.2em] shadow-xl shadow-purple-500/20 transition-all">
                            {addMutation.isPending ? "Logging..." : "Confirm Expense"}
                        </button>
                    </form>
                </div>
            )}

            {/* DELETE MODAL */}
            {deleteId && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-black/80" onClick={() => setDeleteId(null)}></div>
                    <div className="relative bg-[#1A1A1C] border border-white/10 p-8 rounded-[2.5rem] w-full max-w-sm text-center space-y-6 shadow-2xl">
                        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto">
                            <span className="text-2xl">⚠️</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Delete Record?</h3>
                            <p className="text-slate-400 text-sm mt-2">Are you sure you want to remove this expense?</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteId(null)} className="flex-1 px-6 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-300 font-bold transition-colors">
                                Cancel
                            </button>
                            <button onClick={() => deleteMutation.mutate(deleteId)} disabled={deleteMutation.isPending} className="flex-1 px-6 py-4 bg-red-600 hover:bg-red-500 rounded-2xl text-white font-bold transition-all active:scale-95">
                                {deleteMutation.isPending ? "Removing..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// --- FINAL EXPORT ---
export default function Dashboard() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}