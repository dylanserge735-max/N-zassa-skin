'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Mail, Lock, Eye, EyeOff, User, MapPin, Calendar, Users } from 'lucide-react';

const countries = [
  'Côte d\'Ivoire', 'Sénégal', 'Mali', 'Burkina Faso', 'Cameroun', 
  'Guinée', 'Bénin', 'Togo', 'Niger', 'République Démocratique du Congo',
  'Congo', 'Gabon', 'Madagascar', 'Maurice', 'France', 'Belgique', 'Canada', 'Autre'
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    age: '',
    country: '',
    city: '',
    consentDataProcessing: false,
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        setError('Veuillez remplir tous les champs');
        return;
      }
      if (formData.password.length < 8) {
        setError('Le mot de passe doit contenir au moins 8 caractères');
        return;
      }
      setError('');
      setStep(2);
      return;
    }

    if (!formData.consentDataProcessing) {
      setError('Veuillez accepter les conditions d\'utilisation');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          age: formData.age ? parseInt(formData.age) : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue');
        return;
      }

      router.push('/dashboard');
    } catch {
      setError('Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF5EE] flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#5C4033] to-[#3E2A22] items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
            <svg className="w-16 h-16 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Rejoignez la communauté N&apos;Zassa
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Des milliers de femmes africaines ont déjà transformé leur routine de soins.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold text-[#D4AF37]">50K+</p>
              <p className="text-sm text-gray-300">Utilisatrices</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold text-[#D4AF37]">15+</p>
              <p className="text-sm text-gray-300">Pays</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/">
              <Logo size="lg" />
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-[#0D0D0D] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Créer votre compte
          </h1>
          <p className="text-gray-600 mb-8">
            {step === 1 ? 'Commencez votre parcours vers une peau radieuse' : 'Quelques informations supplémentaires'}
          </p>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mb-8">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${step >= 1 ? 'bg-[#D4AF37] text-[#0D0D0D]' : 'bg-gray-200 text-gray-500'}`}>
              1
            </div>
            <div className={`flex-1 h-1 rounded ${step >= 2 ? 'bg-[#D4AF37]' : 'bg-gray-200'}`} />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${step >= 2 ? 'bg-[#D4AF37] text-[#0D0D0D]' : 'bg-gray-200 text-gray-500'}`}>
              2
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Prénom"
                    type="text"
                    placeholder="Votre prénom"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    icon={<User className="w-5 h-5" />}
                    required
                  />
                  <Input
                    label="Nom"
                    type="text"
                    placeholder="Votre nom"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>

                <Input
                  label="Adresse e-mail"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  icon={<Mail className="w-5 h-5" />}
                  required
                />

                <div className="relative">
                  <Input
                    label="Mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Minimum 8 caractères"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    icon={<Lock className="w-5 h-5" />}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-[42px] text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <Button type="submit" variant="primary" fullWidth>
                  Continuer
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Sexe</label>
                  <div className="flex gap-4">
                    {['Femme', 'Homme', 'Autre'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setFormData({ ...formData, gender: g.toLowerCase() })}
                        className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                          formData.gender === g.toLowerCase()
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#5C4033]'
                            : 'border-gray-200 hover:border-[#D4AF37]'
                        }`}
                      >
                        <Users className="w-5 h-5 mx-auto mb-1" />
                        <span className="text-sm">{g}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Input
                  label="Âge"
                  type="number"
                  placeholder="Votre âge"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  icon={<Calendar className="w-5 h-5" />}
                  min={13}
                  max={100}
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Pays</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3.5 text-base text-gray-900 focus:outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/15"
                  >
                    <option value="">Sélectionnez un pays</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Ville"
                  type="text"
                  placeholder="Votre ville"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  icon={<MapPin className="w-5 h-5" />}
                />

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentDataProcessing}
                    onChange={(e) => setFormData({ ...formData, consentDataProcessing: e.target.checked })}
                    className="w-5 h-5 mt-0.5 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  <span className="text-sm text-gray-600">
                    J&apos;accepte les{' '}
                    <Link href="/terms" className="text-[#D4AF37] hover:underline">conditions d&apos;utilisation</Link>
                    {' '}et la{' '}
                    <Link href="/privacy" className="text-[#D4AF37] hover:underline">politique de confidentialité</Link>
                  </span>
                </label>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Retour
                  </Button>
                  <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
                    {isLoading ? 'Création...' : 'Créer mon compte'}
                  </Button>
                </div>
              </>
            )}
          </form>

          {step === 1 && (
            <>
              <div className="my-8 flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-sm text-gray-500">ou continuer avec</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-[#D4AF37] transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-[#D4AF37] transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                  </svg>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-[#D4AF37] transition-colors">
                  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
              </div>
            </>
          )}

          <p className="text-center text-gray-600 mt-8">
            Déjà un compte ?{' '}
            <Link href="/auth/login" className="text-[#D4AF37] font-semibold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
