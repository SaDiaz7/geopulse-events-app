import { useFilters } from "../../stores/useFilters";

export default function FilterBar() {
  const { when, setWhen, maxKm, setMaxKm, clear } = useFilters();
  return (
    <div className="flex items-center gap-3 p-3 border-b border-white/10">
      <select value={when} onChange={e => setWhen(e.target.value as any)} className="bg-neutral-900 rounded px-3 py-2">
        <option value="todos">Todos</option>
        <option value="hoy">Hoy</option>
        <option value="manana">Mañana</option>
        <option value="finde">Fin de semana</option>
      </select>
      <label className="flex items-center gap-2 text-sm opacity-80">
        Radio {maxKm}km
        <input type="range" min={1} max={20} value={maxKm} onChange={e => setMaxKm(parseInt(e.target.value))} />
      </label>
      <button onClick={clear} className="ml-auto text-sm opacity-80 hover:opacity-100">Limpiar</button>
    </div>
  );
}
