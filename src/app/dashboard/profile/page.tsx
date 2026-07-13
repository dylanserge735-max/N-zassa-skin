'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useImageUpload } from '@/hooks/useImageUpload';
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Camera,
  Crown,
  Shield,
  Gift,
  Star,
  ChevronRight,
  Edit,
  Save,
  Loader2
} from 'lucide-react';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  country: string;
  city: string;
  referralCode: string;
  loyaltyPoints: number;
  profileImage?: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { upload, isUploading } = useImageUpload({
    type: 'profileImage',
    onSuccess: (result) => {
      setProfile(prev => prev ? { ...prev, profileImage: result.url } : null);
    },
  });

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await upload(file);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setProfile(data.user);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  return (
    <div className="pb-20 lg:pb-0 space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0D0D0D]" style={{ fontFamily: 'Playfair Display, serif' }}>
          Mon Profil
        </h1>
        <Button
          variant={isEditing ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Enregistrer
            </>
          ) : (
            <>
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </>
          )}
        </Button>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#5C4033] flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
              {profile?.profileImage ? (
                <Image
                  src={profile.profileImage}
                  alt="Photo de profil"
                  fill
                  className="object-cover"
                />
              ) : (
                <>{profile?.firstName?.[0]}{profile?.lastName?.[0]}</>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:bg-[#B8962E] transition-colors">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImageUpload}
                  disabled={isUploading}
                />
              </label>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0D0D0D]">
              {profile?.firstName} {profile?.lastName}
            </h2>
            <p className="text-gray-500">{profile?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-xs bg-[#D4AF37] text-[#0D0D0D] px-3 py-1 rounded-full font-medium">
                <Crown className="w-3 h-3" />
                Premium Trial
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
            <Star className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <p className="text-2xl font-bold text-[#0D0D0D]">{profile?.loyaltyPoints || 0}</p>
          <p className="text-xs text-gray-500">Points fidélité</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#10B981]/10 flex items-center justify-center">
            <Camera className="w-5 h-5 text-[#10B981]" />
          </div>
          <p className="text-2xl font-bold text-[#0D0D0D]">5</p>
          <p className="text-xs text-gray-500">Analyses</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#6366F1]/10 flex items-center justify-center">
            <Gift className="w-5 h-5 text-[#6366F1]" />
          </div>
          <p className="text-2xl font-bold text-[#0D0D0D]">2</p>
          <p className="text-xs text-gray-500">Filleules</p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
        <h3 className="font-semibold text-[#0D0D0D]">Informations personnelles</h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Prénom"
            value={profile?.firstName || ''}
            onChange={(e) => setProfile(prev => prev ? { ...prev, firstName: e.target.value } : null)}
            disabled={!isEditing}
            icon={<User className="w-5 h-5" />}
          />
          <Input
            label="Nom"
            value={profile?.lastName || ''}
            onChange={(e) => setProfile(prev => prev ? { ...prev, lastName: e.target.value } : null)}
            disabled={!isEditing}
          />
        </div>

        <Input
          label="Adresse e-mail"
          type="email"
          value={profile?.email || ''}
          disabled
          icon={<Mail className="w-5 h-5" />}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Pays"
            value={profile?.country || ''}
            onChange={(e) => setProfile(prev => prev ? { ...prev, country: e.target.value } : null)}
            disabled={!isEditing}
            icon={<MapPin className="w-5 h-5" />}
          />
          <Input
            label="Ville"
            value={profile?.city || ''}
            onChange={(e) => setProfile(prev => prev ? { ...prev, city: e.target.value } : null)}
            disabled={!isEditing}
          />
        </div>

        <Input
          label="Âge"
          type="number"
          value={profile?.age?.toString() || ''}
          onChange={(e) => setProfile(prev => prev ? { ...prev, age: parseInt(e.target.value) } : null)}
          disabled={!isEditing}
          icon={<Calendar className="w-5 h-5" />}
        />
      </div>

      {/* Referral Code */}
      <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#5C4033]/10 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
            <Gift className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">Votre code de parrainage</p>
            <p className="text-xl font-bold text-[#0D0D0D] tracking-wider">{profile?.referralCode}</p>
          </div>
          <Button variant="outline" size="sm">
            Partager
          </Button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {[
          { label: 'Gérer mon abonnement', icon: Crown, href: '/dashboard/subscription' },
          { label: 'Confidentialité et données', icon: Shield, href: '/dashboard/privacy' },
        ].map((item, index) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
              index !== 0 ? 'border-t border-gray-100' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <item.icon className="w-5 h-5 text-[#5C4033]" />
            </div>
            <span className="flex-1 text-left font-medium text-[#0D0D0D]">{item.label}</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
