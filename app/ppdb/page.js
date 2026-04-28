"use client";
import Image from 'next/image';

export default function PPDB() {
  const adminWA = [
    { nama: "Bu Rika", nomer: "6285883027847", unit: "TK", role: "Admin TK" },
    { nama: "Bu Rodiah", nomer: "6285770654038", unit: "TK", role: "Pendaftaran" },
    { nama: "Bu Maunah", nomer: "6281381352127", unit: "SD", role: "Admin SD" },
    { nama: "Bu Ira", nomer: "6287886530890", unit: "SD", role: "Pendaftaran" }
  ];

  const alurPendaftaran = [
    { step: "01", title: "Konsultasi", desc: "Hubungi Admin via WhatsApp untuk informasi awal dan ketersediaan kuota.", icon: "📱" },
    { step: "02", title: "Registrasi", desc: "Melakukan proses pendaftaran awal dan pengambilan formulir.", icon: "📝" },
    { step: "03", title: "Pengisian Data", desc: "Melengkapi berkas administrasi dan data diri calon peserta didik.", icon: "📂" },
    { step: "04", title: "Observasi", desc: "Pertemuan silaturahmi dan pemetaan potensi serta bakat ananda.", icon: "🤝" },
  ];

  const handleWA = (nomer, admin) => {
    const pesan = `Assalamu'alaikum ${admin}, saya ingin menanyakan informasi Sistem Penerimaan Murid Baru 2026-2027 di Sekolah Islam Bina Shaliha.`;
    window.open(`https://wa.me/${nomer}?text=${encodeURIComponent(pesan)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24 selection:bg-yellow-400 selection:text-blue-900">
      
      {/* SEKSI 1: HERO - SISTEM PENERIMAAN MURID BARU */}
      <section className="relative pt-40 pb-32 bg-[#002B5B] text-white px-6 rounded-b-[4rem] md:rounded-b-[6rem] shadow-2xl overflow-hidden border-b-8 border-yellow-400">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[120px] -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px] -ml-20 -mb-20" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full mb-8 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-yellow-400">Tahun Ajaran 2026/2027</p>
          </div>
          <h1 className="text-4xl md:text-[6.5rem] font-black mb-8 leading-[1.1] tracking-tighter uppercase">
            Sistem Penerimaan <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 italic font-serif">Murid Baru</span>
          </h1>
          <p className="text-xl md:text-3xl font-medium text-blue-100 max-w-3xl mx-auto leading-relaxed border-t border-white/10 pt-8 mt-4 italic">
            "Tumbuh Bersama Dalam Bingkai Islam Menuju Generasi Unggul."
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* KOLOM KIRI: ALUR & UNIT */}
          <div className="lg:col-span-7 space-y-10">
            {/* ALUR PENDAFTARAN */}
            <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <h2 className="text-4xl font-black text-blue-950 uppercase tracking-tighter leading-none mb-4">Langkah <br/> <span className="text-yellow-500 italic font-serif">Pendaftaran</span></h2>
                  <p className="text-gray-400 font-medium text-sm uppercase tracking-widest">Prosedur bergabung bersama kami</p>
                </div>
                <div className="h-0.5 flex-grow bg-gray-50 mx-6 mb-2 hidden md:block" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {alurPendaftaran.map((item, i) => (
                  <div key={i} className="group flex items-start gap-6 p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-yellow-400 hover:bg-white transition-all duration-500 hover:shadow-xl">
                    <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center text-3xl group-hover:bg-blue-900 group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-yellow-600 font-black text-[10px] uppercase tracking-widest mb-1">Langkah {item.step}</p>
                      <h4 className="font-black text-blue-950 text-xl mb-2">{item.title}</h4>
                      <p className="text-gray-500 text-xs font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* UNIT PENDIDIKAN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative overflow-hidden bg-blue-900 p-10 rounded-[3rem] text-white shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-all group-hover:scale-150" />
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">TK Islam <br/> Bina Shaliha</h3>
                <p className="text-blue-100/70 text-sm leading-relaxed mb-8 italic">Pondasi karakter Islami sejak usia dini dengan metode belajar yang menyenangkan.</p>
                <div className="inline-flex px-4 py-2 bg-yellow-400 text-blue-900 rounded-xl font-black text-[10px] uppercase tracking-widest">Kuota Terbatas</div>
              </div>

              <div className="group relative overflow-hidden bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full -mr-16 -mt-16 transition-all group-hover:scale-150" />
                <h3 className="text-2xl font-black text-blue-950 uppercase mb-4 tracking-tight">SD Islam <br/> Bina Shaliha</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 italic">Mencetak generasi Rabbani yang kompetitif dalam akademik dan adab sesuai Sunnah.</p>
                <div className="inline-flex px-4 py-2 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest">Akreditasi B</div>
              </div>
            </div>

            {/* LOKASI SEKRETARIAT */}
            <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 bg-yellow-100 rounded-[2rem] flex items-center justify-center text-3xl shadow-inner flex-shrink-0">📍</div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="font-black text-blue-950 text-xl uppercase mb-2 tracking-tight">Lokasi Sekretariat</h4>
                <p className="text-gray-500 font-medium">Jl. Rajawali No. 052, Beji, Kota Depok</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-2">Pelayanan: Senin - Sabtu (08.00 - 14.00 WIB)</p>
              </div>
              <a 
                href="https://maps.app.goo.gl/jowMfNWBXD1qW9Fs6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gray-50 hover:bg-yellow-400 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-gray-200"
              >
                Buka Peta
              </a>
            </div>
          </div>

          {/* KOLOM KANAN: KONTAK ADMIN (COMPACT GRID) */}
          <div className="lg:col-span-5">
            <div className="bg-yellow-400 p-8 rounded-[3.5rem] shadow-2xl sticky top-28 overflow-hidden border-4 border-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 blur-2xl" />
              
              <div className="relative z-10">
                <h2 className="text-4xl font-black text-blue-950 uppercase tracking-tighter leading-[0.9] mb-4">Hubungi Kami</h2>
                <p className="text-blue-900/60 font-bold text-xs mb-8 leading-relaxed italic">Klik unit untuk pendaftaran:</p>
                
                {/* GRID 2 KOLOM UNTUK HEMAT TEMPAT */}
                <div className="grid grid-cols-2 gap-3">
                  {adminWA.map((admin, i) => (
                    <button 
                      key={i}
                      onClick={() => handleWA(admin.nomer, admin.nama)}
                      className="group bg-white hover:bg-blue-950 p-4 rounded-[2rem] transition-all duration-500 shadow-md text-center flex flex-col items-center justify-center relative overflow-hidden"
                    >
                      <div className="w-10 h-10 mb-3 bg-emerald-50 rounded-xl flex items-center justify-center p-2 group-hover:bg-emerald-500 transition-all">
                        <img src="/wa.png" alt="WA" className="w-full h-full object-contain" />
                      </div>
                      
                      <p className={`text-[7px] font-black uppercase tracking-tighter mb-1 px-2 py-0.5 rounded-full ${admin.unit === 'TK' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'} group-hover:bg-white group-hover:text-blue-950 transition-colors`}>
                        {admin.role}
                      </p>
                      <p className="text-sm font-black text-blue-950 group-hover:text-white transition-colors">{admin.nama}</p>
                      
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-900 scale-x-0 group-hover:scale-x-100 transition-transform" />
                    </button>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <div className="inline-block p-3 bg-blue-950/5 rounded-2xl">
                    <p className="text-blue-900 font-black text-[9px] uppercase tracking-[0.3em]">SIT Bina Shaliha</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER MINI */}
      <section className="mt-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="h-1 w-20 bg-gray-100 mx-auto mb-10 rounded-full" />
          <h5 className="text-gray-400 font-bold italic text-xs md:text-sm uppercase tracking-widest leading-loose">
            "Keluarga Besar Bina Shaliha Menantikan Kehadiran Ananda <br/> Untuk Tumbuh Bersama Menjadi Generasi Unggul"
          </h5>
        </div>
      </section>

    </main>
  );
}