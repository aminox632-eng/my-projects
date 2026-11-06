'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isRegister) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage({ text: 'Account registered. You may now log in or check confirmation email.', error: false });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/admin');
        router.refresh();
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'Authentication failed', error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-24">
      <div className="bg-noir-800 border border-gold/20 p-8">
        <h1 className="font-serif text-3xl text-cream text-center mb-2">
          {isRegister ? 'Create Account' : 'Noir Access'}
        </h1>
        <p className="text-xs text-cream-muted text-center uppercase tracking-widest mb-6">
          {isRegister ? 'Sign up for membership' : 'Sign in to access admin'}
        </p>

        {message && (
          <div
            className={`p-3 text-xs border mb-6 ${
              message.error
                ? 'border-red-600/50 bg-red-950/20 text-red-300'
                : 'border-green-600/50 bg-green-950/20 text-green-300'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-cream mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-noir-900 border border-gold/25 px-4 py-2.5 text-cream focus:outline-none focus:border-gold text-sm"
              placeholder="admin@noir.coffee"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-cream mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-noir-900 border border-gold/25 px-4 py-2.5 text-cream focus:outline-none focus:border-gold text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold text-noir-950 font-semibold uppercase tracking-widest text-xs hover:bg-gold-light transition duration-200 mt-2 disabled:opacity-50"
          >
            {loading ? 'Processing...' : isRegister ? 'Register' : 'Log In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-gold/80 hover:text-gold underline"
          >
            {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
}