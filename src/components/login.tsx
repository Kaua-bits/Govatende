import { useState } from 'react';
import { Heart, Shield } from 'lucide-react';

interface LoginProps {
  onLogin: (name: string, cpf: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && cpf) {
      onLogin(name, cpf);
    }
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return cpf;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-full mb-4">
            <Heart className="w-10 h-10 text-white" fill="white" />
          </div>
          <h1 className="text-blue-900 mb-2">Sistema de Agendamento</h1>
          <p className="text-gray-600">Postos de Saúde Pública</p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-blue-600" />
            <h2 className="text-blue-900">Acesso ao Sistema</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Digite seu nome completo"
                required
              />
            </div>

            <div>
              <label htmlFor="cpf" className="block text-gray-700 mb-2">
                CPF
              </label>
              <input
                type="text"
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(formatCPF(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="000.000.000-00"
                maxLength={14}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
            >
              Entrar no Sistema
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-center text-sm">
              Sistema seguro e protegido pela Lei Geral de Proteção de Dados (LGPD)
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Em caso de dúvidas, procure o posto de saúde mais próximo
          </p>
        </div>
      </div>
    </div>
  );
}
