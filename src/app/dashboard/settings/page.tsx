'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import {
  Bell,
  Globe,
  Shield,
  Smartphone,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  ToggleRight,
  Download,
  Trash2
} from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    routine: true,
    hydration: true,
    progress: true,
    promotions: false,
    newsletter: true,
  });

  const [language, setLanguage] = useState('fr');

  return (
    <div className="pb-20 lg:pb-0 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0D0D0D]" style={{ fontFamily: 'Playfair Display, serif' }}>
        Paramètres
      </h1>

      {/* Notifications */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <h2 className="font-semibold text-[#0D0D0D]">Notifications</h2>
        </div>

        <div className="space-y-4">
          {[
            { key: 'routine', label: 'Rappels de routine', description: 'Matin et soir' },
            { key: 'hydration', label: 'Rappels hydratation', description: 'Objectif quotidien' },
            { key: 'progress', label: 'Photos de progression', description: 'Jour 30, 60, 90' },
            { key: 'promotions', label: 'Promotions', description: 'Offres marketplace' },
            { key: 'newsletter', label: 'Newsletter', description: 'Conseils et actualités' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-[#0D0D0D]">{item.label}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof notifications] }))}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notifications[item.key as keyof typeof notifications] ? 'bg-[#D4AF37]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    notifications[item.key as keyof typeof notifications] ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <h2 className="font-semibold text-[#0D0D0D]">Langue</h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { code: 'fr', label: 'Français', flag: '🇫🇷' },
            { code: 'en', label: 'English', flag: '🇬🇧' },
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                language === lang.code
                  ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                  : 'border-gray-200 hover:border-[#D4AF37]'
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className={`font-medium ${language === lang.code ? 'text-[#5C4033]' : 'text-gray-600'}`}>
                {lang.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Privacy & Data */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h2 className="font-semibold text-[#0D0D0D]">Confidentialité & Données</h2>
          </div>
        </div>

        {[
          { label: 'Télécharger mes données', icon: Download, description: 'Export JSON de vos données' },
          { label: 'Consentement IA', icon: ToggleRight, description: 'Utilisation pour entraînement' },
          { label: 'Supprimer mon compte', icon: Trash2, description: 'Action irréversible', danger: true },
        ].map((item, index) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
              index !== 0 ? 'border-t border-gray-100' : ''
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              item.danger ? 'bg-red-50' : 'bg-gray-100'
            }`}>
              <item.icon className={`w-5 h-5 ${item.danger ? 'text-red-500' : 'text-[#5C4033]'}`} />
            </div>
            <div className="flex-1 text-left">
              <p className={`font-medium ${item.danger ? 'text-red-500' : 'text-[#0D0D0D]'}`}>{item.label}</p>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>

      {/* Help & Legal */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {[
          { label: 'Centre d\'aide', icon: HelpCircle },
          { label: 'Conditions d\'utilisation', icon: FileText },
          { label: 'Politique de confidentialité', icon: Shield },
          { label: 'À propos', icon: Smartphone },
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

      {/* App Version */}
      <div className="text-center text-sm text-gray-400">
        <p>N&apos;Zassa Skin v1.0.0</p>
        <p>© 2025 Tous droits réservés</p>
      </div>

      {/* Logout */}
      <Button
        variant="outline"
        fullWidth
        className="!border-red-200 !text-red-500 hover:!bg-red-50"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Se déconnecter
      </Button>
    </div>
  );
}
