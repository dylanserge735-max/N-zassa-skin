'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ScoreRing from '@/components/ui/ScoreRing';
import Button from '@/components/ui/Button';
import {
  Camera,
  TrendingUp,
  Droplets,
  Sun,
  Moon,
  ChevronRight,
  Sparkles,
  Calendar,
  ShoppingBag,
  AlertCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface Analysis {
  overallHealth: number;
  hydrationScore: number;
  uniformityScore: number;
  imperfectionsScore: number;
  analysisDate: string;
}

export default function DashboardPage() {
  const [latestAnalysis, setLatestAnalysis] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await fetch('/api/analysis/latest');
        if (res.ok) {
          const data = await res.json();
          setLatestAnalysis(data.analysis);
        }
      } catch (error) {
        console.error('Error fetching analysis:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  const routineTasks = [
    {
      time: 'Matin',
      icon: Sun,
      color: '#F59E0B',
      tasks: [
        { name: 'Nettoyant doux', done: true },
        { name: 'Sérum vitamine C', done: false },
        { name: 'Protection solaire SPF 50', done: false },
      ],
    },
    {
      time: 'Soir',
      icon: Moon,
      color: '#6366F1',
      tasks: [
        { name: 'Démaquillage', done: false },
        { name: 'Nettoyant purifiant', done: false },
        { name: 'Sérum niacinamide', done: false },
        { name: 'Crème hydratante', done: false },
      ],
    },
  ];

  const tips = [
    {
      title: "Hydratation",
      description: "Buvez au moins 8 verres d'eau par jour pour une peau hydratée",
      icon: Droplets,
      color: '#3B82F6',
    },
    {
      title: "Protection solaire",
      description: "Appliquez une protection SPF 30+ même par temps nuageux",
      icon: Sun,
      color: '#F59E0B',
    },
  ];

  return (
    <div className="pb-20 lg:pb-0 space-y-6">
      {/* Welcome Card */}
      {!latestAnalysis && !isLoading && (
        <div className="bg-gradient-to-br from-[#5C4033] to-[#3E2A22] rounded-2xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
              <Camera className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">Bienvenue sur N&apos;Zassa Skin!</h2>
              <p className="text-gray-300 mb-4">
                Commencez par une analyse de votre peau pour obtenir des recommandations personnalisées.
              </p>
              <Link href="/dashboard/analysis">
                <Button variant="primary" size="sm">
                  Commencer l&apos;analyse
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Skin Score Overview */}
      {latestAnalysis && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#0D0D0D]">Score de votre peau</h2>
              <p className="text-sm text-gray-500">
                Dernière analyse: {new Date(latestAnalysis.analysisDate).toLocaleDateString('fr-FR')}
              </p>
            </div>
            <Link href="/dashboard/analysis" className="text-[#D4AF37] text-sm font-medium flex items-center gap-1">
              Nouvelle analyse <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-center justify-center mb-6">
            <ScoreRing score={latestAnalysis.overallHealth} size={160} label="Santé globale" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Hydratation', value: latestAnalysis.hydrationScore, trend: 5 },
              { label: 'Uniformité', value: latestAnalysis.uniformityScore, trend: -2 },
              { label: 'Imperfections', value: latestAnalysis.imperfectionsScore, trend: 8 },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="mb-2">
                  <span className="text-2xl font-bold text-[#0D0D0D]">{item.value}</span>
                  <span className="text-gray-400 text-sm">/100</span>
                </div>
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <div className={`inline-flex items-center gap-1 text-xs ${item.trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {item.trend >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {Math.abs(item.trend)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Routine */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#0D0D0D]">Routine du jour</h2>
          <Link href="/dashboard/routine" className="text-[#D4AF37] text-sm font-medium flex items-center gap-1">
            Voir tout <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-6">
          {routineTasks.map((routine) => (
            <div key={routine.time}>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${routine.color}20` }}
                >
                  <routine.icon className="w-4 h-4" style={{ color: routine.color }} />
                </div>
                <span className="font-semibold text-[#0D0D0D]">{routine.time}</span>
                <span className="text-xs text-gray-400">
                  {routine.tasks.filter(t => t.done).length}/{routine.tasks.length} complété
                </span>
              </div>
              <div className="space-y-2 ml-11">
                {routine.tasks.map((task, index) => (
                  <label key={index} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked={task.done}
                      className="w-5 h-5 rounded-lg border-2 border-gray-200 text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <span className={`text-sm ${task.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {task.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/dashboard/progress" className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-[#10B981]" />
          </div>
          <h3 className="font-semibold text-[#0D0D0D] mb-1">Progression</h3>
          <p className="text-sm text-gray-500">Suivez votre évolution</p>
        </Link>

        <Link href="/dashboard/marketplace" className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center mb-4">
            <ShoppingBag className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <h3 className="font-semibold text-[#0D0D0D] mb-1">Marketplace</h3>
          <p className="text-sm text-gray-500">Produits recommandés</p>
        </Link>
      </div>

      {/* Daily Tips */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#0D0D0D]">Conseils du jour</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${tip.color}15` }}
                >
                  <tip.icon className="w-5 h-5" style={{ color: tip.color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0D0D0D] mb-1">{tip.title}</h3>
                  <p className="text-sm text-gray-500">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming */}
      <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#5C4033]/10 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
            <Calendar className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[#0D0D0D]">Photo de progression</h3>
            <p className="text-sm text-gray-500">Prévue dans 7 jours (Jour 30)</p>
          </div>
          <Button variant="outline" size="sm">
            Rappeler
          </Button>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800">
              <strong>Rappel :</strong> Les analyses N&apos;Zassa Skin sont informatives et ne remplacent pas l&apos;avis d&apos;un dermatologue.
            </p>
            <button className="text-sm text-amber-600 font-medium mt-1 hover:underline">
              Trouver un dermatologue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
