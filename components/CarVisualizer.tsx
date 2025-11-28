import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Image as ImageIcon, Loader2, Sparkles, Wand2 } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const CarVisualizer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    
    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // Using gemini-2.5-flash-image for standard image generation tasks
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `Generate a high-quality, photorealistic image of a car based on this description: "${prompt}". The setting should be a professional car detailing studio with dramatic lighting. Focus on the reflections and the paint quality.`,
            },
          ],
        },
      });

      let foundImage = false;
      if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            // Iterate through parts to find the image part
            if (part.inlineData) {
                const base64EncodeString = part.inlineData.data;
                const imageUrl = `data:image/png;base64,${base64EncodeString}`;
                setGeneratedImage(imageUrl);
                foundImage = true;
                break;
            }
        }
      }

      if (!foundImage) {
        setError("Não foi possível gerar a imagem. A descrição pode ter violado políticas de segurança ou ocorreu um erro.");
      }

    } catch (err) {
      console.error(err);
      setError("Erro ao conectar com o servidor de IA. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="visualizer" className="py-24 px-4 bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 text-red-500 font-bold tracking-wider uppercase text-sm mb-4">
              <Wand2 size={16} />
              <span>Visualizador Gemini 2.5</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
              IMAGINE O <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">POTENCIAL</span>
            </h2>
            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
              Quer ver como seu carro ficaria com uma cor diferente ou com aquele brilho de vitrificação? 
              Descreva abaixo e deixe nossa IA gerar uma prévia para você.
            </p>
            
            <div className="bg-gray-800/50 p-6 rounded-3xl border border-gray-700/50 shadow-xl">
              <label className="block text-sm font-medium text-gray-300 mb-3 ml-1">
                Descreva o veículo e o resultado desejado
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Uma BMW M3 azul escura brilhando muito após polimento técnico, em um estúdio escuro com luzes de neon..."
                className="w-full bg-gray-900 border border-gray-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-red-600/50 focus:border-red-600/50 min-h-[140px] resize-none mb-4 transition-all"
              />
              
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-red-900/30 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" /> Processando...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} /> Gerar Visualização
                  </>
                )}
              </button>
              {error && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-black rounded-3xl aspect-square flex items-center justify-center overflow-hidden border border-gray-800 shadow-2xl relative group ring-1 ring-white/10">
              {loading ? (
                <div className="text-center p-8">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-red-600 rounded-full animate-spin"></div>
                  </div>
                  <p className="text-gray-300 font-medium text-lg animate-pulse">Renderizando veículo...</p>
                  <p className="text-gray-600 text-sm mt-2">Isso pode levar alguns segundos</p>
                </div>
              ) : generatedImage ? (
                <div className="relative w-full h-full">
                  <img 
                    src={generatedImage} 
                    alt="Generated Car" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-8">
                    <span className="text-white/90 text-sm font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                      Gerado por Gemini AI
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-600 p-12">
                  <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-800">
                    <ImageIcon className="w-10 h-10 opacity-30" />
                  </div>
                  <h3 className="text-gray-500 font-medium text-lg mb-2">Nenhuma imagem gerada</h3>
                  <p className="text-gray-700 text-sm max-w-xs mx-auto">Digite uma descrição ao lado e clique em gerar para ver a mágica acontecer.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarVisualizer;