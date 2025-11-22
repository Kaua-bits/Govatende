import { useState } from 'react';
import { Login } from './components/login';
import { Dashboard } from './components/dashboard';

export default function App() {
  const [user, setUser] = useState<{ name: string; cpf: string } | null>(null);

  const handleLogin = (name: string, cpf: string) => {
    setUser({ name, cpf });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}
