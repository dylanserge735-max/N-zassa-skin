'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ScoreRing from '@/components/ui/ScoreRing';
import { useImageUpload } from '@/hooks/useImageUpload';
import {
  Camera,
  Upload,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Sparkles,
  Check,
  Sun,
  Moon,
  Droplets,
  Zap,
  X,
  Loader2
} from 'lucide-react';

type AnalysisStep = 'intro' | 'photos' | 'analyzing' | 'results';

interface PhotoData {
  url: string;
  publicId: string;
}

interface AnalysisResults {
  overallHealth: number;
  hydrationScore: number;
  uniformityScore: number;
  imperfectionsScore: number;
  irritationRisk: number;
  details: {
    acne: number;
    activeBreakouts: number;
    postAcneMarks: number;
    hyperpigmentation: number;
    brownSpots: number;
    redness: number;
    darkCircles: number;
    skinTexture: number;
    globalRadiance: number;
  };
  morningRoutine: Array<{ step: string; product: string; description: string }>;
  eveningRoutine: Array<{ step: string; product: string; description: string }>;
}

export default function AnalysisPage() {
  const [step, setStep] = useState<AnalysisStep>('intro');
  const [photos, setPhotos] = useState<{
    front: PhotoData | null;
    leftProfile: PhotoData | null;
    rightProfile: PhotoData | null;
    forehead: PhotoData | null;
  }>({
    front: null,
    leftProfile: null,
    rightProfile: null,
    forehead: null,
  });
  const [currentPhotoStep, setCurrentPhotoStep] = useState(0);
  const [results, setResults] = useState<AnalysisResults | null>(null);

  const { upload, deleteImage, isUploading, progress, error: uploadError } = useImageUpload({
    type: 'skinAnalysis',
  });

  const photoSteps = [
    { key: 'front', label: 'Face avant', instruction: 'Regardez directement la caméra, visage détendu' },
    { key: 'leftProfile', label: 'Profil gauche', instruction: 'Tournez la tête vers la droite, profil gauche visible' },
    { key: 'rightProfile', label: 'Profil droit', instruction: 'Tournez la tête vers la gauche, profil droit visible' },
    { key: 'forehead', label: 'Front', instruction: 'Inclinez légèrement la tête en arrière, front bien visible' },
  ];

  const handlePhotoUpload = async (key: string, file: File) => {
    const result = await upload(file);
    if (result) {
      setPhotos(prev => ({
        ...prev,
        [key]: { url: result.url, publicId: result.publicId }
      }));
      if (currentPhotoStep < photoSteps.length - 1) {
        setCurrentPhotoStep(currentPhotoStep + 1);
      }
    }
  };

  const handleDeletePhoto = async (key: string) => {
    const photo = photos[key as keyof typeof photos];
    if (photo) {
      await deleteImage(photo.publicId);
      setPhotos(prev => ({ ...prev, [key]: null }));
    }
  };

  const handleFileSelect = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handlePhotoUpload(key, file);
    }
  };

  const allPhotosComplete = Object.values(photos).every(p => p !== null);
  const somePhotosComplete = Object.values(photos).some(p => p !== null);

  const startAnalysis = async () => {
    setStep('analyzing');

    // In production, send photos to AI service for analysis
    // For now, simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock results
    setResults({
      overallHealth: 78,
      hydrationScore: 82,
      uniformityScore: 68,
      imperfectionsScore: 72,
      irritationRisk: 25,
      details: {
        acne: 15,
        activeBreakouts: 3,
        postAcneMarks: 8,
        hyperpigmentation: 35,
        brownSpots: 22,
        redness: 18,
        darkCircles: 40,
        skinTexture: 75,
        globalRadiance: 70,
      },
      morningRoutine: [
        { step: '1', product: 'Nettoyant doux', description: 'Nettoyer délicatement sans agresser la peau' },
        { step: '2', product: 'Sérum Vitamine C', description: 'Pour l\'éclat et la protection antioxydante' },
        { step: '3', product: 'Crème hydratante légère', description: 'Hydrater et protéger la barrière cutanée' },
        { step: '4', product: 'Protection solaire SPF 50', description: 'Protection contre l\'hyperpigmentation' },
      ],
      eveningRoutine: [
        { step: '1', product: 'Huile démaquillante', description: 'Retirer les impuretés et le SPF' },
        { step: '2', product: 'Nettoyant purifiant', description: 'Nettoyer en profondeur les pores' },
        { step: '3', product: 'Sérum Niacinamide 5%', description: 'Réduire les taches et uniformiser le teint' },
        { step: '4', product: 'Crème réparatrice nuit', description: 'Nourrir et régénérer pendant le sommeil' },
      ],
    });

    setStep('results');
  };

  return (
    <div className="pb-20 lg:pb-0 max-w-4xl mx-auto">
      {/* Intro Step */}
      {step === 'intro' && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#5C4033]/20 flex items-center justify-center">
              <Camera className="w-10 h-10 text-[#D4AF37]" />
            </div>
            <h1 className="text-2xl font-bold text-[#0D0D0D] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Analyse IA de votre peau
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Prenez 4 photos de votre visage pour une analyse complète et des recommandations personnalisées.
            </p>
          </div>

          {/* What we analyze */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-[#0D0D0D] mb-4">Ce que nous analysons</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                'Acné & boutons',
                'Hyperpigmentation',
                'Taches brunes',
                'Zones grasses/sèches',
                'Cernes',
                'Uniformité du teint',
                'Texture',
                'Éclat global',
                'Rougeurs',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#D4AF37]" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Tips for good photos */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-[#0D0D0D] mb-4">Pour de meilleurs résultats</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                Placez-vous face à une lumière naturelle ou bien éclairée
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                Retirez tout maquillage pour une analyse précise
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                Gardez un visage détendu et neutre
              </li>
            </ul>
          </div>

          {/* Medical disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Cette analyse est générée par IA à titre informatif uniquement. Elle ne constitue pas un diagnostic médical.
              </p>
            </div>
          </div>

          <Button variant="primary" fullWidth onClick={() => setStep('photos')}>
            Commencer l&apos;analyse
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}

      {/* Photos Step */}
      {step === 'photos' && (
        <div className="space-y-6">
          <button
            onClick={() => setStep('intro')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#5C4033]"
          >
            <ChevronLeft className="w-5 h-5" />
            Retour
          </button>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-6">
            {photoSteps.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  photos[photoSteps[index].key as keyof typeof photos]
                    ? 'bg-[#D4AF37]'
                    : index === currentPhotoStep
                    ? 'bg-[#D4AF37]/50'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Upload Error */}
          {uploadError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-red-800">{uploadError}</p>
            </div>
          )}

          {/* Current photo step */}
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <span className="text-sm text-[#D4AF37] font-medium">
              Photo {currentPhotoStep + 1} / {photoSteps.length}
            </span>
            <h2 className="text-xl font-bold text-[#0D0D0D] mt-2 mb-1">
              {photoSteps[currentPhotoStep].label}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              {photoSteps[currentPhotoStep].instruction}
            </p>

            {/* Photo preview area */}
            <div className="relative w-64 h-64 mx-auto mb-6 rounded-2xl bg-gray-100 overflow-hidden">
              {isUploading ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <Loader2 className="w-10 h-10 text-[#D4AF37] animate-spin mb-3" />
                  <span className="text-sm text-gray-500">Upload en cours... {progress}%</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                    <div 
                      className="h-full bg-[#D4AF37] rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ) : photos[photoSteps[currentPhotoStep].key as keyof typeof photos] ? (
                <>
                  <Image
                    src={photos[photoSteps[currentPhotoStep].key as keyof typeof photos]!.url}
                    alt={photoSteps[currentPhotoStep].label}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => handleDeletePhoto(photoSteps[currentPhotoStep].key)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Uploadé
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 transition-colors">
                  <Camera className="w-16 h-16 mb-2" />
                  <span className="text-sm">Cliquez pour ajouter</span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="user"
                    className="hidden"
                    onChange={(e) => handleFileSelect(photoSteps[currentPhotoStep].key, e)}
                    disabled={isUploading}
                  />
                </label>
              )}
            </div>

            <div className="flex gap-4 justify-center">
              <label className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all cursor-pointer ${
                isUploading 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#D4AF37] to-[#E8C547] text-[#0D0D0D] hover:shadow-lg'
              }`}>
                <Camera className="w-5 h-5" />
                Prendre la photo
                <input
                  type="file"
                  accept="image/*"
                  capture="user"
                  className="hidden"
                  onChange={(e) => handleFileSelect(photoSteps[currentPhotoStep].key, e)}
                  disabled={isUploading}
                />
              </label>
              <label className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 transition-all cursor-pointer ${
                isUploading 
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'border-[#5C4033] text-[#5C4033] hover:bg-[#5C4033] hover:text-white'
              }`}>
                <Upload className="w-5 h-5" />
                Importer
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileSelect(photoSteps[currentPhotoStep].key, e)}
                  disabled={isUploading}
                />
              </label>
            </div>
          </div>

          {/* Photo thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {photoSteps.map((photoStep, index) => (
              <button
                key={photoStep.key}
                onClick={() => setCurrentPhotoStep(index)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  index === currentPhotoStep
                    ? 'border-[#D4AF37]'
                    : photos[photoStep.key as keyof typeof photos]
                    ? 'border-green-500'
                    : 'border-gray-200'
                }`}
              >
                {photos[photoStep.key as keyof typeof photos] ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={photos[photoStep.key as keyof typeof photos]!.url}
                      alt={photoStep.label}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Start analysis button */}
          {somePhotosComplete && (
            <Button 
              variant="primary" 
              fullWidth 
              onClick={startAnalysis}
              disabled={isUploading}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {allPhotosComplete ? 'Lancer l\'analyse IA' : 'Analyser avec les photos disponibles'}
            </Button>
          )}

          {!somePhotosComplete && (
            <p className="text-center text-sm text-gray-500">
              Uploadez au moins une photo pour continuer
            </p>
          )}
        </div>
      )}

      {/* Analyzing Step */}
      {step === 'analyzing' && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/20" />
            <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#5C4033]/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[#D4AF37] animate-pulse" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-2">Analyse en cours...</h2>
          <p className="text-gray-500">Notre IA analyse votre peau en détail</p>
          <div className="mt-8 space-y-2 max-w-xs mx-auto">
            {['Détection des imperfections', 'Analyse de la texture', 'Évaluation de l\'hydratation', 'Génération des recommandations'].map((text, i) => (
              <div key={text} className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                  <Check className="w-3 h-3 text-[#D4AF37]" />
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Step */}
      {step === 'results' && results && (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <h2 className="text-xl font-bold text-[#0D0D0D] mb-6">Résultats de votre analyse</h2>
            <ScoreRing score={results.overallHealth} size={180} label="Santé globale de la peau" />
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Hydratation', value: results.hydrationScore, icon: Droplets, color: '#3B82F6' },
              { label: 'Uniformité', value: results.uniformityScore, icon: Sparkles, color: '#D4AF37' },
              { label: 'Imperfections', value: results.imperfectionsScore, icon: Zap, color: '#10B981' },
              { label: 'Risque irritation', value: 100 - results.irritationRisk, icon: AlertCircle, color: '#F59E0B' },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <span className="text-sm font-medium text-gray-600">{item.label}</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold" style={{ color: item.color }}>{item.value}</span>
                  <span className="text-gray-400 text-sm mb-1">/100</span>
                </div>
                <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Observations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#0D0D0D] mb-4">Observations détaillées</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Boutons actifs', value: results.details.activeBreakouts, unit: '' },
                { label: 'Marques post-acné', value: results.details.postAcneMarks, unit: '%' },
                { label: 'Hyperpigmentation', value: results.details.hyperpigmentation, unit: '%' },
                { label: 'Taches brunes', value: results.details.brownSpots, unit: '%' },
                { label: 'Rougeurs', value: results.details.redness, unit: '%' },
                { label: 'Cernes', value: results.details.darkCircles, unit: '%' },
              ].map((item) => (
                <div key={item.label} className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-[#5C4033]">{item.value}{item.unit}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Morning Routine */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Sun className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-semibold text-[#0D0D0D]">Routine du matin</h3>
            </div>
            <div className="space-y-3">
              {results.morningRoutine.map((item) => (
                <div key={item.step} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-medium text-[#0D0D0D]">{item.product}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Evening Routine */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Moon className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-[#0D0D0D]">Routine du soir</h3>
            </div>
            <div className="space-y-3">
              {results.eveningRoutine.map((item) => (
                <div key={item.step} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="w-6 h-6 rounded-full bg-[#5C4033] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-medium text-[#0D0D0D]">{item.product}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" fullWidth onClick={() => { setStep('intro'); setPhotos({ front: null, leftProfile: null, rightProfile: null, forehead: null }); }}>
              Nouvelle analyse
            </Button>
            <Button variant="primary" fullWidth>
              Voir les produits
            </Button>
          </div>

          {/* Medical Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-800">
                  Ces résultats sont des observations visuelles générées par IA et ne constituent pas un diagnostic médical.
                </p>
                <button className="text-sm text-amber-600 font-medium mt-2 hover:underline">
                  Trouver un dermatologue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
