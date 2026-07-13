'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import {
  Home,
  Camera,
  TrendingUp,
  ShoppingBag,
  MessageCircle,
  User,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Heart,
  Gift,
  Crown
} from 'lucide-react';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          router.push('/auth/login');
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch {
        router.push('/auth/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Accueil' },
    { href: '/dashboard/analysis', icon: Camera, label: 'Analyse' },
    { href: '/dashboard/progress', icon: TrendingUp, label: 'Progression' },
    { href: '/dashboard/routine', icon: Heart, label: 'Routine' },
    { href: '/dashboard/marketplace', icon: ShoppingBag, label: 'Marketplace' },
    { href: '/dashboard/assistant', icon: MessageCircle, label: 'Assistant IA' },
    { href: '/dashboard/referral', icon: Gift, label: 'Parrainage' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FBF5EE] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF5EE]">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-[#5C4033]"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Logo size="sm" />
          <Link href="/dashboard/notifications" className="p-2 text-[#5C4033] relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Link>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-50"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-100 z-50
          transform transition-transform duration-300 lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 flex items-center justify-between">
            <Logo size="md" />
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Premium Badge */}
          <div className="mx-4 mb-6 p-4 bg-gradient-to-r from-[#D4AF37]/10 to-[#5C4033]/10 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#5C4033] rounded-full flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0D0D0D]">Essai Premium</p>
                <p className="text-xs text-gray-500">13 jours restants</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${isActive
                      ? 'bg-[#D4AF37] text-[#0D0D0D] font-semibold'
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#5C4033] flex items-center justify-center text-white font-semibold">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#0D0D0D] truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                href="/dashboard/profile"
                className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User className="w-4 h-4" />
                Profil
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
                Réglages
              </Link>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-2 flex items-center justify-center gap-2 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 lg:pt-0 min-h-screen">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
          <div>
            <h1 className="text-xl font-semibold text-[#0D0D0D]">
              Bonjour, {user?.firstName} 👋
            </h1>
            <p className="text-sm text-gray-500">
              Prête pour votre routine beauté ?
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/notifications"
              className="p-2 text-gray-500 hover:text-[#5C4033] relative"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>
            <Link
              href="/dashboard/profile"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#5C4033] flex items-center justify-center text-white font-semibold"
            >
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </Link>
          </div>
        </header>

        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-2 z-40">
        <div className="flex items-center justify-around">
          {[
            { href: '/dashboard', icon: Home, label: 'Accueil' },
            { href: '/dashboard/analysis', icon: Camera, label: 'Analyse' },
            { href: '/dashboard/progress', icon: TrendingUp, label: 'Progrès' },
            { href: '/dashboard/marketplace', icon: ShoppingBag, label: 'Shop' },
            { href: '/dashboard/assistant', icon: MessageCircle, label: 'IA' },
          ].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-colors
                  ${isActive ? 'text-[#D4AF37]' : 'text-gray-400'}
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
