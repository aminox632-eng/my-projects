import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { Product } from '@/types';

export const revalidate = 60;

export default async function HomePage() {
  const supabase = createClient();
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .limit(3);

  return (
    <div className="flex flex-col gap-24 pb-20">
      <section className="relative h-[85vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1920"
            alt="Noir Coffee Atmosphere"
            fill
            priority
            className="object-cover opacity-25 filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir-900 via-transparent to-noir-900" />
        </div>

        <div className="relative z-10 max-w-3xl text-center flex flex-col items-center">
          <span className="text-gold tracking-[0.3em] uppercase text-xs font-semibold mb-4 border border-gold/30 px-4 py-1.5 rounded-full">
            The Haute Roastery
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-cream mb-6">
            Elegance In Every Extraction.
          </h1>
          <p className="text-cream-muted text-lg max-w-xl mb-8 leading-relaxed font-light">
            Indulge in meticulously sourced micro-lots, brewed with reverence and served in uncompromised serenity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link
              href="/menu"
              className="px-8 py-3.5 bg-gold text-noir-950 font-medium tracking-wide hover:bg-gold-light transition duration-200"
            >
              Explore Menu
            </Link>
            <Link
              href="/reservations"
              className="px-8 py-3.5 border border-gold/40 text-cream font-medium tracking-wide hover:bg-gold/10 transition duration-200"
            >
              Reserve Table
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-cream mb-2">Featured Selections</h2>
          <div className="w-16 h-0.5 bg-gold" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts?.map((item: Product) => (
            <Link
              key={item.id}
              href={`/menu/${item.id}`}
              className="group bg-noir-800 border border-gold/15 overflow-hidden transition duration-300 hover:border-gold/50"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-serif text-xl text-cream group-hover:text-gold transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-gold font-semibold">${Number(item.price).toFixed(2)}</span>
                </div>
                <p className="text-cream-muted text-sm line-clamp-2">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border border-gold/15 bg-noir-800/40 p-8 md:p-14">
          <div className="relative h-96 w-full">
            <Image
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1000"
              alt="Artisanal Roasting"
              fill
              className="object-cover border border-gold/20"
            />
          </div>
          <div>
            <span className="text-gold tracking-[0.2em] uppercase text-xs">Our Philosophy</span>
            <h2 className="font-serif text-3xl md:text-4xl text-cream mt-2 mb-6">Mastery Over Quantity</h2>
            <p className="text-cream-muted leading-relaxed mb-4">
              Noir Coffee was conceived out of an ambition to elevate routine caffeine intake into an intentional ritual. We roast our green beans in micro-batches under 5 kilograms, curating flavor profiles defined by complexity, body, and smoothness.
            </p>
            <p className="text-cream-muted leading-relaxed mb-8">
              Every blend is precision-ground and calibrated hourly to guarantee an unrivaled balance of temperature, pressure, and extraction.
            </p>
            <Link
              href="/menu"
              className="inline-block text-gold uppercase tracking-widest text-xs border-b border-gold pb-1 hover:text-gold-light"
            >
              Discover The Blends →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}