'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Product } from '@/types';
import { Trash2, Edit3, Plus, LogOut } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: 'Espresso',
  });

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/login');
      return;
    }
    fetchProducts();
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error && data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      image_url: form.image_url,
      category: form.category,
    };

    if (editingId) {
      await supabase.from('products').update(payload).eq('id', editingId);
      setEditingId(null);
    } else {
      await supabase.from('products').insert([payload]);
    }

    setForm({ name: '', description: '', price: '', image_url: '', category: 'Espresso' });
    fetchProducts();
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image_url: product.image_url,
      category: product.category,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this product?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return <div className="text-center py-20 text-gold">Loading admin portal...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8 border-b border-gold/20 pb-4">
        <div>
          <h1 className="font-serif text-3xl text-cream">Noir Inventory Control</h1>
          <p className="text-xs text-cream-muted uppercase tracking-widest mt-1">Manage catalog offerings</p>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 border border-gold/30 px-4 py-2 text-xs text-cream hover:bg-gold/10"
        >
          <LogOut className="w-4 h-4 text-gold" /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="bg-noir-800 border border-gold/20 p-6 h-fit">
          <h2 className="font-serif text-xl text-gold mb-4 flex items-center gap-2">
            {editingId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-cream mb-1">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-noir-900 border border-gold/25 px-3 py-2 text-sm text-cream"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-cream mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-noir-900 border border-gold/25 px-3 py-2 text-sm text-cream"
              >
                <option value="Espresso">Espresso</option>
                <option value="Brewed">Brewed</option>
                <option value="Signature">Signature</option>
                <option value="Pastry">Pastry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase text-cream mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full bg-noir-900 border border-gold/25 px-3 py-2 text-sm text-cream"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-cream mb-1">Image URL</label>
              <input
                type="url"
                required
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                className="w-full bg-noir-900 border border-gold/25 px-3 py-2 text-sm text-cream"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-cream mb-1">Description</label>
              <textarea
                rows={3}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-noir-900 border border-gold/25 px-3 py-2 text-sm text-cream"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-gold text-noir-950 font-semibold text-xs uppercase tracking-wider hover:bg-gold-light"
              >
                {editingId ? 'Save Changes' : 'Create Product'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm({ name: '', description: '', price: '', image_url: '', category: 'Espresso' });
                  }}
                  className="px-3 py-2 border border-cream/20 text-cream text-xs hover:bg-white/5"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="lg:col-span-2 overflow-x-auto">
          <table className="w-full text-left text-sm border border-gold/20">
            <thead className="bg-noir-950 text-gold uppercase text-[11px] tracking-wider border-b border-gold/20">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {products.map((item) => (
                <tr key={item.id} className="hover:bg-noir-800/40">
                  <td className="p-3 font-medium text-cream">{item.name}</td>
                  <td className="p-3 text-cream-muted text-xs">{item.category}</td>
                  <td className="p-3 text-gold">${Number(item.price).toFixed(2)}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1 hover:text-gold text-cream-muted"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1 hover:text-red-400 text-cream-muted"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-cream-muted">
                    No products found. Add your first item on the left.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}