import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Product } from '@/types';

interface PageProps {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const supabase = createClient();
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!product) {
    notFound();
  }

  const p: Product = product;

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link href="/menu" className="text-gold text-xs uppercase tracking-widest hover:underline mb-8 inline-block">
        ← Back to Menu
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-noir-800 border border-gold/20 p-8 md:p-12">
        <div className="relative h-[420px] w-full">
          <Image
            src={p.image_url}
            alt={p.name}
            fill
            priority
            className="object-cover border border-gold/15"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-gold text-xs uppercase tracking-widest font-semibold">{p.category}</span>
          <h1 className="font-serif text-4xl text-cream mt-2 mb-4">{p.name}</h1>
          <span className="text-2xl text-gold font-medium mb-6">${Number(p.price).toFixed(2)}</span>
          <p className="text-cream-muted text-sm leading-relaxed mb-8">{p.description}</p>

          <div className="border-t border-gold/20 pt-6 flex flex-col gap-4">
            <button className="w-full py-4 bg-gold text-noir-950 font-semibold tracking-wider uppercase hover:bg-gold-light transition duration-200">
              Add To Order
            </button>
            <p className="text-center text-xs text-cream-muted/70">
              Freshly ground & hand-poured upon pickup.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}