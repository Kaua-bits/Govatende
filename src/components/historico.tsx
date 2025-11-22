import { useState } from 'react';
import { Calendar, MapPin, Stethoscope, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface AgendamentoHistorico {
  id: number;
  data: string;
  horario: string;
  posto: string;
  especialidade: string;
  status: 'confirmada' | 'cancelada' | 'pendente';
  medico?: string;
}

const mockHistorico: AgendamentoHistorico[] = [
  {
    id: 1,
    data: '2025-11-25',
    horario: '09:00',
    posto: 'UBS Centro',
    especialidade: 'Clínico Geral',
    status: 'confirmada',
    medico: 'Dr. João Silva',
  },
  {
    id: 2,
    data: '2025-11-20',
    horario: '14:30',
    posto: 'UBS Jardim Primavera',
    especialidade: 'Odontologia',
    status: 'pendente',
    medico: 'Dra. Maria Santos',
  },
  {
    id: 3,
    data: '2025-10-15',
    horario: '10:00',
    posto: 'UBS Vila Nova',
    especialidade: 'Pediatria',
    status: 'confirmada',
    medico: 'Dr. Carlos Mendes',
  },
  {
    id: 4,
    data: '2025-09-20',
    horario: '15:00',
    posto: 'UBS Centro',
    especialidade: 'Ginecologia',
    status: 'cancelada',
    medico: 'Dra. Ana Paula',
  },
  {
    id: 5,
    data: '2025-08-10',
    horario: '08:30',
    posto: 'UBS Parque das Árvores',
    especialidade: 'Clínico Geral',
    status: 'confirmada',
    medico: 'Dr. Roberto Lima',
  },
];

interface HistoricoProps {
  userName: string;
}

export function Historico({ userName }: HistoricoProps) {
  const [consultas] = useState<AgendamentoHistorico[]>(mockHistorico);
  const [filtro, setFiltro] = useState<'todas' | 'confirmada' | 'pendente' | 'cancelada'>('todas');

  const consultasFiltradas = filtro === 'todas' 
    ? consultas 
    : consultas.filter(c => c.status === filtro);

  const formatarData = (dataStr: string) => {
    const data = new Date(dataStr + 'T00:00:00');
    return data.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmada':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'cancelada':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pendente':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmada':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'cancelada':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'pendente':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmada':
        return 'Confirmada';
      case 'cancelada':
        return 'Cancelada';
      case 'pendente':
        return 'Pendente';
      default:
        return status;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
        <h2 className="text-gray-900 mb-4">Histórico de Consultas</h2>
        <p className="text-gray-600 mb-6">
          Paciente: {userName}
        </p>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFiltro('todas')}
            className={`px-4 py-2 rounded-lg transition ${
              filtro === 'todas'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFiltro('confirmada')}
            className={`px-4 py-2 rounded-lg transition ${
              filtro === 'confirmada'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Confirmadas
          </button>
          <button
            onClick={() => setFiltro('pendente')}
            className={`px-4 py-2 rounded-lg transition ${
              filtro === 'pendente'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pendentes
          </button>
          <button
            onClick={() => setFiltro('cancelada')}
            className={`px-4 py-2 rounded-lg transition ${
              filtro === 'cancelada'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Canceladas
          </button>
        </div>
      </div>

      {/* Lista de Consultas */}
      <div className="space-y-4">
        {consultasFiltradas.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Nenhuma consulta encontrada</p>
          </div>
        ) : (
          consultasFiltradas.map((consulta) => (
            <div
              key={consulta.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Status */}
                  <div className="flex items-center gap-2">
                    {getStatusIcon(consulta.status)}
                    <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(consulta.status)}`}>
                      {getStatusText(consulta.status)}
                    </span>
                  </div>

                  {/* Data e Horário */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>{formatarData(consulta.data)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{consulta.horario}</span>
                    </div>
                  </div>

                  {/* Posto e Especialidade */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span>{consulta.posto}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Stethoscope className="w-4 h-4 text-green-600" />
                      <span>{consulta.especialidade}</span>
                    </div>
                  </div>

                  {/* Médico */}
                  {consulta.medico && (
                    <p className="text-gray-600 text-sm">
                      Profissional: {consulta.medico}
                    </p>
                  )}
                </div>

                {/* Ações */}
                {consulta.status === 'pendente' && (
                  <div className="flex flex-col gap-2 md:flex-shrink-0">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm whitespace-nowrap">
                      Confirmar
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm whitespace-nowrap">
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
