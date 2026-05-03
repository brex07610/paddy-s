/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBasket, 
  Menu, 
  X, 
  Search, 
  Phone, 
  Clock, 
  MapPin, 
  Trash2, 
  Plus, 
  Minus, 
  Heart, 
  ChevronRight, 
  ArrowRight, 
  Star, 
  Leaf, 
  Truck, 
  ShieldCheck, 
  MessageCircle,
  ArrowLeft,
  Check,
  Languages,
  BookOpen,
  CloudRain,
  DollarSign,
  Users,
  Award,
  Calendar,
  Zap,
  Mic,
  FileText,
  HelpCircle,
  LogOut,
  User,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Language, 
  View, 
  Listing, 
  InputProduct, 
  Guide, 
  WeatherData, 
  FarmerProfile 
} from './types';
import { LISTINGS, INPUTS, GUIDES, PROVINCES } from './constants';

// --- Shared Components ---

const AnnouncementBar = () => (
  <div className="bg-secondary text-primary text-center py-2 text-xs font-bold uppercase tracking-widest px-4">
    <span className="flex items-center justify-center gap-2">
      <CloudRain size={14} /> 🌧 Seasonal planting guide for 2026 now available
    </span>
  </div>
);

const Navbar = ({ 
  currentView, 
  setView, 
  lang, 
  setLang,
  isLoggedIn,
  onJoin
}: { 
  currentView: View, 
  setView: (v: View) => void,
  lang: Language,
  setLang: (l: Language) => void,
  isLoggedIn: boolean,
  onJoin: () => void
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string, view: View, icon: any }[] = [
    { label: 'Home', view: 'home', icon: Leaf },
    { label: 'Marketplace', view: 'marketplace', icon: ShoppingBasket },
    { label: 'Inputs', view: 'shop', icon: Zap },
    { label: 'Knowledge', view: 'knowledge', icon: BookOpen },
    { label: 'Weather', view: 'weather', icon: CloudRain },
    { label: 'Finance', view: 'finance', icon: DollarSign },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-xl py-3' : 'bg-background/80 backdrop-blur-md py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <div 
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => setView('home')}
        >
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-secondary group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
            <Award size={24} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-display font-bold text-primary leading-tight tracking-tight">AgriZim</span>
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-accent leading-none">Empowering Farmers</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button 
              key={link.label}
              onClick={() => { setView(link.view); setIsMobileMenuOpen(false); }}
              className={`text-sm font-bold transition-all px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/5 ${
                currentView === link.view ? 'text-primary bg-primary/5' : 'text-earth/60'
              }`}
            >
              <link.icon size={16} />
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1 bg-primary/5 rounded-full p-1 border border-primary/10">
            {(['EN', 'SN', 'ND'] as Language[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`w-8 h-8 rounded-full text-[10px] font-bold transition-all ${lang === l ? 'bg-primary text-white shadow-md' : 'text-primary/40 hover:text-primary'}`}
              >
                {l}
              </button>
            ))}
          </div>

          {!isLoggedIn ? (
            <button 
              onClick={onJoin}
              className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-primary-light transition-all active:scale-95"
            >
              Join Free
            </button>
          ) : (
            <button 
              onClick={() => setView('profile')}
              className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20 hover:bg-primary/20 transition-all"
            >
              <User size={20} />
            </button>
          )}

          <button 
            className="lg:hidden p-2 text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-black/5 overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <button 
                  key={link.label}
                  onClick={() => { setView(link.view); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left font-bold ${
                    currentView === link.view ? 'bg-primary text-white shadow-lg' : 'bg-primary/5 text-primary'
                  }`}
                >
                  <link.icon size={20} />
                  <span>{link.label}</span>
                  <ChevronRight size={16} className="ml-auto opacity-50" />
                </button>
              ))}
              <div className="pt-4 flex justify-center gap-4">
                {(['EN', 'SN', 'ND'] as Language[]).map(l => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-4 py-2 rounded-full text-xs font-bold ${lang === l ? 'bg-primary text-white' : 'bg-primary/5 text-primary'}`}
                  >
                    {l === 'EN' ? 'English' : l === 'SN' ? 'Shona' : 'Ndebele'}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- Home View ---

const HomeView = ({ setView, lang }: { setView: (v: View) => void, lang: Language }) => {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-8 overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fee74a62?w=1600&q=80" 
            className="w-full h-full object-cover brightness-50"
            alt="Zimbabwe Farmland"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-8 md:px-12 relative z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-secondary text-primary font-bold text-[10px] uppercase tracking-widest rounded-full shadow-lg">
                Verified Platform
              </span>
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            </div>
            
            <h1 className="text-5xl md:text-8xl font-display font-bold leading-[1] mb-6 tracking-tight">
              Grow More. <br />
              <span className="text-secondary">Sell More.</span> <br />
              Earn More.
            </h1>
            
            <p className="text-xl font-display font-medium text-secondary/80 mb-2">
              {lang === 'SN' ? 'Rima Zvakanaka. Tengesa Zvakanaka.' : 'Zimbabwe\'s #1 platform for farmers.'}
            </p>
            
            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed font-light max-w-2xl">
              Markets, inputs, weather, and finance in one place. Hand-built for the Zimbabwean farming community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setView('register')}
                className="bg-secondary text-primary px-8 py-4 rounded-full font-bold shadow-2xl shadow-secondary/20 hover:bg-warm transition-all flex items-center justify-center gap-3 group text-lg"
              >
                Join Free as a Farmer <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setView('marketplace')}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all text-lg"
              >
                Browse Marketplace
              </button>
            </div>

            {/* Trust Bar */}
            <div className="mt-16 flex flex-wrap items-center gap-8 py-8 border-t border-white/10 opacity-80">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-secondary">10,000+</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">Active Farmers</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-secondary">8</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">Provinces</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-lg font-bold flex items-center gap-2">
                  <ShieldCheck size={20} className="text-secondary" /> Trusted by Agritex
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: ShoppingBasket, title: 'Direct Market', desc: 'Sell your harvest to verified buyers across Zim.', color: 'bg-primary' },
            { icon: Zap, title: 'Quality Inputs', desc: 'Seeds & fertilisers from trusted suppliers.', color: 'bg-secondary' },
            { icon: CloudRain, title: 'Weather Alerts', desc: 'Localized forecasts and planting advice.', color: 'bg-accent' },
            { icon: DollarSign, title: 'Agri Finance', desc: 'Seasonal loans and crop insurance.', color: 'bg-primary-light' }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 bg-white rounded-3xl shadow-xl border border-black/5 group"
            >
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-earth/50 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- Marketplace View ---

const MarketplaceView = ({ onPost }: { onPost: () => void }) => {
  const [activeTab, setActiveTab] = useState('Grains');
  const cats = ['Grains', 'Vegetables', 'Fruits', 'Livestock', 'Dairy', 'Tobacco', 'Cotton', 'Other'];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Marketplace</h1>
          <p className="text-earth/60">Zimbabwe's digital produce exchange. Buy direct from the source.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth/20" size={20} />
            <input 
              type="text" 
              placeholder="Search produce or provinces..." 
              className="w-full bg-white border border-black/5 rounded-2xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          <button className="p-4 bg-primary text-white rounded-2xl hover:scale-105 transition-all shadow-lg">
            <Mic size={24} />
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-12 no-scrollbar">
        {cats.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all border ${
              activeTab === cat ? 'bg-primary text-white border-primary shadow-lg' : 'bg-white text-earth/60 border-black/5 hover:border-primary/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {LISTINGS.map(listing => (
          <motion.div 
            layout
            key={listing.id}
            className="group card hover:shadow-2xl transition-all"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={listing.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-primary">
                  {listing.province}
                </span>
                {listing.verified && (
                  <div className="w-6 h-6 bg-secondary text-primary rounded-full flex items-center justify-center shadow-lg" title="Verified Farmer">
                    <ShieldCheck size={14} strokeWidth={3} />
                  </div>
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-earth leading-tight">{listing.title}</h4>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">${listing.price}</p>
                  <p className="text-[10px] text-earth/40 font-bold uppercase">per {listing.unit}</p>
                </div>
              </div>
              <p className="text-xs text-earth/60 mb-6 bg-primary/5 p-3 rounded-xl border border-primary/5">
                <span className="font-bold text-primary">{listing.sellerName}</span> &middot; {listing.quantity} available
              </p>
              <div className="flex gap-2">
                <button className="flex-grow btn-primary py-3 text-xs">Contact Seller</button>
                <button className="w-12 h-12 flex items-center justify-center border-2 border-primary/10 rounded-full text-primary hover:bg-primary hover:text-white transition-all">
                  <MessageCircle size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Floating CTA */}
      <button 
        onClick={onPost}
        className="fixed bottom-8 right-8 bg-secondary text-primary flex items-center gap-3 px-8 py-5 rounded-full font-bold shadow-2xl hover:scale-110 transition-all z-40 active:scale-95 sm:hidden"
      >
        <Plus size={24} strokeWidth={3} />
        Post Produce
      </button>
      <button 
        onClick={onPost}
        className="hidden sm:flex fixed bottom-12 right-12 bg-secondary text-primary items-center gap-3 px-10 py-6 rounded-full font-bold shadow-2xl hover:scale-110 transition-all z-40 active:scale-95"
      >
        <Plus size={24} strokeWidth={3} />
        Post Your Produce
      </button>
    </div>
  );
};

// --- Inputs View ---

const InputsView = () => {
  const [activeTab, setActiveTab] = useState('Seeds');
  const tabs = ['Seeds', 'Fertiliser', 'Chemicals', 'Tools', 'Livestock'];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="bg-primary text-white rounded-[2.5rem] p-12 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full" />
        <div className="relative z-10">
          <span className="inline-block px-4 py-1 bg-secondary text-primary font-bold text-xs uppercase tracking-widest rounded-full mb-6">
            Seasonal Bundle Offer
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Seeds & Soil <br />Summer Sale</h2>
          <p className="text-white/70 text-lg max-w-xl mb-12">
            Buy 10 bags of SC719 and get 2 bags of Compound D at 50% discount. 
            Free delivery to all Agritex collection points.
          </p>
          <button className="bg-white text-primary px-10 py-5 rounded-full font-bold shadow-2xl hover:bg-secondary transition-all">
            Unlock Discount
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-black/5 overflow-x-auto no-scrollbar w-full md:w-auto">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-bold transition-all text-sm whitespace-nowrap ${
                activeTab === tab ? 'bg-primary text-white shadow-lg' : 'text-earth/60 hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm font-bold text-earth/40 uppercase tracking-widest bg-primary/5 px-6 py-3 rounded-full border border-primary/10">
          <Truck size={16} className="text-primary" /> Delivery Estimate: 3-5 Days
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {INPUTS.map(item => (
          <div key={item.id} className="card group hover:shadow-2xl transition-all">
             <div className="relative aspect-square overflow-hidden bg-background">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                {item.recommended && (
                  <div className="absolute top-4 left-4 bg-secondary text-primary px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg">
                    <Check size={14} strokeWidth={3} /> Agritex Recommended
                  </div>
                )}
                {item.stock < 100 && (
                  <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                    Low Stock
                  </div>
                )}
             </div>
             <div className="p-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-earth/40 mb-1">{item.brand}</p>
                <h4 className="text-xl font-bold mb-4">{item.name}</h4>
                <div className="flex items-baseline gap-2 mb-6">
                   <span className="text-2xl font-bold text-primary">${item.price}</span>
                   <span className="text-xs text-earth/40 font-medium">/{item.unit}</span>
                </div>
                <button className="w-full btn-primary py-4 flex items-center justify-center gap-2 group">
                  <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Add to Order
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Weather View ---

const WeatherView = () => {
  const [province, setProvince] = useState('Harare');
  
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Main Weather Card */}
          <div className="bg-gradient-to-br from-primary to-primary-light text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
               <div>
                  <div className="flex items-center gap-4 mb-4">
                    <select 
                      value={province}
                      onChange={e => setProvince(e.target.value)}
                      className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-4 py-2 rounded-xl focus:outline-none"
                    >
                      {PROVINCES.map(p => <option key={p} value={p} className="text-primary">{p}</option>)}
                    </select>
                    <span className="text-white/60 text-sm">Today, 3rd May</span>
                  </div>
                  <div className="flex items-center gap-8">
                     <span className="text-7xl md:text-8xl font-display font-bold">24°C</span>
                     <div className="flex flex-col">
                        <span className="text-2xl font-bold text-secondary">Partly Cloudy</span>
                        <div className="flex items-center gap-4 text-white/60 text-sm mt-1">
                           <span className="flex items-center gap-1"><CloudRain size={14} /> 15% Rain</span>
                           <span className="flex items-center gap-1"><Zap size={14} /> Low Storm Risk</span>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] text-center min-w-[200px]">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white/60 mb-3">Planting Safety</p>
                  <div className="w-16 h-16 bg-secondary text-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-secondary/20">
                     <Check size={32} strokeWidth={3} />
                  </div>
                  <h4 className="text-xl font-bold text-secondary">Safe to Plant</h4>
                  <p className="text-xs text-white/60 mt-2">Optimal soil moisture and temperature for maize & legumes.</p>
               </div>
            </div>
          </div>

          {/* 7 Day Forecast */}
          <div className="space-y-6">
             <h3 className="text-2xl font-display font-bold">7-Day Forecast</h3>
             <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                  <div key={day} className={`p-6 rounded-3xl border text-center transition-all ${idx === 0 ? 'bg-primary text-white shadow-xl border-primary' : 'bg-white text-earth shadow-sm border-black/5'}`}>
                    <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${idx === 0 ? 'opacity-60' : 'text-earth/40'}`}>{day}</p>
                    <div className="flex justify-center mb-4">
                       {idx % 3 === 0 ? <CloudRain className="text-secondary" /> : <Star className="text-warm" fill="currentColor" />}
                    </div>
                    <p className="text-xl font-bold">{22 + idx}°</p>
                    <p className={`text-[10px] font-bold mt-1 ${idx === 0 ? 'text-white/40' : 'text-earth/20'}`}>{idx * 10}% Rain</p>
                  </div>
                ))}
             </div>
          </div>

          {/* History Chart Placeholder */}
          <div className="card p-10 bg-white shadow-xl relative overflow-hidden">
             <h3 className="text-2xl font-display font-bold mb-8">Rainfall Trends</h3>
             <div className="h-64 w-full flex items-end justify-between gap-2">
                {[45, 60, 25, 80, 50, 90, 40, 70, 30, 85].map((v, i) => (
                  <div key={i} className="flex-grow flex flex-col items-center">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${v}%` }}
                      transition={{ delay: i * 0.1, duration: 1 }}
                      className="w-full bg-primary/10 rounded-t-lg relative group hover:bg-primary transition-colors cursor-help"
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">
                        {v}mm
                      </div>
                    </motion.div>
                    <span className="text-[10px] text-earth/20 font-bold mt-4 uppercase tracking-tighter">Oct '25</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Sidebar Alerts */}
        <div className="space-y-8">
           <div className="card p-8 bg-accent text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] rounded-full" />
              <div className="relative z-10">
                 <Zap className="text-white mb-4" size={32} />
                 <h4 className="text-xl font-bold mb-2">High Heat Warning</h4>
                 <p className="text-sm text-white/70 mb-6">Extreme temperatures expected in Lowveld regions tomorrow. Ensure livestock have adequate water shadows.</p>
                 <button className="w-full bg-white text-accent font-bold py-3 rounded-xl hover:scale-105 transition-all text-sm">
                    View Details
                 </button>
              </div>
           </div>

           <div className="card p-8 bg-white border border-black/5 shadow-xl">
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <MessageCircle className="text-primary" size={20} /> Alert Service
              </h4>
              <p className="text-sm text-earth/60 mb-6 leading-relaxed">
                Receive localized rain and frost alerts direct to your phone via SMS or WhatsApp. Always stay one step ahead of the weather.
              </p>
              <div className="space-y-3">
                 <button className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold py-4 rounded-2xl shadow-lg hover:scale-105 transition-all active:scale-95">
                    <MessageCircle fill="currentColor" size={20} /> WhatsApp Alerts
                 </button>
                 <button className="w-full flex items-center justify-center gap-3 bg-primary text-white font-bold py-4 rounded-2xl shadow-lg hover:scale-105 transition-all active:scale-95">
                    <Smartphone size={20} /> SMS Alerts
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const Smartphone = ({ size, ...props }: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>
  </svg>
);

// --- Financial View ---

const FinanceView = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Your Farm. Your Future. <span className="text-primary">Funded.</span></h1>
        <p className="text-lg text-earth/60 leading-relaxed">
          Access specialized loans, insurance, and price protection programs designed for Zimbabwe's agricultural cycles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {[
          { icon: Zap, title: 'Input Loans', desc: 'Seasonal credit for seeds & fertiliser. Repay after harvest.', color: 'bg-primary' },
          { icon: CloudRain, title: 'Crop Insurance', desc: 'Weather-indexed coverage against drought or flooding.', color: 'bg-accent' },
          { icon: Truck, title: 'Asset Finance', desc: 'Funding for irrigation, tractors, and processing equipment.', color: 'bg-secondary' },
          { icon: ShieldCheck, title: 'Market Guarantee', desc: 'Lock in minimum prices before you even plant.', color: 'bg-primary-light' },
          { icon: Users, title: 'Savings Groups', desc: 'Digital ROSCA tool for village community savings.', color: 'bg-warm' },
          { icon: HelpCircle, title: 'Custom Funding', desc: 'Talk to an advisor about your unique farm venture.', color: 'bg-earth' }
        ].map((item, idx) => (
          <div key={idx} className="card p-10 bg-white group hover:shadow-2xl transition-all border-b-4 border-b-transparent hover:border-b-primary">
            <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl rotate-3 group-hover:rotate-0 transition-transform`}>
              <item.icon size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p className="text-earth/50 text-base leading-relaxed mb-10">{item.desc}</p>
            <button className="w-full btn-outline flex items-center justify-center gap-2 group">
              Apply Now <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Partner Strip */}
      <div className="py-20 border-t border-black/5 text-center">
         <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-earth/20 mb-12">Our Verified Partners</p>
         <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale">
            <span className="text-2xl font-black italic">CBZ AGRI</span>
            <span className="text-2xl font-black italic">AGRIBANK</span>
            <span className="text-2xl font-black italic">OLD MUTUAL</span>
            <span className="text-2xl font-black italic">FSD ZIM</span>
            <span className="text-2xl font-black italic">RBZ REGULATED</span>
         </div>
      </div>
    </div>
  );
};

// --- Footer ---

const Footer = ({ setView }: { setView: (v: View) => void }) => {
  return (
    <footer className="bg-earth text-white/90 pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[150px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-secondary">
                <Award size={24} />
              </div>
              <span className="text-2xl font-bold font-display tracking-tight">AgriZim</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed font-medium">
              Empowering Zimbabwe's farmers with data, markets, and capital. Hand-built for the community.
            </p>
            <div className="flex gap-4">
              {['Facebook', 'WhatsApp', 'Twitter'].map(s => (
                <div key={s} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-secondary hover:text-primary transition-all cursor-pointer">
                   {s === 'WhatsApp' ? <MessageCircle size={18} /> : <span>{s[0]}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-white font-bold text-lg">Services</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li className="hover:text-secondary cursor-pointer" onClick={() => setView('marketplace')}>Produce Marketplace</li>
              <li className="hover:text-secondary cursor-pointer" onClick={() => setView('shop')}>Farm Inputs e-Shop</li>
              <li className="hover:text-secondary cursor-pointer" onClick={() => setView('weather')}>Seasonal Planner</li>
              <li className="hover:text-secondary cursor-pointer" onClick={() => setView('finance')}>Agri-Finance Hub</li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-white font-bold text-lg">Quick Access</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li className="hover:text-secondary cursor-pointer" onClick={() => setView('knowledge')}>Knowledge Centre</li>
              <li className="hover:text-secondary cursor-pointer" onClick={() => setView('community')}>Farmer Forum</li>
              <li className="hover:text-secondary cursor-pointer" onClick={() => setView('programs')}>Govt Programs</li>
              <li className="hover:text-secondary cursor-pointer">Agritex Support</li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-white font-bold text-lg">Contact Us</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-secondary"><Phone size={18} /></div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-white/30 mb-1">Call Centre</p>
                  <span className="text-sm font-bold">0808 123 4567 (Toll Free)</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-secondary"><MapPin size={18} /></div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-white/30 mb-1">Harare Office</p>
                  <span className="text-sm font-bold leading-relaxed px-5 py-2 hover:text-secondary cursor-pointer">12nd Floor, Travel Centre, Jason Moyo Ave</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">
          <p>© 2026 AGRIZIM PLATFORM</p>
          <div className="flex gap-8">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Agritex Partnership</span>
          </div>
          <p>BUILT FOR THE ZIMBABWEAN HARVEST</p>
        </div>
      </div>
    </footer>
  );
};

// --- Knowledge Centre ---

const KnowledgeCentreView = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16">
                <div className="max-w-xl">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Knowledge Centre</h1>
                    <p className="text-earth/60">Learn from Zimbabwe's top agronomists. Modern techniques for ancient soil.</p>
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth/20" size={20} />
                    <input 
                      type="text" 
                      placeholder="What do you want to grow?" 
                      className="w-full bg-white border border-black/5 rounded-2xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-primary/20 outline-none shadow-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {GUIDES.map(guide => (
                    <div key={guide.id} className="card group cursor-pointer hover:shadow-2xl transition-all">
                        <div className="relative aspect-video overflow-hidden">
                            <img src={guide.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                {guide.category}
                            </div>
                        </div>
                        <div className="p-8">
                            <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{guide.title}</h4>
                            <p className="text-earth/60 text-sm mb-8 leading-relaxed line-clamp-2">{guide.summary}</p>
                            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-earth/30">
                                <span>{guide.readTime} Read</span>
                                <button className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                                    Read Article <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Offline CTA */}
            <div className="mt-24 p-12 bg-primary/5 rounded-[3rem] border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-lg">
                    <h3 className="text-3xl font-display font-bold mb-4">Agritex Extension Support</h3>
                    <p className="text-earth/60 mb-1">Need specific advice for your plot? Chat with a verified agronomist directly on WhatsApp.</p>
                    <p className="text-xs text-primary font-bold uppercase tracking-widest">Response within 2 hours · Available Mon-Fri</p>
                </div>
                <button className="bg-[#25D366] text-white px-10 py-5 rounded-full font-bold shadow-2xl flex items-center gap-3 hover:scale-105 transition-all">
                    <MessageCircle size={24} fill="currentColor" /> Ask an Agronomist
                </button>
            </div>
        </div>
    );
};

// --- Main App Component ---

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [lang, setLang] = useState<Language>('EN');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary/10 selection:text-primary">
      <AnnouncementBar />
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        lang={lang} 
        setLang={setLang}
        isLoggedIn={isLoggedIn}
        onJoin={() => setCurrentView('register')}
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentView === 'home' && <HomeView setView={setCurrentView} lang={lang} />}
            {currentView === 'marketplace' && <MarketplaceView onPost={() => {}} />}
            {currentView === 'shop' && <InputsView />}
            {currentView === 'knowledge' && <KnowledgeCentreView />}
            {currentView === 'weather' && <WeatherView />}
            {currentView === 'finance' && <FinanceView />}
            
            {(['register', 'profile', 'community', 'programs'].includes(currentView)) && (
                <div className="max-w-4xl mx-auto px-8 py-24 text-center">
                    <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center text-primary mx-auto mb-8">
                        <Zap size={40} />
                    </div>
                    <h1 className="text-4xl font-display font-bold mb-4 uppercase tracking-tighter">Under Cultivation</h1>
                    <p className="text-earth/50 text-lg mb-12">The <span className="text-primary font-bold">{currentView}</span> module is being hand-planted by our devs. Check back soon for the harvest!</p>
                    <button onClick={() => setCurrentView('home')} className="btn-primary">Return Home</button>
                </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setView={setCurrentView} />
      
      {/* WhatsApp Button */}
      <div className="fixed bottom-8 left-8 z-50 hidden md:block">
        <button className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group relative">
          <MessageCircle size={28} fill="currentColor" />
          <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-white text-earth font-bold text-xs py-2 px-4 rounded-xl shadow-xl border border-black/5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            How can we help you today?
          </div>
        </button>
      </div>
    </div>
  );
}
