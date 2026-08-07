import { X } from "lucide-react";

export default function Modal({ open, onClose, title, closeLabel = "Chiudi", children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" data-testid="modal-overlay">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#F9F6F0] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between bg-[#1A3626] text-white px-7 py-5">
          <h3 className="font-serif-display text-2xl">{title}</h3>
          <button onClick={onClose} data-testid="modal-close" aria-label={closeLabel} className="text-white/80 hover:text-white">
            <X size={22} />
          </button>
        </div>
        <div className="px-7 py-6 text-[#1C1C1C]">{children}</div>
      </div>
    </div>
  );
}
