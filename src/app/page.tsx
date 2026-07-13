'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import { 
  Sparkles, 
  Camera, 
  TrendingUp, 
  ShoppingBag, 
  MessageCircle,
  Apple,
  Shield,
  Star,
  ChevronRight,
  Heart,
  Droplets,
  Sun,
  Moon,
  Users,
  Award,
  Globe
} from 'lucide-react';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Analyse IA de la peau",
      description: "Prenez 4 photos et obtenez une analyse complète : acné, hyperpigmentation, texture, hydratation et plus."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Recommandations personnalisées",
      description: "Routines matin et soir adaptées à votre type de peau, budget et disponibilité locale."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Suivi de progression",
      description: "Comparez vos photos Jour 1, 30, 60 et 90 avec des graphiques d'évolution détaillés."
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "Marketplace",
      description: "Découvrez des produits cosmétiques spécialement sélectionnés pour les peaux africaines."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Programme nutritionnel",
      description: "Conseils alimentaires et d'hydratation pour une peau saine de l'intérieur."
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Assistant IA",
      description: "Posez vos questions sur les soins de la peau et le bien-être à tout moment."
    },
  ];

  const testimonials = [
    {
      name: "Aminata K.",
      location: "Abidjan, Côte d'Ivoire",
      text: "Grâce à N'Zassa Skin, j'ai enfin compris ma peau. En 3 mois, mes taches ont diminué de 60%!",
      rating: 5,
    },
    {
      name: "Fatoumata D.",
      location: "Dakar, Sénégal",
      text: "Les recommandations sont parfaites pour mon budget et je trouve tout facilement. Application révolutionnaire!",
      rating: 5,
    },
    {
      name: "Adama T.",
      location: "Bamako, Mali",
      text: "Je recommande à toutes mes amies. Le suivi de progression est motivant et les résultats sont visibles.",
      rating: 5,
    },
  ];

  const stats = [
    { value: "50K+", label: "Utilisatrices actives" },
    { value: "200K+", label: "Analyses effectuées" },
    { value: "95%", label: "Satisfaction client" },
    { value: "15+", label: "Pays africains" },
  ];

  return (
    <div className="min-h-screen bg-[#FBF5EE]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Logo size="md" />
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-gray-600 hover:text-[#5C4033] transition-colors">
                Fonctionnalités
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-[#5C4033] transition-colors">
                Tarifs
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-[#5C4033] transition-colors">
                Témoignages
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">Se connecter</Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="primary" size="sm">Commencer</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-[#5C4033] transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 w-full bg-[#5C4033] transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-full bg-[#5C4033] transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="flex flex-col gap-4 px-4">
              <Link href="#features" className="text-gray-600 py-2">Fonctionnalités</Link>
              <Link href="#pricing" className="text-gray-600 py-2">Tarifs</Link>
              <Link href="#testimonials" className="text-gray-600 py-2">Témoignages</Link>
              <Link href="/auth/login">
                <Button variant="ghost" fullWidth>Se connecter</Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="primary" fullWidth>Commencer</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 text-[#5C4033] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Nouvelle génération de soins
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0D0D0D] leading-tight mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Pensé en Afrique, pour les{' '}
                <span className="text-[#D4AF37]">peaux africaines</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                La première application IA conçue pour analyser, suivre et sublimer votre peau avec des recommandations personnalisées de soins, nutrition et bien-être.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link href="/auth/register">
                  <Button variant="primary" size="lg">
                    Commencer l&apos;analyse gratuite
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg">
                    En savoir plus
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#D4AF37]" />
                  <span>Données sécurisées</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#D4AF37]" />
                  <span>14 jours d&apos;essai gratuit</span>
                </div>
              </div>
            </div>

            {/* Hero Image / Mockup */}
            <div className="relative">
              <div className="relative mx-auto w-80 h-[600px]">
                {/* Phone Frame */}
                <div className="absolute inset-0 bg-[#0D0D0D] rounded-[3rem] shadow-2xl shadow-black/30" />
                <div className="absolute inset-2 bg-gradient-to-br from-[#F5E6D3] to-[#FBF5EE] rounded-[2.5rem] overflow-hidden">
                  {/* App Screen Content */}
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <Logo size="sm" variant="full" />
                      <div className="w-8 h-8 bg-[#5C4033] rounded-full" />
                    </div>
                    
                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-500 mb-2">Votre score de peau</p>
                      <div className="relative mx-auto w-32 h-32">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            fill="none"
                            stroke="#E5E7EB"
                            strokeWidth="8"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            fill="none"
                            stroke="#D4AF37"
                            strokeWidth="8"
                            strokeDasharray="352"
                            strokeDashoffset="70"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold text-[#D4AF37]">78</span>
                          <span className="text-xs text-gray-500">/100</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {[
                        { label: 'Hydratation', value: 82, color: '#10B981' },
                        { label: 'Uniformité', value: 75, color: '#D4AF37' },
                        { label: 'Texture', value: 70, color: '#F59E0B' },
                        { label: 'Éclat', value: 85, color: '#10B981' },
                      ].map((item) => (
                        <div key={item.label} className="bg-white rounded-xl p-3 shadow-sm">
                          <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                          <div className="flex items-center gap-2">
                            <span className="font-bold" style={{ color: item.color }}>{item.value}</span>
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                              <div 
                                className="h-full rounded-full" 
                                style={{ width: `${item.value}%`, backgroundColor: item.color }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-sm font-semibold mb-2">Routine du matin</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                          <Sun className="w-5 h-5 text-[#D4AF37]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Nettoyant doux</p>
                          <p className="text-xs text-gray-500">Étape 1/3</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#D4AF37] rounded-full blur-3xl opacity-30" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#5C4033] rounded-full blur-3xl opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl sm:text-5xl font-bold text-[#D4AF37] mb-2">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Une approche <span className="text-[#D4AF37]">complète</span> du soin
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              N&apos;Zassa Skin combine intelligence artificielle, expertise dermatologique et bien-être pour une peau rayonnante.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#5C4033]/20 rounded-2xl flex items-center justify-center text-[#D4AF37] mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0D0D0D] mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#5C4033] to-[#3E2A22]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Comment ça <span className="text-[#D4AF37]">fonctionne</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Trois étapes simples pour commencer votre parcours vers une peau sublimée
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <Camera className="w-8 h-8" />,
                title: "Prenez vos photos",
                description: "Capturez 4 angles de votre visage : face, profils et front pour une analyse complète."
              },
              {
                step: "02",
                icon: <Sparkles className="w-8 h-8" />,
                title: "Analyse IA instantanée",
                description: "Notre IA analyse votre peau et génère un rapport détaillé avec des scores personnalisés."
              },
              {
                step: "03",
                icon: <Heart className="w-8 h-8" />,
                title: "Suivez votre routine",
                description: "Recevez des recommandations adaptées et suivez votre progression au fil du temps."
              }
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#D4AF37] text-[#0D0D0D] mb-6">
                  {item.icon}
                </div>
                <span className="absolute top-0 right-1/3 text-6xl font-bold text-white/10">{item.step}</span>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Tarifs <span className="text-[#D4AF37]">simples</span> et transparents
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Commencez avec 14 jours d&apos;essai gratuit. Aucune carte requise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#0D0D0D] mb-2">Gratuit</h3>
              <p className="text-gray-500 mb-6">Pour découvrir</p>
              <p className="text-4xl font-bold text-[#0D0D0D] mb-6">0 <span className="text-lg font-normal text-gray-500">FCFA/mois</span></p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-600">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  1 analyse par mois
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Routine basique
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Accès marketplace
                </li>
              </ul>
              <Button variant="outline" fullWidth>Commencer</Button>
            </div>

            {/* Premium Plan */}
            <div className="bg-[#0D0D0D] rounded-2xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#D4AF37] text-[#0D0D0D] text-xs font-bold px-3 py-1 rounded-full">
                POPULAIRE
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Premium</h3>
              <p className="text-gray-400 mb-6">Pour des résultats optimaux</p>
              <p className="text-4xl font-bold text-[#D4AF37] mb-6">4 900 <span className="text-lg font-normal text-gray-400">FCFA/mois</span></p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Analyses illimitées
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Historique complet
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Assistant IA illimité
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Programme nutritionnel
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Comparaison avancée
                </li>
              </ul>
              <Button variant="primary" fullWidth>Essai gratuit 14 jours</Button>
            </div>

            {/* Annual Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#0D0D0D] mb-2">Annuel</h3>
              <p className="text-gray-500 mb-6">Économisez 20%</p>
              <p className="text-4xl font-bold text-[#0D0D0D] mb-6">47 000 <span className="text-lg font-normal text-gray-500">FCFA/an</span></p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-600">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Tout Premium inclus
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  2 mois offerts
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Support prioritaire
                </li>
              </ul>
              <Button variant="secondary" fullWidth>Choisir annuel</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5E6D3]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D0D0D] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Elles <span className="text-[#D4AF37]">adorent</span> N&apos;Zassa Skin
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des milliers de femmes africaines font confiance à notre application
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#5C4033]" />
                  <div>
                    <p className="font-semibold text-[#0D0D0D]">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4">
            <Shield className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-[#0D0D0D] mb-3">Avertissement médical</h3>
          <p className="text-gray-600 text-sm">
            Les analyses fournies par N&apos;Zassa Skin sont générées par une intelligence artificielle et ont uniquement une valeur informative. 
            Elles ne constituent pas un diagnostic médical et ne remplacent pas une consultation auprès d&apos;un dermatologue ou d&apos;un professionnel de santé qualifié.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Prête à sublimer votre <span className="text-[#D4AF37]">peau</span> ?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de femmes africaines qui ont transformé leur routine de soins avec N&apos;Zassa Skin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button variant="primary" size="lg">
                Commencer gratuitement
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-gray-400">
              <Apple className="w-6 h-6" />
              <span>App Store</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Globe className="w-6 h-6" />
              <span>Google Play</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <Logo size="md" />
              <p className="text-gray-400 mt-4">
                Pensé en Afrique, pour les peaux africaines.
              </p>
              <div className="flex gap-4 mt-6">
                {['facebook', 'instagram', 'twitter'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-[#0D0D0D] transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <Users className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Produit</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Tarifs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Marketplace</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">À propos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Carrières</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Partenaires</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Légal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Conditions d&apos;utilisation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Politique de confidentialité</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">RGPD</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Mentions légales</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 N&apos;Zassa Skin. Tous droits réservés.
            </p>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Shield className="w-4 h-4" />
              <span>Données sécurisées • Conformité RGPD</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
