import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-noir-950 text-cream-muted py-14">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-serif text-xl text-gold mb-3">NOIR COFFEE</h3>
          <p className="text-sm leading-relaxed text-cream-muted/80">
            A sanctuary where artisanal single-origin beans meet quiet opulence. Roasted slow, extracted meticulously.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-cream font-semibold mb-3">Hours & Location</h4>
          <p className="text-sm">412 Sovereign Ave, Suite 100</p>
          <p className="text-sm mt-1">Monday – Friday: 06:30 – 19:00</p>
          <p className="text-sm">Saturday – Sunday: 07:30 – 21:00</p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-cream font-semibold mb-3">Follow The Craft</h4>
          <div className="flex gap-4 text-sm">
            <Link href="#" className="hover:text-gold transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-gold transition-colors">Substack</Link>
            <Link href="#" className="hover:text-gold transition-colors">Spotify</Link>
          </div>
          <p className="text-xs text-cream-muted/50 mt-8">© {new Date().getFullYear()} Noir Coffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}