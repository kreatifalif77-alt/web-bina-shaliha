'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FaqSection() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/faq')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Hanya tampilkan FAQ yang aktif
          setFaqs(data.data.filter(faq => faq.isActive));
        }
      })
      .catch(err => console.error("Gagal memuat FAQ:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredFaqs = faqs.filter(faq => {
    const p = faq.pertanyaan || '';
    const j = faq.jawaban || '';
    const s = search || '';
    return p.toLowerCase().includes(s.toLowerCase()) || 
           j.toLowerCase().includes(s.toLowerCase());
  });

  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-green-950 tracking-tighter uppercase mb-4">
            Tanya <span className="text-yellow-500">Jawab</span>
          </h2>
          <div className="h-1.5 w-24 bg-yellow-400 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 font-medium italic text-lg">Pertanyaan yang sering diajukan seputar Bina Shaliha.</p>
        </motion.div>

        {/* Search Bar (Simulasi "Smart Search") */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 relative"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-2xl">
            🔍
          </div>
          <input
            type="text"
            placeholder="Cari pertanyaan atau kata kunci..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border-2 border-gray-100 text-green-950 rounded-2xl pl-12 pr-4 py-4 font-medium focus:outline-none focus:border-yellow-400 focus:bg-white transition-colors shadow-sm"
          />
        </motion.div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-10 text-gray-400 font-medium animate-pulse">Memuat FAQ...</div>
          ) : filteredFaqs.length === 0 ? (
            <div className="text-center py-10 text-gray-400 font-medium bg-gray-50 rounded-2xl border border-gray-100">
              Tidak ada jawaban yang sesuai dengan pencarian "{search}". <br/>
              Silakan hubungi Admin melalui tombol WhatsApp di pojok kanan bawah.
            </div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <motion.div 
                key={faq._id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`border-2 rounded-2xl overflow-hidden transition-colors duration-300 ${openIndex === index ? 'border-yellow-400 bg-white shadow-lg' : 'border-gray-100 bg-gray-50 hover:border-yellow-200'}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-lg text-green-950 pr-4">{faq.pertanyaan}</span>
                  <span className={`text-2xl transition-transform duration-300 text-yellow-500 ${openIndex === index ? 'rotate-180' : ''}`}>
                    ⬇️
                  </span>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="h-px w-full bg-gray-100 mb-4"></div>
                      <p className="text-gray-600 font-medium leading-relaxed whitespace-pre-line">
                        {faq.jawaban}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
