'use client';
import { useEffect, useState } from 'react';

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

  return (
    /* 1. Hapus semua pt/mt di sini, biarkan bersih */
    <main className="min-h-screen bg-white pb-24"> 
      
      {/* 2. Gunakan margin negatif (-mt) untuk memaksa section hijau naik ke atas navbar */}
      <section className="relative -mt-[100px] pt-[150px] pb-20 bg-green-950 text-white px-4 text-center overflow-hidden">
        
        {/* Dekorasi tetap sama */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 mb-6 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
            <p className="text-yellow-400 font-black tracking-[0.3em] uppercase text-[9px] md:text-xs">Manajemen Profesional</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">Struktur <span className="text-yellow-500 italic">Organisasi</span></h1>
          <p className="text-green-200/70 font-medium max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            "Sinergi tim pendidik Sekolah Islam Bina Shaliha dalam mencetak generasi Rabbani yang unggul dan berakhlak mulia."
          </p>
        </div>
      </section>

      {/* Sisa kode tetap sama di bawah ini */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        {loading ? (
           <div className="text-center p-20 bg-white rounded-[3rem] shadow-xl border border-gray-100">
             <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-100 border-t-emerald-600 mx-auto mb-6"></div>
             <p className="text-gray-400 font-black uppercase text-xs tracking-[0.2em]">Menyinkronkan Data...</p>
           </div>
        ) : (
          <>
            <div className="flex justify-center mb-20">
              {yayasanList.length > 0 ? yayasanList.map((y, i) => (
                <div key={i} className="bg-white p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 w-full max-w-xs text-center hover:scale-105 transition-all duration-500 group">
                  <div className="relative aspect-square w-full mb-6 rounded-[1.5rem] overflow-hidden shadow-lg border-4 border-white group-hover:border-yellow-400 transition-all duration-500">
                    <img 
                      src={y.foto || '/logo-bs.png'} 
                      alt={y.nama} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-green-950 leading-tight mb-2">
                    {y.nama}{y.gelar ? `, ${y.gelar}` : ''}
                  </h3>
                  <span className="bg-yellow-400 text-green-950 inline-block px-5 py-1 rounded-full font-black text-[10px] uppercase tracking-[0.2em]">
                    {y.bidangGuru}
                  </span>
                </div>
              )) : (
                <div className="bg-white p-8 rounded-[2.5rem] opacity-50 border-2 border-dashed border-gray-200">
                   <p className="text-gray-400 font-bold uppercase text-[10px]">Data Yayasan Kosong</p>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center mb-12">
               <div className="w-1 h-12 bg-gradient-to-b from-yellow-400 to-green-800"></div>
               <div className="w-full max-w-4xl h-[2px] bg-gray-100"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto">
              {pimpinanSekolah.length > 0 ? pimpinanSekolah.map((staff, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] shadow-xl border-l-[8px] border-green-800 flex items-center gap-6 hover:shadow-2xl hover:-translate-y-1 transition-all group">
                  <div className="relative w-28 h-28 md:w-32 md:h-32 shrink-0 rounded-[1.5rem] overflow-hidden border-2 border-gray-50 shadow-md">
                    <img src={staff.foto || '/logo-bs.png'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={staff.nama} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg md:text-xl font-black text-green-950 uppercase tracking-tight leading-tight mb-2">
                      {staff.nama}{staff.gelar ? `, ${staff.gelar}` : ''}
                    </h4>
                    <p className="text-yellow-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">{staff.bidangGuru}</p>
                    {staff.universitas && (
                      <div className="inline-block bg-gray-50 px-3 py-1 rounded-lg">
                         <p className="text-gray-400 text-[9px] font-bold italic tracking-wide uppercase">Lulusan: {staff.universitas}</p>
                      </div>
                    )}
                  </div>
                </div>
              )) : (
                <p className="col-span-2 text-center text-gray-300 font-bold uppercase text-[10px] tracking-widest italic">Data Pimpinan Belum Diupdate</p>
              )}
            </div>

            <div className="text-center mb-16">
              <div className="inline-block px-8 py-2 bg-green-50 text-green-800 rounded-full font-black uppercase text-[10px] tracking-[0.4em] border border-green-100">Dewan Guru & Staff</div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
                {staffLainnya.map((staff, i) => (
                  <div key={i} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all text-center group">
                    <div className="relative aspect-[4/5] w-full mx-auto mb-4 rounded-2xl overflow-hidden shadow-md group-hover:shadow-emerald-200 transition-all">
                      <img src={staff.foto || '/logo-bs.png'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={staff.nama} />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <h5 className="font-black text-green-950 text-[11px] uppercase leading-tight min-h-[30px] flex items-center justify-center px-1">
                      {staff.nama}{staff.gelar ? `, ${staff.gelar}` : ''}
                    </h5>
                    <div className="w-8 h-[2px] bg-yellow-400 mx-auto my-3 group-hover:w-16 transition-all duration-500"></div>
                    <p className="text-emerald-600 text-[9px] font-black uppercase tracking-tighter">{staff.bidangGuru}</p>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>

      <div className="max-w-2xl mx-auto mt-40 text-center px-6">
        <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
           <div className="w-12 h-1 bg-yellow-400 mx-auto mb-8 rounded-full"></div>
           <p className="text-gray-500 font-bold italic text-xs md:text-sm leading-relaxed uppercase tracking-widest px-4">
             "Kekuatan tim terletak pada setiap anggota, kekuatan setiap anggota adalah tim."
           </p>
           <p className="text-green-900/40 font-black text-[10px] mt-8 tracking-[0.5em] uppercase">Sekolah Islam BINA SHALIHA</p>
        </div>
      </div>
    </main>
  );
}