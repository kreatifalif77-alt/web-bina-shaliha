import Image from 'next/image';
import Link from 'next/link';

export default function UnitSD() {
  // Data Berdasarkan Brosur SD Terbaru
  const keunggulan = [
    { t: "Intensif Tahfidz Al-Qur'an", d: "Mencintai, menghafal, dan mengamalkan Al-Qur'an sejak dini.", i: "📖" },
    { t: "Leadership (LDKS)", d: "Membentuk pemimpin berakhlak, disiplin, dan bertanggung jawab.", i: "👑" },
    { t: "Dokter Kecil", d: "Menanamkan kepedulian kesehatan dan pola hidup bersih sehat.", i: "🩺" },
    { t: "Super Camp", d: "Melatih kemandirian, keberanian, dan kerja sama tim.", i: "🏕️" },
  ];

  const ekstrakurikuler = [
    { n: "Pramuka", i: "⚜️" },
    { n: "Marawis", i: "🥁" },
    { n: "Paskibra", i: "🇮🇩" },
    { n: "Pencak Silat", i: "🥋" },
  ];

  const kegiatanUtama = [
    { t: "Wisuda Tahfidz", d: "Apresiasi capaian hafalan Al-Qur'an siswa.", img: "/wisudah-tahfiz.jpg" },
    { t: "Expo Karya", d: "Ajang unjuk karya seni, sains, dan inovasi siswa.", img: "/karya.jpeg" },
    { t: "Field Trip & Outbound", d: "Belajar dari pengalaman nyata di luar kelas.", img: "/trip.jpg" },
    { t: "Shalat Berjamaah", d: "Pembiasaan Shalat Dhuha & Dzuhur berjamaah.", img: "/sholat.jpg" }
  ];

  return (
    <main className="min-h-screen bg-white selection:bg-yellow-400 selection:text-green-950">
      
      {/* SECTION 1: HERO SECTION SD - PREMIUM LOOK */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-green-950 px-6">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] -mr-32 -mt-32 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -ml-32 -mb-32" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto pt-10">
          <div className="mb-10 inline-block">
            <span className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md text-yellow-400 px-6 py-3 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.3em] border border-white/10 shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping" />
              Excellence in Islamic Education
            </span>
          </div>
          
          <h1 className="text-6xl md:text-[10rem] font-black text-white tracking-tighter leading-[0.85] mb-10">
            SD ISLAM <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-600 drop-shadow-2xl">BINA SHALIHA</span>
          </h1>
          
          <p className="text-emerald-50/70 font-medium text-xl md:text-3xl max-w-3xl mx-auto leading-relaxed mb-16 px-4 italic">
            "Tumbuh Bersama Dalam Bingkai Islam Menuju Generasi Unggul"
          </p>

          <div className="flex justify-center group">
            <Link href="/ppdb" className="relative overflow-hidden bg-yellow-500 text-green-950 px-12 py-6 rounded-2xl md:rounded-[2rem] font-black text-xl md:text-2xl hover:text-white transition-all duration-500 shadow-[0_20px_50px_rgba(234,179,8,0.3)] border-b-8 border-yellow-700 active:border-b-0 active:translate-y-2">
              <span className="relative z-10">DAFTAR SEKARANG ➜</span>
              <div className="absolute inset-0 bg-green-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
          </div>
        </div>

        {/* Modern Wave Divider */}
        <div className="absolute bottom-0 w-full leading-[0]">
          <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 200L1440 200L1440 80C1100 180 400 0 0 100V200Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* SECTION 2: PROGRAM UNGGULAN - CARD MODERNIZATION */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h4 className="text-yellow-600 font-black uppercase tracking-[0.4em] text-xs mb-4">Our Curriculum</h4>
          <h2 className="text-4xl md:text-6xl font-black text-green-950 uppercase tracking-tight leading-none">
            Program <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800 italic">Unggulan</span>
          </h2>
          <div className="h-1.5 w-20 bg-yellow-500 mx-auto mt-8 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {keunggulan.map((item, i) => (
            <div key={i} className="group relative p-10 bg-white rounded-[3rem] border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-15px_rgba(5,46,22,0.1)] hover:bg-green-950 hover:text-white transition-all duration-700 hover:-translate-y-4 overflow-hidden">
              <div className="absolute -right-4 -top-4 text-9xl opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none">{item.i}</div>
              <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-4xl mb-10 group-hover:bg-yellow-500 group-hover:rotate-12 transition-all duration-500">
                {item.i}
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase leading-tight tracking-tight">{item.t}</h3>
              <p className="text-gray-500 group-hover:text-emerald-50/60 font-medium text-sm leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: GALERI FASILITAS - GRID ASYMMETRIC */}
      <section className="py-32 px-4 md:px-10">
        <div className="bg-green-950 rounded-[4rem] p-10 md:p-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 blur-[100px] rounded-full" />
          
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-6 leading-none">Fasilitas <span className="text-yellow-400">Premium</span></h2>
              <p className="text-emerald-100/40 uppercase tracking-[0.3em] font-black text-xs md:text-sm">Infrastruktur Berstandar Nasional</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[700px]">
              <div className="relative md:col-span-8 rounded-[2.5rem] overflow-hidden group shadow-2xl border border-white/5">
                <Image src="/lab-komputer.jpg" alt="Lab Komputer" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 w-full p-10">
                  <h4 className="text-white font-black text-2xl uppercase tracking-tighter">LAB KOMPUTER</h4>
                  <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mt-2">Laboratorium Komputer & Media</p>
                </div>
              </div>
              
              <div className="relative md:col-span-4 rounded-[2.5rem] overflow-hidden group shadow-2xl border border-white/5">
                <Image src="/kelas.jpeg" alt="Ruang Kelas" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 w-full p-10">
                  <h4 className="text-white font-black text-2xl uppercase tracking-tighter">Ruang Kelas</h4>
                </div>
              </div>

              <div className="relative md:col-span-4 rounded-[2.5rem] overflow-hidden group shadow-2xl border border-white/5">
                <Image src="/perpustakaan.jpeg" alt="Perpustakaan" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 w-full p-10">
                  <h4 className="text-white font-black text-2xl uppercase tracking-tighter">Perpustakaan</h4>
                </div>
              </div>

              <div className="relative md:col-span-8 rounded-[2.5rem] overflow-hidden group shadow-2xl border-4 border-yellow-500/30">
                <Image src="/aula.jpeg" alt="Aula Kreativitas" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 w-full p-10">
                  <h4 className="text-white font-black text-2xl uppercase tracking-tighter">Aula serbaguna</h4>
                  <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mt-2">Area Olahraga & Kreativitas Ananda</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SNAPSHOT KEGIATAN - MODERN CARDS */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black text-green-950 uppercase tracking-tighter leading-none mb-4">Daily <span className="text-green-600">Moments</span></h2>
              <p className="text-gray-400 font-bold italic text-xl tracking-tight">Melihat keceriaan dan proses tumbuh kembang ananda.</p>
            </div>
            <div className="bg-emerald-950 text-yellow-400 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl">#BinaShalihaLife</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {kegiatanUtama.map((keg, i) => (
              <div key={i} className="group relative">
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)]">
                  <Image 
                    src={keg.img} 
                    alt={keg.t} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-all duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="text-white font-black text-xl uppercase mb-2">{keg.t}</h4>
                    <p className="text-emerald-100/70 text-xs font-medium">{keg.d}</p>
                  </div>
                </div>
                {/* Decorative Element */}
                <div className="mt-8 flex items-center gap-4 px-4">
                  <div className="h-0.5 flex-grow bg-gray-100" />
                  <h4 className="font-black text-green-950 uppercase text-xs tracking-widest">{keg.t}</h4>
                  <div className="h-0.5 flex-grow bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: EKSTRAKURIKULER - FIXED BENTO STYLE */}
      <section className="py-10 px-4 md:px-10 mb-20">
        <div className="max-w-7xl mx-auto bg-gray-50 rounded-[4rem] p-12 md:p-20 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/3 text-center lg:text-left">
              <h2 className="text-5xl font-black text-green-950 uppercase leading-[0.9] mb-8">Eksplorasi <br/><span className="text-yellow-600">Bakat</span></h2>
              <p className="text-gray-500 font-medium text-lg leading-relaxed mb-8">Wadah kreatif bagi ananda untuk mengasah *soft-skill* dan potensi diri di luar jam akademik.</p>
              <div className="inline-flex gap-2">
                <div className="w-12 h-1.5 bg-green-900 rounded-full" />
                <div className="w-4 h-1.5 bg-yellow-500 rounded-full" />
              </div>
            </div>
            <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {ekstrakurikuler.map((ekskul, i) => (
                <div key={i} className="bg-white p-6 md:p-10 rounded-[2.5rem] text-center border-b-8 border-green-900 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all group flex flex-col items-center justify-center min-w-0">
                  <div className="text-5xl md:text-6xl mb-6 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">{ekskul.i}</div>
                  <div className="font-black text-green-950 text-[11px] md:text-sm uppercase tracking-[0.1em] md:tracking-[0.2em] whitespace-nowrap px-1">
                    {ekskul.n}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA - BOLD & LUXURY */}
      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto bg-green-950 rounded-[4rem] p-12 md:p-32 text-center shadow-[0_50px_100px_-20px_rgba(5,46,22,0.4)] relative overflow-hidden group border border-white/5">
          {/* Animated Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] group-hover:bg-yellow-500/20 transition-all duration-1000" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter leading-tight">Mulai Masa Depan <br/>Gemilang Sekarang</h2>
            <p className="text-emerald-50/50 mb-16 text-xl md:text-2xl font-bold italic">Pendaftaran Siswa Baru (PPDB) 2026/2027 telah dibuka.</p>
            
            <Link href="/ppdb" className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-green-950 px-16 py-8 rounded-[2rem] font-black text-2xl hover:scale-105 hover:shadow-[0_20px_40px_rgba(234,179,8,0.4)] transition-all duration-500 uppercase tracking-widest border-b-8 border-yellow-800 active:border-b-0">
              JOIN BINA SHALIHA
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}