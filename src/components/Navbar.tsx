'use client';

import Link from 'next/link';
import { ShoppingBag, Coffee, User } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-noir-950/80 backdrop-blur-md border-b border-gold/15">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Coffee className="w-6 h-6 text-gold group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-serif text-2xl font-bold tracking-widest text-cream">
            NOIR <span className="text-gold">COFFEE</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-light text-cream-muted">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <Link href="/menu" className="hover:text-gold transition-colors">Menu</Link>
          <Link href="/reservations" className="hover:text-gold transition-colors">Reservations</Link>
          <Link href="/admin" className="hover:text-gold transition-colors">Admin</Link>
        </nav>

        <div className="flex items-center gap-5">
          <Link href="/login" className="p-2 text-cream hover:text-gold transition-colors" title="Account">
            <User className="w-5 h-5" />
          </Link>
          <button className="relative p-2 text-cream hover:text-gold transition-colors" title="Cart">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1 right-1 bg-gold text-noir-950 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}