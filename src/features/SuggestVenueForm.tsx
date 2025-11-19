import { useState } from 'react';
import { useSuggestVenue } from '@/hooks/useSuggestVenue';
import AuthGate from '@/features/AuthGate';

export default function SuggestVenueForm() {
  const suggest = useSuggestVenue();
  const [form, setForm] = useState({ name: '', address: '', city: '', lat: '', lng: '', tags: '', notes: '' });

  return (
    <AuthGate fallback={<div className="opacity-70">Ingresá para sugerir lugares.</div>}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          suggest.mutate({
            name: form.name,
            address: form.address,
            city: form.city,
            lat: Number(form.lat),
            lng: Number(form.lng),
            tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
            notes: form.notes || undefined,
          });
          setForm({ name:'', address:'', city:'', lat:'', lng:'', tags:'', notes:'' });
        }}
        className="space-y-2 bg-zinc-900/50 rounded-xl p-4"
      >
        <h3 className="text-lg font-semibold">Sugerir lugar</h3>

        <input className="w-full bg-zinc-900 rounded px-3 py-2" placeholder="Nombre*"
               value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <div className="grid sm:grid-cols-2 gap-2">
          <input className="bg-zinc-900 rounded px-3 py-2" placeholder="Dirección"
                 value={form.address} onChange={e=>setForm({...form, address:e.target.value})} />
          <input className="bg-zinc-900 rounded px-3 py-2" placeholder="Ciudad"
                 value={form.city} onChange={e=>setForm({...form, city:e.target.value})} />
        </div>

        <div className="grid sm:grid-cols-2 gap-2">
          <input className="bg-zinc-900 rounded px-3 py-2" placeholder="Lat* (-31.42)"
                 value={form.lat} onChange={e=>setForm({...form, lat:e.target.value})} required />
          <input className="bg-zinc-900 rounded px-3 py-2" placeholder="Lng* (-64.18)"
                 value={form.lng} onChange={e=>setForm({...form, lng:e.target.value})} required />
        </div>

        <input className="w-full bg-zinc-900 rounded px-3 py-2" placeholder="Tags (coma separadas: techno,roof)"
               value={form.tags} onChange={e=>setForm({...form, tags:e.target.value})} />
        <textarea className="w-full bg-zinc-900 rounded px-3 py-2" placeholder="Notas"
                  value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} />

        <button disabled={suggest.isPending}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20">
          {suggest.isPending ? 'Enviando…' : 'Enviar sugerencia'}
        </button>

        {suggest.isError && <p className="text-red-400 text-sm">{(suggest.error as Error).message}</p>}
        {suggest.isSuccess && <p className="text-green-400 text-sm">¡Gracias! La revisaremos.</p>}
      </form>
    </AuthGate>
  );
}
