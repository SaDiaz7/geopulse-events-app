import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, Edit3, AlertCircle } from "lucide-react";

export function KebabMenu({ onSuggestEdit }: { onSuggestEdit: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button aria-label="Más opciones" className="p-2 rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer" onClick={() => setOpen(v => !v)}>
        <MoreVertical size={18} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute right-0 z-10 mt-2 w-48 rounded-2xl border border-neutral-700 bg-neutral-900 p-1 shadow-lg shadow-black/30"
          >
            <button
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-neutral-100 hover:bg-neutral-800"
              onClick={() => { onSuggestEdit(); setOpen(false); }}
            >
              <Edit3 size={16} /> Sugerir edición
            </button>
            <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-neutral-100 hover:bg-neutral-800" disabled>
              <AlertCircle size={16} /> Reportar cierre (próx.)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
