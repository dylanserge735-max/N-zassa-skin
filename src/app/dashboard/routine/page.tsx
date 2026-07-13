'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import {
  Sun,
  Moon,
  Check,
  Clock,
  Droplets,
  Sparkles,
  ChevronRight,
  Plus,
  Edit,
  Apple,
  Bed,
  Dumbbell
} from 'lucide-react';

interface RoutineStep {
  id: number;
  name: string;
  description: string;
  duration: string;
  completed: boolean;
}

export default function RoutinePage() {
  const [activeTab, setActiveTab] = useState<'skincare' | 'nutrition'>('skincare');
  
  const [morningRoutine, setMorningRoutine] = useState<RoutineStep[]>([
    { id: 1, name: 'Nettoyant doux', description: 'Gel moussant à l\'aloe vera', duration: '1 min', completed: true },
    { id: 2, name: 'Sérum Vitamine C', description: 'Pour l\'éclat et protection antioxydante', duration: '30 sec', completed: false },
    { id: 3, name: 'Crème hydratante', description: 'Légère, non comédogène', duration: '30 sec', completed: false },
    { id: 4, name: 'Protection solaire SPF 50', description: 'Sans trace blanche', duration: '1 min', completed: false },
  ]);

  const [eveningRoutine, setEveningRoutine] = useState<RoutineStep[]>([
    { id: 1, name: 'Huile démaquillante', description: 'Retire impuretés et SPF', duration: '1 min', completed: false },
    { id: 2, name: 'Nettoyant purifiant', description: 'Double nettoyage', duration: '1 min', completed: false },
    { id: 3, name: 'Sérum Niacinamide 5%', description: 'Anti-taches, uniformisant', duration: '30 sec', completed: false },
    { id: 4, name: 'Crème réparatrice nuit', description: 'Régénération cellulaire', duration: '30 sec', completed: false },
  ]);

  const nutritionTips = [
    { icon: Droplets, title: 'Hydratation', goal: '8 verres/jour', current: 5, unit: 'verres' },
    { icon: Apple, title: 'Fruits & Légumes', goal: '5 portions/jour', current: 3, unit: 'portions' },
    { icon: Bed, title: 'Sommeil', goal: '8h/nuit', current: 7, unit: 'heures' },
    { icon: Dumbbell, title: 'Activité physique', goal: '30 min/jour', current: 20, unit: 'minutes' },
  ];

  const toggleStep = (routineType: 'morning' | 'evening', stepId: number) => {
    if (routineType === 'morning') {
      setMorningRoutine(prev =>
        prev.map(step =>
          step.id === stepId ? { ...step, completed: !step.completed } : step
        )
      );
    } else {
      setEveningRoutine(prev =>
        prev.map(step =>
          step.id === stepId ? { ...step, completed: !step.completed } : step
        )
      );
    }
  };

  const calculateProgress = (routine: RoutineStep[]) => {
    const completed = routine.filter(s => s.completed).length;
    return Math.round((completed / routine.length) * 100);
  };

  return (
    <div className="pb-20 lg:pb-0 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0D0D0D]" style={{ fontFamily: 'Playfair Display, serif' }}>
          Ma Routine
        </h1>
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4 mr-2" />
          Modifier
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
        <button
          onClick={() => setActiveTab('skincare')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === 'skincare'
              ? 'bg-white text-[#0D0D0D] shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Soins
        </button>
        <button
          onClick={() => setActiveTab('nutrition')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === 'nutrition'
              ? 'bg-white text-[#0D0D0D] shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Apple className="w-4 h-4" />
          Nutrition
        </button>
      </div>

      {activeTab === 'skincare' ? (
        <>
          {/* Morning Routine */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Sun className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-[#0D0D0D]">Routine du matin</h2>
                  <p className="text-sm text-gray-500">~4 minutes</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#D4AF37]">{calculateProgress(morningRoutine)}%</p>
                <p className="text-xs text-gray-500">complété</p>
              </div>
            </div>

            <div className="space-y-3">
              {morningRoutine.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer ${
                    step.completed ? 'bg-green-50' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => toggleStep('morning', step.id)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.completed ? 'bg-green-500' : 'bg-[#D4AF37]'
                  }`}>
                    {step.completed ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${step.completed ? 'text-gray-400 line-through' : 'text-[#0D0D0D]'}`}>
                      {step.name}
                    </p>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {step.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Evening Routine */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Moon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-[#0D0D0D]">Routine du soir</h2>
                  <p className="text-sm text-gray-500">~5 minutes</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#D4AF37]">{calculateProgress(eveningRoutine)}%</p>
                <p className="text-xs text-gray-500">complété</p>
              </div>
            </div>

            <div className="space-y-3">
              {eveningRoutine.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer ${
                    step.completed ? 'bg-green-50' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => toggleStep('evening', step.id)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.completed ? 'bg-green-500' : 'bg-[#5C4033]'
                  }`}>
                    {step.completed ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${step.completed ? 'text-gray-400 line-through' : 'text-[#0D0D0D]'}`}>
                      {step.name}
                    </p>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {step.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Custom Step */}
          <button className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-[#D4AF37] hover:text-[#5C4033] transition-colors">
            <Plus className="w-5 h-5" />
            Ajouter une étape personnalisée
          </button>
        </>
      ) : (
        <>
          {/* Nutrition Tab */}
          <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#5C4033]/10 rounded-2xl p-6">
            <h2 className="font-semibold text-[#0D0D0D] mb-2">Programme nutritionnel</h2>
            <p className="text-sm text-gray-600 mb-4">
              Suivez vos objectifs quotidiens pour une peau en pleine santé
            </p>
          </div>

          {/* Nutrition Goals */}
          <div className="grid grid-cols-2 gap-4">
            {nutritionTips.map((tip) => (
              <div key={tip.title} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                    <tip.icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <span className="font-medium text-[#0D0D0D]">{tip.title}</span>
                </div>
                <div className="mb-2">
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold text-[#5C4033]">{tip.current}</span>
                    <span className="text-sm text-gray-400 mb-1">/ {tip.goal.split('/')[0]}</span>
                  </div>
                  <p className="text-xs text-gray-500">{tip.unit} aujourd&apos;hui</p>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#5C4033] rounded-full transition-all"
                    style={{ width: `${Math.min((tip.current / parseInt(tip.goal)) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Nutrition Tips */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#0D0D0D] mb-4">Conseils nutritionnels</h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Privilégiez les antioxydants',
                  description: 'Fruits rouges, agrumes, légumes verts foncés pour combattre les radicaux libres.'
                },
                {
                  title: 'Oméga-3 pour l\'éclat',
                  description: 'Poissons gras, noix et graines de lin pour une peau souple et lumineuse.'
                },
                {
                  title: 'Limitez le sucre',
                  description: 'L\'excès de sucre favorise l\'inflammation et peut aggraver l\'acné.'
                },
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[#0D0D0D]">{tip.title}</p>
                    <p className="text-sm text-gray-500">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Questionnaire */}
          <div className="bg-[#0D0D0D] rounded-2xl p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Programme personnalisé</h3>
                <p className="text-sm text-gray-400">Complétez le questionnaire pour des conseils sur mesure</p>
              </div>
              <Button variant="primary" size="sm">
                Commencer <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
