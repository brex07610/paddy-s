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
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem, View, OrderDetails } from './types';
import { PRODUCTS, CATEGORIES } from './constants';

// --- Shared Components ---

const Navbar = ({ 
  cartCount, 
  setView, 
  toggleCart, 
  currentView,
  lastAdded
}: { 
  cartCount: number, 
  setView: (v: View) => void, 
  toggleCart: () => void,
  currentView: View,
  lastAdded: string | null
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string, view: View }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'Seasonal Specials', view: 'specials' },
    { label: 'About Us', view: 'about' },
  ];

  return (
    <>
      <div className="bg-primary text-white text-center py-2 text-sm font-medium">
        <span className="opacity-90">Free delivery on orders over $50! 🍏 Order by 2pm for same-day delivery.</span>
      </div>
      <nav 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-3' : 'bg-background/80 backdrop-blur-md py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setView('home')}
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
              <Leaf size={24} fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold text-primary leading-tight">Paddy's</span>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-earth/60 leading-none">Fruit & Veg</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button 
                key={link.label}
                onClick={() => setView(link.view)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentView === link.view ? 'text-primary' : 'text-earth'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-5">
            <div className="hidden sm:flex items-center gap-2 text-earth/70 text-sm">
              <Phone size={16} />
              <span className="font-medium">0800 PADDY</span>
            </div>
            
            <div className="relative">
              <button 
                onClick={toggleCart}
                className="relative p-2.5 bg-white rounded-full text-earth shadow-sm border border-black/5 hover:bg-primary hover:text-white transition-all group"
              >
                <ShoppingBasket size={22} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span 
                      key={cartCount}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-[10px] font-bold text-white rounded-full flex items-center justify-center border-2 border-white ring-1 ring-accent"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <AnimatePresence>
                {lastAdded && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    className="absolute top-14 right-0 bg-white border border-black/5 shadow-2xl rounded-2xl py-3 px-4 flex items-center gap-3 whitespace-nowrap z-50 pointer-events-none"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-earth leading-none mb-0.5">Added to Basket</p>
                      <p className="text-[10px] text-earth/40 italic">{lastAdded}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              className="lg:hidden p-2 text-earth"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-white flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2">
                <Leaf className="text-primary" />
                <span className="text-xl font-bold font-display">Paddy's</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-background rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <button 
                  key={link.label}
                  onClick={() => {
                    setView(link.view);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-2xl font-display font-medium text-left px-2"
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-auto flex flex-col gap-4 border-t pt-8 text-earth/60">
                <div className="flex items-center gap-3">
                  <Phone size={20} />
                  <span>Call us: 0800 PADDY</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} />
                  <span>123 Harvest Road, Freshville</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onViewDetails 
}: { 
  product: Product, 
  onAddToCart: (p: Product) => void,
  onViewDetails: (p: Product) => void
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card group flex flex-col h-full"
    >
      <div 
        className="relative aspect-[4/5] overflow-hidden cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            {product.badge}
          </span>
        )}
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-earth/40 hover:text-accent transition-colors">
          <Heart size={18} />
        </button>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center gap-1 text-primary mb-1">
          <Star size={12} fill="currentColor" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Top Quality</span>
        </div>
        <h3 className="text-lg font-display mb-1 text-earth group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-earth/60 mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-end justify-between">
          <div>
            <span className="text-2xl font-display font-bold text-earth">${product.price.toFixed(2)}</span>
            <span className="text-xs text-earth/40 ml-1">/ {product.unit}</span>
          </div>
          <button 
            onClick={handleAdd}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-md active:scale-95 ${
              isAdded ? 'bg-secondary text-primary' : 'bg-primary text-white hover:bg-primary-light'
            }`}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                >
                  <Check size={20} strokeWidth={3} />
                </motion.div>
              ) : (
                <motion.div
                  key="plus"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Plus size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove,
  onCheckout
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[],
  onUpdateQuantity: (id: string, delta: number) => void,
  onRemove: (id: string) => void,
  onCheckout: () => void
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[101] bg-white shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-display font-bold">Your Basket</h2>
                <p className="text-sm text-earth/40">{items.length} items selected</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-background rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-4">
                    <ShoppingBasket size={32} className="text-earth/20" />
                  </div>
                  <h3 className="text-lg font-medium opacity-60">Your basket is empty</h3>
                  <p className="text-sm text-earth/40 mt-2">Time to add some fresh goodies!</p>
                  <button 
                    onClick={onClose}
                    className="mt-6 text-primary font-bold flex items-center gap-2 hover:underline"
                  >
                    Continue Shopping <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 bg-background rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-display font-medium text-earth">{item.name}</h4>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-earth/20 hover:text-accent transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-earth/40 mb-2">${item.price.toFixed(2)} / {item.unit}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 bg-background rounded-lg p-0.5 border">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-white rounded-md text-earth/60 disabled:opacity-20"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-white rounded-md text-earth/60"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t bg-background/30">
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-earth/60">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-earth/60">Delivery</span>
                    <span className="text-primary font-bold">{total >= 50 ? 'FREE' : '$5.00'}</span>
                  </div>
                  <div className="flex justify-between text-lg font-display font-bold pt-2 border-t mt-2">
                    <span>Total</span>
                    <span className="text-primary">${(total >= 50 ? total : total + 5).toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full btn-primary py-4 flex items-center justify-center gap-3"
                >
                  <ShieldCheck size={20} /> Checkout Now
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- View Components ---

const SpecialsView = ({ onAddToCart }: { onAddToCart: (p: Product) => void }) => {
  const [isBoxAdded, setIsBoxAdded] = useState(false);
  const specials = PRODUCTS.filter(p => p.category === 'Seasonal' || p.badge?.includes('Special'));
  
  const handleBoxAdd = () => {
    const box = PRODUCTS.find(p => p.id === '3');
    if (box) {
      onAddToCart(box);
      setIsBoxAdded(true);
      setTimeout(() => setIsBoxAdded(false), 2000);
    }
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Specials Hero */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[3rem] mx-4 md:mx-8">
           <img 
             src="https://images.unsplash.com/photo-1595855759920-86582396756a?w=1600&q=80" 
             className="w-full h-full object-cover brightness-50"
             alt="Specials Background"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-earth to-transparent opacity-60" />
        </div>
        <div className="max-w-7xl mx-auto px-12 relative z-10 text-white text-center">
           <span className="inline-block px-4 py-1.5 bg-accent text-white font-bold text-xs uppercase tracking-widest rounded-full mb-6">
             Limited Time Offers
           </span>
           <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Seasonal <span className="text-secondary italic">Treasures</span></h1>
           <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
             The freshest picks of the week, bundled for value and maximum freshness. 
             Order before they're gone!
           </p>
           <div className="flex items-center justify-center gap-4 text-sm font-bold">
             <div className="flex items-center gap-2">
               <Clock size={18} className="text-secondary" />
               <span>Ends in 2d 14h 32m</span>
             </div>
           </div>
        </div>
      </section>

      {/* Specials Grid */}
      <section className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {specials.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart}
                onViewDetails={(p) => {}} 
              />
            ))}
           {/* Bundle Box Special */}
           <div className="lg:col-span-2 card bg-primary text-white p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full" />
              <div className="w-full md:w-1/2 relative z-10">
                 <span className="text-secondary uppercase tracking-widest font-bold text-xs mb-4 block">Best Seller Bundle</span>
                 <h2 className="text-4xl font-display font-bold mb-6 italic">The Weekly Harvest Box</h2>
                 <p className="text-white/70 mb-8 leading-relaxed">
                   Carefully curated by Paddy himself, this box includes 12 seasonal staples—enough for a family of four. 
                   Save 20% compared to individual items.
                 </p>
                 <div className="flex items-center gap-6 mb-8">
                    <span className="text-4xl font-display font-bold">$45.00</span>
                    <span className="text-lg line-through opacity-40">$58.00</span>
                 </div>
                 <button 
                   onClick={handleBoxAdd}
                   className={`px-10 py-4 rounded-full font-bold shadow-xl transition-all flex items-center gap-2 ${
                     isBoxAdded ? 'bg-secondary text-primary' : 'bg-white text-primary hover:bg-secondary'
                   }`}
                 >
                   {isBoxAdded ? (
                     <>
                       <Check size={20} /> Added to Basket
                     </>
                   ) : (
                     'Grab the Box'
                   )}
                 </button>
              </div>
              <div className="w-full md:w-1/2 aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10">
                 <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80" className="w-full h-full object-cover" />
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

const AboutView = ({ setView }: { setView: (v: View) => void }) => {
  return (
    <div className="pb-20">
      {/* Story Hero */}
      <section className="max-w-7xl mx-auto px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
           <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Our Roots</span>
           <h1 className="text-5xl md:text-6xl font-display font-bold mb-8 leading-tight">
             Grown locally. <br />
             <span className="text-primary italic">Delivered</span> with heart.
           </h1>
           <div className="space-y-6 text-earth/70 leading-relaxed text-lg font-light">
              <p>
                In 1994, Paddy started with a simple old truck and a mission: to bridge the gap between local fertile farms and the families in our growing community. 
              </p>
              <p>
                What began as a small roadside stall has blossomed into a digital marketplace that stays true to those original values—honesty, quality, and a deep respect for the land.
              </p>
              <div className="pt-6 flex items-center gap-4">
                 <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-primary">
                    <Heart size={32} />
                 </div>
                 <div>
                    <h4 className="font-bold text-earth">Family Operated</h4>
                    <p className="text-sm">Still run by Paddy, his kids, and a small band of local legends.</p>
                 </div>
              </div>
           </div>
        </div>
        <div className="relative">
           <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?w=800&q=80" className="w-full h-full object-cover" />
           </div>
           <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-xl border border-black/5 max-w-xs hidden md:block">
              <p className="text-sm italic font-medium text-earth/60 mb-2">"Quality is never an accident; it is always the result of high intention."</p>
              <p className="font-display font-bold text-primary">— Paddy, Founder</p>
           </div>
        </div>
      </section>

      {/* Stats / Proof */}
      <section className="bg-primary text-white py-24 mx-4 md:mx-8 rounded-[3rem]">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
           <div>
              <h3 className="text-5xl font-display font-bold mb-2">30+</h3>
              <p className="text-white/40 uppercase tracking-widest text-xs font-bold">Years Harvesting</p>
           </div>
           <div>
              <h3 className="text-5xl font-display font-bold mb-2">15</h3>
              <p className="text-white/40 uppercase tracking-widest text-xs font-bold">Local Farm Partners</p>
           </div>
           <div>
              <h3 className="text-5xl font-display font-bold mb-2">5k+</h3>
              <p className="text-white/40 uppercase tracking-widest text-xs font-bold">Happy Families</p>
           </div>
           <div>
              <h3 className="text-5xl font-display font-bold mb-2">0</h3>
              <p className="text-white/40 uppercase tracking-widest text-xs font-bold">Plastic Waste Goal</p>
           </div>
        </div>
      </section>

      {/* Sourcing Section */}
      <section className="max-w-7xl mx-auto px-8 py-24">
         <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Why Families <span className="text-primary italic">Choose Us</span></h2>
            <p className="text-earth/60 max-w-2xl mx-auto">We don't just sell vegetables; we manage a curated ecosystem of local supply chains.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <ShieldCheck size={32} />, title: "Quality Audit", desc: "Every single apple and carrot is inspected by hand before it hits your box." },
              { icon: <Truck size={32} />, title: "Direct Path", desc: "No middleman warehouses. Your food goes from soil to your door in 24 hours." },
              { icon: <MapPin size={32} />, title: "100% Local", desc: "We only source from within 100km of our main shop to reduce carbon footprints." }
            ].map((item, i) => (
              <div key={i} className="card p-10 flex flex-col items-center text-center space-y-4 hover:border-primary/20 transition-all">
                 <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center text-primary">
                    {item.icon}
                 </div>
                 <h4 className="text-xl font-display font-bold">{item.title}</h4>
                 <p className="text-sm text-earth/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
         </div>
         <div className="mt-20 flex justify-center">
            <button 
              onClick={() => setView('shop')}
              className="btn-primary"
            >
              Start Your First Order
            </button>
         </div>
      </section>
    </div>
  );
};

const HomeView = ({ setView, onAddToCart }: { setView: (v: View) => void, onAddToCart: (p: Product) => void }) => {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-8">
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[3rem] mx-4 md:mx-8">
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80" 
            className="w-full h-full object-cover brightness-50 contrast-125"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-8 md:px-12 relative z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary text-primary font-bold text-xs uppercase tracking-widest rounded-full mb-6">
              <Star size={14} fill="currentColor" /> Freshness Guaranteed
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6">
              Paddy's Fresh <br />
              <span className="text-secondary italic">Farm-to-Table</span> <br />
              Selection.
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed font-light">
              We bring the best of the local harvest direct to your doorstep. Handpicked with love by our family for yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setView('shop')}
                className="bg-white text-primary px-8 py-4 rounded-full font-bold shadow-xl hover:bg-secondary transition-all flex items-center justify-center gap-2 group"
              >
                Start Shop <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setView('about')}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all"
              >
                Our Story
              </button>
            </div>
          </motion.div>
        </div>

        {/* Feature Strip */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 hidden lg:block">
          <div className="bg-white rounded-3xl p-8 shadow-2xl flex justify-between gap-8 border border-primary/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-primary translate-y-[-2px]">
                <Truck size={28} />
              </div>
              <div>
                <h4 className="font-display font-bold text-earth leading-tight">Same-Day Delivery</h4>
                <p className="text-xs text-earth/40">Order by 2pm today</p>
              </div>
            </div>
            <div className="w-[1px] bg-earth/10 flex-shrink-0" />
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent translate-y-[-2px]">
                <Leaf size={28} />
              </div>
              <div>
                <h4 className="font-display font-bold text-earth leading-tight">100% Local Farms</h4>
                <p className="text-xs text-earth/40">Supporting growers</p>
              </div>
            </div>
            <div className="w-[1px] bg-earth/10 flex-shrink-0" />
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary translate-y-[-2px]">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h4 className="font-display font-bold text-earth leading-tight">Zero-Waste Promise</h4>
                <p className="text-xs text-earth/40">Recyclable packaging</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-8 pt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-lg">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Today's <span className="text-primary italic">Harvest</span> Specials</h2>
            <p className="text-earth/60">Grown locally, hand-selected this morning. These are our personal favourites for the kitchen this week.</p>
          </div>
          <button 
            onClick={() => setView('shop')}
            className="flex items-center gap-2 group font-bold text-primary"
          >
            See full shop <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all"><ArrowRight size={14} /></div>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.filter(p => p.featured).map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={() => onAddToCart(product)}
              onViewDetails={(p) => setView('shop')}
            />
          ))}
        </div>
      </section>
      
      {/* Promo Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
         <div className="bg-earth text-white rounded-[2.5rem] p-12 relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full" />
            
            <Leaf className="text-secondary mb-6" size={48} />
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Want Weekly <span className="text-secondary">Freshness?</span></h2>
            <p className="text-white/60 text-lg max-w-2xl mb-12">
              Join 500+ local families receiving our seasonal harvest newsletters. Get exclusive deals and farm updates every Friday.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button className="bg-secondary text-primary font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all">
                Join Now
              </button>
            </div>
         </div>
      </section>
    </div>
  );
};

const ShopView = ({ 
  onAddToCart, 
  setView 
}: { 
  onAddToCart: (p: Product) => void,
  setView: (v: View) => void
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'newest'>('newest');

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    
    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">The Digital <span className="text-primary italic">Marketplace</span></h1>
          <p className="text-earth/60">Browse our full range of farm-fresh fruit, vegetables, and curated bundles.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 flex-grow max-w-2xl">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth/20" size={20} />
            <input 
              type="text" 
              placeholder="Search produce..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-black/5 rounded-2xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-black/5 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-medium"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full whitespace-nowrap text-sm font-bold transition-all ${
              activeCategory === cat 
                ? 'bg-primary text-white shadow-lg' 
                : 'bg-white text-earth/60 hover:bg-primary/5 border border-black/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart}
                onViewDetails={(p) => {}}
              />
            ))
          ) : (
            <div className="col-span-full py-24 flex flex-col items-center justify-center text-center">
               <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-6">
                 <Search size={32} className="text-earth/20" />
               </div>
               <h3 className="text-xl font-display font-bold">No items found</h3>
               <p className="text-earth/40 max-w-xs mt-2">Try adjusting your filters or search query to find what you're looking for.</p>
               <button 
                 onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                 className="mt-8 text-primary font-bold hover:underline"
               >
                 View All Produce
               </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const CheckoutView = ({ 
  cart, 
  onBack, 
  onNext 
}: { 
  cart: CartItem[], 
  onBack: () => void, 
  onNext: (order: OrderDetails) => void 
}) => {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState<OrderDetails>({
    name: '',
    address: '',
    phone: '',
    deliverySlot: 'morning',
    paymentMethod: 'mobile-money'
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = total >= 50 ? 0 : 5;
  const grandTotal = total + shipping;

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-earth/60 mb-8 hover:text-primary transition-colors"
      >
        <ArrowLeft size={20} /> Back to Shop
      </button>

      <div className="flex items-center justify-center mb-12 max-w-md mx-auto relative">
        <div className="flex items-center justify-between w-full relative z-10">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                step >= s ? 'bg-primary text-white shadow-lg' : 'bg-background text-earth/20 border'
              }`}>
                {step > s ? <ShieldCheck size={20} /> : <span>{s}</span>}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${
                step >= s ? 'text-primary' : 'text-earth/20'
              }`}>
                {s === 1 ? 'Details' : s === 2 ? 'Payment' : 'Review'}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute top-5 left-0 w-full h-[2px] bg-background -z-0">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(step-1)*50}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Forms */}
        <div className="space-y-8">
          {step === 1 && (
            <div className="space-y-6">
               <div>
                  <h2 className="text-2xl font-display font-bold mb-6">Delivery Details</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-earth/40">Full Name</label>
                       <input 
                         type="text" 
                         className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none" 
                         placeholder="John Doe"
                         value={details.name}
                         onChange={e => setDetails({...details, name: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-earth/40">Delivery Address</label>
                       <textarea 
                         className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none min-h-[100px]" 
                         placeholder="Street, Suburb, Postcode"
                         value={details.address}
                         onChange={e => setDetails({...details, address: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-earth/40">Phone Number</label>
                       <input 
                         type="tel" 
                         className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none" 
                         placeholder="0800 PADDY"
                         value={details.phone}
                         onChange={e => setDetails({...details, phone: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-earth/40">Preferred Delivery Slot</label>
                       <div className="grid grid-cols-2 gap-3">
                         <button 
                           onClick={() => setDetails({...details, deliverySlot: 'morning'})}
                           className={`p-4 rounded-xl border font-bold text-sm transition-all ${
                             details.deliverySlot === 'morning' ? 'border-primary bg-primary/5 text-primary' : 'border-black/5 text-earth/40'
                           }`}
                         >
                           Morning (8am—12pm)
                         </button>
                         <button 
                           onClick={() => setDetails({...details, deliverySlot: 'afternoon'})}
                           className={`p-4 rounded-xl border font-bold text-sm transition-all ${
                             details.deliverySlot === 'afternoon' ? 'border-primary bg-primary/5 text-primary' : 'border-black/5 text-earth/40'
                           }`}
                         >
                           Afternoon (1pm—6pm)
                         </button>
                       </div>
                    </div>
                  </div>
               </div>
               <button 
                 className="w-full btn-primary py-4"
                 onClick={() => setStep(2)}
                 disabled={!details.name || !details.address || !details.phone}
               >
                 Continue to Payment
               </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold mb-6">Payment Method</h2>
              <div className="space-y-4">
                {['mobile-money', 'credit-card', 'cash-on-delivery'].map(method => (
                  <button 
                    key={method}
                    onClick={() => setDetails({...details, paymentMethod: method})}
                    className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all ${
                      details.paymentMethod === method ? 'border-primary bg-primary/5 shadow-md' : 'border-black/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        details.paymentMethod === method ? 'border-primary bg-primary' : 'border-black/10'
                      }`}>
                         {details.paymentMethod === method && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className={`font-bold capitalize ${details.paymentMethod === method ? 'text-primary' : 'text-earth'}`}>
                        {method.replace(/-/g, ' ')}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-4 bg-background border border-black/5 rounded-2xl flex gap-3 text-sm text-earth/60">
                <ShieldCheck className="text-primary flex-shrink-0" size={20} />
                <p>Your transaction is secure and encrypted. We never store sensitive payment data on our servers.</p>
              </div>
              <div className="flex gap-4">
                <button 
                  className="w-1/3 btn-outline py-4"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button 
                  className="flex-grow btn-primary py-4"
                  onClick={() => onNext(details)}
                >
                  Place Order & WhatsApp Us
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary Card */}
        <div className="card p-8 sticky top-32">
          <h3 className="text-xl font-display font-bold mb-6">Order Summary</h3>
          <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-background rounded-lg border border-black/5 flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-earth">{item.name}</h5>
                    <p className="text-earth/40 text-[10px]">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-3 pt-6 border-t font-medium">
             <div className="flex justify-between">
                <span className="text-earth/60">Subtotal</span>
                <span>${total.toFixed(2)}</span>
             </div>
             <div className="flex justify-between">
                <span className="text-earth/60">Delivery</span>
                <span className={shipping === 0 ? 'text-primary font-bold' : ''}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
             </div>
             <div className="flex justify-between text-2xl font-display font-bold text-earth pt-4 border-t mt-4">
                <span>Total</span>
                <span className="text-primary">${grandTotal.toFixed(2)}</span>
             </div>
          </div>
          <div className="mt-8 p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
             <p className="text-[10px] text-primary uppercase tracking-[0.2em] font-bold mb-1">Paddy's Freshness Guarantee</p>
             <p className="text-xs text-primary/80">If you're not 100% happy with the quality, we'll refund or replace within 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfirmationView = ({ setView, details }: { setView: (v: View) => void, details: OrderDetails | null }) => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-24 flex flex-col items-center justify-center text-center">
       <motion.div 
         initial={{ scale: 0 }}
         animate={{ scale: 1 }}
         className="w-24 h-24 bg-primary text-white rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl"
       >
         <ShoppingBasket size={48} />
       </motion.div>
       <h1 className="text-5xl font-display font-bold mb-4">You're All Set, <span className="text-primary">{details?.name.split(' ')[0]}!</span></h1>
       <p className="text-earth/60 text-lg max-w-2xl mx-auto mb-12">
         Order <span className="text-primary font-bold">#28349</span> is being handpicked right now. 
         We'll see you during your {details?.deliverySlot} delivery slot!
       </p>
       
       <div className="flex flex-col sm:flex-row gap-4">
         <button 
           onClick={() => {
             const message = encodeURIComponent(`Hi Paddy! My order #28349 is confirmed. Please let me know when it's on the way!`);
             window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
           }}
           className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
         >
           <MessageCircle size={20} fill="currentColor" /> Chat with Paddy 
         </button>
         <button 
           onClick={() => setView('home')}
           className="btn-outline py-4 px-8"
         >
           Back to Home
         </button>
       </div>

       <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
         <div className="card p-8 flex flex-col items-center">
           <Truck className="text-primary mb-4" size={32} />
           <h4 className="font-bold mb-2">Track Delivery</h4>
           <p className="text-sm text-earth/40 italic">Coming Soon!</p>
         </div>
         <div className="card p-8 flex flex-col items-center">
           <Phone className="text-primary mb-4" size={32} />
           <h4 className="font-bold mb-2">Need Help?</h4>
           <p className="text-sm text-earth/40">Call us anytime on 0800 PADDY</p>
         </div>
         <div className="card p-8 flex flex-col items-center">
           <Leaf className="text-primary mb-4" size={32} />
           <h4 className="font-bold mb-2">Zero Waste</h4>
           <p className="text-sm text-earth/40 text-center">Remember to leave your old boxes out for us to collect!</p>
         </div>
       </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    // Trigger feedback instead of opening drawer
    setLastAdded(product.name);
    setTimeout(() => setLastAdded(null), 3000);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = (details: OrderDetails) => {
    setOrderDetails(details);
    setCurrentView('confirmation');
    setCart([]); // Clear cart after order
    window.scrollTo(0, 0);
  };

  // WhatsApp Button Component
  const WhatsAppButton = () => (
    <motion.button 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => window.open('https://wa.me/1234567890', '_blank')}
      className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl overflow-hidden group"
    >
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <MessageCircle size={32} fill="currentColor" />
    </motion.button>
  );

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/20 bg-background">
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        setView={v => { setCurrentView(v); window.scrollTo(0,0); }} 
        toggleCart={() => setIsCartOpen(!isCartOpen)}
        currentView={currentView}
        lastAdded={lastAdded}
      />

      <main className="flex-grow pt-4 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentView === 'home' && <HomeView setView={setCurrentView} onAddToCart={addToCart} />}
            {currentView === 'shop' && <ShopView setView={setCurrentView} onAddToCart={addToCart} />}
            {currentView === 'specials' && <SpecialsView onAddToCart={addToCart} />}
            {currentView === 'about' && <AboutView setView={setCurrentView} />}
            {currentView === 'checkout' && (
              <CheckoutView 
                cart={cart} 
                onBack={() => setCurrentView('shop')} 
                onNext={handlePlaceOrder}
              />
            )}
            {currentView === 'confirmation' && <ConfirmationView setView={setCurrentView} details={orderDetails} />}
            
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-earth text-white/90 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Leaf className="text-secondary" />
              <span className="text-2xl font-bold font-display">Paddy's</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Bringing the local market experience to your digital storefront. Family owned and operated since 1994.
            </p>
            <div className="flex gap-4">
              {['Facebook', 'Instagram', 'WhatsApp'].map(social => (
                <div key={social} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all cursor-pointer">
                  <span className="sr-only">{social}</span>
                  {social === 'Facebook' && <span className="font-bold">f</span>}
                  {social === 'Instagram' && <span className="font-bold">i</span>}
                  {social === 'WhatsApp' && <MessageCircle size={18} />}
                </div>
              ))}
            </div>
          </div>

          <div>
             <h4 className="text-white font-bold mb-6">Explore</h4>
             <ul className="space-y-4 text-sm text-white/50">
               <li className="hover:text-secondary cursor-pointer" onClick={() => setCurrentView('shop')}>Daily Harvest</li>
               <li className="hover:text-secondary cursor-pointer" onClick={() => setCurrentView('specials')}>Seasonal Boxes</li>
               <li className="hover:text-secondary cursor-pointer">Recipes</li>
               <li className="hover:text-secondary cursor-pointer">Delivery Areas</li>
             </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-6">Information</h4>
             <ul className="space-y-4 text-sm text-white/50">
               <li className="hover:text-secondary cursor-pointer" onClick={() => setCurrentView('about')}>Our Story</li>
               <li className="hover:text-secondary cursor-pointer">Privacy Policy</li>
               <li className="hover:text-secondary cursor-pointer">Terms of Service</li>
               <li className="hover:text-secondary cursor-pointer">FAQs</li>
             </ul>
          </div>

          <div className="space-y-6">
             <h4 className="text-white font-bold mb-6">Contact Us</h4>
             <div className="flex items-center gap-3">
               <Phone size={18} className="text-secondary" />
               <span className="text-sm">0800 PADDY (72339)</span>
             </div>
             <div className="flex items-center gap-3">
               <MapPin size={18} className="text-secondary" />
               <span className="text-sm">123 Harvest Road, Freshville</span>
             </div>
             <div className="flex items-center gap-3 text-sm">
               <Clock size={18} className="text-secondary" />
               <div>
                 <p>Mon—Fri: 7am—7pm</p>
                 <p className="opacity-50">Sat: 8am—4pm</p>
               </div>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-white/20">
           <p>© 2024 Paddy's Fruit & Veg</p>
           <p>Hand-built for the Community</p>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      <WhatsAppButton />
    </div>
  );
}
