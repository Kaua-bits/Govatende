import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  onClose: () => void;
  userName: string;
}

const respostasBot: { [key: string]: string } = {
  'oi': 'Olá! Como posso ajudá-lo hoje?',
  'olá': 'Olá! Como posso ajudá-lo hoje?',
  'ola': 'Olá! Como posso ajudá-lo hoje?',
  'horário': 'Os postos de saúde atendem de segunda a sexta-feira, das 7h às 17h.',
  'horario': 'Os postos de saúde atendem de segunda a sexta-feira, das 7h às 17h.',
  'documentos': 'Para agendar, você precisa de: Cartão SUS, RG ou CNH, CPF e comprovante de residência.',
  'documento': 'Para agendar, você precisa de: Cartão SUS, RG ou CNH, CPF e comprovante de residência.',
  'agendar': 'Você pode agendar sua consulta clicando na aba "Agendar Consulta" acima. Escolha entre agendamento online ou presencial.',
  'cancelar': 'Para cancelar uma consulta, vá até "Histórico" e clique em cancelar na consulta desejada.',
  'especialidades': 'Oferecemos: Clínico Geral, Pediatria, Ginecologia, Odontologia, Enfermagem e Psicologia.',
  'especialidade': 'Oferecemos: Clínico Geral, Pediatria, Ginecologia, Odontologia, Enfermagem e Psicologia.',
  'endereço': 'Temos postos em: Centro, Jardim Primavera, Vila Nova e Parque das Árvores. Veja os endereços completos na seção de agendamento.',
  'endereco': 'Temos postos em: Centro, Jardim Primavera, Vila Nova e Parque das Árvores. Veja os endereços completos na seção de agendamento.',
  'ajuda': 'Posso ajudá-lo com: horários de atendimento, agendamentos, documentos necessários, especialidades disponíveis e endereços dos postos.',
  'obrigado': 'Por nada! Estou aqui para ajudar. Se precisar de mais alguma coisa, é só chamar!',
  'obrigada': 'Por nada! Estou aqui para ajudar. Se precisar de mais alguma coisa, é só chamar!',
};

export function Chatbot({ onClose, userName }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Olá, ${userName}! Sou o assistente virtual do sistema de agendamento. Como posso ajudá-lo hoje?`,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(respostasBot)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return 'Desculpe, não entendi sua pergunta. Você pode perguntar sobre: horários, documentos, agendamentos, especialidades ou endereços dos postos. Digite "ajuda" para mais informações.';
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-0 md:p-4">
      <div className="bg-white w-full md:w-96 h-[100vh] md:h-[600px] md:rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 flex items-center justify-between md:rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white">Assistente Virtual</p>
              <p className="text-blue-100 text-sm">Online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'bot' && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white md:rounded-b-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full hover:from-blue-700 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
