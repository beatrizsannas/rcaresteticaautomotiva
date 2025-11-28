import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Upload, Wand2, RefreshCw, Download, Image as ImageIcon } from 'lucide-react';
import { GeminiModel } from '../types';

const CarVisualizer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setGeneratedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage || !prompt) return;

    setIsGenerating(true);
    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      const ai = new GoogleGenAI({ apiKey });
      
      // Extract base64 data
      const base64Data = selectedImage.split(',')[1] ?? '';
      const mimeType = selectedImage.split(';')[0]?.split(':')[1] ?? 'image/png';

      // Using Gemini 2.5 Flash Image (Nano Banana) for editing/transformation
      // The prompt instructs the model to edit the provided image.
      const fullPrompt = `Edit this car image: ${prompt}. Maintain the car's identity but apply the requested style or effect. High quality, photorealistic automotive photography.`;

      const response = await ai.models.generateContent({
        model: GeminiModel.FLASH_IMAGE,
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: mimeType,
                  data: base64Data
                }
              },
              { text: fullPrompt }
            ]
          }
        ],
      });

      // Parse response to find image
      let foundImage = null;
      if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            foundImage = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (foundImage) {
        setGeneratedImage(foundImage);
      } else {
        alert("A IA gerou apenas texto. Tente refazer o prompt pedindo uma alteração visual específica.");
        console.log(response.text);
      }

    } catch (error) {
      console.error("Image Gen Error:", error);
      alert("Erro ao processar imagem. Verifique se o formato é suportado.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="ai-visualizer" className="py-24 bg-rcar-black relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-rcar-neon/5 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
            <Wand2 className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-xs font-bold uppercase tracking-widest">Nano Banana Engine</span>
          </div>
          <h2 className="font-display font-bold text-4xl text-white mb-4">
            VISUALIZADOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-rcar-neon to-purple-500">FUTURISTA</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Envie uma foto do seu carro e use nossa IA para visualizar como ele ficaria em um showroom, com pintura neon, ou sob uma iluminação de estúdio.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-gray-700 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Input Side */}
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-600 rounded-xl h-64 flex flex-col items-center justify-center bg-gray-900/50 hover:bg-gray-900 transition-colors relative overflow-hidden group">
                {selectedImage ? (
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-6">
                    <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4 group-hover:text-rcar-neon transition-colors" />
                    <p className="text-gray-300 font-medium">Arraste ou clique para enviar foto</p>
                    <p className="text-gray-500 text-sm mt-2">JPG ou PNG</p>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-wide">Comando Mágico</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ex: Adicionar brilho de cera, fundo showroom de luxo..."
                    className="flex-1 bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-rcar-neon focus:outline-none"
                  />
                  <button
                    onClick={handleGenerate}
                    disabled={!selectedImage || isGenerating || !prompt}
                    className="bg-gradient-to-r from-rcar-neon to-cyan-600 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider disabled:opacity-50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center gap-2"
                  >
                    {isGenerating ? <RefreshCw className="animate-spin w-5 h-5" /> : <Wand2 className="w-5 h-5" />}
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap mt-2">
                  {['Showroom futurista', 'Efeito Neon', 'Acabamento Cerâmico', 'Preto Fosco'].map(s => (
                    <button key={s} onClick={() => setPrompt(s)} className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-full transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Output Side */}
            <div className="border border-gray-700 rounded-xl h-64 lg:h-auto bg-black/50 flex items-center justify-center relative overflow-hidden">
               {isGenerating && (
                 <div className="absolute inset-0 bg-black/80 z-20 flex flex-col items-center justify-center">
                   <div className="w-16 h-16 border-4 border-rcar-neon border-t-transparent rounded-full animate-spin mb-4"></div>
                   <p className="text-rcar-neon font-display animate-pulse">PROCESSANDO IMAGEM...</p>
                 </div>
               )}
               
               {generatedImage ? (
                 <>
                   <img src={generatedImage} alt="Generated" className="w-full h-full object-contain" />
                   <a 
                    href={generatedImage} 
                    download="rcar-vision.png"
                    className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full hover:bg-rcar-neon transition-colors shadow-lg z-10"
                   >
                     <Download className="w-5 h-5" />
                   </a>
                 </>
               ) : (
                 <div className="text-center opacity-30">
                   <ImageIcon className="w-20 h-20 mx-auto mb-4" />
                   <p className="font-display text-xl uppercase">O resultado aparecerá aqui</p>
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
