import { useState } from 'react';
import { Calendar, History, LogOut, Menu, X, MessageCircle } from 'lucide-react';
import { Agendamento } from './agendamento';
import { Historico } from './historico';
import { Chatbot } from './chatbot';

interface DashboardProps {
  user: { name: string; cpf: string };
  onLogout: () => void;
}

type View = 'agendamento' | 'historico';

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState<View>('agendamento');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-white">Agendamento Online</h1>
                <p className="text-blue-100 text-sm">Postos de Saúde Pública</p>
              </div>
            </div>

            {/* Desktop User Info */}
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-white">{user.name}</p>
                <p className="text-blue-100 text-sm">{user.cpf}</p>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/20 rounded-lg transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/20">
              <div className="mb-4">
                <p className="text-white">{user.name}</p>
                <p className="text-blue-100 text-sm">{user.cpf}</p>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition w-full"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            <button
              onClick={() => setCurrentView('agendamento')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition whitespace-nowrap ${
                currentView === 'agendamento'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-gray-300'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Agendar Consulta
            </button>
            <button
              onClick={() => setCurrentView('historico')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition whitespace-nowrap ${
                currentView === 'historico'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-gray-300'
              }`}
            >
              <History className="w-5 h-5" />
              Histórico
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {currentView === 'agendamento' && <Agendamento userName={user.name} />}
        {currentView === 'historico' && <Historico userName={user.name} />}
      </main>

      {/* Chatbot Button */}
      <button
        onClick={() => setChatbotOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 flex items-center justify-center z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chatbot */}
      {chatbotOpen && <Chatbot onClose={() => setChatbotOpen(false)} userName={user.name} />}

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>Sistema de Agendamento - Saúde Pública</p>
          <p className="text-sm mt-1">Atendimento 24h: 0800 XXX XXXX</p>
        </div>
      </footer>
    </div>
  );
}
