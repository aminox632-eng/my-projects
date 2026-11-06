'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ReservationsPage() {
  const supabase = createClient();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '14:00',
    guests: 2,
  });
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Securing your table...' });

    const { error } = await supabase.from('reservations').insert([
      {
        name: formData.name,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: Number(formData.guests),
      },
    ]);

    if (error) {
      setStatus({ type: 'error', message: error.message });
    } else {
      setStatus({ type: 'success', message: 'Your reservation has been confirmed. We look forward to hosting you.' });
      setFormData({ name: '', phone: '', date: '', time: '14:00', guests: 2 });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-center mb-10">
        <span className="text-gold text-xs uppercase tracking-widest">Intimate Hospitality</span>
        <h1 className="font-serif text-4xl text-cream mt-2 mb-4">Table Reservation</h1>
        <p className="text-cream-muted text-sm">
          Tables are reserved for 90 minutes of tasting and quiet work sessions.
        </p>
      </div>

      <div className="bg-noir-800 border border-gold/20 p-8 md:p-10">
        {status.message && (
          <div
            className={`p-4 mb-6 text-sm border ${
              status.type === 'success'
                ? 'border-green-600/50 bg-green-950/20 text-green-300'
                : 'border-red-600/50 bg-red-950/20 text-red-300'
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-cream mb-2">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-noir-900 border border-gold/25 px-4 py-3 text-cream focus:outline-none focus:border-gold"
              placeholder="Julian Vance"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-cream mb-2">Phone Number</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-noir-900 border border-gold/25 px-4 py-3 text-cream focus:outline-none focus:border-gold"
              placeholder="+1 (555) 019-2834"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-cream mb-2">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-noir-900 border border-gold/25 px-4 py-3 text-cream focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-cream mb-2">Time</label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-noir-900 border border-gold/25 px-4 py-3 text-cream focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-cream mb-2">Guests</label>
              <input
                type="number"
                min="1"
                max="8"
                required
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                className="w-full bg-noir-900 border border-gold/25 px-4 py-3 text-cream focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status.type === 'loading'}
            className="w-full py-3.5 bg-gold text-noir-950 font-semibold uppercase tracking-widest hover:bg-gold-light transition duration-200 mt-4 disabled:opacity-50"
          >
            {status.type === 'loading' ? 'Confirming...' : 'Reserve Table'}
          </button>
        </form>
      </div>
    </div>
  );
}