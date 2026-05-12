'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Import Framer Motion
import WhatsAppButton from '@/components/WhatsAppButton';
import FaqSection from '@/components/FaqSection';
import TestimonialSlider from '@/components/TestimonialSlider';




export default function Home() {
  const [latestNews, setLatestNews] = useState([]);
  const [latestGallery, setLatestGallery] = useState([]);

  useEffect(() => {
    fetch('/api/admin/post?kategori=berita')
      .then(res => res.json())
      .then(data => { if (data.success) setLatestNews(data.data.slice(0, 3)); })
      .catch(err => console.error("Gagal memuat berita:", err));

    fetch('/api/admin/post?kategori=galeri')
      .then(res => res.json())
      .then(data => { if (data.success) setLatestGallery(data.data.slice(0, 4)); })
      .catch(err => console.error("Gagal memuat galeri:", err));
  }, []);

  const programSD = [
    { nama: "Program Intensif Tahfidz Al-Qur'an", deskripsi: "Membimbing siswa mencintai, menghafal, dan mengamalkan Al-Qur'an sejak dini." },
    { nama: "Project Based Learning", deskripsi: "Pembelajaran berbasis proyek untuk melatih inovasi dan kreativitas siswa." },
    { nama: "Pendidikan Karakter Islami", deskripsi: "Pembiasaan shalat berjamaah, dhuha, dan akhlak mulia dalam keseharian." },
    { nama: "LDKS & Supercamp", deskripsi: "Membentuk pemimpin yang disiplin, mandiri, dan bertanggung jawab." },
    { nama: "Ekstrakurikuler Lengkap", deskripsi: "Pramuka, Marawis, Paskibra, Pencak Silat, dan Dokter Kecil." },
    { nama: "Field Trip & Outbound", deskripsi: "Belajar dari pengalaman nyata melalui jelajah alam dan eksperimen." },
  ];

  const programTK = [
    { nama: "Intensif Al-Qur'an", deskripsi: "Mengenalkan hafalan Al-Qur'an dengan metode yang menyenangkan." },
    { nama: "Hafal Hadits & Doa Harian", deskripsi: "Pembiasaan adab dan doa melalui hafalan hadits-hadits pendek." },
    { nama: "Life Skill & 7 Kebiasaan", deskripsi: "Menanamkan kemandirian melalui gerakan anak Indonesia hebat." },
    { nama: "Project Based Learning", deskripsi: "Kegiatan pembelajaran yang berkesadaran, bermakna, dan ceria." },
    { nama: "Outing Class & Ayah Bercerita", deskripsi: "Mengenalkan lingkungan luar dan memperkuat ikatan bersama orang tua." },
    { nama: "Ekskul Melukis & Berenang", deskripsi: "Mengembangkan kreativitas, motorik, dan keberanian ananda." },
  ];

  const stats = [
    { icon: "📚", angka: "100%", label: "Kurikulum Nasional & Muatan Lokal Berbasis Islam" },
    { icon: "👨‍🏫", angka: "Kompeten", label: "Tenaga Pendidik" },
    { icon: "💡", angka: "Modern", label: "Pembelajaran" },
    { icon: "🎓", angka: "Unggul", label: "Output Lulusan" },
  ];

  // Konfigurasi Animasi Sederhana
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="min-h-screen bg-[#FDFDFD] selection:bg-yellow-400 selection:text-green-950 overflow-hidden relative">
      
      {/* GLOBAL BACKGROUND PATTERN */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none z-0 fixed" 
           style={{ backgroundImage: `radial-gradient(#e5e7eb 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen lg:min-h-[95vh] flex items-center bg-green-950 overflow-hidden pt-24 pb-32 shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/10 blur-[120px] rounded-full -mr-48 -mt-48 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full -ml-24 -mb-24"></div>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* FLOATING SCHOOL ELEMENTS */}
        <div className="absolute top-32 left-10 text-6xl opacity-[0.05] -rotate-12 animate-bounce pointer-events-none hidden lg:block">🎒</div>
        <div className="absolute bottom-40 right-20 text-7xl opacity-[0.05] rotate-12 animate-pulse pointer-events-none hidden lg:block">🎨</div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-2/5 flex justify-center lg:justify-start items-center"
            >
              <div className="relative w-60 h-60 sm:w-80 sm:h-80 lg:w-[480px] lg:h-[480px] drop-shadow-[0_0_80px_rgba(251,191,36,0.3)] transition-transform duration-700 hover:scale-105">
                <Image src="/logo-bs.png" alt="Logo Bina Shaliha" fill className="object-contain" priority />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-3/5 text-center lg:text-left"
            >
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start mb-6">
                <span className="inline-block px-4 py-1.5 rounded-full border border-yellow-500/30 text-yellow-400 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs bg-yellow-500/5 backdrop-blur-sm">
                  Yayasan Al Musthofaiyah
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 text-emerald-300 font-bold tracking-widest uppercase text-[9px] md:text-[10px] bg-emerald-500/10 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Terakreditasi & Berizin Resmi
                </span>
              </div>

              <div className="mb-10">
                <h3 className="text-white text-2xl md:text-4xl font-light tracking-tight opacity-80 mb-2">Sekolah Islam</h3>
                <h1 className="text-5xl md:text-8xl lg:text-[110px] font-black leading-[0.85] tracking-tighter text-white drop-shadow-2xl">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600">BINA SHALIHA</span>
                </h1>
              </div>
              <div className="max-w-2xl mb-12 mx-auto lg:mx-0 relative">
                <div className="hidden lg:block absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-yellow-400 to-transparent rounded-full"></div>
                <p className="text-lg md:text-2xl text-emerald-50/80 lg:pl-8 font-medium leading-relaxed italic">
                  "Tumbuh Bersama Dalam Bingkai Islam Menuju Generasi Unggul."
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
                <Link href="/ppdb" className="group relative w-full sm:w-auto overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-950 px-12 py-5 rounded-2xl font-black text-xl transition-all hover:scale-105 shadow-[0_15px_30px_rgba(234,179,8,0.3)] border-b-4 border-yellow-700 active:border-b-0 active:translate-y-1">
                  <span className="relative z-10 uppercase tracking-widest">Daftar Sekarang</span>
                </Link>
                <Link href="/profil" className="backdrop-blur-md w-full sm:w-auto bg-white/5 border border-white/20 hover:bg-white/10 text-white px-12 py-5 rounded-2xl font-black text-xl transition-all text-center uppercase tracking-widest hover:-translate-y-1">
                  Profil Sekolah
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full leading-[0] z-20">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full h-auto">
            <path d="M0 100L1440 100L1440 0C1100 80 400 -20 0 20V100Z" fill="#FDFDFD"/>
          </svg>
        </div>
      </section>

      {/* 2. STATS COUNTER */}
      <section className="relative z-40 -mt-20 max-w-6xl mx-auto px-4 md:px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((item, i) => (
            <motion.div 
              key={i} 
              variants={fadeInUp}
              className="bg-white/90 backdrop-blur-2xl p-6 md:p-8 h-40 md:h-48 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-2 border-white hover:border-yellow-400 text-center group hover:-translate-y-3 transition-all duration-500 flex flex-col items-center justify-center overflow-hidden relative"
            >
              <div className="absolute -right-4 -bottom-4 text-7xl opacity-5 group-hover:opacity-10 transition-opacity group-hover:scale-110 duration-500">{item.icon}</div>
              <div className="text-3xl mb-2 opacity-80 group-hover:scale-110 transition-transform">{item.icon}</div>
              <div className="text-[5.5vw] md:text-3xl font-black text-green-950 mb-2 group-hover:text-yellow-500 transition-colors leading-none whitespace-nowrap text-center relative z-10">
                {item.angka}
              </div>
              <div className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight text-center relative z-10">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. QUOTE AL-QURAN */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 px-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 bg-white/60 backdrop-blur-sm p-12 md:p-20 rounded-[4rem] border border-gray-100 shadow-xl">
          <div className="mb-6 opacity-20 text-8xl font-serif text-yellow-600 leading-none">"</div>
          <p className="text-2xl md:text-4xl font-semibold text-green-950 leading-[1.4] italic mb-12 tracking-tight">
            "Wahai Tuhan kami, anugerahkanlah kepada kami istri-istri kami dan keturunan kami sebagai penyenang hati (kami), dan jadikanlah kami imam bagi orang-orang yang bertakwa."
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[3px] w-16 bg-yellow-400 rounded-full"></div>
            <p className="font-black text-green-900 tracking-[0.4em] uppercase text-xs md:text-sm bg-green-50 px-6 py-2 rounded-full border border-green-100">QS. Al-Furqan : 74</p>
            <div className="h-[3px] w-16 bg-yellow-400 rounded-full"></div>
          </div>
        </div>
      </motion.section>

      {/* 4. VISI & MISI */}
      <section className="py-32 px-6 bg-green-950 relative overflow-hidden shadow-2xl">
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
          <div className="bg-white/5 backdrop-blur-md rounded-[4rem] p-12 md:p-24 border border-white/10 shadow-2xl group hover:border-yellow-500/30 transition-all duration-700">
            <div className="max-w-4xl mx-auto">
              <div className="mb-20 text-center">
                <h4 className="text-yellow-500 font-black mb-8 uppercase tracking-[0.4em] text-[10px] md:text-xs bg-yellow-500/10 inline-block px-6 py-2 rounded-full">Visi Utama Sekolah Islam Bina Shaliha</h4>
                <p className="text-white text-3xl md:text-6xl font-black leading-tight italic tracking-tighter drop-shadow-lg">
                  "Terwujudnya peserta didik yang beraqidah lurus, berkarakter Islami, kreatif, dan berprestasi."
                </p>
                <div className="h-1.5 w-24 bg-yellow-500 mx-auto mt-12 rounded-full" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                {[
                  "Menanamkan aqidah Islam yang kokoh", "Membentuk karakter akhlak mulia", 
                  "Optimalisasi pembelajaran Al-Quran", "Penerapan Project Based Learning", 
                  "Mengembangkan potensi & kecerdasan", "Meningkatkan kualitas SDM pendidik", 
                  "Mengikuti kemajuan teknologi", "Menghasilkan output yang berkualitas"
                ].map((misi, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-6 group/item bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
                  >
                    <span className="text-4xl font-black text-white/10 group-hover/item:text-yellow-400 transition-colors">0{idx + 1}</span>
                    <p className="text-lg md:text-xl text-emerald-50/90 font-bold tracking-tight">{misi}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 5. PROGRAM UNGGULAN */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8"
          >
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-6xl md:text-8xl font-black text-green-950 tracking-tighter leading-[0.8] mb-6 uppercase">Program <span className="text-yellow-500">Elite</span></h2>
              <p className="text-xl text-gray-500 font-medium italic">Kurikulum terintegrasi dari usia dini untuk membentuk karakter pemimpin masa depan.</p>
            </div>
            <div className="h-px flex-grow bg-gray-200 mx-10 hidden md:block"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* UNIT TK CARD */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-[4rem] shadow-2xl border-4 border-gray-50 group hover:border-yellow-400 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute -bottom-10 -right-10 text-[200px] opacity-[0.03] rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none">🖍️</div>
              <div className="flex items-center gap-6 mb-14 justify-center md:justify-start relative z-10">
                <div className="w-20 h-20 bg-yellow-400 rounded-[2rem] flex items-center justify-center text-4xl shadow-xl rotate-3">🧒</div>
                <h3 className="text-4xl font-black text-green-950 uppercase tracking-tighter">Unit TK</h3>
              </div>
              <div className="grid gap-8 relative z-10">
                {programTK.map((prog, index) => (
                  <div key={index} className="group/item flex gap-6 items-start bg-gray-50/50 p-4 rounded-3xl hover:bg-yellow-50/50 transition-colors border border-transparent hover:border-yellow-100">
                    <span className="text-4xl font-black text-gray-200 group-hover/item:text-yellow-400 mt-1">{(index+1).toString().padStart(2, '0')}</span>
                    <div>
                      <h5 className="font-black text-lg text-green-950 mb-1 uppercase tracking-tight">{prog.nama}</h5>
                      <p className="text-gray-500 leading-relaxed text-sm">{prog.deskripsi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* UNIT SD CARD */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-green-950 p-12 rounded-[4rem] shadow-2xl border-4 border-green-900 group hover:border-green-500 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 text-[200px] opacity-[0.03] -rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none">🔭</div>
              <div className="flex items-center gap-6 mb-14 justify-center md:justify-start relative z-10">
                <div className="w-20 h-20 bg-green-700 rounded-[2rem] flex items-center justify-center text-4xl shadow-xl -rotate-3">🎓</div>
                <h3 className="text-4xl font-black text-yellow-400 uppercase tracking-tighter">Unit SD</h3>
              </div>
              <div className="grid gap-8 relative z-10">
                {programSD.map((prog, index) => (
                  <div key={index} className="group/item flex gap-6 items-start bg-white/5 p-4 rounded-3xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                    <span className="text-4xl font-black text-white/10 group-hover/item:text-green-400 mt-1">{(index+1).toString().padStart(2, '0')}</span>
                    <div>
                      <h5 className="font-black text-lg text-white mb-1 uppercase tracking-tight">{prog.nama}</h5>
                      <p className="text-emerald-100/60 leading-relaxed text-sm">{prog.deskripsi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 6. GALERI */}
      <section className="py-32 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto bg-white p-8 md:p-16 rounded-[4rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <h2 className="text-5xl font-black text-green-950 tracking-tighter uppercase mb-2">Galeri <span className="text-yellow-500">Sekolah</span></h2>
            <Link href="/galeri" className="px-8 py-4 bg-gray-50 hover:bg-yellow-400 text-green-950 rounded-2xl font-black text-xs uppercase transition-all">Lihat Semua ➜</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {latestGallery.map((item, idx) => (
              <motion.div
                key={item._id}
                whileHover={{ scale: 1.03 }}
                className={`group relative overflow-hidden rounded-[2.5rem] shadow-md border-[6px] border-white hover:border-yellow-300 ${idx === 0 ? 'md:col-span-2 md:row-span-2 aspect-square' : 'aspect-square'}`}
              >
                <Link href={`/galeri/${item._id}`}>
                  <img src={item.images?.[0] || '/logo-bs.png'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={item.judul} />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 7. WARTA TERBARU */}
      <section className="py-32 border-y border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <h2 className="text-5xl md:text-7xl font-black text-green-950 tracking-tighter uppercase mb-4">Warta <span className="text-emerald-600">Terbaru</span></h2>
            <div className="h-1.5 w-40 bg-emerald-500 mx-auto rounded-full mb-6"></div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {latestNews.map((news, idx) => (
              <motion.div
                key={news._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link href={`/berita/${news._id}`} className="group bg-white rounded-[3rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-50 flex flex-col h-full">
                  <div className="relative aspect-video overflow-hidden border-b-8 border-emerald-500">
                    <img src={news.images?.[0] || '/logo-bs.png'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={news.judul} />
                  </div>
                  <div className="p-10">
                    <h3 className="text-xl md:text-2xl font-black text-green-950 leading-tight mb-4 group-hover:text-emerald-600 transition-colors line-clamp-3">{news.judul}</h3>
                    <p className="text-gray-500 font-medium text-sm line-clamp-3">{news.deskripsiSingkat}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SLIDER */}
      <TestimonialSlider />

      {/* FAQ SECTION */}
      <FaqSection />

      {/* 8. ALUR PPDB */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10 bg-green-950 rounded-[4rem] p-12 md:p-24 shadow-2xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-[80px] font-black text-white mb-24 tracking-tighter leading-none uppercase">Join Us <span className="text-yellow-500">2026</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
              {[
                { t: "Hubungi Admin", d: "Dapatkan informasi pendaftaran melalui WhatsApp Admin.", i: "💬" },
                { t: "Lengkapi Berkas", d: "Siapkan fotokopi Akte, KK, dan pas foto.", i: "📝" },
                { t: "Proses Seleksi", d: "Ananda mengikuti observasi potensi & wawancara.", i: "🔍" },
              ].map((step, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="group relative bg-white/5 p-8 rounded-[3rem] border border-white/10"
                >
                  <div className="text-6xl mb-6">{step.i}</div>
                  <h4 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">{step.t}</h4>
                  <p className="text-emerald-100/60 text-sm">{step.d}</p>
                </motion.div>
              ))}
            </div>
            <motion.div whileHover={{ scale: 1.05 }} className="mt-20">
              <Link href="/ppdb" className="inline-block bg-yellow-500 text-green-950 px-12 py-5 rounded-2xl font-black text-xl hover:shadow-2xl transition-all uppercase tracking-widest">
                Mulai Pendaftaran ➜
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <WhatsAppButton />
    </main>
  );
}