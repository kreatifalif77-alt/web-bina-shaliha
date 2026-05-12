'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Import Framer Motion

export default function StrukturOrganisasiDinamis() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/teachers?t=${new Date().getTime()}`)
      .then(res => {
        if (!res.ok) throw new Error("Gagal mengambil data");
        return res.json();
      })
      .then(data => {
        if (data.success) {
          setTeachers(data.data || []);
        }
      })
      .catch(err => {
        console.error("Gagal memuat struktur:", err);
        setTeachers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const getStaffByRole = (roleKeyword) => {
    if (!teachers || !Array.isArray(teachers)) return [];
    return teachers.filter(t => 
      t.bidangGuru && t.bidangGuru.toLowerCase().includes(roleKeyword.toLowerCase())
    );
  };

  const yayasanList = getStaffByRole('Yayasan');
  const pimpinanSekolah = getStaffByRole('Kepala');

  const staffLainnya = teachers.filter(t => 
    t.bidangGuru && 
    !t.bidangGuru.toLowerCase().includes('yayasan') && 
    !t.bidangGuru.toLowerCase().includes('kepala')
  );

  // KONFIGURASI ANIMASI
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFBF3] pb-24 overflow-hidden relative"> 
      
      {/* 1. TEKSTUR BACKGROUND (DOT PATTERN) */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#e5e7eb 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

      {/* 2. ELEMEN DEKORATIF */}
      <div className="absolute top-[400px] left-[-50px] text-[180px] opacity-[0.04] rotate-12 pointer-events-none hidden lg:block">🧕</div>
      <div className="absolute top-[800px] right-[-50px] text-[150px] opacity-[0.03] -rotate-12 pointer-events-none hidden lg:block">📖</div>
      <div className="absolute top-[1400px] left-[2%] text-[100px] opacity-[0.03] rotate-45 pointer-events-none hidden lg:block">✨</div>

      {/* 3. BLUR GLOWS */}
      <div className="absolute top-[300px] left-0 w-[500px] h-[500px] bg-yellow-200/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[1000px] right-0 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-[130px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative -mt-[100px] pt-[180px] pb-32 bg-green-950 text-white px-4 text-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 opacity-40 brightness-75 scale-105"
            style={{ 
              backgroundImage: 'url("/struktur.jpeg")', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center 20%',
              backgroundRepeat: 'no-repeat' 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-green-950/90 via-transparent to-green-950" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="inline-block px-6 py-2 mb-8 bg-yellow-500/20 border border-yellow-500/40 rounded-full backdrop-blur-md">
            <p className="text-yellow-400 font-black tracking-[0.3em] uppercase text-[10px]">Pilar Pendidikan Rabbani</p>
          </div>
          <h1 className="text-5xl md:text-[6rem] font-black mb-8 tracking-tighter uppercase leading-[0.85] drop-shadow-2xl">
            Struktur <br/>
            <span className="text-yellow-500 italic drop-shadow-md">Organisasi</span>
          </h1>
          <p className="text-white font-bold max-w-2xl mx-auto leading-relaxed text-sm md:text-xl italic px-4">
            "Sinergi hati dan fikiran para pendidik untuk mencetak generasi Robbani unggulan."
          </p>
        </motion.div>
      </section>

      {/* DATA CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        {loading ? (
           <div className="text-center p-20 bg-white/90 backdrop-blur-xl rounded-[4rem] shadow-2xl border border-gray-100">
             <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-50 border-t-emerald-600 mx-auto mb-6"></div>
             <p className="text-emerald-900 font-black uppercase text-xs tracking-[0.3em]">Menyelaraskan Data...</p>
           </div>
        ) : (
          <>
            {/* Bagian Yayasan */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex justify-center mb-32"
            >
              {yayasanList.length > 0 ? yayasanList.map((y, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border-t-8 border-yellow-500 w-full max-w-sm text-center hover:scale-105 transition-all duration-500 group relative"
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-950 text-yellow-400 text-[11px] font-black px-8 py-2 rounded-full shadow-xl uppercase z-10">Pimpinan Yayasan</div>
                  <div className="relative aspect-square w-full mb-8 rounded-[2.5rem] overflow-hidden shadow-inner border-[10px] border-gray-50 group-hover:border-yellow-400 transition-all">
                    <img src={y.foto || '/logo-bs.png'} alt={y.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-green-950 leading-tight mb-3">{y.nama}{y.gelar ? `, ${y.gelar}` : ''}</h3>
                  <span className="bg-green-100 text-green-900 inline-block px-8 py-2 rounded-full font-black text-xs uppercase tracking-widest">{y.bidangGuru}</span>
                </motion.div>
              )) : null}
            </motion.div>

            {/* Alur Visual */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center mb-20"
            >
               <div className="w-1.5 h-20 bg-gradient-to-b from-yellow-400 via-green-800 to-transparent rounded-full"></div>
               <div className="flex items-center gap-6 mt-2">
                  <span className="text-4xl animate-bounce">🌿</span>
                  <div className="w-64 h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  <span className="text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>🌿</span>
               </div>
            </motion.div>

            {/* Bagian Kepala Sekolah */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-40 max-w-6xl mx-auto px-4"
            >
              {pimpinanSekolah.map((staff, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  className="bg-white/80 backdrop-blur-md p-8 rounded-[3rem] shadow-2xl border-l-[12px] border-green-900 flex flex-col md:flex-row items-center gap-8 hover:shadow-green-900/10 hover:-translate-y-2 transition-all group"
                >
                  <div className="relative w-40 h-40 shrink-0 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl">
                    <img src={staff.foto || '/logo-bs.png'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={staff.nama} />
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-2xl font-black text-green-950 uppercase leading-none mb-3">{staff.nama}{staff.gelar ? `, ${staff.gelar}` : ''}</h4>
                    <p className="text-yellow-600 font-black text-xs uppercase tracking-[0.2em] mb-4">{staff.bidangGuru}</p>
                    <div className="inline-flex items-center gap-2 bg-green-950 text-white px-4 py-1.5 rounded-xl shadow-lg">
                        <span className="text-sm">🎓</span>
                        <p className="text-[10px] font-bold uppercase tracking-wider">{staff.universitas || 'Sarjana Pendidikan'}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Grid Guru & Staff */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-24 relative"
            >
              <div className="absolute left-0 top-1/2 w-full h-[2px] bg-gray-200/50 -z-10"></div>
              <div className="inline-block px-12 py-4 bg-yellow-400 text-green-950 rounded-2xl font-black uppercase text-xs tracking-[0.5em] shadow-xl rotate-1">
                Amanah Dewan Guru
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12"
            >
                {staffLainnya.map((staff, i) => (
                  <motion.div 
                    key={i} 
                    variants={fadeInUp}
                    className="bg-white/70 backdrop-blur-sm p-6 rounded-[3rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:-translate-y-4 transition-all text-center group"
                  >
                    <div className="relative aspect-[4/5] w-full mx-auto mb-6 rounded-[2.2rem] overflow-hidden shadow-lg border-2 border-white">
                      <img src={staff.foto || '/logo-bs.png'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={staff.nama} />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <h5 className="font-black text-green-950 text-[13px] uppercase leading-tight min-h-[40px] flex items-center justify-center px-1">{staff.nama}{staff.gelar ? `, ${staff.gelar}` : ''}</h5>
                    <div className="w-10 h-[4px] bg-yellow-400 mx-auto my-4 group-hover:w-20 transition-all rounded-full"></div>
                    <p className="text-green-800 text-[10px] font-black uppercase tracking-widest">{staff.bidangGuru}</p>
                  </motion.div>
                ))}
            </motion.div>
          </>
        )}
      </div>

      {/* FOOTER SECTION */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto mt-56 text-center px-6 relative pb-20"
      >
        <div className="absolute top-0 left-0 text-6xl opacity-10 rotate-12">🍃</div>
        <div className="bg-gradient-to-br from-green-900 via-green-950 to-black p-20 rounded-[5rem] border-4 border-yellow-500/30 shadow-[0_50px_100px_rgba(0,0,0,0.4)] relative overflow-hidden">
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-500/10 blur-3xl rounded-full"></div>
            <div className="w-24 h-2 bg-yellow-500 mx-auto mb-12 rounded-full"></div>
            <p className="text-yellow-100 font-black italic text-xl md:text-2xl leading-relaxed uppercase tracking-[0.1em] mb-12">
              "Mencetak Generasi Beradab <br/> Melalui Sinergi Hebat"
            </p>
            <div className="flex justify-center gap-4 opacity-50">
               <span className="text-2xl">🧕</span>
               <span className="text-2xl">👨‍🏫</span>
               <span className="text-2xl">🧕</span>
            </div>
        </div>
      </motion.div>
    </main>
  );
}