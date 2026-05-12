'use client'; 

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Import Framer Motion
import WhatsAppButton from '@/components/WhatsAppButton';


export default function UnitTK() {
  // Data Berdasarkan Brosur Terbaru
  const kurikulum = [
    { t: "Aqidah Lurus", d: "Menanamkan tauhid and cinta Allah sejak dini.", i: "💎" },
    { t: "Karakter Islami", d: "Pembiasaan adab dan akhlaq mulia setiap hari.", i: "🌟" },
    { t: "Kreatif & Ceria", d: "Mengasah potensi seni dan inovasi ananda.", i: "🎨" },
  ];

  const programUnggulan = [
    { n: "Intensif Al-Qur'an", d: "Menghafal dengan metode menyenangkan.", i: "📖" },
    { n: "Hafal Hadits & Doa", d: "Pembiasaan adab harian sesuai sunnah.", i: "🤲" },
    { n: "Life Skill & 7 Kebiasaan", d: "Gerakan Anak Indonesia Hebat.", i: "💪" },
    { n: "Project Based Learning", d: "Belajar bermakna melalui proyek seru.", i: "🚀" },
    { n: "Literasi & Outing Class", d: "Mengenal dunia di luar ruang kelas.", i: "🌍" },
    { n: "Harmonisasi Orang Tua", d: "Program Parenting & Ayah Bercerita.", i: "👨‍👩‍👧‍👦" }, 
  ];

  const kegiatanSeru = [
    "Praktik Manasik Haji Ceria",
    "Kegiatan Berdongeng Inspiratif",
    "Ekskul Melukis & Berenang",
    "Market Day (Jiwa Entrepreneur)",
    "Pentas Seni & Gebyar Ramadhan"
  ];

  const fotoSlide = Array.from({ length: 9 }, (_, i) => `/tk${i + 1}.jpeg`);

  // Konfigurasi Animasi
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFDF5] selection:bg-emerald-900 selection:text-white">
      
      {/* SECTION 1: HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-400 via-yellow-300 to-orange-50 px-6">
        
        {/* BACKGROUND DECORATION */}
        <div className="absolute inset-0 z-0 opacity-60">
          <Image 
            src="/baground_tk.jpeg" 
            alt="Background Decoration" 
            fill 
            className="object-cover scale-110" 
            priority
          />
        </div>

        {/* FLOATING ORNAMENTS */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-300/30 rounded-full blur-[100px]" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center max-w-6xl mx-auto pt-20 pb-32"
        >
          <div className="mb-10 inline-block">
            <span className="inline-flex items-center gap-3 bg-emerald-950/10 backdrop-blur-md text-emerald-900 px-6 py-3 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] border border-emerald-950/10 shadow-lg">
              <span className="flex h-2 w-2 rounded-full bg-emerald-800 animate-bounce"></span>
              Fun & Creative Islamic Learning
            </span>
          </div>
          
          <h1 className="text-6xl md:text-[9rem] font-black text-emerald-950 tracking-tighter leading-[0.85] mb-10">
            TK ISLAM <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-orange-100 drop-shadow-xl">BINA SHALIHA</span>
          </h1>
          
          <p className="text-emerald-900/70 font-semibold text-xl md:text-3xl max-w-3xl mx-auto leading-relaxed mb-16 italic px-4">
            "Membimbing Fitrah, Menyemai Adab, Menebar Keceriaan"
          </p>

          <div className="flex justify-center group">
            <Link href="/ppdb" className="relative overflow-hidden bg-emerald-950 text-white px-12 py-6 rounded-[2rem] font-black text-xl md:text-2xl hover:scale-105 transition-all duration-500 shadow-[0_20px_40px_rgba(6,78,59,0.3)] border-b-8 border-emerald-900 active:border-b-0 active:translate-y-2">
              <span className="relative z-10">DAFTAR SEKARANG ➜</span>
            </Link>
          </div>
        </motion.div>

        {/* SOFT WAVE SEPARATOR */}
        <div className="absolute bottom-0 w-full leading-[0] z-10">
          <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 200L1440 200L1440 50C1100 150 400 -50 0 50V200Z" fill="#FFFDF5"/>
          </svg>
        </div>
      </section>

      {/* SECTION 2: VISI & FOTO */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative group p-4">
              <div className="absolute -inset-4 bg-amber-400/20 rounded-[4rem] -rotate-3 transition-transform group-hover:rotate-0 duration-700" />
              <div className="relative aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl border-[15px] border-white">
                <Image 
                  src="/melukis_tk.jpeg" 
                  alt="Kegiatan Melukis" 
                  fill 
                  className="object-cover hover:scale-110 transition-transform duration-1000" 
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-amber-400 text-emerald-950 p-10 rounded-[3rem] shadow-2xl font-black -rotate-6 text-center border-4 border-white">
                <p className="text-xs uppercase tracking-widest mb-1 text-emerald-800">Metode</p>
                <p className="text-xl">Sentra & <br/> Edukatif</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 space-y-10"
          >
            <h4 className="text-orange-600 font-black uppercase tracking-[0.4em] text-xs">Golden Age Education</h4>
            <h2 className="text-5xl md:text-7xl font-black text-emerald-950 leading-[0.95] tracking-tighter">
              Masa Keemasan <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 italic">Beraqidah Lurus.</span>
            </h2>
            
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              Lingkungan belajar yang aman dengan pendekatan <strong>"Nurturing Heart"</strong>, memastikan ananda tumbuh dengan adab yang kokoh.
            </p>
            
            <div className="space-y-4">
              {kurikulum.map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ x: -10 }}
                  className="flex items-center gap-6 bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
                >
                  <div className="text-4xl bg-amber-50 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:bg-amber-400 transition-colors">{item.i}</div>
                  <div>
                    <h4 className="font-black text-emerald-950 text-xl">{item.t}</h4>
                    <p className="text-gray-400 font-semibold text-sm">{item.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: PROGRAM UNGGULAN */}
      <section className="py-32 px-4 md:px-10 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[#053e2f] rounded-[4rem] overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/kids-outline-drawings.png")' }}></div>
            <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-amber-400/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-emerald-400/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[150px]" />
        </div>
          
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 text-center"
          >
            <h2 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
              Program <span className="text-amber-400 italic">Unggulan</span>
            </h2>
            <div className="h-1.5 w-20 bg-amber-400 mx-auto rounded-full" />
            <p className="mt-8 text-emerald-100/60 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">Inovasi Pembelajaran Berbasis Adab</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {programUnggulan.map((prog, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[3rem] hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(251,191,36,0.3)] transition-all duration-700 text-left relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 text-8xl opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                  {prog.n === "Harmonisasi Orang Tua" ? "🧕" : prog.i}
                </div>
                <div className="text-5xl mb-8 transform group-hover:scale-110 group-hover:rotate-12 transition-transform inline-block bg-white/10 p-4 rounded-2xl group-hover:bg-amber-100 transition-colors">
                  {prog.n === "Harmonisasi Orang Tua" ? (
                    <span className="flex items-center">
                      👨‍💼<span className="relative ml-[-12px] z-10">🧕</span><span className="ml-[-8px]">👦</span>
                    </span>
                  ) : prog.i}
                </div>
                <h4 className="text-2xl font-black text-amber-400 group-hover:text-emerald-950 mb-4 tracking-tight leading-tight transition-colors">{prog.n}</h4>
                <p className="text-emerald-50/60 group-hover:text-gray-500 text-sm font-medium leading-relaxed transition-colors">{prog.d}</p>
                <div className="mt-6 h-1 w-0 bg-amber-500 group-hover:w-full transition-all duration-700 rounded-full" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: INFINITE SLIDER */}
      <section className="py-32 overflow-hidden bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-10"
        >
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-emerald-950 mb-6 tracking-tighter">Eksplorasi <span className="text-orange-600">Tanpa Batas</span></h2>
              <p className="text-gray-400 text-xl font-medium italic text-left">
                Setiap sudut sekolah adalah ruang belajar yang penuh dengan inspirasi dan kegembiraan.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
                {kegiatanSeru.slice(0,3).map((v,i) => (
                  <span key={i} className="bg-emerald-50 text-emerald-800 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm">{v}</span>
                ))}
            </div>
        </motion.div>

        <div className="relative flex overflow-x-hidden group">
          <div className="flex animate-[marquee_50s_linear_infinite] group-hover:[animation-play-state:paused] whitespace-nowrap py-12 gap-10">
            {[...fotoSlide, ...fotoSlide].map((img, i) => (
              <div key={i} className="relative w-[350px] md:w-[600px] h-[300px] md:h-[450px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group-hover:border-amber-400 transition-colors flex-shrink-0">
                <Image 
                  src={img} 
                  alt="Kegiatan TK" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700" 
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-20">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4"
            >
                {kegiatanSeru.map((item, i) => (
                  <motion.div 
                    key={i} 
                    variants={fadeInUp}
                    className="flex items-center gap-4 bg-amber-50/50 p-5 rounded-3xl border border-amber-100 shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black text-sm shadow-inner">✓</div>
                    <span className="font-black text-emerald-950 text-xs uppercase tracking-tight">{item}</span>
                  </motion.div>
                ))}
            </motion.div>
        </div>
      </section>

      {/* SECTION 5: CTA */}
      <section className="pb-32 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-gradient-to-r from-amber-400 to-orange-400 rounded-[4rem] p-12 md:p-32 text-center shadow-[0_40px_80px_-20px_rgba(234,179,8,0.4)] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-emerald-950 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
          <div className="relative z-10 text-center flex flex-col items-center">
            <h3 className="text-4xl md:text-7xl font-black text-emerald-950 group-hover:text-white mb-8 transition-colors tracking-tighter leading-tight">Mulai Petualangan <br/>Ananda Disini</h3>
            <p className="text-lg md:text-2xl text-emerald-900/70 group-hover:text-emerald-50/70 mb-16 font-bold italic transition-colors">Segera bergabung bersama keluarga besar SIT Bina Shaliha.</p>
            
            <Link href="/ppdb" className="inline-block bg-emerald-950 text-white group-hover:bg-amber-400 group-hover:text-emerald-950 px-16 py-8 rounded-[2.5rem] font-black text-2xl transition-all shadow-2xl uppercase tracking-widest border-b-8 border-emerald-800 active:border-b-0 active:translate-y-2 text-center">
              Daftar Sekarang
            </Link>
          </div>
        </motion.div>
      </section>

      <WhatsAppButton />
    </main>
  );
}