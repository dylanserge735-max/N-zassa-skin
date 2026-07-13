'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import {
  Search,
  Filter,
  Star,
  Heart,
  ShoppingCart,
  ChevronRight,
  Sparkles,
  Sun,
  Droplets,
  Leaf
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  image: string;
  skinTypes: string[];
  isRecommended: boolean;
  isSponsored: boolean;
  benefits: string[];
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    { id: 'all', label: 'Tous', icon: Sparkles },
    { id: 'cleanser', label: 'Nettoyants', icon: Droplets },
    { id: 'moisturizer', label: 'Hydratants', icon: Droplets },
    { id: 'sunscreen', label: 'Solaires', icon: Sun },
    { id: 'serum', label: 'Sérums', icon: Sparkles },
    { id: 'natural', label: 'Naturels', icon: Leaf },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'Sérum Éclat Vitamine C 15%',
      brand: 'N\'Zassa Cosmetics',
      category: 'serum',
      price: 12500,
      currency: 'FCFA',
      rating: 4.8,
      reviewCount: 234,
      image: '/products/serum-vc.jpg',
      skinTypes: ['tous types'],
      isRecommended: true,
      isSponsored: false,
      benefits: ['Éclat', 'Anti-taches', 'Antioxydant'],
    },
    {
      id: 2,
      name: 'Crème Hydratante Karité & Baobab',
      brand: 'AfriSkin',
      category: 'moisturizer',
      price: 8900,
      currency: 'FCFA',
      rating: 4.6,
      reviewCount: 189,
      image: '/products/creme-karite.jpg',
      skinTypes: ['sèche', 'normale'],
      isRecommended: true,
      isSponsored: false,
      benefits: ['Hydratation intense', 'Nourrissant', 'Anti-âge'],
    },
    {
      id: 3,
      name: 'Protection Solaire SPF 50+ Invisible',
      brand: 'SunCare Africa',
      category: 'sunscreen',
      price: 15000,
      currency: 'FCFA',
      rating: 4.9,
      reviewCount: 412,
      image: '/products/spf50.jpg',
      skinTypes: ['tous types'],
      isRecommended: true,
      isSponsored: true,
      benefits: ['Sans trace blanche', 'Légère', 'Anti-hyperpigmentation'],
    },
    {
      id: 4,
      name: 'Nettoyant Doux à l\'Aloe Vera',
      brand: 'PureSkin',
      category: 'cleanser',
      price: 6500,
      currency: 'FCFA',
      rating: 4.5,
      reviewCount: 156,
      image: '/products/cleanser-aloe.jpg',
      skinTypes: ['sensible', 'normale'],
      isRecommended: false,
      isSponsored: false,
      benefits: ['Doux', 'Apaisant', 'Hydratant'],
    },
    {
      id: 5,
      name: 'Sérum Niacinamide 10%',
      brand: 'GlowUp Africa',
      category: 'serum',
      price: 11000,
      currency: 'FCFA',
      rating: 4.7,
      reviewCount: 298,
      image: '/products/niacinamide.jpg',
      skinTypes: ['grasse', 'mixte'],
      isRecommended: true,
      isSponsored: false,
      benefits: ['Anti-taches', 'Pores resserrés', 'Matifiant'],
    },
    {
      id: 6,
      name: 'Huile de Moringa Pure Bio',
      brand: 'AfroNaturals',
      category: 'natural',
      price: 9500,
      currency: 'FCFA',
      rating: 4.8,
      reviewCount: 167,
      image: '/products/moringa.jpg',
      skinTypes: ['tous types'],
      isRecommended: false,
      isSponsored: false,
      benefits: ['100% naturel', 'Nourrissant', 'Anti-âge'],
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (productId: number) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  return (
    <div className="pb-20 lg:pb-0 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0D0D0D]" style={{ fontFamily: 'Playfair Display, serif' }}>
          Marketplace
        </h1>
        <button className="relative p-2 bg-white rounded-xl shadow-sm">
          <ShoppingCart className="w-6 h-6 text-[#5C4033]" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-[#0D0D0D] text-xs font-bold rounded-full flex items-center justify-center">
            0
          </span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
        </div>
        <button className="p-3 bg-white border-2 border-gray-100 rounded-xl hover:border-[#D4AF37] transition-colors">
          <Filter className="w-5 h-5 text-[#5C4033]" />
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#D4AF37] text-[#0D0D0D]'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <cat.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Recommended Section */}
      <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#5C4033]/10 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <span className="font-semibold text-[#0D0D0D]">Recommandés pour vous</span>
          </div>
          <button className="text-sm text-[#D4AF37] font-medium flex items-center gap-1">
            Voir tout <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Sélection basée sur votre type de peau et vos besoins
        </p>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
          {products.filter(p => p.isRecommended).slice(0, 3).map((product) => (
            <div key={product.id} className="flex-shrink-0 w-40 bg-white rounded-xl p-3 shadow-sm">
              <div className="relative aspect-square bg-gray-100 rounded-lg mb-2">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#5C4033]/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-[#D4AF37]/50" />
                </div>
                {product.isSponsored && (
                  <span className="absolute top-1 left-1 text-[10px] bg-[#D4AF37] text-[#0D0D0D] px-1.5 py-0.5 rounded font-medium">
                    Sponsorisé
                  </span>
                )}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-1 right-1 p-1.5 bg-white rounded-full shadow-sm"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </button>
              </div>
              <p className="text-xs text-[#D4AF37] font-medium">{product.brand}</p>
              <p className="text-sm font-medium text-[#0D0D0D] line-clamp-2">{product.name}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="text-xs text-gray-600">{product.rating}</span>
              </div>
              <p className="text-sm font-bold text-[#5C4033] mt-1">
                {formatPrice(product.price)} {product.currency}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* All Products Grid */}
      <div>
        <h2 className="font-semibold text-[#0D0D0D] mb-4">Tous les produits</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-square bg-gray-100 rounded-xl mb-3">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#5C4033]/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-[#D4AF37]/50" />
                </div>
                {product.isSponsored && (
                  <span className="absolute top-2 left-2 text-xs bg-[#D4AF37] text-[#0D0D0D] px-2 py-0.5 rounded-full font-medium">
                    Sponsorisé
                  </span>
                )}
                {product.isRecommended && !product.isSponsored && (
                  <span className="absolute top-2 left-2 text-xs bg-[#10B981] text-white px-2 py-0.5 rounded-full font-medium">
                    Recommandé
                  </span>
                )}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform"
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </button>
              </div>

              <p className="text-xs text-[#D4AF37] font-medium mb-1">{product.brand}</p>
              <h3 className="font-medium text-[#0D0D0D] text-sm line-clamp-2 mb-2">{product.name}</h3>

              <div className="flex flex-wrap gap-1 mb-2">
                {product.benefits.slice(0, 2).map((benefit) => (
                  <span key={benefit} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {benefit}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="text-sm font-medium text-[#0D0D0D]">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviewCount})</span>
              </div>

              <div className="flex items-center justify-between">
                <p className="font-bold text-[#5C4033]">
                  {formatPrice(product.price)} <span className="text-xs font-normal text-gray-500">{product.currency}</span>
                </p>
                <button className="p-2 bg-[#D4AF37] rounded-lg hover:bg-[#B8962E] transition-colors">
                  <ShoppingCart className="w-4 h-4 text-[#0D0D0D]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600">Aucun produit trouvé</p>
          <p className="text-sm text-gray-400">Essayez de modifier vos critères de recherche</p>
        </div>
      )}

      {/* Partner Banner */}
      <div className="bg-[#0D0D0D] rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
            <ShoppingCart className="w-7 h-7 text-[#D4AF37]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Devenez partenaire vendeur</h3>
            <p className="text-sm text-gray-400">Vendez vos produits sur N&apos;Zassa Skin</p>
          </div>
          <Button variant="primary" size="sm">
            En savoir plus
          </Button>
        </div>
      </div>
    </div>
  );
}
