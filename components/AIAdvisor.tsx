import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, Sparkles, Loader2 } from 'lucide-react';
import { GeminiModel, ChatMessage } from '../types';
import { SERVICE_DATA } from '../constants';

const AIAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá! Sou a IA da R-Car. Descreva o estado do seu veículo ou o que você precisa, e eu recomendarei o serviço ideal para você.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API Key not found");

      const ai = new GoogleGenAI({ apiKey });
      
      // Prepare context from service data
      const serviceContext = JSON.stringify(SERVICE_DATA);
      
      const systemInstruction = `
        Você é um consultor especialista da R-Car Estética Automotiva.
        Sua missão é recomendar serviços baseados na descrição do cliente.
        Seja breve, profissional e entusiasta.
        Aqui estão nossos serviços e preços (use esses dados para responder):
        ${serviceContext}
        
        Regras:
        1. Se o cliente falar de sujeira pesada, sugira Lavagem Americana ou Completa.
        2. Se falar de riscos leves ou pintura opaca, sugira Polimento.
        3. Se falar de farol amarelado, sugira Recuperação de Farol.
        4. Sempre mencione o preço aproximado.
        5. Se não tiver certeza, peça para trazer o carro para avaliação ou entrar em contato pelo WhatsApp.
      `;

      const response = await ai.models.generateContent({
        model: GeminiModel.FLASH_LITE,
        contents: [
          { role: 'user', parts: [{ text: `System Instruction: ${systemInstruction}` }] }, // In older SDKs system instruction is config, here passing as context for safety if 2.5 config differs, but actually 2.5 supports systemInstruction in config. Let's use config properly.
          ...messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: systemInstruction,
        }
      });

      const text = response.text || "Desculpe, não consegui processar sua solicitação agora.";
      
      setMessages(prev => [...prev, { role: 'model', text }]);

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Ocorreu um erro ao consultar o sistema. Por favor, tente novamente ou nos chame no WhatsApp.', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-advisor" className="py-20 bg-gradient-to-b from-rcar-black to-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rcar-neon/10 border border-rcar-neon/30 mb-6">
              <Sparkles className="w-4 h-4 text-rcar-neon animate-pulse" />
              <span className="text-rcar-neon text-xs font-bold uppercase tracking-widest">Gemini Fast AI Powered</span>
            </div>
            <h2 className="font-display font-bold text-4xl text-white mb-6">
              CONSULTORIA <br />
              <span className="text-rcar-neon">INTELIGENTE</span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Não sabe qual serviço escolher? Nossa IA analisa sua necessidade e sugere o tratamento perfeito para devolver o brilho de fábrica ao seu veículo.
            </p>
            <div className="hidden md:block p-6 rounded-xl bg-gray-900/50 border border-gray-800">
              <h4 className="text-white font-bold mb-2">Exemplos de perguntas:</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-rcar-neon rounded-full"></div> "Meu carro preto está cheio de marcas de redemoinho."</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-rcar-neon rounded-full"></div> "Derramaram refrigerante no banco de trás."</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-rcar-neon rounded-full"></div> "Quero vender meu carro, preciso de uma geral."</li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-[500px] shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-rcar-neon/20">
              
              {/* Chat Header */}
              <div className="p-4 bg-black/40 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rcar-neon/20 flex items-center justify-center border border-rcar-neon">
                    <Bot className="w-6 h-6 text-rcar-neon" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">R-Car Assistant</h3>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-xs text-gray-400">Online</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-rcar-neon text-black font-medium rounded-tr-none' 
                        : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-tl-none'
                    } ${msg.isError ? 'bg-red-900/50 border-red-500 text-white' : ''}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 p-3 rounded-2xl rounded-tl-none border border-gray-700 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-rcar-neon animate-spin" />
                      <span className="text-xs text-gray-400">Digitando...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-black/40 border-t border-white/10">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Descreva o problema..."
                    className="w-full bg-gray-900/80 text-white pl-4 pr-12 py-3 rounded-lg border border-gray-700 focus:border-rcar-neon focus:ring-1 focus:ring-rcar-neon focus:outline-none transition-all placeholder-gray-500"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-rcar-neon/10 hover:bg-rcar-neon text-rcar-neon hover:text-black rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AIAdvisor;
