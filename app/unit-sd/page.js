'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function UnitSD() {
  // 1. DATA PROGRAM UNGGULAN (LENGKAP 4)
  const programUnggulan = [
    { t: "Intensif Tahfidz Al-Qur'an", d: "Mencintai, menghafal, dan mengamalkan Al-Qur'an sejak dini.", i: "📖", img: "/tahfiz.jpeg" },
    { t: "Leadership (LDKS)", d: "Membentuk pemimpin berakhlak, disiplin, dan bertanggung jawab.", i: "👑", img: "/ldks.jpeg" },
    { t: "Dokter Kecil", d: "Menanamkan kepedulian kesehatan dan pola hidup bersih sehat.", i: "🩺", img: "/dokter_kecil.jpeg" },
    { t: "Super Camp", d: "Melatih kemandirian, keberanian, dan kerja sama tim.", i: "🏕️", img: "/supercam.jpg" },
  ];

  // 2. DATA EKSTRAKURIKULER (LENGKAP 8 SESUAI LIST)
  const ekstrakurikuler = [
    { n: "PRAMUKA", i: "⚜️", img: "/pramuka.jpeg" },
    { n: "MARAWIS", i: "🥁", img: "/marawis.jpeg" },
    { n: "PASKIBRA", i: "🇮🇩", img: "/paskibra.jpeg" },
    { n: "PENCAK SILAT", i: "🥋", img: "/silat.jpeg" },
    { n: "ENGLISH CLUB", i: "🇬🇧", img: "/inggris_club.jpeg" },
    { n: "MELUKIS", i: "🎨", img: "/menggambar.jpeg" },
    { n: "TAHFIDZ UNGGULAN", i: "🕌", img: "/tahfiz.jpeg" },
    { n: "RENANG", i: "🏊‍♂️", img: "/berenang.jpeg" },
  ];

  // 3. DATA UNTUK GALERI BERGERAK (DAILY MOMENTS)
  const fotoBergerak = [
    "/market_day.jpeg",
    "/wisudah-tahfiz.jpg",
    "/karya.jpeg",
    "/trip.jpg",
    "/sholat.jpg",
    "/tahfiz.jpeg",
    "/ldks.jpeg",
    "/supercam.jpg"
  ];

  const labelKegiatan = ["Market Day", "Wisuda Tahfidz", "Expo Karya", "Field Trip", "Ibadah Harian"];

  return (
    <main className="min-h-screen bg-[#FCFDFD] selection:bg-yellow-400 selection:text-green-950">
      
      {/* SECTION 1: HERO SECTION DENGAN BACKGROUND_SD.JPEG YANG LEBIH JELAS */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-green-950 px-6 pt-10">
        
        {/* FOTO BACKGROUND (Dibuat Lebih Jelas) */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/baground_sd.jpeg" 
            alt="Background SD Bina Shaliha" 
            fill 
            className="object-cover opacity-60 brightness-[0.6] scale-100" 
            priority
          />
          {/* Overlay Gradient: Gelap di pinggir, agak terang di tengah agar foto terlihat */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-950/90 via-transparent to-green-950" />
          <div className="absolute inset-0 bg-green-950/20" />
        </div>

        {/* Cahaya Dekoratif */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/20 blur-[120px] -mr-32 -mt-32 animate-pulse z-10" />
        
        {/* KONTEN HERO - Dipastikan Z-Index Tertinggi */}
        <div className="relative z-30 text-center max-w-6xl mx-auto pt-20">
          <div className="mb-10 inline-block">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-yellow-400 px-6 py-3 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.3em] border border-white/20 shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping" />
              Excellence in Islamic Education
            </span>
          </div>
          
          <h1 className="text-5xl md:text-[8rem] lg:text-[9rem] font-black text-white tracking-tighter leading-[0.85] mb-12 drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]">
            SD ISLAM <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-600">BINA SHALIHA</span>
          </h1>

          <div className="flex justify-center mt-10">
            <Link href="/ppdb" className="bg-yellow-500 text-green-950 px-10 py-5 md:px-16 md:py-8 rounded-[2rem] font-black text-xl md:text-2xl hover:scale-110 transition-all shadow-[0_20px_50px_rgba(234,179,8,0.4)] border-b-8 border-yellow-700 active:border-b-0 active:translate-y-2 uppercase tracking-widest">
              DAFTAR PPDB SEKARANG ➜
            </Link>
          </div>
        </div>

        {/* Wave Divider Bawah */}
        <div className="absolute bottom-0 w-full leading-[0] z-20">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full h-auto">
            <path d="M0 100L1440 100L1440 0C1100 80 400 -20 0 20V100Z" fill="#FCFDFD"/>
          </svg>
        </div>
      </section>

      {/* SECTION 2: KALIMAT PENGANTAR (DENGAN FOTO PEMBUKA_SDS) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="inline-block border-l-4 border-yellow-500 pl-4">
              <h4 className="text-yellow-600 font-bold uppercase tracking-widest text-sm">Kenapa Harus Kami?</h4>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-green-950 leading-tight">
              Membentuk Generasi <br/> 
              <span className="text-green-700 italic">Beraqidah & Unggul.</span>
            </h2>
            <div className="space-y-6 text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
              <p>Memilih sekolah adalah investasi masa depan. Di <strong>SD Islam Bina Shaliha</strong>, kami mengintegrasikan kurikulum akademik nasional dengan nilai-nilai spiritual yang kuat.</p>
              <p>Kami berkomitmen menciptakan lingkungan belajar yang kondusif untuk melahirkan muslim sejati yang cerdas.</p>
            </div>
            <div className="pt-4">
               <div className="flex items-center gap-4 text-green-900 font-black">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl shadow-inner">🏆</div>
                  <p className="italic text-sm md:text-lg">"Mencetak Kader Pemimpin Dunia & Akhirat"</p>
               </div>
            </div>
          </div>

          <div className="relative group order-1 lg:order-2">
            <div className="absolute -inset-4 bg-yellow-500/20 rounded-[4rem] rotate-3 transition-transform group-hover:rotate-0 duration-700" />
            <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl border-[15px] border-white bg-gray-200">
              <Image src="/pembuka_sds.jpeg" alt="Siswa Berprestasi" fill className="object-cover hover:scale-110 transition-transform duration-1000" priority />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PROGRAM UNGGULAN */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black text-green-950 uppercase tracking-tighter">Program <span className="text-yellow-600 italic">Unggulan</span></h2>
          <div className="h-1.5 w-20 bg-yellow-500 mx-auto mt-6 rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {programUnggulan.map((item, i) => (
            <div key={i} className="group relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100 transition-all hover:-translate-y-4">
              <Image src={item.img} alt={item.t} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-950/30 to-transparent" />
              <div className="absolute bottom-0 p-8">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-2xl mb-4 shadow-lg">{item.i}</div>
                <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{item.t}</h3>
                <p className="text-emerald-50/60 text-[10px] font-medium leading-relaxed">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: EKSTRAKURIKULER (8 EKSKUL) */}
      <section className="py-32 bg-gray-100/50 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-5xl font-black text-green-950 mb-4 uppercase tracking-tighter">Eksplorasi Bakat</h2>
          <p className="text-gray-400 font-bold italic">Mengasah potensi di luar jam akademik.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {ekstrakurikuler.map((ekskul, i) => (
            <div key={i} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100 flex flex-col">
              <div className="relative aspect-square w-full overflow-hidden">
                <Image src={ekskul.img} alt={ekskul.n} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-xl text-xl shadow-md">{ekskul.i}</div>
              </div>
              <div className="p-6 text-center border-b-8 border-green-900 bg-white">
                <h4 className="font-black text-green-950 uppercase tracking-widest text-[10px] md:text-xs">{ekskul.n}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: DAILY MOMENTS (BERGERAK) */}
      <section className="py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-green-950 mb-6 tracking-tighter uppercase text-center md:text-left">Daily <span className="text-green-600 italic">Moments</span></h2>
            <p className="text-gray-400 text-xl font-medium italic leading-relaxed max-w-3xl text-center md:text-left">"Kami mendokumentasikan setiap tawa dan keberhasilan ananda di lingkungan Islami."</p>
        </div>

        <div className="relative flex overflow-x-hidden group">
          <div className="flex animate-[marquee_50s_linear_infinite] group-hover:[animation-play-state:paused] whitespace-nowrap py-12 gap-10">
            {[...fotoBergerak, ...fotoBergerak].map((img, i) => (
              <div key={i} className="relative w-[350px] md:w-[600px] h-[300px] md:h-[450px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group-hover:border-yellow-500 transition-colors flex-shrink-0 bg-gray-100">
                <Image src={img} alt="Kegiatan SD" fill className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
        
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}} />
      </section>

      {/* SECTION 6: CTA FOOTER */}
      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto bg-green-950 rounded-[4rem] p-12 md:p-32 text-center relative overflow-hidden shadow-2xl border border-white/5">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px]" />
          <div className="relative z-10 text-white">
            <h2 className="text-4xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-tight">Mulai Masa Depan <br/>Gemilang Sekarang</h2>
            <Link href="/ppdb" className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-green-950 px-16 py-8 rounded-[2rem] font-black text-2xl hover:scale-105 transition-all shadow-2xl border-b-8 border-yellow-800">JOIN BINA SHALIHA</Link>
          </div>
        </div>
      </section>

    </main>
  );
}