import { useState } from 'react';
import { Calendar, MapPin, Clock, User, Stethoscope, CheckCircle, Wifi, WifiOff } from 'lucide-react';

interface AgendamentoProps {
  userName: string;
}

const postos = [
  { id: 1, nome: 'UBS Centro', endereco: 'Rua das Flores, 123 - Centro' },
  { id: 2, nome: 'UBS Jardim Primavera', endereco: 'Av. das Acácias, 456 - Jardim Primavera' },
  { id: 3, nome: 'UBS Vila Nova', endereco: 'Rua do Comércio, 789 - Vila Nova' },
  { id: 4, nome: 'UBS Parque das Árvores', endereco: 'Av. Verde, 321 - Parque das Árvores' },
];

const especialidades = [
  'Clínico Geral',
  'Pediatria',
  'Ginecologia',
  'Odontologia',
  'Enfermagem',
  'Psicologia',
];

const horarios = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
];

export function Agendamento({ userName }: AgendamentoProps) {
  const [modoOnline, setModoOnline] = useState(true);
  const [posto, setPosto] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setPosto('');
      setEspecialidade('');
      setData('');
      setHorario('');
    }, 3000);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Toggle Online/Offline */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
        <h2 className="text-gray-900 mb-4">Modo de Agendamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setModoOnline(true)}
            className={`flex items-center gap-3 p-4 rounded-lg border-2 transition ${
              modoOnline
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              modoOnline ? 'bg-blue-600' : 'bg-gray-300'
            }`}>
              <Wifi className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-gray-900">Agendamento Online</p>
              <p className="text-gray-600 text-sm">Agende pela internet</p>
            </div>
          </button>

          <button
            onClick={() => setModoOnline(false)}
            className={`flex items-center gap-3 p-4 rounded-lg border-2 transition ${
              !modoOnline
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              !modoOnline ? 'bg-green-600' : 'bg-gray-300'
            }`}>
              <WifiOff className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-gray-900">Agendamento Presencial</p>
              <p className="text-gray-600 text-sm">Agende no posto</p>
            </div>
          </button>
        </div>
      </div>

      {modoOnline ? (
        <>
          {/* Success Message */}
          {showSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-green-900">Consulta agendada com sucesso!</p>
                <p className="text-green-700 text-sm">Você receberá uma confirmação em breve.</p>
              </div>
            </div>
          )}

          {/* Formulário Online */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-gray-900">Nova Consulta</h2>
                <p className="text-gray-600 text-sm">Preencha os dados para agendar</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-gray-700 mb-2">
                  <User className="w-4 h-4" />
                  Paciente
                </label>
                <input
                  type="text"
                  value={userName}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 mb-2">
                  <MapPin className="w-4 h-4" />
                  Posto de Saúde
                </label>
                <select
                  value={posto}
                  onChange={(e) => setPosto(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Selecione o posto</option>
                  {postos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome} - {p.endereco}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 mb-2">
                  <Stethoscope className="w-4 h-4" />
                  Especialidade
                </label>
                <select
                  value={especialidade}
                  onChange={(e) => setEspecialidade(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Selecione a especialidade</option>
                  {especialidades.map((esp) => (
                    <option key={esp} value={esp}>
                      {esp}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-gray-700 mb-2">
                    <Calendar className="w-4 h-4" />
                    Data
                  </label>
                  <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    min={getMinDate()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-gray-700 mb-2">
                    <Clock className="w-4 h-4" />
                    Horário
                  </label>
                  <select
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="">Selecione o horário</option>
                    {horarios.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
              >
                Confirmar Agendamento
              </button>
            </form>
          </div>
        </>
      ) : (
        /* Informações Agendamento Presencial */
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900">Agendamento Presencial</h2>
              <p className="text-gray-600 text-sm">Compareça ao posto de sua preferência</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-900 mb-2">📋 Documentos Necessários:</p>
            <ul className="text-blue-800 text-sm space-y-1 ml-4">
              <li>• Cartão SUS</li>
              <li>• Documento de identidade (RG ou CNH)</li>
              <li>• CPF</li>
              <li>• Comprovante de residência</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-gray-900">Postos de Atendimento:</h3>
            {postos.map((p) => (
              <div key={p.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-900">{p.nome}</p>
                    <p className="text-gray-600 text-sm">{p.endereco}</p>
                    <p className="text-gray-500 text-sm mt-2">
                      Horário: Segunda a Sexta, 7h às 17h
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
