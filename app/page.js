'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    { angka: "100%", label: "Kurikulum Nasional & Muatan Lokal Berbasis Islam" },
    { angka: "Kompeten", label: "Tenaga Pendidik" },
    { angka: "Modern", label: "Fasilitas Belajar" },
    { angka: "Unggul", label: "Output Lulusan" },
  ];

  return (
    <main className="min-h-screen bg-white selection:bg-yellow-400 selection:text-green-950">
      
      {/* 1. HERO SECTION - FIXED LOGO POSITION */}
      <section className="relative min-h-screen lg:min-h-[95vh] flex items-center bg-green-950 overflow-hidden pt-24 pb-28">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/10 blur-[120px] rounded-full -mr-48 -mt-48 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full -ml-24 -mb-24"></div>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            
            <div className="w-full lg:w-2/5 flex justify-center lg:justify-start items-center">
              <div className="relative w-60 h-60 sm:w-80 sm:h-80 lg:w-[480px] lg:h-[480px] drop-shadow-[0_0_80px_rgba(251,191,36,0.3)] transition-transform duration-700 hover:scale-105">
                <Image 
                  src="/logo-bs.png" 
                  alt="Logo Bina Shaliha" 
                  fill 
                  className="object-contain" 
                  priority 
                />
              </div>
            </div>

            <div className="w-full lg:w-3/5 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full border border-yellow-500/30 text-yellow-400 font-bold tracking-[0.3em] uppercase mb-6 text-[10px] md:text-xs bg-yellow-500/5 backdrop-blur-sm">
                Yayasan Al Musthofaiyah
              </span>
              <div className="mb-10">
                <h3 className="text-white text-2xl md:text-4xl font-light tracking-tight opacity-80 mb-2">Sekolah Islam</h3>
                <h1 className="text-5xl md:text-8xl lg:text-[110px] font-black leading-[0.85] tracking-tighter text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600">BINA SHALIHA</span>
                </h1>
              </div>
              <div className="max-w-2xl mb-12 mx-auto lg:mx-0 relative">
                <div className="hidden lg:block absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-transparent"></div>
                <p className="text-lg md:text-2xl text-emerald-50/80 lg:pl-8 font-medium leading-relaxed italic">
                  "Tumbuh Bersama Dalam Bingkai Islam Menuju Generasi Unggul"
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
                <Link href="/ppdb" className="group relative w-full sm:w-auto overflow-hidden bg-yellow-500 text-green-950 px-12 py-5 rounded-2xl font-black text-xl transition-all hover:shadow-[0_0_40px_rgba(234,179,8,0.4)]">
                  <span className="relative z-10">DAFTAR SEKARANG</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>
                <Link href="/profil" className="backdrop-blur-md w-full sm:w-auto bg-white/5 border border-white/20 hover:bg-white/10 text-white px-12 py-5 rounded-2xl font-black text-xl transition-all text-center">
                  PROFIL SEKOLAH
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS COUNTER - FIXED ALIGNMENT & RESPONSIVE TEXT */}
      <section className="relative z-40 -mt-16 max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {stats.map((item, i) => (
            <div key={i} className="bg-white/95 backdrop-blur-xl p-5 md:p-8 h-32 md:h-44 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 text-center group hover:-translate-y-3 transition-all duration-500 flex flex-col items-center justify-center overflow-hidden">
              <div className="text-[5.5vw] md:text-4xl font-black text-green-950 mb-1 group-hover:text-yellow-500 transition-colors leading-none whitespace-nowrap text-center">
                {item.angka}
              </div>
              <div className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight text-center">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. QUOTE AL-QURAN */}
      <section className="py-32 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gray-50 rounded-full blur-3xl -mr-48 -mt-48 opacity-50"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-10 opacity-20 text-8xl font-serif text-yellow-600">"</div>
          <p className="text-3xl md:text-5xl font-semibold text-green-950 leading-[1.3] italic mb-12 tracking-tight">
            "Wahai Tuhan kami, anugerahkanlah kepada kami istri-istri kami dan keturunan kami sebagai penyenang hati (kami), dan jadikanlah kami imam bagi orang-orang yang bertakwa."
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[2px] w-12 bg-yellow-500"></div>
            <p className="font-black text-green-950 tracking-[0.3em] uppercase text-sm">QS. Al-Furqan : 74</p>
            <div className="h-[2px] w-12 bg-yellow-500"></div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[25vw] font-black text-gray-50/60 -z-0 select-none leading-none">ISLAMIC</div>
      </section>

      {/* 4. VISI & MISI - REVISED: INTEGRATED TK & SD VISION */}
      <section className="py-32 px-6 bg-green-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">Visi & <span className="text-yellow-500 underline decoration-white/20">Misi</span></h2>
            <p className="text-yellow-400 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mt-4">Satu Tujuan Untuk Generasi Robbani</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 lg:gap-20">
            <div className="bg-white/5 backdrop-blur-md rounded-[4rem] p-12 md:p-24 border border-white/10 shadow-2xl group hover:border-yellow-500/30 transition-all duration-700">
              <div className="max-w-4xl mx-auto">
                <div className="mb-20 text-center">
                  <h4 className="text-yellow-500 font-black mb-8 uppercase tracking-[0.4em] text-[10px] md:text-xs">Visi Utama Sekolah Islam Bina Shaliha</h4>
                  <p className="text-white text-3xl md:text-6xl font-black leading-tight italic tracking-tighter">
                    "Terwujudnya peserta didik yang beraqidah lurus, berkarakter Islami, kreatif, dan berprestasi."
                  </p>
                  <div className="h-1 w-20 bg-yellow-500 mx-auto mt-10 rounded-full" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
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
                    <div key={idx} className="flex items-center gap-6 group/item">
                      <span className="text-4xl font-black text-white/5 group-hover/item:text-yellow-500/20 transition-colors">0{idx + 1}</span>
                      <p className="text-lg md:text-xl text-emerald-50/80 font-bold tracking-tight group-hover/item:text-white group-hover/item:translate-x-2 transition-all">{misi}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROGRAM UNGGULAN */}
      <section className="py-32 px-6 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-6xl md:text-8xl font-black text-green-950 tracking-tighter leading-[0.8] mb-6 uppercase">Program <span className="text-yellow-500">Elite</span></h2>
              <p className="text-xl text-gray-500 font-medium italic">Kurikulum terintegrasi untuk membentuk karakter pemimpin masa depan.</p>
            </div>
            <div className="h-px flex-grow bg-gray-200 mx-10 hidden md:block"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-gray-100 group hover:border-yellow-400 transition-all duration-500">
              <div className="flex items-center gap-4 mb-12 justify-center md:justify-start">
                <div className="w-16 h-16 bg-yellow-400 rounded-3xl flex items-center justify-center text-3xl shadow-lg shadow-yellow-200">👶</div>
                <h3 className="text-4xl font-black text-green-950 uppercase">Unit TK</h3>
              </div>
              <div className="grid gap-10">
                {programTK.map((prog, index) => (
                  <div key={index} className="group/item flex gap-6">
                    <span className="text-5xl font-black text-gray-100 group-hover/item:text-yellow-400 transition-colors">{(index+1).toString().padStart(2, '0')}</span>
                    <div>
                      <h5 className="font-black text-xl text-green-950 mb-2 uppercase tracking-tight">{prog.nama}</h5>
                      <p className="text-gray-500 leading-relaxed text-lg">{prog.deskripsi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-950 p-12 rounded-[4rem] shadow-2xl shadow-green-900/40 border border-green-900 group hover:border-green-500 transition-all duration-500">
              <div className="flex items-center gap-4 mb-12 justify-center md:justify-start">
                <div className="w-16 h-16 bg-green-700 rounded-3xl flex items-center justify-center text-3xl shadow-lg shadow-green-900">📖</div>
                <h3 className="text-4xl font-black text-yellow-400 uppercase">Unit SD</h3>
              </div>
              <div className="grid gap-10">
                {programSD.map((prog, index) => (
                  <div key={index} className="group/item flex gap-6">
                    <span className="text-5xl font-black text-white/5 group-hover/item:text-green-500 transition-colors">{(index+1).toString().padStart(2, '0')}</span>
                    <div>
                      <h5 className="font-black text-xl text-white mb-2 uppercase tracking-tight">{prog.nama}</h5>
                      <p className="text-emerald-100/50 leading-relaxed text-lg">{prog.deskripsi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GALERI - FIXED: WRAPPED WITH LINK */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <h2 className="text-5xl font-black text-green-950 tracking-tighter uppercase">Galeri <span className="text-yellow-500">Eksplorasi</span></h2>
            <Link href="/galeri" className="px-8 py-4 bg-gray-50 hover:bg-yellow-400 text-green-950 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">Lihat Dokumentasi ➜</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {latestGallery.map((item, idx) => (
              <Link 
                key={item._id} 
                href={`/galeri/${item._id}`}
                className={`group relative overflow-hidden rounded-[3rem] shadow-lg ${idx === 0 ? 'md:col-span-2 md:row-span-2 aspect-square' : 'aspect-square'}`}
              >
                <img src={item.images?.[0] || '/logo-bs.png'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={item.judul} />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-all p-10 flex flex-col justify-end">
                  <span className="text-yellow-400 font-black text-xs uppercase mb-2">Unit {item.unit}</span>
                  <h4 className="text-white font-bold text-xl leading-tight">{item.judul}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WARTA TERBARU */}
      <section className="py-32 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-7xl font-black text-green-950 tracking-tighter uppercase mb-4">Warta <span className="text-emerald-600">Terbaru</span></h2>
            <div className="h-1.5 w-40 bg-emerald-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {latestNews.map((news) => (
              <Link key={news._id} href={`/berita/${news._id}`} className="group bg-white rounded-[3.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4">
                <div className="relative aspect-video overflow-hidden">
                  <img src={news.images?.[0] || '/logo-bs.png'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={news.judul} />
                </div>
                <div className="p-10">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">{new Date(news.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <h3 className="text-2xl font-black text-green-950 leading-tight mb-4 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{news.judul}</h3>
                  <p className="text-gray-400 font-medium italic line-clamp-2">{news.deskripsiSingkat}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. ALUR PPDB */}
      <section className="py-40 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-yellow-500/5 blur-3xl -ml-32"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-6xl md:text-[100px] font-black text-green-950 mb-32 tracking-tighter leading-none">JOIN US <span className="text-yellow-500">2026</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { t: "Hubungi Admin", d: "Dapatkan informasi pendaftaran melalui WhatsApp Admin.", i: "💬" },
              { t: "Lengkapi Berkas", d: "Siapkan fotokopi Akte, KK, dan Foto Keluarga.", i: "📝" },
              { t: "Proses Seleksi", d: "Ananda mengikuti observasi potensi & wawancara.", i: "🔍" },
            ].map((step, i) => (
              <div key={i} className="group relative">
                <div className="text-9xl absolute -top-20 left-1/2 -translate-x-1/2 opacity-[0.03] font-black group-hover:opacity-10 transition-opacity">0{i+1}</div>
                <div className="text-7xl mb-8 relative z-10 scale-100 group-hover:scale-125 transition-transform duration-500">{step.i}</div>
                <h4 className="text-3xl font-black text-green-950 mb-4 uppercase tracking-tighter">{step.t}</h4>
                <p className="text-gray-400 text-lg font-medium max-w-[250px] mx-auto">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </main>
  );
}