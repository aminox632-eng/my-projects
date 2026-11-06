import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Product } from '@/types';

export default async function MenuPage() {
  const supabase = createClient();
  const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false });

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center text-gold mb-12 uppercase">Our Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(products as Product[] || []).map((p) => (
          <Link key={p.id} href={`/menu/${p.id}`} className="bg-noir-800 border border-gold/20 p-4 rounded-lg hover:border-gold transition">
            <div className="relative h-[250px] w-full mb-4">
              {p.image_url && <Image src={p.image_url} alt={p.name} fill className="object-cover rounded" />}
            </div>
            <h2 className="text-xl font-bold">{p.name}</h2>
            <p className="text-gray-400 text-sm line-clamp-2">{p.description}</p>
            <p className="text-gold font-bold mt-2">{p.price} DH</p>
          </Link>
        ))}
      </div>
      {(!products || products.length === 0) && (
        <p className="text-center text-gray-400">No products yet - add them from Admin</p>
      )}
    </div>
  );
}