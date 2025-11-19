import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Plus } from "lucide-react";
import type { Suggestion, SuggestionType, VenueLite } from "@/types/suggestions";
import { suggestionAPI } from "@/lib/suggestions";

export function SuggestionModal({
  open, mode, venue, onClose, onCreated,
}: {
  open: boolean;
  mode: SuggestionType; // "ADD" | "EDIT"
  venue?: VenueLite;
  onClose: () => void;
  onCreated: (s: Suggestion) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<any>({
    name: venue?.name ?? "", category: venue?.category ?? "", address: venue?.address ?? "",
    lat: venue?.lat ?? "", lng: venue?.lng ?? "", description: venue?.description ?? "",
    evidence: "", comment: "",
  });

  useEffect(() => {
    if (open) {
      setForm({
        name: venue?.name ?? "", category: venue?.category ?? "", address: venue?.address ?? "",
        lat: venue?.lat ?? "", lng: venue?.lng ?? "", description: venue?.description ?? "",
        evidence: "", comment: "",
      });
    }
  }, [open, venue]);

  const title = mode === "ADD" ? "Sugerir nuevo lugar" : `Sugerir edición · ${venue?.name ?? ""}`;
  const parseEvidence = (s: string): string[] =>
    s ? String(s).split(/\s|,|;\s*/).map(t => t.trim()).filter(Boolean) : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      if (mode === "ADD") {
        const created = await suggestionAPI.create({
          type: "ADD",
          payload: { addData: {
            name: form.name?.trim(), category: form.category?.trim(), address: form.address?.trim(),
            lat: form.lat ? Number(form.lat) : undefined, lng: form.lng ? Number(form.lng) : undefined,
            description: form.description?.trim(), evidenceUrls: parseEvidence(form.evidence),
          } },
        });
        onCreated(created);
      } else if (mode === "EDIT" && venue) {
        const created = await suggestionAPI.create({
          type: "EDIT",
          targetVenueId: venue.id,
          payload: { editData: {
            before: venue,
            after: {
              name: form.name?.trim(), category: form.category?.trim(), address: form.address?.trim(),
              lat: form.lat ? Number(form.lat) : undefined, lng: form.lng ? Number(form.lng) : undefined,
              description: form.description?.trim(), evidenceUrls: parseEvidence(form.evidence),
            },
            comment: form.comment?.trim(),
          } },
        });
        onCreated(created);
      }
      onClose();
    } finally { setLoading(false); }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
            className="w-full max-w-xl rounded-3xl border bg-white p-4 sm:p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-2">
              {mode === "ADD" ? <Plus size={18} /> : <Edit3 size={18} />}
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <L label="Nombre"><I value={form.name} onChange={(e)=>setForm((f:any)=>({...f, name:e.target.value}))} required={mode==="ADD"}/></L>
                <L label="Categoría"><I value={form.category} onChange={(e)=>setForm((f:any)=>({...f, category:e.target.value}))} required={mode==="ADD"}/></L>
                <L label="Dirección" wide><I value={form.address} onChange={(e)=>setForm((f:any)=>({...f, address:e.target.value}))}/></L>
                <L label="Latitud"><I value={form.lat} onChange={(e)=>setForm((f:any)=>({...f, lat:e.target.value}))}/></L>
                <L label="Longitud"><I value={form.lng} onChange={(e)=>setForm((f:any)=>({...f, lng:e.target.value}))}/></L>
                <L label="Descripción" wide><T rows={3} value={form.description} onChange={(e)=>setForm((f:any)=>({...f, description:e.target.value}))}/></L>
                {mode === "EDIT" && (
                  <L label="Comentario (qué y por qué cambia)" wide>
                    <T rows={2} value={form.comment} onChange={(e)=>setForm((f:any)=>({...f, comment:e.target.value}))}/>
                  </L>
                )}
                <L label="Evidencia (URLs separadas por espacio, coma o punto y coma)" wide>
                  <I placeholder="https://instagram.com/post ... https://maps.google.com/..." value={form.evidence}
                     onChange={(e)=>setForm((f:any)=>({...f, evidence:e.target.value}))}/>
                </L>
              </div>
              <div className="mt-2 flex items-center justify-end gap-2">
                <Btn type="button" onClick={onClose}>Cancelar</Btn>
                <Btn type="submit" className="bg-black text-white border-black" disabled={loading}>
                  {loading ? "Guardando..." : "Enviar sugerencia"}
                </Btn>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const L = ({label, children, wide}:{label:string;children:React.ReactNode;wide?:boolean}) => (
  <label className={`flex flex-col gap-1 ${wide ? "sm:col-span-2" : ""}`}>
    <span className="text-xs text-neutral-500">{label}</span>
    {children}
  </label>
);
const I = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input className="rounded-xl border px-3 py-2" {...props} />;
const T = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea className="rounded-xl border px-3 py-2" {...props} />;
const Btn = ({ className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) =>
  <button className={`rounded-2xl border px-3 py-1.5 text-sm shadow-sm hover:shadow transition ${className}`} {...props} />;
