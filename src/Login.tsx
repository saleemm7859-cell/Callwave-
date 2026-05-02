import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Badge, Lock, HelpCircle } from 'lucide-react';
import { UserRole } from './types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [role, setRole] = useState<UserRole>(UserRole.OPERATOR);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="w-full max-w-md space-y-10 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <img 
              src="https://raw.githubusercontent.com/StackBlitz/stackblitz-images/main/logos/stackblitz-icon.svg" 
              alt="Callwave Outsource Logo" 
              className="h-24 w-auto object-contain"
              onError={(e) => {
                // Failback to stylized text if logo not found
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden">
              <h1 className="text-brand-black font-black text-4xl tracking-tighter italic">
                CALLWAVE OUTSOURCE
              </h1>
            </div>
          </div>
          <p className="text-brand-black/40 font-bold tracking-[0.3em] uppercase text-xs">
            Professional Dispatch & Logistics Solutions
          </p>
        </div>

        {/* Login Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 space-y-8 relative shadow-2xl rounded-2xl border border-brand-black/10"
        >
          {/* Role Switcher */}
          <div className="flex border border-brand-black/10 p-1 bg-black/5 rounded-lg overflow-hidden">
            <button
              onClick={() => setRole(UserRole.OPERATOR)}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all ${
                role === UserRole.OPERATOR
                  ? 'bg-brand-yellow text-brand-black'
                  : 'text-brand-black/40 hover:text-brand-black'
              }`}
            >
              Operator
            </button>
            <button
              onClick={() => setRole(UserRole.ADMIN)}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all ${
                role === UserRole.ADMIN
                  ? 'bg-brand-yellow text-brand-black'
                  : 'text-brand-black/40 hover:text-brand-black'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(role); }}>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-brand-black/40">Employee ID</label>
              <div className="relative">
                <Badge className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-black/10 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="PX-000-000"
                  className="w-full bg-black/5 border border-brand-black/10 p-4 pl-12 focus:border-brand-yellow outline-none text-brand-black placeholder:text-brand-black/20 rounded-xl transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-brand-black/40">Access Code</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-black/10 w-5 h-5" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-black/5 border border-brand-black/10 p-4 pl-12 focus:border-brand-yellow outline-none text-brand-black placeholder:text-brand-black/20 rounded-xl transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-brand-yellow text-brand-black font-black text-2xl py-4 uppercase tracking-tighter hover:bg-yellow-400 transition-all shadow-lg active:scale-[0.98] rounded-xl mt-4"
            >
              Sign In
            </button>
          </form>

          {/* Utils */}
          <div className="flex justify-between items-center pt-6 border-t border-brand-black/10 text-[10px] font-black uppercase tracking-widest text-brand-black/40">
            <button className="flex items-center gap-2 hover:text-brand-yellow transition-colors cursor-pointer text-brand-black/40">
              <HelpCircle className="w-4 h-4" />
              Help
            </button>
            <button className="hover:text-brand-yellow transition-colors cursor-pointer text-brand-black/40">
              Forgot Password?
            </button>
          </div>
        </motion.div>

        {/* Footer info */}
        <div className="text-center space-y-4">
           <p className="text-brand-black font-bold text-[10px] tracking-tighter italic">
            © 2024 TAXI DISPATCH LOGISTICS V4.2.0
          </p>
          <div className="flex justify-center gap-8 text-[10px] font-bold text-border-grey uppercase">
            <span className="hover:text-brand-yellow cursor-pointer transition-colors">System Status</span>
            <span className="hover:text-brand-yellow cursor-pointer transition-colors">Callwave Security</span>
            <span className="hover:text-brand-yellow cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
