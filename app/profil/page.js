'use client';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Import Framer Motion
import WhatsAppButton from '@/components/WhatsAppButton';


export default function Profil() {
  const keunggulan = [
    { icon: '📖', title: 'Kurikulum Terpadu', desc: 'Sinergi kurikulum nasional dan nilai-nilai Islam dalam setiap pelajaran.' },
    { icon: '🕋', title: 'Tahfidz Qur\'an', desc: 'Target hafalan terukur dengan metode yang ceria & menyenangkan anak.' },
    { icon: '🤝', title: 'Karakter Mulia', desc: 'Pembiasaan adab dan akhlak sesuai sunnah Rasulullah SAW.' },
    { icon: '👨‍👩‍👧‍👦', title: 'Sinergi Orang Tua', desc: 'Program harmonisasi sekolah & rumah (Parenting & Ayah Bercerita).' },
  ];

  // Konfigurasi Animasi
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <main className="min-h-screen bg-white selection:bg-yellow-400 selection:text-green-950">
      
      {/* SECTION 1: HERO PROFIL */}
      <section className="relative min-h-[70vh] flex items-center bg-green-950 text-white overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-green-950/20 via-green-950/80 to-green-950 z-10" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/10 blur-[150px] rounded-full -mr-48 -mt-48"></div>
          <motion.div
            initial={{ opacity: 0, scale: 1.2, rotate: 12 }}
            animate={{ opacity: 0.03, scale: 1.5, rotate: 12 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <Image 
              src="/logo-bs.png" 
              alt="Background Decor" 
              fill 
              className="object-contain translate-x-1/4"
            />
          </motion.div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/5 backdrop-blur-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping"></span>
              <span className="text-yellow-400 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs">Tentang Bina Shaliha</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter">
              Membentuk <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 uppercase">Generasi Robbani</span>
            </h1>
            <p className="text-lg md:text-2xl text-emerald-50/70 font-medium leading-relaxed max-w-2xl border-l-4 md:border-l-8 border-yellow-500 pl-6 md:pl-8 italic">
              "Tempat di mana kecerdasan intelektual bertemu dengan kemuliaan akhlak."
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: MANIFESTO / SAMBUTAN */}
      <section className="py-24 md:py-40 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="absolute -top-10 -left-10 w-48 md:w-72 h-48 md:h-72 bg-emerald-500/10 rounded-full blur-[100px]" />
              <div className="relative z-10 p-4 bg-white rounded-[3rem] md:rounded-[4rem] shadow-2xl border border-gray-100">
                <div className="rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-gray-50 aspect-square flex items-center justify-center p-12 md:p-20">
                  <Image 
                    src="/logo-bs.png" 
                    alt="Foto Profil" 
                    width={500} 
                    height={500} 
                    className="object-contain hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-8 bg-green-950 text-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl max-w-[220px] md:max-w-[280px]"
                >
                  <p className="text-yellow-400 font-bold uppercase text-[9px] md:text-[10px] tracking-widest mb-2 text-center md:text-left">Pesan Utama</p>
                  <p className="font-medium italic text-base md:text-lg leading-snug text-center md:text-left">"Mendidik anak adalah investasi akhirat yang tak ternilai."</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Text Side */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 text-center lg:text-left"
            >
              <h4 className="text-emerald-600 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6">Manifesto Pendidikan</h4>
              <h2 className="text-4xl md:text-6xl font-black text-green-950 mb-8 leading-tight tracking-tighter">Mendidik dengan Hati, <span className="text-yellow-500 italic">Membina dengan Sunnah.</span></h2>
              <div className="space-y-6 md:space-y-8">
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Sekolah Islam Bina Shaliha hadir bukan sekadar sebagai institusi pendidikan formal, melainkan sebagai <span className="text-green-900 font-black border-b-4 border-yellow-400">rumah kedua</span> bagi ananda untuk menyemai fitrah iman.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pt-4">
                  <div className="bg-gray-50 p-6 rounded-3xl border-l-4 border-green-700 text-left">
                    <h5 className="font-black text-green-950 mb-2">Integrasi Modern</h5>
                    <p className="text-sm text-gray-500">Metode pembelajaran mutakhir yang relevan dengan perkembangan zaman.</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-3xl border-l-4 border-yellow-500 text-left">
                    <h5 className="font-black text-green-950 mb-2">Adab & Akhlak</h5>
                    <p className="text-sm text-gray-500">Menanamkan pondasi karakter sesuai tuntunan Rasulullah SAW.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. VISI & MISI */}
      <section className="py-32 px-6 bg-green-950 relative overflow-hidden text-center lg:text-left">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">Visi & <span className="text-yellow-500 underline decoration-white/20">Misi</span></h2>
            <p className="text-yellow-400 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mt-4">Satu Tujuan Untuk Generasi Robbani</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 lg:gap-20">
            <div className="bg-white/5 backdrop-blur-md rounded-[4rem] p-12 md:p-24 border border-white/10 shadow-2xl">
              <div className="max-w-4xl mx-auto">
                <div className="mb-20 text-center">
                  <h4 className="text-yellow-500 font-black mb-8 uppercase tracking-[0.4em] text-[10px] md:text-xs">Visi Utama Sekolah Islam Bina Shaliha</h4>
                  <p className="text-white text-3xl md:text-6xl font-black leading-tight italic tracking-tighter">
                    "Terwujudnya peserta didik yang beraqidah lurus, berkarakter Islami, kreatif, dan berprestasi."
                  </p>
                  <div className="h-1 w-20 bg-yellow-500 mx-auto mt-10 rounded-full" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 text-left">
                  {[
                    "Menanamkan aqidah Islam yang kokoh", 
                    "Membentuk karakter akhlak mulia", 
                    "Optimalisasi pembelajaran Al-Quran", 
                    "Penerapan Project Based Learning", 
                    "Mengembangkan potensi & kecerdasan", 
                    "Meningkatkan kualitas SDM pendidik", 
                    "Mengikuti kemajuan teknologi", 
                    "Menghasilkan output yang berkualitas"
                  ].map((misi, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-6 group/item"
                    >
                      <span className="text-4xl font-black text-white/5 group-hover/item:text-yellow-500/20 transition-colors">0{idx + 1}</span>
                      <p className="text-lg md:text-xl text-emerald-50/80 font-bold tracking-tight group-hover/item:text-white group-hover/item:translate-x-2 transition-all">{misi}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 4: KEUNGGULAN */}
      <section className="py-24 md:py-40 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black text-green-950 mb-6 tracking-tighter uppercase leading-none text-center md:text-left">Kenapa <span className="text-yellow-500">Bina Shaliha?</span></h2>
            <p className="text-lg md:text-xl text-gray-500 font-medium italic text-center md:text-left max-w-3xl">Pondasi kokoh untuk melahirkan generasi yang memiliki kedalaman iman dan keunggulan ilmu.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch"
          >
            {keunggulan.map((item, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="group p-10 rounded-[3rem] bg-gray-50 border-2 border-transparent hover:border-yellow-400 hover:bg-white hover:shadow-xl transition-all duration-500 flex flex-col text-center md:text-left h-full"
              >
                <div className="text-6xl mb-8 transform group-hover:scale-110 transition-all duration-500">
                  {item.title === 'Sinergi Orang Tua' ? (
                    <span className="flex items-center justify-center md:justify-start">
                      👨‍💼<span className="relative ml-[-15px] z-10">🧕</span><span className="ml-[-10px]">👦</span>
                    </span>
                  ) : item.icon}
                </div>
                
                <h4 className="text-xl font-black text-green-950 mb-4 uppercase tracking-tight leading-tight">{item.title}</h4>
                <p className="text-gray-500 leading-relaxed font-medium text-sm mt-auto">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: CTA */}
      <section className="px-6 pb-24 md:pb-40">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-green-950 rounded-[3rem] md:rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-3xl md:text-6xl font-black text-white mb-10 tracking-tight leading-tight max-w-3xl uppercase">Daftarkan Ananda di Keluarga Besar Bina Shaliha</h2>
              <div className="w-full flex justify-center">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/ppdb" 
                  className="w-full sm:w-auto px-16 py-5 bg-yellow-500 text-green-950 rounded-2xl font-black text-xl hover:shadow-[0_0_40px_rgba(234,179,8,0.4)] transition-all uppercase tracking-wider"
                >
                  Daftar Sekarang
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <WhatsAppButton />
    </main>
  );
}