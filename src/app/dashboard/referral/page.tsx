'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import {
  Gift,
  Copy,
  Share2,
  Users,
  Crown,
  Check,
  ChevronRight,
  Star,
  Sparkles
} from 'lucide-react';

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'NZASSA-XY7K9P';
  const referralLink = `https://nzassaskin.com/ref/${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rewards = [
    { referrals: 1, reward: '1 mois Premium gratuit', icon: Crown },
    { referrals: 3, reward: '20% de réduction marketplace', icon: Gift },
    { referrals: 5, reward: '500 points fidélité', icon: Star },
    { referrals: 10, reward: '1 an Premium + produit gratuit', icon: Sparkles },
  ];

  const referrals = [
    { name: 'Aminata K.', date: '15 Jan 2025', status: 'active' },
    { name: 'Fatou D.', date: '10 Jan 2025', status: 'trial' },
  ];

  return (
    <div className="pb-20 lg:pb-0 space-y-6">
      <h1 className="text-2xl font-bold text-[#0D0D0D]" style={{ fontFamily: 'Playfair Display, serif' }}>
        Programme de parrainage
      </h1>

      {/* Hero Card */}
      <div className="bg-gradient-to-br from-[#5C4033] to-[#3E2A22] rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/20 flex items-center justify-center">
            <Gift className="w-7 h-7 text-[#D4AF37]" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Parrainez, gagnez !</h2>
            <p className="text-gray-300">Offrez 14 jours d&apos;essai à vos amies</p>
          </div>
        </div>

        <p className="text-gray-300 mb-6">
          Pour chaque amie qui s&apos;inscrit avec votre code, vous gagnez toutes les deux des récompenses exclusives.
        </p>

        {/* Referral Code */}
        <div className="bg-white/10 rounded-xl p-4 mb-4">
          <p className="text-xs text-gray-300 mb-2">Votre code de parrainage</p>
          <div className="flex items-center justify-between gap-4">
            <span className="text-2xl font-bold text-[#D4AF37] tracking-wider">{referralCode}</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#0D0D0D] rounded-lg font-medium hover:bg-[#E8C547] transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copié !' : 'Copier'}
            </button>
          </div>
        </div>

        {/* Share Button */}
        <Button variant="primary" fullWidth>
          <Share2 className="w-5 h-5 mr-2" />
          Partager le lien
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
          <p className="text-3xl font-bold text-[#D4AF37]">2</p>
          <p className="text-sm text-gray-500">Filleules</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
          <p className="text-3xl font-bold text-[#5C4033]">1</p>
          <p className="text-sm text-gray-500">Actives</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
          <p className="text-3xl font-bold text-[#10B981]">30</p>
          <p className="text-sm text-gray-500">Jours gagnés</p>
        </div>
      </div>

      {/* Rewards */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-[#0D0D0D] mb-4">Récompenses à débloquer</h2>
        <div className="space-y-3">
          {rewards.map((reward, index) => {
            const isUnlocked = referrals.length >= reward.referrals;
            return (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  isUnlocked ? 'bg-[#D4AF37]/10' : 'bg-gray-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isUnlocked ? 'bg-[#D4AF37]' : 'bg-gray-200'
                }`}>
                  <reward.icon className={`w-5 h-5 ${isUnlocked ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${isUnlocked ? 'text-[#0D0D0D]' : 'text-gray-400'}`}>
                    {reward.reward}
                  </p>
                  <p className="text-sm text-gray-500">{reward.referrals} parrainage{reward.referrals > 1 ? 's' : ''}</p>
                </div>
                {isUnlocked ? (
                  <span className="text-xs bg-[#D4AF37] text-[#0D0D0D] px-3 py-1 rounded-full font-medium">
                    Débloqué
                  </span>
                ) : (
                  <span className="text-xs text-gray-400">
                    {reward.referrals - referrals.length} restant{reward.referrals - referrals.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Referrals List */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[#0D0D0D]">Mes filleules</h2>
          <span className="text-sm text-gray-500">{referrals.length} inscrites</span>
        </div>

        {referrals.length > 0 ? (
          <div className="space-y-3">
            {referrals.map((referral, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#5C4033] flex items-center justify-center text-white font-bold">
                  {referral.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#0D0D0D]">{referral.name}</p>
                  <p className="text-sm text-gray-500">Inscrite le {referral.date}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  referral.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {referral.status === 'active' ? 'Active' : 'En essai'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">Aucune filleule pour le moment</p>
            <p className="text-sm text-gray-400">Partagez votre code pour commencer</p>
          </div>
        )}
      </div>

      {/* Loyalty Program */}
      <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#5C4033]/10 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
            <Star className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[#0D0D0D]">Programme fidélité</h3>
            <p className="text-sm text-gray-500">Gagnez des points à chaque action</p>
          </div>
          <Button variant="outline" size="sm">
            Voir <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
