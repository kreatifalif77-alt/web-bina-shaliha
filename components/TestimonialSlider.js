'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestimonialSlider() {
  const [testimoni, setTestimoni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/api/admin/testimoni')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTestimoni(data.data.filter(item => item.isActive));
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (testimoni.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimoni.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimoni.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimoni.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimoni.length - 1 : prev - 1));
  };

  if (loading) {
    return (
      <section className="py-24 bg-green-950 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  if (testimoni.length === 0) return null;

  return (
    <section className="py-32 px-6 bg-green-950 relative overflow-hidden text-center">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -ml-48 -mb-48 pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">
            Kata <span className="text-yellow-500">Mereka</span>
          </h2>
          <div className="h-1.5 w-24 bg-yellow-400 mx-auto rounded-full mb-6"></div>
          <p className="text-emerald-100/70 font-medium italic text-lg max-w-2xl mx-auto">
            Cerita pengalaman berharga dari wali murid yang telah menitipkan pendidikan ananda di Bina Shaliha.
          </p>
        </motion.div>

        <div className="relative h-[450px] md:h-[350px] flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl"
            >
              <div className="text-5xl text-yellow-500 mb-6 opacity-30 text-center">"</div>
              <p className="text-xl md:text-3xl text-white font-medium italic leading-relaxed mb-8">
                {testimoni[currentIndex].pesan}
              </p>
              
              <div className="flex flex-col items-center gap-2">
                <div className="flex text-yellow-400 text-lg mb-2">
                  {Array.from({ length: testimoni[currentIndex].rating || 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <h4 className="text-yellow-400 font-black text-xl uppercase tracking-widest">
                  {testimoni[currentIndex].namaWali}
                </h4>
                <p className="text-emerald-100/60 font-medium text-sm">
                  Wali Murid dari {testimoni[currentIndex].namaSiswa} {testimoni[currentIndex].angkatan && `(${testimoni[currentIndex].angkatan})`}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {testimoni.length > 1 && (
            <>
              <button 
                onClick={handlePrev} 
                className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-yellow-500 hover:text-green-950 text-white rounded-full flex items-center justify-center transition-all z-20 backdrop-blur-md border border-white/20"
              >
                ←
              </button>
              <button 
                onClick={handleNext} 
                className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-yellow-500 hover:text-green-950 text-white rounded-full flex items-center justify-center transition-all z-20 backdrop-blur-md border border-white/20"
              >
                →
              </button>
            </>
          )}
        </div>

        {/* Indicators */}
        {testimoni.length > 1 && (
          <div className="flex justify-center gap-3 mt-10">
            {testimoni.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`transition-all duration-300 rounded-full ${currentIndex === i ? 'w-10 h-2 bg-yellow-500' : 'w-2 h-2 bg-white/20 hover:bg-white/50'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
