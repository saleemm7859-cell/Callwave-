import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, History as HistoryIcon, Settings, Filter, Calendar, LogOut, ChevronDown, Sun, Moon } from 'lucide-react';
import { HistoryEntry, ClockSettings } from './types';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [localTime, setLocalTime] = useState(new Date());
  const [currentSubView, setCurrentSubView] = useState<'DASHBOARD' | 'HISTORY' | 'SCHEDULE'>('DASHBOARD');
  const [shiftStatus, setShiftStatus] = useState<'OFF_DUTY' | 'ON_DUTY' | 'ON_BREAK'>('OFF_DUTY');
  const [shiftDuration, setShiftDuration] = useState(0);
  const [confirmAction, setConfirmAction] = useState<'START_SHIFT' | 'START_BREAK' | 'END_BREAK' | 'CLOCK_OUT' | 'LOGOUT' | null>(null);
  const [showProfileTray, setShowProfileTray] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const [clockSettings, setClockSettings] = useState<ClockSettings>(() => {
    const saved = localStorage.getItem('cw_clock_settings');
    return saved ? JSON.parse(saved) : {
      clock1Zone: 'Asia/Karachi',
      clock1Label: 'PAKISTAN TIME (PKT)',
      clock2Zone: 'Europe/London',
      clock2Label: 'UNITED KINGDOM (GMT/BST)'
    };
  });

  useEffect(() => {
    const handleUpdate = () => {
      const saved = localStorage.getItem('cw_clock_settings');
      if (saved) setClockSettings(JSON.parse(saved));
    };
    window.addEventListener('clockSettingsUpdated', handleUpdate);
    return () => window.removeEventListener('clockSettingsUpdated', handleUpdate);
  }, []);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setLocalTime(new Date());
      if (shiftStatus !== 'OFF_DUTY') {
        setShiftDuration(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [shiftStatus]);

  const handleActionConfirm = () => {
    if (!confirmAction) return;

    switch (confirmAction) {
      case 'START_SHIFT':
        setShiftStatus('ON_DUTY');
        setShiftDuration(0);
        break;
      case 'START_BREAK':
        setShiftStatus('ON_BREAK');
        break;
      case 'END_BREAK':
        setShiftStatus('ON_DUTY');
        break;
      case 'CLOCK_OUT':
        setShiftStatus('OFF_DUTY');
        break;
      case 'LOGOUT':
        onLogout();
        break;
    }
    setConfirmAction(null);
  };

  const getModalTitle = () => {
    switch (confirmAction) {
      case 'START_SHIFT': return 'START NEW SHIFT?';
      case 'START_BREAK': return 'START BREAK?';
      case 'END_BREAK': return 'END BREAK?';
      case 'CLOCK_OUT': return 'CLOCK OUT NOW?';
      case 'LOGOUT': return 'TERMINATE SESSION?';
      default: return '';
    }
  };

  const getModalDescription = () => {
    switch (confirmAction) {
      case 'START_SHIFT': return 'This will begin your duty cycle and start the timer.';
      case 'START_BREAK': return 'The timer will continue running while you are on break.';
      case 'END_BREAK': return 'Resume your duty cycle.';
      case 'CLOCK_OUT': return 'This will finalize your hours for the current shift.';
      case 'LOGOUT': return 'You will be logged out of the secure terminal.';
      default: return '';
    }
  };

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime = (date: Date, timeZone: string = 'UTC') => {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: timeZone,
    }).format(date);
  };

  const getMonthHistory = (): HistoryEntry[] => {
    const today = new Date();
    const history: HistoryEntry[] = [];
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    
    for (let d = new Date(today); d >= firstDay; d.setDate(d.getDate() - 1)) {
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      if (!isWeekend || Math.random() > 0.5) {
        history.push({
          date: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          timeframe: '08:00 - 17:00',
          netHours: '8.5 hrs',
          status: 'Approved'
        });
      }
    }
    return history;
  };

  const monthHistory = getMonthHistory();
  const displayHistory = currentSubView === 'DASHBOARD' ? monthHistory.slice(0, 4) : monthHistory;

  const weeklySchedule = [
    { day: 'Monday', date: '04 May', shift: '08:00 - 17:00', role: 'Primary Dispatcher', status: 'CONFIRMED' },
    { day: 'Tuesday', date: '05 May', shift: '08:00 - 17:00', role: 'Primary Dispatcher', status: 'CONFIRMED' },
    { day: 'Wednesday', date: '06 May', shift: 'OFF DUTY', role: '-', status: 'REST' },
    { day: 'Thursday', date: '07 May', shift: '22:00 - 06:00', role: 'Night Supervisor', status: 'UPCOMING' },
    { day: 'Friday', date: '08 May', shift: '22:00 - 06:00', role: 'Night Supervisor', status: 'UPCOMING' },
    { day: 'Saturday', date: '09 May', shift: '14:00 - 22:00', role: 'Support Relief', status: 'UPCOMING' },
    { day: 'Sunday', date: '10 May', shift: 'OFF DUTY', role: '-', status: 'REST' },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* Header */}
      <header className="bg-white border-b-2 border-border-grey/20 h-16 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <h1 className="text-brand-black font-black text-xl tracking-widest italic uppercase">CALLWAVE DISPATCH</h1>
        </div>
        <div className="flex items-center gap-4 relative">
          <span className="text-xs font-bold uppercase tracking-widest hidden sm:block text-brand-black/60">Operator 042</span>
          <button 
            onClick={() => setShowProfileTray(!showProfileTray)}
            className="flex items-center gap-2 group p-1 rounded-full hover:bg-black/5 transition-all"
          >
            <div className="w-10 h-10 border border-brand-yellow/30 rounded-full overflow-hidden group-hover:border-brand-yellow transition-all">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHGlXqVPIJu34Wmz9riO1ncz1KrHDqUAjgldXUHzShOZnlj_fe4tsoP-1zS44PsSDOdGS7siTPAgJqW5Kzbp9k-olW4Dv4TDVOCnIGO6SVYbqS4V4mizPtEyAKuI--zEx0dCsqztIVT8uNPTkc0HU2g9gSL5jXtib8pf2eZnl77WLGRqIEWZ6I9iPeb2ANQ1sk56sXHHTDnSYmdufPZ9qgOxiomcU01i0P4Qe70rVcs4u0tsQ1NHhGdetwHZvEHcVCalKGUVfS-5o" 
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <ChevronDown className={`w-4 h-4 text-brand-black/40 transition-transform ${showProfileTray ? 'rotate-180' : ''}`} />
          </button>

          {showProfileTray && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute top-full right-0 mt-2 w-56 bg-white border border-brand-black/10 rounded-xl shadow-2xl overflow-hidden py-2 z-50"
            >
              <div className="px-4 py-3 border-b border-brand-black/5 mb-2">
                <p className="text-[10px] font-black text-brand-black/40 uppercase tracking-widest">Active Operator</p>
                <p className="text-sm font-black text-brand-black uppercase">Ali Raza (042)</p>
              </div>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-full px-4 py-3 flex items-center gap-3 text-brand-black/60 hover:bg-black/5 transition-colors"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span className="text-xs font-black uppercase tracking-widest">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <button 
                onClick={() => {
                  setConfirmAction('LOGOUT');
                  setShowProfileTray(false);
                }}
                className="w-full px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-widest">Terminate Session</span>
              </button>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-6 space-y-8">
        {currentSubView === 'DASHBOARD' && (
          <>
            {/* Clocks Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="glass-card p-8 flex flex-col items-center justify-center text-center rounded-2xl border border-brand-black/10">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-brand-black/40 mb-2">{clockSettings.clock1Label}</span>
                <span className="text-brand-yellow font-black text-6xl tracking-tight tabular-nums">
                  {formatTime(localTime, clockSettings.clock1Zone)}
                </span>
              </div>
              <div className="glass-card p-8 flex flex-col items-center justify-center text-center rounded-2xl border border-brand-black/10">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-brand-black/40 mb-2">{clockSettings.clock2Label}</span>
                <span className="text-brand-black font-black text-6xl tracking-tight tabular-nums">
                  {formatTime(localTime, clockSettings.clock2Zone)}
                </span>
              </div>
              <div className="md:col-span-2 text-center text-2xl font-black tracking-tight text-brand-black uppercase mt-4">
                {new Intl.DateTimeFormat('en-GB', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric',
                  timeZone: clockSettings.clock1Zone
                }).format(localTime)}
              </div>
            </div>

            {/* Operator Network Status */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
              <div className="glass-card p-6 flex flex-col items-center justify-center text-center rounded-2xl border border-green-500/20 bg-green-50/50 shadow-sm transition-all hover:bg-green-50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-green-700/60">Operators Online</span>
                </div>
                <span className="text-green-600 font-black text-5xl tracking-tighter tabular-nums">04</span>
                <p className="text-[9px] font-bold text-green-600/40 uppercase mt-1 tracking-widest italic">Live in network</p>
              </div>
              <div className="glass-card p-6 flex flex-col items-center justify-center text-center rounded-2xl border border-red-500/20 bg-red-50/50 shadow-sm transition-all hover:bg-red-50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-red-700/60">Next Sequence</span>
                </div>
                <span className="text-red-600 font-black text-5xl tracking-tighter tabular-nums">02</span>
                <p className="text-[9px] font-bold text-red-600/40 uppercase mt-1 tracking-widest italic">Shift Handover pending</p>
              </div>
            </div>

            {/* Status Area */}
            <motion.section 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-10 relative overflow-hidden group rounded-2xl border border-brand-black/10 shadow-lg"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-yellow" />
              <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="space-y-6 text-center md:text-left flex flex-col items-start md:items-start">
                  <span className={`text-black text-[11px] font-black px-4 py-1.5 rounded uppercase tracking-widest ${
                    shiftStatus === 'ON_DUTY' ? 'bg-brand-yellow' : 
                    shiftStatus === 'ON_BREAK' ? 'bg-orange-500' : 'bg-gray-500'
                  }`}>
                    CURRENT STATUS: {shiftStatus.replace('_', ' ')}
                  </span>
                  <div className="space-y-0 text-left">
                    <p className="text-xs font-black text-brand-black/40 uppercase tracking-widest mb-1">SHIFT DURATION</p>
                    <p className="text-7xl font-black text-brand-black tracking-tighter tabular-nums">
                      {formatDuration(shiftDuration)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  {shiftStatus === 'OFF_DUTY' ? (
                    <button 
                      onClick={() => setConfirmAction('START_SHIFT')}
                      className="flex-1 sm:w-56 py-5 bg-brand-yellow text-black font-black text-[13px] uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-95"
                    >
                      START SHIFT
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => setConfirmAction(shiftStatus === 'ON_BREAK' ? 'END_BREAK' : 'START_BREAK')}
                        className="flex-1 sm:w-56 py-5 border-2 border-brand-black/10 font-black text-[13px] uppercase tracking-widest hover:bg-black/5 transition-all active:scale-95 text-brand-black"
                      >
                        {shiftStatus === 'ON_BREAK' ? 'END BREAK' : 'START BREAK'}
                      </button>
                      <button 
                        onClick={() => setConfirmAction('CLOCK_OUT')}
                        className="flex-1 sm:w-56 py-5 bg-brand-yellow text-black font-black text-[13px] uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-95"
                      >
                        CLOCK OUT
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.section>
          </>
        )}

        {currentSubView === 'SCHEDULE' && (
          <section className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-brand-black font-black text-2xl uppercase tracking-tighter italic">Weekly Roaster - Week 19</h2>
              <div className="px-4 py-1 bg-brand-black text-brand-yellow text-[10px] font-black uppercase tracking-widest italic">
                Active Cycle
              </div>
            </div>
            
            <div className="glass-card shadow-xl border border-brand-black/10 overflow-hidden rounded-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 p-5 border-b border-brand-black/5 bg-black/5 text-[11px] font-black text-brand-black/40 uppercase tracking-widest">
                <div>DAY / DATE</div>
                <div className="hidden md:block">ROLE</div>
                <div>SHIFT TIME</div>
                <div className="text-right">STATUS</div>
              </div>
              <div className="divide-y divide-brand-black/5">
                {weeklySchedule.map((item, idx) => (
                  <div 
                    key={idx}
                    className={`grid grid-cols-2 md:grid-cols-4 p-6 items-center hover:bg-black/5 transition-all group ${
                      item.status === 'REST' ? 'opacity-40 grayscale' : ''
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-widest mb-1">{item.day}</span>
                      <span className="text-lg font-black text-brand-black uppercase tabular-nums">{item.date}</span>
                    </div>
                    <div className="hidden md:block text-xs font-black text-brand-black/40 uppercase tracking-wider italic">
                      {item.role}
                    </div>
                    <div className="text-sm font-black text-brand-black/80 tabular-nums">
                      {item.shift}
                    </div>
                    <div className="flex justify-end">
                      <span className={`text-[9px] font-black px-3 py-1 rounded-sm tracking-widest shadow-lg ${
                        item.status === 'CONFIRMED' ? 'bg-green-500 text-black' :
                        item.status === 'UPCOMING' ? 'bg-blue-500 text-white' :
                        'bg-black/5 text-brand-black/20 border border-brand-black/10'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Shift History Table */}
        {currentSubView !== 'SCHEDULE' && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-brand-black font-black text-2xl uppercase tracking-tighter">
                {currentSubView === 'DASHBOARD' ? 'Shift History - Last 7 Days' : `Shift History - ${localTime.toLocaleString('en-GB', { month: 'long' })}`}
              </h2>
              <Filter className="text-brand-black/40 cursor-pointer hover:text-brand-black" />
            </div>
            
            <div className="glass-card shadow-xl border border-brand-black/10 overflow-hidden rounded-2xl">
              {/* Table Header */}
              <div className="grid grid-cols-3 md:grid-cols-4 p-5 border-b border-brand-black/5 bg-black/5 text-[11px] font-black text-brand-black/40 uppercase tracking-widest">
                <div>DATE</div>
                <div>TIMEFRAME</div>
                <div className="text-right">NET HOURS</div>
                <div className="hidden md:block text-right">STATUS</div>
              </div>
              {/* Table Rows */}
              <div className="divide-y divide-brand-black/5">
                {displayHistory.map((item, idx) => (
                  <div 
                    key={idx}
                    className="grid grid-cols-3 md:grid-cols-4 p-5 items-center hover:bg-black/5 transition-colors cursor-pointer group"
                  >
                    <div className="text-[15px] font-bold text-brand-black uppercase">{item.date}</div>
                    <div className="text-[15px] text-brand-black/80 font-medium">{item.timeframe}</div>
                    <div className="text-right text-brand-yellow font-black text-2xl tabular-nums">{item.netHours}</div>
                    <div className="hidden md:flex justify-end">
                      <span className="text-[10px] font-black text-brand-black px-3 py-1.5 border border-green-500/20 bg-green-500/10 uppercase tracking-widest rounded-sm">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-t border-brand-black/10 flex items-center justify-around px-2 z-50">
        <button 
          onClick={() => setCurrentSubView('DASHBOARD')}
          className={`flex flex-col items-center gap-1.5 p-2 px-10 rounded-md transition-all ${
            currentSubView === 'DASHBOARD' ? 'text-brand-black bg-brand-yellow' : 'text-brand-black/40 hover:text-brand-black'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">Dashboard</span>
        </button>
        <button 
          onClick={() => setCurrentSubView('SCHEDULE')}
          className={`flex flex-col items-center gap-1.5 p-2 px-10 rounded-md transition-all ${
            currentSubView === 'SCHEDULE' ? 'text-brand-black bg-brand-yellow' : 'text-brand-black/40 hover:text-brand-black'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">Schedule</span>
        </button>
        <button 
          onClick={() => setCurrentSubView('HISTORY')}
          className={`flex flex-col items-center gap-1.5 p-2 px-10 rounded-md transition-all ${
            currentSubView === 'HISTORY' ? 'text-brand-black bg-brand-yellow' : 'text-brand-black/40 hover:text-brand-black'
          }`}
        >
          <HistoryIcon className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">History</span>
        </button>
      </nav>

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 pb-32">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setConfirmAction(null)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-card w-full max-w-md p-8 relative z-10 rounded-2xl border border-brand-black/10 bg-white shadow-2xl"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-brand-yellow tracking-tighter uppercase italic">{getModalTitle()}</h3>
                <p className="text-brand-black/60 text-sm leading-relaxed uppercase tracking-wider font-bold">{getModalDescription()}</p>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setConfirmAction(null)}
                  className="flex-1 py-4 border-2 border-brand-black/10 text-brand-black font-black text-xs uppercase tracking-widest hover:bg-black/5 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleActionConfirm}
                  className="flex-1 py-4 bg-brand-yellow text-black font-black text-xs uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-95"
                >
                  Confirm
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
