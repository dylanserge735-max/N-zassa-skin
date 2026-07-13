'use client';

import { useState } from 'react';
import Image from 'next/image';
import ScoreRing from '@/components/ui/ScoreRing';
import Button from '@/components/ui/Button';
import { useImageUpload } from '@/hooks/useImageUpload';
import {
  Camera,
  Calendar,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Loader2,
  Upload
} from 'lucide-react';

interface ProgressDay {
  day: number;
  date: string;
  photo: string | null;
  scores: {
    overall: number;
    hydration: number;
    uniformity: number;
    imperfections: number;
  };
}

export default function ProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'30' | '60' | '90'>('30');
  const [uploadingDay, setUploadingDay] = useState<number | null>(null);
  
  const { upload, isUploading } = useImageUpload({
    type: 'progressPhoto',
  });
  
  // Mock progress data - in production, this would come from the database
  const [progressData, setProgressData] = useState<ProgressDay[]>([
    {
      day: 1,
      date: '2025-01-15',
      photo: null,
      scores: { overall: 65, hydration: 60, uniformity: 55, imperfections: 70 },
    },
    {
      day: 30,
      date: '2025-02-14',
      photo: null,
      scores: { overall: 72, hydration: 75, uniformity: 65, imperfections: 75 },
    },
    {
      day: 60,
      date: '2025-03-16',
      photo: null,
      scores: { overall: 0, hydration: 0, uniformity: 0, imperfections: 0 },
    },
    {
      day: 90,
      date: '2025-04-15',
      photo: null,
      scores: { overall: 0, hydration: 0, uniformity: 0, imperfections: 0 },
    },
  ]);

  const handleProgressPhotoUpload = async (day: number, file: File) => {
    setUploadingDay(day);
    const result = await upload(file);
    if (result) {
      setProgressData(prev => prev.map(item => 
        item.day === day 
          ? { ...item, photo: result.url, date: new Date().toISOString().split('T')[0] }
          : item
      ));
    }
    setUploadingDay(null);
  };

  const chartData = [
    { month: 'Jan', acne: 35, spots: 42, skin: 60 },
    { month: 'Fév', acne: 28, spots: 38, skin: 68 },
    { month: 'Mar', acne: 22, spots: 30, skin: 75 },
    { month: 'Avr', acne: 18, spots: 25, skin: 80 },
  ];

  const improvements = [
    { label: 'Acné', change: -45, color: '#10B981' },
    { label: 'Taches', change: -32, color: '#10B981' },
    { label: 'Hydratation', change: +28, color: '#10B981' },
    { label: 'Uniformité', change: +18, color: '#10B981' },
  ];

  return (
    <div className="pb-20 lg:pb-0 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-[#0D0D0D]" style={{ fontFamily: 'Playfair Display, serif' }}>
          Suivi de progression
        </h1>
        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#D4AF37] to-[#E8C547] text-[#0D0D0D] cursor-pointer hover:shadow-lg transition-all">
          <Camera className="w-4 h-4" />
          Nouvelle photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              // Find the next day without a photo
              const nextDay = progressData.find(d => !d.photo);
              if (file && nextDay) {
                handleProgressPhotoUpload(nextDay.day, file);
              }
            }}
            disabled={isUploading}
          />
        </label>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
        {(['30', '60', '90'] as const).map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              selectedPeriod === period
                ? 'bg-white text-[#0D0D0D] shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {period} jours
          </button>
        ))}
      </div>

      {/* Progress Photos Comparison */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-[#0D0D0D] mb-4">Comparaison photos</h2>
        <div className="grid grid-cols-4 gap-3">
          {progressData.map((item) => (
            <div key={item.day} className="text-center">
              <div className={`aspect-square rounded-xl mb-2 overflow-hidden relative ${
                item.photo ? '' : 'bg-gray-100'
              }`}>
                {uploadingDay === item.day ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                    <Loader2 className="w-6 h-6 text-[#D4AF37] animate-spin mb-1" />
                    <span className="text-xs text-gray-500">Upload...</span>
                  </div>
                ) : item.photo ? (
                  <Image
                    src={item.photo}
                    alt={`Jour ${item.day}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 transition-colors">
                    <Camera className="w-6 h-6 mb-1" />
                    <span className="text-xs">Ajouter</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleProgressPhotoUpload(item.day, file);
                      }}
                      disabled={isUploading}
                    />
                  </label>
                )}
              </div>
              <p className="text-sm font-medium text-[#0D0D0D]">Jour {item.day}</p>
              <p className="text-xs text-gray-500">
                {item.photo ? new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : '-'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Score Evolution */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-[#0D0D0D]">Évolution des scores</h2>
          <div className="flex items-center gap-2">
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-500">Janvier - Avril 2025</span>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chart Legend */}
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <span className="text-sm text-gray-600">Acné</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <span className="text-sm text-gray-600">Taches</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="text-sm text-gray-600">Santé peau</span>
          </div>
        </div>

        {/* Simple Bar Chart */}
        <div className="flex items-end justify-between h-48 gap-4">
          {chartData.map((data) => (
            <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end justify-center gap-1 h-40">
                <div
                  className="w-4 bg-[#EF4444] rounded-t-md transition-all"
                  style={{ height: `${data.acne}%` }}
                />
                <div
                  className="w-4 bg-[#F59E0B] rounded-t-md transition-all"
                  style={{ height: `${data.spots}%` }}
                />
                <div
                  className="w-4 bg-[#10B981] rounded-t-md transition-all"
                  style={{ height: `${data.skin}%` }}
                />
              </div>
              <span className="text-sm text-gray-500">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Improvements Summary */}
      <div className="bg-gradient-to-br from-[#5C4033] to-[#3E2A22] rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <h2 className="font-semibold">Améliorations constatées</h2>
            <p className="text-sm text-gray-300">Depuis le début de votre parcours</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {improvements.map((item) => (
            <div key={item.label} className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">{item.label}</span>
                <div className={`flex items-center gap-1 ${item.change < 0 ? 'text-green-400' : 'text-green-400'}`}>
                  {item.change < 0 ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />}
                </div>
              </div>
              <p className="text-2xl font-bold text-[#D4AF37]">
                {item.change > 0 ? '+' : ''}{item.change}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-[#0D0D0D] mb-6">Scores actuels</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Santé globale', value: 78 },
            { label: 'Hydratation', value: 82 },
            { label: 'Uniformité', value: 68 },
            { label: 'Imperfections', value: 72 },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <ScoreRing score={item.value} size={90} />
              <span className="text-sm text-gray-600 mt-2">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Photo Reminder */}
      <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#5C4033]/10 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center">
            <Calendar className="w-7 h-7 text-[#D4AF37]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[#0D0D0D]">Prochaine photo de progression</h3>
            <p className="text-sm text-gray-500">Jour 60 - Dans 14 jours</p>
          </div>
          <Button variant="outline" size="sm">
            Rappeler
          </Button>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-[#0D0D0D] mb-4">Conseils pour de meilleurs résultats</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-sm text-gray-600">
            <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-[#D4AF37]">1</span>
            </div>
            Prenez vos photos à la même heure et avec le même éclairage
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-600">
            <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-[#D4AF37]">2</span>
            </div>
            Gardez le même angle et la même distance de la caméra
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-600">
            <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-[#D4AF37]">3</span>
            </div>
            Soyez constante avec votre routine pour voir de vrais résultats
          </li>
        </ul>
      </div>
    </div>
  );
}
