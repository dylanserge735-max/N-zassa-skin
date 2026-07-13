'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import {
  Bell,
  Camera,
  ShoppingBag,
  Crown,
  Gift,
  Droplets,
  Calendar,
  Check,
  Trash2,
  ChevronRight
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'routine' | 'progress' | 'promotion' | 'subscription' | 'referral' | 'hydration';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'routine',
      title: 'Routine du soir',
      message: "N'oubliez pas votre routine de soin ce soir !",
      time: 'Il y a 2 heures',
      isRead: false,
    },
    {
      id: '2',
      type: 'progress',
      title: 'Photo de progression',
      message: 'Il est temps de prendre votre photo Jour 30 !',
      time: 'Il y a 1 jour',
      isRead: false,
    },
    {
      id: '3',
      type: 'promotion',
      title: '-20% sur les sérums',
      message: 'Profitez de cette offre exclusive sur notre marketplace.',
      time: 'Il y a 2 jours',
      isRead: true,
    },
    {
      id: '4',
      type: 'subscription',
      title: 'Essai Premium',
      message: 'Plus que 5 jours sur votre essai gratuit.',
      time: 'Il y a 3 jours',
      isRead: true,
    },
    {
      id: '5',
      type: 'referral',
      title: 'Nouveau parrainage',
      message: 'Aminata K. s\'est inscrite avec votre code !',
      time: 'Il y a 5 jours',
      isRead: true,
    },
    {
      id: '6',
      type: 'hydration',
      title: 'Objectif hydratation',
      message: 'Vous avez atteint votre objectif de 8 verres !',
      time: 'Il y a 1 semaine',
      isRead: true,
    },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'routine': return Bell;
      case 'progress': return Camera;
      case 'promotion': return ShoppingBag;
      case 'subscription': return Crown;
      case 'referral': return Gift;
      case 'hydration': return Droplets;
      default: return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'routine': return { bg: '#D4AF37', text: '#0D0D0D' };
      case 'progress': return { bg: '#10B981', text: 'white' };
      case 'promotion': return { bg: '#F59E0B', text: 'white' };
      case 'subscription': return { bg: '#6366F1', text: 'white' };
      case 'referral': return { bg: '#EC4899', text: 'white' };
      case 'hydration': return { bg: '#3B82F6', text: 'white' };
      default: return { bg: '#D4AF37', text: '#0D0D0D' };
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="pb-20 lg:pb-0 space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0D0D0D]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Notifications
          </h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-500">{unreadCount} non lue{unreadCount > 1 ? 's' : ''}</p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            <Check className="w-4 h-4 mr-2" />
            Tout marquer lu
          </Button>
        )}
      </div>

      {notifications.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {notifications.map((notification, index) => {
            const Icon = getIcon(notification.type);
            const colors = getIconColor(notification.type);

            return (
              <div
                key={notification.id}
                className={`flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                  index !== 0 ? 'border-t border-gray-100' : ''
                } ${!notification.isRead ? 'bg-[#D4AF37]/5' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.bg }}
                >
                  <Icon className="w-5 h-5" style={{ color: colors.text }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`font-medium ${!notification.isRead ? 'text-[#0D0D0D]' : 'text-gray-600'}`}>
                      {notification.title}
                    </p>
                    {!notification.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37] flex-shrink-0 mt-2" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="font-semibold text-[#0D0D0D] mb-2">Aucune notification</h2>
          <p className="text-gray-500">Vous êtes à jour !</p>
        </div>
      )}

      {/* Notification Settings Link */}
      <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#5C4033]/10 rounded-2xl p-4">
        <button className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div className="text-left">
              <p className="font-medium text-[#0D0D0D]">Paramètres de notification</p>
              <p className="text-sm text-gray-500">Personnalisez vos alertes</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
