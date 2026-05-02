import { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import Admin from './Admin';
import { UserRole, ViewState } from './types';

export default function App() {
  const [view, setView] = useState<ViewState>('LOGIN');

  const handleLogin = (role: UserRole) => {
    if (role === UserRole.ADMIN) {
      setView('ADMIN');
    } else {
      setView('DASHBOARD');
    }
  };

  const renderView = () => {
    switch (view) {
      case 'LOGIN':
        return <Login onLogin={handleLogin} />;
      case 'DASHBOARD':
        return <Dashboard onLogout={() => setView('LOGIN')} />;
      case 'ADMIN':
        return <Admin onLogout={() => setView('LOGIN')} />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderView()}
    </div>
  );
}

