import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  History, 
  Settings, 
  Plus, 
  Search, 
  Bell, 
  Grid, 
  ChevronRight, 
  Edit2, 
  ShieldCheck, 
  TrendingUp, 
  LogOut, 
  HelpCircle,
  Clock,
  X,
  Trash2,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react';
import { Operator, ShiftEntry, ClockSettings } from './types';

interface AdminProps {
  onLogout: () => void;
}

export default function Admin({ onLogout }: AdminProps) {
  const [currentView, setCurrentView] = useState<'DASHBOARD' | 'ROTTA' | 'OPERATORS' | 'LOGS' | 'SETTINGS'>('DASHBOARD');
  const [timetable, setTimetable] = useState([
    { day: 'Mon', shifts: [
      { id: 1, uk: '5am to 1pm', pk: '9am to 5pm', op: 'Seemab', hrs: '8' },
      { id: 2, uk: '12pm to 1am', pk: '4pm to 5am', op: 'Kabeer', hrs: '13' },
      { id: 3, uk: '12pm to 1am', pk: '4pm to 5am', op: 'Ali', hrs: '13' }
    ]},
    { day: 'Tue', shifts: [
      { id: 1, uk: '5am to 1pm', pk: '9am to 5pm', op: 'Seemab', hrs: '8' },
      { id: 2, uk: '12pm to 1am', pk: '4pm to 5am', op: 'Kabeer', hrs: '13' },
      { id: 3, uk: '12pm to 1am', pk: '4pm to 5am', op: 'Ali', hrs: '13' }
    ]},
    { day: 'Wed', shifts: [
      { id: 1, uk: '5am to 1pm', pk: '9am to 5pm', op: 'Seemab', hrs: '8' },
      { id: 2, uk: '12pm to 1am', pk: '4pm to 5am', op: 'Taymoor', hrs: '13' },
      { id: 3, uk: '12pm to 1am', pk: '4pm to 5am', op: 'Usama', hrs: '13' }
    ]},
    { day: 'Thu', shifts: [
      { id: 1, uk: '5am to 1pm', pk: '9am to 5pm', op: 'Seemab', hrs: '8' },
      { id: 2, uk: '12pm to 1am', pk: '4pm to 5am', op: 'Usama', hrs: '13' },
      { id: 3, uk: '12pm to 1am', pk: '4pm to 5am', op: 'Taymoor', hrs: '13' }
    ]},
    { day: 'Fri', shifts: [
      { id: 1, uk: '5am to 4pm', pk: '9am to 8pm', op: 'Ali', hrs: '11' },
      { id: 2, uk: '12pm to 8pm', pk: '4pm to 12pm', op: 'Usama', hrs: '8' },
      { id: 3, uk: '8pm to 4am', pk: '12pm to 8am', op: 'Kabeer', hrs: '8' },
      { id: 4, uk: '4pm to 4am', pk: '8pm to 8am', op: 'Taymoor', hrs: '12' }
    ]},
    { day: 'Sat', shifts: [
      { id: 1, uk: '5am to 4pm', pk: '9am to 8pm', op: 'Ali', hrs: '11' },
      { id: 2, uk: '5am to 4pm', pk: '9am to 8pm', op: 'Usama', hrs: '11' },
      { id: 3, uk: '4pm to 4am', pk: '8pm to 8am', op: 'Kabeer', hrs: '12' },
      { id: 4, uk: '4pm to 4am', pk: '8pm to 8am', op: 'Taymoor', hrs: '12' }
    ]},
    { day: 'Sun', shifts: [
      { id: 1, uk: '5am to 1pm', pk: '9am to 5pm', op: 'Ali', hrs: '8' },
      { id: 2, uk: '1pm to 1am', pk: '5pm to 5am', op: 'Kabeer', hrs: '12' },
      { id: 3, uk: '1pm to 1am', pk: '5pm to 5am', op: 'Taymoor', hrs: '12' }
    ]}
  ]);

  const [pendingChange, setPendingChange] = useState<{
    dayIdx: number, 
    shiftIdx: number, 
    field: 'op' | 'hrs', 
    value: string 
  } | null>(null);

  const handleUpdateClick = (dayIdx: number, shiftIdx: number, field: 'op' | 'hrs', value: string) => {
    setPendingChange({ dayIdx, shiftIdx, field, value });
  };

  const confirmTimetableUpdate = () => {
    if (!pendingChange) return;
    const { dayIdx, shiftIdx, field, value } = pendingChange;
    
    const newTimetable = [...timetable];
    newTimetable[dayIdx].shifts[shiftIdx][field] = value;
    setTimetable(newTimetable);
    setPendingChange(null);
  };
  const [operators, setOperators] = useState<Operator[]>([
    { id: 'OP-9921', name: 'Seemab Khan', email: 's.khan@callwave.com', phone: '+1 (555) 123-9921', status: 'OFF DUTY' },
    { id: 'OP-7732', name: 'Kabeer Ahmed', email: 'k.ahmed@callwave.com', phone: '+1 (555) 123-7732', status: 'OFF DUTY' },
    { id: 'OP-5543', name: 'Ali Raza', email: 'a.raza@callwave.com', phone: '+1 (555) 123-5543', status: 'ON DUTY' },
    { id: 'OP-3321', name: 'Taymoor', email: 't.malik@callwave.com', phone: '+1 (555) 123-3321', status: 'OFF DUTY' },
    { id: 'OP-2210', name: 'Usama', email: 'u.shah@callwave.com', phone: '+1 (555) 123-2210', status: 'OFF DUTY' },
  ]);

  const shifts: ShiftEntry[] = [
    { id: '1', operatorId: 'OP-5543', operatorName: 'Ali Raza', date: '2023-10-24', clockIn: '08:00 AM', clockOut: '04:30 PM', breakTotal: '00:45', netHours: '07.75' },
    { id: '2', operatorId: 'OP-7732', operatorName: 'Kabeer Ahmed', date: '2023-10-24', clockIn: '10:15 AM', clockOut: 'ACTIVE', breakTotal: '00:15', netHours: '--' },
    { id: '3', operatorId: 'OP-9921', operatorName: 'Seemab Khan', date: '2023-10-24', clockIn: '06:00 AM', clockOut: '02:00 PM', breakTotal: '00:30', netHours: '07.50' },
  ];

  const [selectedOpSummary, setSelectedOpSummary] = useState<string>(operators[0]?.name || '');
  const [selectedLogOperator, setSelectedLogOperator] = useState<string>(operators[0]?.name || '');
  const [showNewOperatorModal, setShowNewOperatorModal] = useState(false);
  const [editingOperator, setEditingOperator] = useState<Operator | null>(null);
  const [operatorToDelete, setOperatorToDelete] = useState<Operator | null>(null);
  const [showProfileTray, setShowProfileTray] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'LOGOUT' | null>(null);
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

  const timeZones = Intl.supportedValuesOf('timeZone');
  const [clock1Search, setClock1Search] = useState('');
  const [clock2Search, setClock2Search] = useState('');

  const filteredZones1 = timeZones.filter(tz => 
    tz.toLowerCase().includes(clock1Search.toLowerCase())
  );

  const filteredZones2 = timeZones.filter(tz => 
    tz.toLowerCase().includes(clock2Search.toLowerCase())
  );

  const updateClockSettings = (newSettings: Partial<ClockSettings>) => {
    const updated = { ...clockSettings, ...newSettings };
    setClockSettings(updated);
    localStorage.setItem('cw_clock_settings', JSON.stringify(updated));
    // Dispatch custom event to notify other tabs/components
    window.dispatchEvent(new Event('clockSettingsUpdated'));
  };

  const getOperatorDetails = (name: string) => {
    const plannedShifts: { day: string; uk: string; pk: string; hrs: string }[] = [];
    timetable.forEach(day => {
      day.shifts.forEach(shift => {
        if (shift.op === name) {
          plannedShifts.push({ day: day.day, uk: shift.uk, pk: shift.pk, hrs: shift.hrs });
        }
      });
    });

    const pastShifts = shifts.filter(s => s.operatorName === name);
    const totalPlannedHours = plannedShifts.reduce((acc, curr) => acc + (parseFloat(curr.hrs) || 0), 0);
    const totalPastHours = pastShifts.reduce((acc, curr) => acc + (parseFloat(curr.netHours) || 0), 0);

    return { plannedShifts, pastShifts, totalPlannedHours, totalPastHours };
  };
  const [newOperatorData, setNewOperatorData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const getOperatorAssignedShifts = (name: string) => {
    const assigned: string[] = [];
    timetable.forEach(day => {
      day.shifts.forEach(shift => {
        // Match against name (supporting both full names and partial matches for the initial demo data)
        if (name.includes(shift.op) || shift.op.includes(name)) {
          assigned.push(`${day.day}`);
        }
      });
    });
    // Return unique days
    return [...new Set(assigned)];
  };

  const handleAddOperator = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOperator) {
      setOperators(operators.map(op => 
        op.id === editingOperator.id 
          ? { 
              ...op, 
              name: `${newOperatorData.firstName} ${newOperatorData.lastName}`,
              email: newOperatorData.email,
              phone: newOperatorData.phone
            } 
          : op
      ));
    } else {
      const newOp: Operator = {
        id: `OP-${Math.floor(1000 + Math.random() * 9000)}`,
        name: `${newOperatorData.firstName} ${newOperatorData.lastName}`,
        email: newOperatorData.email,
        phone: newOperatorData.phone,
        status: 'OFF DUTY'
      };
      setOperators([...operators, newOp]);
    }
    setShowNewOperatorModal(false);
    setEditingOperator(null);
    setNewOperatorData({ firstName: '', lastName: '', email: '', phone: '' });
  };

  const handleEditClick = (op: Operator) => {
    const [firstName, ...lastNameParts] = op.name.split(' ');
    setEditingOperator(op);
    setNewOperatorData({
      firstName,
      lastName: lastNameParts.join(' '),
      email: op.email,
      phone: op.phone
    });
    setShowNewOperatorModal(true);
  };

  const confirmDeleteOperator = () => {
    if (operatorToDelete) {
      setOperators(operators.filter(op => op.id !== operatorToDelete.id));
      setOperatorToDelete(null);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border-grey/10 bg-white flex flex-col fixed inset-y-0 z-50">
        <div className="px-6 py-8">
          <h1 className="text-brand-black font-black text-2xl tracking-tighter">CALLWAVE HQ</h1>
          <p className="text-[10px] text-brand-black/40 font-bold tracking-[0.2em] uppercase mt-1">Operational Control</p>
        </div>

        <nav className="flex-1 mt-4">
          <div 
            onClick={() => setCurrentView('DASHBOARD')}
            className={`px-6 py-4 flex items-center gap-3 transition-all cursor-pointer font-bold uppercase tracking-tight text-[11px] ${
              currentView === 'DASHBOARD' ? 'text-brand-yellow bg-black/5 border-l-4 border-brand-yellow' : 'text-brand-black/60 hover:text-brand-black hover:bg-black/5'
            }`}
          >
            <Users className="w-5 h-5" />
            Operator Management
          </div>
          <div 
            onClick={() => setCurrentView('ROTTA')}
            className={`px-6 py-4 flex items-center gap-3 transition-all cursor-pointer font-bold uppercase tracking-tight text-[11px] ${
              currentView === 'ROTTA' ? 'text-brand-yellow bg-black/5 border-l-4 border-brand-yellow' : 'text-brand-black/60 hover:text-brand-black hover:bg-black/5'
            }`}
          >
            <Grid className="w-5 h-5" />
            Rotta
          </div>
          <div 
            onClick={() => setCurrentView('OPERATORS')}
            className={`px-6 py-4 flex items-center gap-3 transition-all cursor-pointer font-bold uppercase tracking-tight text-[11px] ${
              currentView === 'OPERATORS' ? 'text-brand-yellow bg-black/5 border-l-4 border-brand-yellow' : 'text-brand-black/60 hover:text-brand-black hover:bg-black/5'
            }`}
          >
            <Users className="w-5 h-5" />
            Operators List
          </div>
          <div 
            onClick={() => setCurrentView('LOGS')}
            className={`px-6 py-4 flex items-center gap-3 transition-all cursor-pointer font-bold uppercase tracking-tight text-[11px] ${
              currentView === 'LOGS' ? 'text-brand-yellow bg-black/5 border-l-4 border-brand-yellow' : 'text-brand-black/60 hover:text-brand-black hover:bg-black/5'
            }`}
          >
            <History className="w-5 h-5" />
            Shift Logs
          </div>
          <div 
            onClick={() => setCurrentView('SETTINGS')}
            className={`px-6 py-4 flex items-center gap-3 transition-all cursor-pointer font-bold uppercase tracking-tight text-[11px] ${
              currentView === 'SETTINGS' ? 'text-brand-yellow bg-black/5 border-l-4 border-brand-yellow' : 'text-brand-black/60 hover:text-brand-black hover:bg-black/5'
            }`}
          >
            <Settings className="w-5 h-5" />
            System Settings
          </div>
        </nav>

        <div className="px-6 py-6 border-t border-border-grey/10">
          <button 
            onClick={() => setShowNewOperatorModal(true)}
            className="w-full bg-brand-yellow text-black font-black uppercase tracking-widest py-3.5 flex items-center justify-center gap-2 hover:scale-[0.98] transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] text-xs"
          >
            <Plus className="w-4 h-4" />
            New Operator
          </button>
        </div>

        <div className="mt-auto border-t border-border-grey/10">
          <div className="px-6 py-4 flex items-center gap-3 text-brand-black/60 hover:text-brand-black transition-all cursor-pointer font-bold uppercase tracking-tight text-[10px] hover:bg-black/5 uppercase">
            <HelpCircle className="w-4 h-4" />
            Support
          </div>
          <div 
            onClick={() => setConfirmAction('LOGOUT')}
            className="px-6 py-4 flex items-center gap-3 text-brand-black/60 hover:text-brand-black transition-all cursor-pointer font-bold uppercase tracking-tight text-[10px] mb-4 hover:bg-black/5 uppercase"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 min-h-screen">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-border-grey/10 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-0 text-[10px] font-black uppercase tracking-widest text-brand-black/40">
            <span>Admin</span>
            <ChevronRight className="w-3.5 h-3.5 mx-1" />
            <span className="text-brand-yellow">
              {currentView === 'DASHBOARD' && 'Operator Management'}
              {currentView === 'ROTTA' && 'Operational Rotta'}
              {currentView === 'OPERATORS' && 'Operators Directory'}
              {currentView === 'LOGS' && 'Shift Logs'}
              {currentView === 'SETTINGS' && 'System Settings'}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="w-4 h-4 text-brand-black/30 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search operations..."
                className="bg-black/5 border border-border-grey/10 p-2 pl-10 text-xs text-brand-black focus:border-brand-yellow outline-none w-64 rounded-none h-10"
              />
            </div>
            <div className="flex items-center gap-4 border-l border-border-grey/10 pl-6 relative">
              <Bell className="w-5 h-5 text-brand-black/60 cursor-pointer hover:text-brand-yellow" />
              <Grid className="w-5 h-5 text-brand-black/60 cursor-pointer hover:text-brand-yellow" />
              <button 
                onClick={() => setShowProfileTray(!showProfileTray)}
                className="flex items-center gap-2 group p-0.5 rounded-full hover:bg-black/5 transition-all"
              >
                <div className="w-8 h-8 rounded-full border border-brand-yellow overflow-hidden group-hover:border-brand-yellow transition-all">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHPbRWcX4_2jhTCQPaB4wJqmYL2AA5yj6egD8X0LRjBedYB4AP5rpvpYgtXcGlFfSMHr29XQxjASMyCcBpLZzui1as-qBL7lPayhOemB2sjQMrbu0GIh7eDWEvDqpqUGUXqRgB5SkwUlnY0kc9Tmw1-rLCqc-v8UogG8Rdn8xJdKtSMi4bICL9USK3Ak91tHf0U-I4E5GaTE0owrJIYS-49-dy24nBV9cklzU3AZrVd2ZqLpj5cDnELy168NmN2CyuCMosjGIBfh8" 
                    alt="Admin"
                    className="w-full h-full object-cover"
                  />
                </div>
                <ChevronDown className={`w-3 h-3 text-brand-black/40 transition-transform ${showProfileTray ? 'rotate-180' : ''}`} />
              </button>

              {showProfileTray && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute top-full right-0 mt-2 w-56 bg-white border border-brand-black/10 rounded-xl shadow-2xl overflow-hidden py-2 z-50 text-left"
                >
                  <div className="px-4 py-3 border-b border-brand-black/5 mb-2">
                    <p className="text-[10px] font-black text-brand-black/40 uppercase tracking-widest">System Administrator</p>
                    <p className="text-sm font-black text-brand-black uppercase">CW Admin HQ</p>
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
                    <span className="text-xs font-black uppercase tracking-widest">Log Out System</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 space-y-10">
          {currentView === 'DASHBOARD' && (
            <>
              {/* Operator Overview */}
              <section className="space-y-6">
                <div className="flex justify-between items-end">
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-brand-black">Operator Overview</h2>
                  <span className="text-[10px] font-black text-brand-black/40 uppercase tracking-widest">
                    {operators.filter(op => op.status === 'ON DUTY').length} active out of {operators.length} total
                  </span>
                </div>
                
                {/* Operator Summary Section */}
                <div className="glass-card p-8 rounded-2xl border border-brand-black/10 bg-white">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight text-brand-black">Operator Performance Deep-Dive</h3>
                      <p className="text-[10px] text-brand-black/40 font-bold uppercase tracking-widest mt-1">Individual Schedule & Impact Analysis</p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-black/40">Select Individual:</label>
                      <select 
                        value={selectedOpSummary}
                        onChange={(e) => setSelectedOpSummary(e.target.value)}
                        className="bg-black/5 border border-brand-black/10 px-4 py-2.5 text-xs font-black uppercase text-brand-black outline-none focus:border-brand-yellow rounded-lg min-w-[200px]"
                      >
                        {operators.map(op => <option key={op.id} value={op.name}>{op.name}</option>)}
                      </select>
                    </div>
                  </div>

                  {(() => {
                    const details = getOperatorDetails(selectedOpSummary);
                    return (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Stats Panel */}
                        <div className="lg:col-span-4 space-y-6">
                          <div className="p-6 bg-brand-black rounded-xl text-center relative overflow-hidden group">
                            <Clock className="absolute -left-4 -top-4 w-24 h-24 text-brand-yellow/5 group-hover:scale-110 transition-transform" />
                            <p className="text-[10px] font-black text-brand-yellow/40 uppercase tracking-widest mb-2 relative z-10">Total Period Commitment</p>
                            <h4 className="text-5xl font-black text-brand-yellow tabular-nums relative z-10">
                              {(details.totalPlannedHours + details.totalPastHours).toFixed(1)}
                            </h4>
                            <p className="text-[10px] font-bold text-chalk/20 uppercase tracking-tighter mt-1 relative z-10">Accumulated Hours</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-black/5 border border-brand-black/10 rounded-xl">
                              <p className="text-[9px] font-black text-brand-black/40 uppercase mb-1">Planned</p>
                              <p className="text-xl font-black text-brand-black">{details.totalPlannedHours.toFixed(1)}h</p>
                            </div>
                            <div className="p-4 bg-black/5 border border-brand-black/10 rounded-xl">
                              <p className="text-[9px] font-black text-brand-black/40 uppercase mb-1">Logged</p>
                              <p className="text-xl font-black text-brand-black">{details.totalPastHours.toFixed(1)}h</p>
                            </div>
                          </div>

                          <div className="p-6 border-2 border-dashed border-brand-black/5 rounded-xl">
                            <p className="text-[10px] font-black text-brand-black/40 uppercase tracking-widest mb-4">Availability Profile</p>
                            <div className="space-y-3">
                              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => {
                                const isWorking = details.plannedShifts.some(s => s.day === day);
                                return (
                                  <div key={day} className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-brand-black/60">{day}</span>
                                    <div className={`w-8 h-1.5 rounded-full ${isWorking ? 'bg-brand-yellow shadow-[0_0_8px_rgba(251,185,26,0.3)]' : 'bg-black/5'}`} />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* List Panel */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                          <div className="flex-1 space-y-4">
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-black/40 border-b border-brand-black/10 pb-2">Upcoming Shift Roster</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {details.plannedShifts.length > 0 ? details.plannedShifts.map((shift, idx) => (
                                <div key={idx} className="p-4 bg-black/5 border-l-4 border-brand-yellow rounded-r-lg group hover:bg-black/10 transition-colors">
                                  <div className="flex justify-between items-start mb-2">
                                    <span className="text-[11px] font-black text-brand-black tracking-tighter">{shift.day} SESSION</span>
                                    <span className="text-[10px] font-black bg-brand-yellow text-brand-black px-2 py-0.5 rounded italic">{shift.hrs}h</span>
                                  </div>
                                  <div className="flex gap-4">
                                    <div className="flex flex-col">
                                      <span className="text-[9px] font-black text-brand-black/30 uppercase">UK Time</span>
                                      <span className="text-xs font-bold text-brand-black/60">{shift.uk}</span>
                                    </div>
                                    <div className="flex flex-col border-l border-brand-black/10 pl-4">
                                      <span className="text-[9px] font-black text-brand-black/30 uppercase">PK Time</span>
                                      <span className="text-xs font-bold text-brand-black/60">{shift.pk}</span>
                                    </div>
                                  </div>
                                </div>
                              )) : (
                                <div className="col-span-2 py-8 text-center text-brand-black/20 font-black uppercase text-xs border-2 border-dashed border-brand-black/5 rounded-xl">
                                  No upcoming shifts scheduled
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-black/40 border-b border-brand-black/10 pb-2">Recent Logged Sessions</h5>
                            <div className="overflow-hidden border border-brand-black/10 rounded-lg">
                              <table className="w-full text-left">
                                <thead className="bg-black/5 text-[9px] font-black text-brand-black/40 uppercase tracking-widest">
                                  <tr>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Session</th>
                                    <th className="px-4 py-3 text-right">Net</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-black/5">
                                  {details.pastShifts.length > 0 ? details.pastShifts.map((log, idx) => (
                                    <tr key={idx} className="text-[11px] font-bold text-brand-black/60">
                                      <td className="px-4 py-3">{log.date}</td>
                                      <td className="px-4 py-3 italic">{log.clockIn} - {log.clockOut}</td>
                                      <td className="px-4 py-3 text-right text-brand-black font-black">{log.netHours}h</td>
                                    </tr>
                                  )) : (
                                    <tr>
                                      <td colSpan={3} className="px-4 py-6 text-center text-brand-black/20 italic">No historical data found</td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {operators.map((op) => (
                    <div key={op.id} className="glass-card p-5 relative group hover:border-brand-yellow transition-colors rounded-2xl">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-yellow" />
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-black/5 border border-brand-black/10 flex items-center justify-center">
                            <Users className="w-6 h-6 text-brand-black/40" />
                          </div>
                          <div>
                            <p className="font-bold text-brand-black uppercase text-sm tracking-tight leading-tight">{op.name}</p>
                            <p className="text-[10px] text-brand-black/40 font-bold uppercase tracking-widest">ID: {op.id}</p>
                          </div>
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 border ${
                          op.status === 'ON DUTY' ? 'text-green-400 border-green-900 bg-green-950/20' : 'text-red-400 border-red-900 bg-red-950/20'
                        }`}>
                          {op.status === 'ON DUTY' ? 'On Duty' : 'Off Duty'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 text-[9px] font-black uppercase tracking-widest border border-brand-black/10 text-brand-black hover:bg-brand-black hover:text-white transition-all">Edit Profile</button>
                        <button className="flex-1 py-2 text-[9px] font-black uppercase tracking-widest border border-brand-black/10 text-brand-black hover:bg-brand-black hover:text-white transition-all">View Logs</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Workload Summary */}
              <section className="space-y-6">
                <div className="flex justify-between items-end">
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-brand-black">Workload & Hours Reporting</h2>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                    <span className="text-[10px] font-black text-brand-black/40 uppercase tracking-widest">Real-time performance sync</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Aggregate Card */}
                  <div className="lg:col-span-1 glass-card p-8 rounded-2xl relative overflow-hidden bg-white flex flex-col justify-center border border-brand-black/10">
                    <div className="absolute top-0 right-0 p-4">
                      <TrendingUp className="w-8 h-8 text-brand-black/20" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-black/40 mb-2">Total Combined Hours</p>
                    <h3 className="text-6xl font-black text-brand-yellow tracking-tighter tabular-nums leading-none">
                      184.5
                    </h3>
                    <p className="text-[11px] font-bold text-brand-black/60 uppercase tracking-widest mt-4 flex items-center gap-2">
                      <span className="text-green-600">+12%</span> vs last week
                    </p>
                  </div>

                  {/* Individual Breakdown Table */}
                  <div className="lg:col-span-3 glass-card rounded-2xl overflow-hidden shadow-2xl border border-brand-black/10">
                    <div className="p-5 border-b border-brand-black/10 bg-black/5 flex justify-between items-center">
                      <span className="text-xs font-black uppercase tracking-widest text-brand-black">Operator Period Totals</span>
                      <select className="bg-white border border-brand-black/10 text-[10px] font-black uppercase px-3 py-1.5 text-brand-black outline-none focus:border-brand-yellow">
                        <option>Current Week</option>
                        <option>Last 30 Days</option>
                        <option>Year to Date</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 p-6 gap-8">
                      {[
                        { name: 'Ali Raza', hours: '42.5', shifts: 5, color: 'brand-yellow' },
                        { name: 'Kabeer Ahmed', hours: '38.0', shifts: 4, color: 'brand-black' },
                        { name: 'Seemab Khan', hours: '35.2', shifts: 5, color: 'brand-black' },
                        { name: 'Taymoor', hours: '41.8', shifts: 5, color: 'brand-black' }
                      ].map((stat, i) => (
                        <div key={i} className="space-y-4">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-brand-black/40 mb-1">{stat.name}</p>
                            <div className="flex items-baseline gap-2">
                              <span className={`text-2xl font-black text-${stat.color}`}>{stat.hours}</span>
                              <span className="text-[10px] font-bold text-brand-black/20 uppercase tracking-tighter">HRS</span>
                            </div>
                          </div>
                          <div className="h-1 bg-black/5 w-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(parseFloat(stat.hours) / 45) * 100}%` }}
                              className={`h-full bg-${stat.color === 'brand-yellow' ? 'brand-yellow' : 'brand-black/40'}`}
                            />
                          </div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-brand-black/20">{stat.shifts} Logged Shifts</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Admin Bottom Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                {/* Manual Override Form */}
                <div className="lg:col-span-2 glass-card p-8 space-y-10 rounded-2xl shadow-2xl border border-brand-black/10">
                  <div className="flex items-center justify-between border-b border-brand-black/10 pb-4">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-6 h-6 text-brand-yellow" />
                      <h3 className="text-lg font-black uppercase tracking-widest text-brand-black">Manual Shift Override</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-black/40">Select Operator</label>
                      <div className="relative">
                        <select className="w-full bg-black/5 border border-brand-black/10 p-4 text-brand-black text-xs focus:border-brand-yellow outline-none appearance-none cursor-pointer">
                          <option>Select Operator...</option>
                          {operators.map(op => (
                            <option key={op.id} value={op.name}>{op.name}</option>
                          ))}
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 w-4 h-4 text-brand-black/40 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-black/40">Adjustment Reason</label>
                      <input className="w-full bg-black/5 border border-brand-black/10 p-4 text-brand-black text-xs focus:border-brand-yellow outline-none" placeholder="e.g., Forgotten clock-out" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-black/40">Adjusted Clock-In</label>
                      <div className="relative">
                        <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-black/40" />
                        <input type="time" className="w-full bg-black/5 border border-brand-black/10 p-4 text-brand-black text-xs focus:border-brand-yellow outline-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-black/40">Adjusted Clock-Out</label>
                       <div className="relative">
                        <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-black/40" />
                        <input type="time" className="w-full bg-black/5 border border-brand-black/10 p-4 text-brand-black text-xs focus:border-brand-yellow outline-none" />
                      </div>
                    </div>
                  </div>
                  <button className="bg-brand-black text-white font-black uppercase tracking-widest text-[11px] px-12 py-4 hover:bg-brand-yellow hover:text-black transition-colors shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
                    Apply Manual Adjustment
                  </button>
                </div>

                {/* Capacity Stats */}
                <div className="glass-card p-8 relative overflow-hidden group rounded-2xl shadow-2xl border border-brand-black/10">
                  <TrendingUp className="w-48 h-48 text-brand-yellow/5 absolute bottom-[-40px] right-[-40px] group-hover:scale-110 group-hover:text-brand-yellow/10 transition-all duration-700" />
                  <h3 className="text-lg font-black uppercase tracking-widest text-brand-black mb-10">Current Capacity</h3>
                  <div className="space-y-10 relative z-10">
                    <div className="space-y-3">
                      <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                        <span className="text-brand-black/40">Dispatcher Load</span>
                        <span className="text-brand-yellow">84%</span>
                      </div>
                      <div className="h-1.5 bg-black/5 w-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '84%' }}
                          className="h-full bg-brand-yellow shadow-[0_0_10px_rgba(251,185,26,0.3)]" 
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                        <span className="text-brand-black/40">System Uptime</span>
                        <span className="text-green-600">99.9%</span>
                      </div>
                      <div className="h-1.5 bg-black/5 w-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '99.9%' }}
                          className="h-full bg-green-500 shadow-[0_0_10px_rgba(74,222,128,0.3)]" 
                        />
                      </div>
                    </div>
                    
                    <div className="pt-8 border-t border-brand-black/10 mt-8 space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-black/40">Last Audit Log</p>
                      <p className="text-[11px] text-brand-black leading-relaxed font-medium">Admin ended OP-1290 shift manually at 02:45PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentView === 'ROTTA' && (
            <section className="glass-card flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-brand-black/10">
              <div className="p-8 border-b border-brand-black/10 bg-white flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-brand-yellow italic">CW-Aerobright Westside Rotta (PK Staff)</h2>
                    <p className="text-[10px] text-brand-black/40 font-black uppercase tracking-[0.3em] mt-1">Master Operational Timetable</p>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-6 py-3 bg-black/5 border border-brand-black/10 text-[10px] font-black uppercase tracking-widest hover:bg-black/10 transition-colors text-brand-black">Download PDF</button>
                    <button className="px-6 py-3 bg-brand-yellow text-black text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-yellow-400">
                      <Settings className="w-3.5 h-3.5" />
                      Edit Template
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black/5 text-[11px] font-black uppercase tracking-[0.2em] text-brand-black/60 border-b border-brand-black/10">
                      <th className="px-6 py-6 border-r border-brand-black/10">Days</th>
                      <th className="px-6 py-6 border-r border-brand-black/10 text-center">Shifts</th>
                      <th className="px-6 py-6 border-r border-brand-black/10">UK Time (4-)</th>
                      <th className="px-6 py-6 border-r border-brand-black/10">PK Time (4+)</th>
                      <th className="px-6 py-6 border-r border-brand-black/10">Operators</th>
                      <th className="px-6 py-6 text-center text-brand-yellow">Actual Hours</th>
                    </tr>
                  </thead>
                  <tbody className="text-brand-black cursor-default">
                    {timetable.map((group, gIdx) => (
                      <React.Fragment key={gIdx}>
                        {group.shifts.map((shift, sIdx) => (
                          <tr key={`${gIdx}-${sIdx}`} className="border-b border-brand-black/5 hover:bg-black/5 transition-all group">
                            {sIdx === 0 && (
                              <td 
                                rowSpan={group.shifts.length} 
                                className="px-6 py-4 font-black text-2xl text-brand-yellow uppercase tracking-tighter border-r border-brand-black/10 bg-black/5"
                              >
                                {group.day}
                              </td>
                            )}
                            <td className="px-6 py-4 text-center font-bold text-brand-black/40 border-r border-brand-black/10 italic text-sm">{shift.id}</td>
                            <td className="px-6 py-4 border-r border-brand-black/10 text-xs font-black uppercase tracking-widest">{shift.uk}</td>
                            <td className="px-6 py-4 border-r border-brand-black/10 text-xs font-black uppercase tracking-widest">{shift.pk}</td>
                            <td className="px-6 py-4 border-r border-brand-black/10 font-bold uppercase tracking-tight text-xs">
                              <select 
                                value={shift.op}
                                onChange={(e) => handleUpdateClick(gIdx, sIdx, 'op', e.target.value)}
                                className="bg-transparent border-none text-brand-yellow font-black focus:ring-0 outline-none cursor-pointer hover:text-brand-black transition-colors min-w-[120px]"
                              >
                                <option className="bg-white text-black" value="">UNASSIGNED</option>
                                {operators.map(op => (
                                  <option key={op.id} className="bg-white text-black" value={op.name}>
                                    {op.name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <input 
                                type="text" 
                                value={shift.hrs}
                                onChange={(e) => {
                                  const newTimetable = [...timetable];
                                  newTimetable[gIdx].shifts[sIdx].hrs = e.target.value;
                                  setTimetable(newTimetable);
                                }}
                                onBlur={(e) => handleUpdateClick(gIdx, sIdx, 'hrs', e.target.value)}
                                className="w-16 bg-black/5 border border-brand-black/10 text-center py-2 text-brand-yellow font-black text-lg focus:border-brand-yellow outline-none rounded-sm"
                              />
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {currentView === 'OPERATORS' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-brand-black italic">Team Directory</h2>
                  <p className="text-[10px] text-brand-black/40 font-black uppercase tracking-[0.3em] mt-1">Full Operator Database</p>
                </div>
                <button 
                  onClick={() => setShowNewOperatorModal(true)}
                  className="px-8 py-4 bg-brand-yellow text-black font-black uppercase text-xs tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-400 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add New Operator
                </button>
              </div>

              <div className="glass-card rounded-2xl overflow-hidden border border-border-grey/10">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-black text-brand-yellow text-[11px] font-black uppercase tracking-[0.2em] border-b border-chalk/10">
                      <th className="px-8 py-6">Operator Name</th>
                      <th className="px-8 py-6">ID Reference</th>
                      <th className="px-8 py-6">Weekly Schedule</th>
                      <th className="px-8 py-6">Status</th>
                      <th className="px-8 py-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-grey/10">
                    {operators.map((op, i) => {
                      const assignedDays = getOperatorAssignedShifts(op.name);
                      return (
                        <tr key={i} className="hover:bg-black/5 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-brand-black flex items-center justify-center text-brand-yellow font-black text-xs rounded-full border border-brand-yellow/20 group-hover:border-brand-yellow/60 transition-all">
                                {op.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-brand-black uppercase text-sm tracking-tight">{op.name}</span>
                                <span className="text-[10px] text-brand-black/40 lowercase font-medium">{op.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-brand-black/40 text-xs font-black tracking-widest">{op.id}</td>
                          <td className="px-8 py-6">
                            <div className="flex flex-wrap gap-1">
                              {assignedDays.length > 0 ? assignedDays.map(day => (
                                <span key={day} className="text-[9px] font-black bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 px-1.5 py-0.5 rounded-sm">
                                  {day}
                                </span>
                              )) : (
                                <span className="text-[9px] font-bold text-brand-black/20 italic">No shifts assigned</span>
                              )}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                              op.status === 'ON DUTY' ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-400 border-red-200 bg-red-50'
                            }`}>
                              {op.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => handleEditClick(op)}
                                className="p-2 hover:bg-black/5 rounded transition-colors text-brand-black/40 hover:text-brand-yellow"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => setOperatorToDelete(op)}
                                className="p-2 hover:bg-black/5 rounded transition-colors text-brand-black/40 hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {currentView === 'LOGS' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-brand-black italic">Operator Shift Logs</h2>
                  <p className="text-[10px] text-brand-black/40 font-black uppercase tracking-[0.3em] mt-1">Individual Performance & Schedule Tracking</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-black/40">Filter By Operator:</span>
                  <select 
                    value={selectedLogOperator}
                    onChange={(e) => setSelectedLogOperator(e.target.value)}
                    className="bg-black/5 border border-brand-black/10 px-6 py-3 text-xs font-black uppercase text-brand-black outline-none focus:border-brand-yellow rounded-none min-w-[200px] h-12"
                  >
                    {operators.map(op => <option key={op.id} value={op.name}>{op.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="glass-card rounded-2xl overflow-hidden border border-brand-black/10 bg-white shadow-xl">
                <div className="p-8 border-b border-brand-black/10 bg-black/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-black flex items-center justify-center text-brand-yellow font-black text-sm rounded-full">
                      {selectedLogOperator.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase text-brand-black tracking-tight">{selectedLogOperator}'s Personalized Rotta</h3>
                      <p className="text-[10px] text-brand-black/40 font-bold uppercase tracking-widest italic">Live dynamic sync with master rotta</p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black/5 text-[10px] font-black uppercase tracking-[0.2em] text-brand-black/40 border-b border-brand-black/10">
                        <th className="px-8 py-5">Assigned Day</th>
                        <th className="px-8 py-5 text-center">Session ID</th>
                        <th className="px-8 py-5">UK Timeline</th>
                        <th className="px-8 py-5">PK Timeline</th>
                        <th className="px-8 py-5 text-right text-brand-yellow">Commited Hrs</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-black/5">
                      {(() => {
                        const individualShifts: { day: string; id: number; uk: string; pk: string; hrs: string }[] = [];
                        timetable.forEach(day => {
                          day.shifts.forEach(shift => {
                            if (shift.op === selectedLogOperator) {
                              individualShifts.push({ day: day.day, ...shift });
                            }
                          });
                        });

                        if (individualShifts.length === 0) {
                          return (
                            <tr>
                              <td colSpan={5} className="px-8 py-20 text-center">
                                <div className="flex flex-col items-center justify-center space-y-3 opacity-20">
                                  <History className="w-12 h-12" />
                                  <p className="text-xs font-black uppercase tracking-[0.2em]">No active sessions found for this operator</p>
                                </div>
                              </td>
                            </tr>
                          );
                        }

                        return individualShifts.map((shift, idx) => (
                          <tr key={idx} className="hover:bg-brand-yellow/5 transition-colors group">
                            <td className="px-8 py-6">
                              <span className="text-lg font-black text-brand-black uppercase tracking-tighter">{shift.day}</span>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <span className="text-xs font-bold text-brand-black/30 italic">#{shift.id}</span>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-brand-black/20" />
                                <span className="text-xs font-black uppercase tracking-widest text-brand-black/60">{shift.uk}</span>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-brand-black/20" />
                                <span className="text-xs font-black uppercase tracking-widest text-brand-black/60">{shift.pk}</span>
                              </div>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <span className="text-lg font-black text-brand-yellow transition-all group-hover:scale-110 inline-block">{shift.hrs}h</span>
                            </td>
                          </tr>
                        ));
                      })()}
                    </tbody>
                    {(() => {
                      const totalHrs = timetable.reduce((acc, day) => {
                        return acc + day.shifts.filter(s => s.op === selectedLogOperator).reduce((sAcc, s) => sAcc + (parseFloat(s.hrs) || 0), 0);
                      }, 0);
                      
                      if (totalHrs > 0) {
                        return (
                          <tfoot>
                            <tr className="bg-brand-black">
                              <td colSpan={4} className="px-8 py-4 text-right text-[10px] font-black uppercase tracking-[0.2em] text-chalk/40">Weekly Aggregate Exposure</td>
                              <td className="px-8 py-4 text-right">
                                <span className="text-xl font-black text-brand-yellow">{totalHrs.toFixed(1)} hrs</span>
                              </td>
                            </tr>
                          </tfoot>
                        );
                      }
                      return null;
                    })()}
                  </table>
                </div>
              </div>

              {/* Historical Logs Intersection */}
              <div className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-tight text-brand-black">Verified Punch Logs</h3>
                <div className="glass-card rounded-2xl overflow-hidden border border-brand-black/10 bg-white">
                  <table className="w-full text-left">
                    <thead className="bg-black/5 text-[9px] font-black text-brand-black/40 uppercase tracking-widest">
                      <tr>
                        <th className="px-8 py-4">Reference Date</th>
                        <th className="px-8 py-4">Timeline (In/Out)</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4 text-right">Net Payload</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-black/5">
                      {shifts.filter(s => s.operatorName === selectedLogOperator).length > 0 ? shifts.filter(s => s.operatorName === selectedLogOperator).map((log, idx) => (
                        <tr key={idx} className="text-xs font-bold text-brand-black/60">
                          <td className="px-8 py-4 uppercase tracking-tighter">{log.date}</td>
                          <td className="px-8 py-4 italic">{log.clockIn} → {log.clockOut}</td>
                          <td className="px-8 py-4">
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${log.clockOut === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-black/5 text-brand-black/40'}`}>
                              {log.clockOut === 'ACTIVE' ? 'LIVE SESSION' : 'VERIFIED'}
                            </span>
                          </td>
                          <td className="px-8 py-4 text-right font-black text-brand-black uppercase">{log.netHours}h</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={4} className="px-8 py-10 text-center text-brand-black/20 italic text-xs uppercase font-black">No historical punch data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {currentView === 'SETTINGS' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-brand-black italic">System Configuration</h2>
                <p className="text-[10px] text-brand-black/40 font-black uppercase tracking-[0.3em] mt-1">Terminal Environment & Global Sync</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Clock 1 Configuration */}
                <div className="glass-card p-8 rounded-2xl border border-brand-black/10 bg-white space-y-6">
                  <div className="flex items-center gap-3 border-b border-brand-black/5 pb-4">
                    <div className="p-2 bg-brand-yellow/10 rounded-lg">
                      <Clock className="w-5 h-5 text-brand-yellow" />
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-brand-black">Primary Clock Overlay</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-black/40">Display Label</label>
                      <input 
                        type="text" 
                        value={clockSettings.clock1Label}
                        onChange={(e) => updateClockSettings({ clock1Label: e.target.value })}
                        placeholder="e.g. PAKISTAN TIME"
                        className="w-full bg-black/5 border border-brand-black/10 p-4 text-brand-black font-bold text-xs focus:border-brand-yellow outline-none uppercase tracking-widest"
                      />
                    </div>
                    <div className="space-y-4 pt-2 border-t border-brand-black/5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-brand-black/30">Search Region</label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-brand-black/20" />
                          <input 
                            type="text"
                            value={clock1Search}
                            onChange={(e) => setClock1Search(e.target.value)}
                            placeholder="Type to filter..."
                            className="w-full bg-black/5 border border-brand-black/10 pl-9 pr-4 py-2 text-[11px] font-bold text-brand-black focus:border-brand-yellow outline-none uppercase"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-black/40">Global Region / Timezone</label>
                        <select 
                          value={clockSettings.clock1Zone}
                          onChange={(e) => updateClockSettings({ clock1Zone: e.target.value })}
                          className="w-full bg-black/5 border border-brand-black/10 p-4 text-brand-black font-bold text-xs focus:border-brand-yellow outline-none appearance-none cursor-pointer"
                        >
                          {filteredZones1.length > 0 ? filteredZones1.map(tz => (
                            <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
                          )) : (
                            <option disabled>No results found</option>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Clock 2 Configuration */}
                <div className="glass-card p-8 rounded-2xl border border-brand-black/10 bg-white space-y-6">
                  <div className="flex items-center gap-3 border-b border-brand-black/5 pb-4">
                    <div className="p-2 bg-brand-black rounded-lg">
                      <Clock className="w-5 h-5 text-brand-yellow" />
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-brand-black">Secondary Clock Overlay</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-black/40">Display Label</label>
                      <input 
                        type="text" 
                        value={clockSettings.clock2Label}
                        onChange={(e) => updateClockSettings({ clock2Label: e.target.value })}
                        placeholder="e.g. UNITED KINGDOM"
                        className="w-full bg-black/5 border border-brand-black/10 p-4 text-brand-black font-bold text-xs focus:border-brand-yellow outline-none uppercase tracking-widest"
                      />
                    </div>
                    <div className="space-y-4 pt-2 border-t border-brand-black/5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-brand-black/30">Search Region</label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-brand-black/20" />
                          <input 
                            type="text"
                            value={clock2Search}
                            onChange={(e) => setClock2Search(e.target.value)}
                            placeholder="Type to filter..."
                            className="w-full bg-black/5 border border-brand-black/10 pl-9 pr-4 py-2 text-[11px] font-bold text-brand-black focus:border-brand-yellow outline-none uppercase"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-black/40">Global Region / Timezone</label>
                        <select 
                          value={clockSettings.clock2Zone}
                          onChange={(e) => updateClockSettings({ clock2Zone: e.target.value })}
                          className="w-full bg-black/5 border border-brand-black/10 p-4 text-brand-black font-bold text-xs focus:border-brand-yellow outline-none appearance-none cursor-pointer"
                        >
                          {filteredZones2.length > 0 ? filteredZones2.map(tz => (
                            <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
                          )) : (
                            <option disabled>No results found</option>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div className="p-8 border-2 border-dashed border-brand-black/10 rounded-2xl bg-black/5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-black/40 mb-6 text-center">Live Terminal Synchronization Preview</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="glass-card p-6 bg-white border border-brand-black/10 text-center">
                    <p className="text-[9px] font-black text-brand-black/40 mb-1 uppercase">{clockSettings.clock1Label}</p>
                    <p className="text-2xl font-black text-brand-yellow tabular-nums">
                      {new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: clockSettings.clock1Zone }).format(new Date())}
                    </p>
                  </div>
                  <div className="glass-card p-6 bg-white border border-brand-black/10 text-center">
                    <p className="text-[9px] font-black text-brand-black/40 mb-1 uppercase">{clockSettings.clock2Label}</p>
                    <p className="text-2xl font-black text-brand-black tabular-nums">
                      {new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: clockSettings.clock2Zone }).format(new Date())}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Confirmation Modal */}
      {pendingChange && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-md p-10 border-2 border-brand-yellow/30 bg-white relative"
          >
            <div className="space-y-8">
              <div className="p-4 bg-brand-yellow/10 border-l-4 border-brand-yellow">
                <h3 className="text-3xl font-black text-brand-yellow tracking-tighter uppercase italic">CONFIRM OVERRIDE?</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-brand-black/60 text-sm font-bold uppercase tracking-widest">
                  You are about to modify the master timetable for <span className="text-brand-black">{timetable[pendingChange.dayIdx].day} - Shift {pendingChange.shiftIdx + 1}</span>.
                </p>
                <div className="p-4 bg-black/5 border border-brand-black/10 rounded">
                  <p className="text-[10px] font-black uppercase text-brand-black/40 mb-2">New Proposed Value</p>
                  <p className="text-xl font-black text-brand-yellow uppercase tracking-tight">
                    {pendingChange.field === 'op' ? `OPERATOR: ${pendingChange.value}` : `RECORDED HOURS: ${pendingChange.value} HRS`}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    setPendingChange(null);
                  }}
                  className="flex-1 py-5 border-2 border-brand-black/10 text-brand-black font-black text-xs uppercase tracking-widest hover:bg-black/5 transition-all"
                >
                  ABORT
                </button>
                <button 
                  onClick={confirmTimetableUpdate}
                  className="flex-1 py-5 bg-brand-yellow text-black font-black text-xs uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:scale-95"
                >
                  AUTHORIZE CHANGE
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* New Operator Modal */}
      {showNewOperatorModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-xl p-10 border border-brand-black/10 bg-white relative rounded-2xl"
          >
            <div className="space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-black text-brand-yellow tracking-tighter uppercase italic">
                    {editingOperator ? 'Update Operator' : 'Register Operator'}
                  </h3>
                  <p className="text-[10px] text-brand-black/40 font-black uppercase tracking-[0.3em] mt-1">
                    {editingOperator ? `Editing ID: ${editingOperator.id}` : 'Terminal Access Enrollment'}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setShowNewOperatorModal(false);
                    setEditingOperator(null);
                    setNewOperatorData({ firstName: '', lastName: '', email: '', phone: '' });
                  }}
                  className="p-2 hover:bg-black/5 text-brand-black/40 hover:text-brand-black transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddOperator} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-black/40">First Name</label>
                  <input 
                    required
                    type="text" 
                    value={newOperatorData.firstName}
                    onChange={(e) => setNewOperatorData({...newOperatorData, firstName: e.target.value})}
                    placeholder="Enter first name"
                    className="w-full bg-black/5 border border-brand-black/10 p-4 text-brand-black text-sm focus:border-brand-yellow outline-none transition-all placeholder:text-brand-black/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-black/40">Last Name</label>
                  <input 
                    required
                    type="text" 
                    value={newOperatorData.lastName}
                    onChange={(e) => setNewOperatorData({...newOperatorData, lastName: e.target.value})}
                    placeholder="Enter last name"
                    className="w-full bg-black/5 border border-brand-black/10 p-4 text-brand-black text-sm focus:border-brand-yellow outline-none transition-all placeholder:text-brand-black/10"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-black/40">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={newOperatorData.email}
                    onChange={(e) => setNewOperatorData({...newOperatorData, email: e.target.value})}
                    placeholder="operator@callwave.internal"
                    className="w-full bg-black/5 border border-brand-black/10 p-4 text-brand-black text-sm focus:border-brand-yellow outline-none transition-all placeholder:text-brand-black/10"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-black/40">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    value={newOperatorData.phone}
                    onChange={(e) => setNewOperatorData({...newOperatorData, phone: e.target.value})}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-black/5 border border-brand-black/10 p-4 text-brand-black text-sm focus:border-brand-yellow outline-none transition-all placeholder:text-brand-black/10"
                  />
                </div>

                <div className="md:col-span-2 flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowNewOperatorModal(false);
                      setEditingOperator(null);
                      setNewOperatorData({ firstName: '', lastName: '', email: '', phone: '' });
                    }}
                    className="flex-1 py-5 border-2 border-brand-black/10 text-brand-black font-black text-xs uppercase tracking-widest hover:bg-black/5 transition-all"
                  >
                    Abort
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-5 bg-brand-yellow text-brand-black font-black text-xs uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-lg active:scale-95 rounded-sm"
                  >
                    {editingOperator ? 'Authorize Update' : 'Authorize Enrollment'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {operatorToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-md p-10 border-2 border-red-500/30 bg-white relative rounded-2xl"
          >
            <div className="space-y-8">
              <div className="p-4 bg-red-500/10 border-l-4 border-red-500">
                <h3 className="text-3xl font-black text-red-500 tracking-tighter uppercase italic">REVOKE ACCESS?</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-brand-black/60 text-sm font-bold uppercase tracking-widest leading-relaxed">
                  You are about to permanently remove <span className="text-brand-black">{operatorToDelete.name}</span> from the terminal directory.
                </p>
                <div className="p-4 bg-red-500/5 border border-red-500/10 rounded">
                  <p className="text-[10px] font-black uppercase text-red-500/40 mb-1">Impact Analysis</p>
                  <p className="text-xs font-bold text-brand-black/40 uppercase tracking-tight">
                    This operator will immediately lose access to all secure dispatch modules and historical logs.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setOperatorToDelete(null)}
                  className="flex-1 py-5 border-2 border-brand-black/10 text-brand-black font-black text-xs uppercase tracking-widest hover:bg-black/5 transition-all"
                >
                  ABORT
                </button>
                <button 
                  onClick={confirmDeleteOperator}
                  className="flex-1 py-5 bg-red-600 text-white font-black text-xs uppercase tracking-widest hover:bg-red-500 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:scale-95"
                >
                  AUTHORIZE REMOVAL
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {confirmAction === 'LOGOUT' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-md p-10 border-2 border-brand-yellow/30 bg-white relative rounded-2xl"
          >
            <div className="space-y-8">
              <div className="p-4 bg-brand-yellow/10 border-l-4 border-brand-yellow">
                <h3 className="text-3xl font-black text-brand-yellow tracking-tighter uppercase italic">TERMINATE SESSION?</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-brand-black/60 text-sm font-bold uppercase tracking-widest leading-relaxed">
                  You are about to log out of the secure terminal. All active administrative sessions will be finalized.
                </p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setConfirmAction(null)}
                  className="flex-1 py-5 border-2 border-brand-black/10 text-brand-black font-black text-xs uppercase tracking-widest hover:bg-black/5 transition-all"
                >
                  ABORT
                </button>
                <button 
                  onClick={onLogout}
                  className="flex-1 py-5 bg-brand-yellow text-black font-black text-xs uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:scale-95"
                >
                  CONFIRM LOGOUT
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
