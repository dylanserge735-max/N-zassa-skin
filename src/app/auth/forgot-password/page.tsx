'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Mail, ArrowLeft, Check } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FBF5EE] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <Logo size="lg" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          {!isSubmitted ? (
            <>
              <h1 className="text-2xl font-bold text-[#0D0D0D] mb-2 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                Mot de passe oublié ?
              </h1>
              <p className="text-gray-600 text-center mb-8">
                Entrez votre adresse e-mail et nous vous enverrons un lien de réinitialisation.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Adresse e-mail"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-5 h-5" />}
                  required
                />

                <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
                  {isLoading ? 'Envoi...' : 'Envoyer le lien'}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-[#0D0D0D] mb-2">E-mail envoyé !</h2>
              <p className="text-gray-600 mb-6">
                Si un compte existe avec l&apos;adresse <strong>{email}</strong>, vous recevrez un lien de réinitialisation.
              </p>
              <p className="text-sm text-gray-500">
                Vérifiez également votre dossier spam.
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link href="/auth/login" className="inline-flex items-center gap-2 text-[#D4AF37] font-medium hover:underline">
              <ArrowLeft className="w-4 h-4" />
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
