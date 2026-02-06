import Image from "next/image";
import Link from "next/link";
// import { redirect } from 'next/navigation';

export default function Home() {
  // redirect('/dashboard');
  return (
      <div className="min-h-screen bg-[#0A0A0B] font-sans text-slate-200 selection:bg-purple-500/30">
        {/* NAVIGATION */}
        <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#0A0A0B]/80 backdrop-blur-xl px-6 md:px-12 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-2xl font-black tracking-tighter text-white">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <span className="text-white text-xl font-bold">Z</span>
              </div>
              Zenith
            </div>

            <div className="hidden space-x-10 text-sm font-medium text-slate-400 md:flex">
              <Link href="#features" className="hover:text-purple-400 transition-colors">Features</Link>
              <Link href="#insights" className="hover:text-purple-400 transition-colors">Insights</Link>
              <Link href="#security" className="hover:text-purple-400 transition-colors">Security</Link>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition">Log in</Link>
              {/* SIGNUP LINK IN NAV */}
              <Link href="/signup" className="bg-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-purple-500/20 hover:bg-purple-500 hover:-translate-y-0.5 transition-all active:scale-95">
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        <main className="pt-32 pb-20">
          {/* HERO SECTION */}
          <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Live: Real-time API Sync</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tight">
                Master your <br />
                <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">money</span> in seconds.
              </h1>

              <p className="text-xl text-slate-400 leading-relaxed max-w-md mx-auto lg:mx-0">
                Stop guessing where your cash flows. Zenith tracks and optimizes your financial life with banking-grade precision.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {/* MAIN HERO SIGNUP LINK */}
                <Link href="/signup" className="px-8 py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-500 transition-all shadow-xl shadow-purple-500/20 active:scale-95">
                  Start Tracking Free
                </Link>
                {/* OPTIONAL: LINK DEMO TO SIGNUP TOO */}
                <Link href="/signup" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all active:scale-95">
                  View Demo
                </Link>
              </div>
            </div>

            {/* DASHBOARD PREVIEW MOCKUP */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative rounded-[2rem] bg-[#161618] border border-white/10 shadow-2xl overflow-hidden p-6 md:p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <p className="text-slate-500 text-xs uppercase font-bold tracking-widest">Total Balance</p>
                    <p className="text-3xl font-bold text-white">$24,500.00</p>
                  </div>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-[#161618] bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white">JD</div>
                    <div className="w-8 h-8 rounded-full border-2 border-[#161618] bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">AS</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <MockTransaction name="Apple Store" date="Today, 12:40 PM" amount="-$999.00" icon="🍎" color="bg-white/10" />
                  <MockTransaction name="Freelance Pay" date="Yesterday" amount="+$4,200.00" icon="💰" color="bg-green-500/20" textColor="text-green-400" />
                  <MockTransaction name="Netflix Inc." date="Feb 02, 2026" amount="-$15.99" icon="📺" color="bg-red-500/20" />
                </div>

                <div className="mt-8 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-xs font-bold text-slate-400 uppercase">Monthly Goal</p>
                    <p className="text-xs font-bold text-purple-400">85%</p>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FEATURES BENTO GRID */}
          <section id="features" className="max-w-7xl mx-auto px-6 mt-40">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-black text-white">Built for modern finance</h2>
              <p className="text-slate-400">High-performance tools for your personal wealth management.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                  title="Track Expenses"
                  desc="Automatic categorization and instant logging of your daily spending."
                  icon="💸"
                  gradient="from-purple-500/20 to-transparent"
              />
              <FeatureCard
                  title="Monthly Insights"
                  desc="Deep-dive analytics to help you understand where your money goes."
                  icon="📊"
                  gradient="from-indigo-500/20 to-transparent"
              />
              <FeatureCard
                  title="Secure Auth"
                  desc="State-of-the-art encryption ensuring your data stays yours."
                  icon="🛡️"
                  gradient="from-fuchsia-500/20 to-transparent"
              />
            </div>
          </section>
        </main>
      </div>
  );

  return null;
}

function MockTransaction({ name, date, amount, icon, color, textColor = "text-white" }) {
  return (
      <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center text-lg shadow-inner`}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-bold text-white">{name}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{date}</p>
          </div>
        </div>
        <p className={`text-sm font-mono font-bold ${textColor}`}>{amount}</p>
      </div>
  );
}

function FeatureCard({ title, desc, icon, gradient }) {
  return (
      <div className="relative group p-8 rounded-[2rem] bg-[#161618] border border-white/10 hover:border-purple-500/50 transition-all duration-500 cursor-pointer">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]`}></div>
        <div className="relative">
          <div className="text-4xl mb-6">{icon}</div>
          <h3 className="text-2xl font-black text-white mb-2">{title}</h3>
          <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
          <div className="mt-8 flex items-center gap-2 text-purple-400 font-bold group-hover:gap-4 transition-all">
            <span className="text-xs uppercase tracking-widest">Learn more</span>
            <span>&rarr;</span>
          </div>
        </div>
      </div>
  );
}