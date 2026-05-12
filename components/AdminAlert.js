'use client';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminAlert({ isOpen, type, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  const icons = {
    success: "✅",
    error: "❌",
    confirm: "⚠️"
  };

  const colors = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    confirm: "bg-amber-500"
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden text-center"
        >
          {/* Top Decorative bar */}
          <div className={`absolute top-0 left-0 w-full h-2 ${colors[type]}`}></div>

          <div className="text-6xl mb-6">{icons[type]}</div>
          <h3 className="text-2xl font-black text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-500 font-medium mb-8">{message}</p>

          <div className="flex gap-3 justify-center">
            {type === 'confirm' ? (
              <>
                <button
                  onClick={onCancel}
                  className="px-6 py-3 rounded-xl font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={onConfirm}
                  className="px-6 py-3 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30"
                >
                  Ya, Hapus!
                </button>
              </>
            ) : (
              <button
                onClick={onConfirm}
                className={`px-8 py-3 rounded-xl font-bold text-white transition-colors shadow-lg ${type === 'success' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30' : 'bg-red-500 hover:bg-red-600 shadow-red-500/30'}`}
              >
                Mengerti
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
