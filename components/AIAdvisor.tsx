import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { MessageSquare, Send, Sparkles, Loader2, Bot, Info } from 'lucide-react';

// Initialize Gemini with API Key from process.env
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const AIAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    {role: 'model', text: 'Olá! Sou o especialista virtual da R-Car. Posso tirar dúvidas sobre nossos serviços (lavagem, polimento, higienização) ou dar dicas de cuidados para seu veículo. Como posso ajudar?'}
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getChat = () => {
    if (!chatRef.current) {
      chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: "Você é um assistente especialista em estética automotiva da R-Car. Seja educado, profissional e persuasivo. Foco: Lavagem detalhada, Polimento, Vitrificação, Higienização de estofados (carros e sofás). Se perguntarem preços, dê uma estimativa baseada em 'carros pequenos' vs 'grandes' mas sempre direcione para o WhatsApp (65 98106-9894) para orçamento exato. Evite falar de mecânica ou funilaria pesada."
        }
      });
    }
    return chatRef.current;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const chat = getChat();
      const result: GenerateContentResponse = await chat.sendMessage({ message: userMsg });
      const responseText = result.text || "Desculpe, não consegui entender. Poderia reformular?";
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Desculpe, estou com dificuldade de conexão no momento. Por favor, tente novamente ou contate-nos pelo WhatsApp." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="advisor" className="py-24 px-4 bg-gray-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-red-600/20 to-black rounded-2xl mb-6 border border-red-500/20 shadow-lg shadow-red-900/20">
            <Sparkles className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">IA CONSULTOR</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Dúvidas sobre qual o melhor tratamento para seu carro? Nossa Inteligência Artificial analisa e recomenda.
          </p>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-800 overflow-hidden flex flex-col h-[650px]">
          <div className="bg-gray-900/50 p-4 border-b border-gray-800 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-300">R-Car Assistant Online</span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-4`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-gradient-to-br from-red-600 to-red-700' : 'bg-gradient-to-br from-gray-700 to-gray-800'}`}>
                    {msg.role === 'user' ? <MessageSquare size={18} className="text-white" /> : <Bot size={18} className="text-gray-300" />}
                  </div>
                  <div className={`p-5 rounded-3xl text-sm md:text-base leading-relaxed shadow-md ${
                    msg.role === 'user' 
                      ? 'bg-red-600 text-white rounded-tr-sm' 
                      : 'bg-gray-800 text-gray-200 rounded-tl-sm border border-gray-700'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="flex items-start max-w-[80%] flex-row gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0 border border-gray-700">
                    <Loader2 size={18} className="text-gray-400 animate-spin" />
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-3xl rounded-tl-sm border border-gray-700/50">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 md:p-6 bg-gray-900 border-t border-gray-800">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Pergunte sobre polimento, higienização..."
                disabled={isLoading}
                className="w-full bg-gray-950 border border-gray-800 text-white rounded-2xl pl-6 pr-16 py-4 focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/50 placeholder-gray-600 transition-all"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="absolute right-2 top-2 bottom-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-600 text-white p-3 rounded-xl transition-all flex items-center justify-center aspect-square"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-600">
              <Info className="w-3 h-3" />
              <p>A IA pode fornecer estimativas. Consulte um profissional para valores exatos.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAdvisor;