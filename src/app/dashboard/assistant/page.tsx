'use client';

import { useState, useRef, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { Send, Bot, User, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "Comment réduire l'hyperpigmentation ?",
  "Quelle routine pour peau grasse ?",
  "Les meilleurs ingrédients anti-taches",
  "Comment prévenir l'acné ?",
  "Hydratation pour peau sèche",
  "Protection solaire pour peau foncée",
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Bonjour ! 👋 Je suis votre assistant N'Zassa Skin, spécialisé dans les soins pour peaux africaines et métissées. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses: Record<string, string> = {
      hyperpigmentation: `Pour réduire l'hyperpigmentation sur les peaux africaines, je recommande :

1. **Sérum Vitamine C** - Appliquez le matin pour son effet éclaircissant et antioxydant
2. **Niacinamide (5-10%)** - Aide à uniformiser le teint
3. **Protection solaire SPF 50** - Essentielle pour prévenir l'aggravation des taches
4. **Acide azélaïque** - Efficace contre les taches sans irriter

🔸 Soyez patiente, les résultats apparaissent généralement après 8-12 semaines d'utilisation régulière.

⚠️ En cas de taches persistantes, consultez un dermatologue.`,
      
      grasse: `Voici une routine adaptée aux peaux grasses :

**Matin :**
1. Nettoyant gel moussant sans savon
2. Sérum niacinamide (régule le sébum)
3. Crème hydratante légère sans huile
4. Protection solaire matifiante SPF 50

**Soir :**
1. Double nettoyage (huile + gel)
2. Sérum acide salicylique (2x/semaine)
3. Crème hydratante légère

💡 N'oubliez pas : même les peaux grasses ont besoin d'hydratation !`,
      
      default: `Merci pour votre question ! 

Je suis spécialisé dans les conseils pour les peaux africaines et métissées. Je peux vous aider avec :

• Routines de soins personnalisées
• Recommandations de produits
• Questions sur l'hyperpigmentation et les taches
• Conseils nutrition et hydratation
• Bien-être et hygiène de vie

Comment puis-je vous aider plus précisément ?

⚠️ Rappel : mes conseils sont informatifs et ne remplacent pas l'avis d'un dermatologue.`,
    };

    let response = responses.default;
    const lowerInput = userMessage.content.toLowerCase();
    
    if (lowerInput.includes('hyperpigmentation') || lowerInput.includes('tache')) {
      response = responses.hyperpigmentation;
    } else if (lowerInput.includes('grasse') || lowerInput.includes('routine')) {
      response = responses.grasse;
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="pb-20 lg:pb-0 flex flex-col h-[calc(100vh-140px)] lg:h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0D0D0D]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Assistant IA
          </h1>
          <p className="text-sm text-gray-500">Votre expert en soins de la peau</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#5C4033] flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-white rounded-2xl p-4 shadow-sm mb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user'
                    ? 'bg-[#5C4033]'
                    : 'bg-gradient-to-br from-[#D4AF37] to-[#5C4033]'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-[#5C4033] text-white rounded-tr-md'
                    : 'bg-gray-100 text-[#0D0D0D] rounded-tl-md'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
                <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-white/60' : 'text-gray-400'}`}>
                  {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#5C4033] flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-md p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-[#D4AF37] animate-spin" />
                  <span className="text-sm text-gray-500">En train de réfléchir...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Questions */}
      {messages.length <= 2 && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            Questions suggérées
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                onClick={() => handleSuggestedQuestion(question)}
                className="text-sm px-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:border-[#D4AF37] hover:text-[#5C4033] transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800">
            Les conseils fournis sont informatifs et ne remplacent pas une consultation médicale.
          </p>
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Posez votre question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="w-full px-4 py-3 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors pr-12"
            disabled={isLoading}
          />
        </div>
        <Button
          variant="primary"
          onClick={handleSend}
          disabled={!inputValue.trim() || isLoading}
          className="!p-3"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
