"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PPDB() {
  const [formData, setFormData] = useState({
    namaOrtu: '',
    namaAnak: '',
    unit: 'TK',
    kelasSD: 'Kelas 1',
    rencanaKunjungan: 'Hanya Tanya-tanya',
    sumberInfo: 'Instagram',
    adminTujuan: '6285883027847' // Default Bu Rika
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

  // Sanitasi Input (Mencegah XSS & Karakter Aneh)
  const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    return input
      .replace(/<[^>]*>?/gm, '') // Hapus tag HTML
      .replace(/[&$%+;=?@#|]/g, '') // Hapus karakter berbahaya
      .trimStart(); // Hanya trim depan agar masih bisa spasi di tengah
  };

  // Cek Cooldown dari LocalStorage (Anti-Spam)
  useEffect(() => {
    const lastSubmitTime = localStorage.getItem('ppdb_last_submit');
    if (lastSubmitTime) {
      const timePassed = Date.now() - parseInt(lastSubmitTime);
      const cooldownMs = 60000; // 1 Menit Cooldown
      if (timePassed < cooldownMs) {
        setIsSubmitting(true);
        setCooldownTime(Math.ceil((cooldownMs - timePassed) / 1000));
      }
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isSubmitting && cooldownTime > 0) {
      interval = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsSubmitting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSubmitting, cooldownTime]);

  const adminTK = [
    { nama: "Bu Rika (Admin TK)", nomer: "6285883027847" },
    { nama: "Bu Rodiah (Pendaftaran TK)", nomer: "6285770654038" }
  ];
  
  const adminSD = [
    { nama: "Bu Maunah (Admin SD)", nomer: "6281381352127" },
    { nama: "Bu Ira (Pendaftaran SD)", nomer: "6287886530890" }
  ];


  const alurPendaftaran = [
    { step: "01", title: "Konsultasi", desc: "Hubungi Admin via WhatsApp untuk informasi awal dan ketersediaan kuota.", icon: "📱" },
    { step: "02", title: "Registrasi", desc: "Melakukan proses pendaftaran awal dan pengambilan formulir.", icon: "📝" },
    { step: "03", title: "Pengisian Data", desc: "Melengkapi berkas administrasi dan data diri calon peserta didik.", icon: "📂" },
    { step: "04", title: "Observasi", desc: "Pertemuan silaturahmi dan pemetaan potensi serta bakat ananda.", icon: "🤝" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Terapkan sanitasi pada field nama
    const cleanValue = (name === 'namaOrtu' || name === 'namaAnak') 
      ? sanitizeInput(value) 
      : value;

    setFormData(prev => {
      const newData = { ...prev, [name]: cleanValue };
      // Jika ubah unit, otomatis ubah default admin tujuan sesuai unit
      if (name === 'unit') {
        newData.adminTujuan = value === 'TK' ? adminTK[0].nomer : adminSD[0].nomer;
      }
      return newData;
    });
  };

  const handleKirimWA = (e) => {
    e.preventDefault();

    if (isSubmitting) {
      alert(`Anti-Spam Aktif: Tunggu ${cooldownTime} detik sebelum mengirim ulang.`);
      return;
    }

    const { namaOrtu, namaAnak, unit, kelasSD, rencanaKunjungan, sumberInfo, adminTujuan } = formData;
    
    if (namaOrtu.trim() === '' || namaAnak.trim() === '') {
      alert("Nama Orang Tua dan Nama Anak tidak boleh kosong.");
      return;
    }
    
    // Cari nama admin berdasarkan nomer
    let namaAdmin = "";
    const allAdmins = [...adminTK, ...adminSD];
    const selectedAdmin = allAdmins.find(a => a.nomer === adminTujuan);
    if (selectedAdmin) {
      namaAdmin = selectedAdmin.nama.split(" ")[0] + " " + selectedAdmin.nama.split(" ")[1]; // Ambil nama depan (cth: Bu Rika)
    }

    let teksKelas = unit === 'SD' ? `\n*Pendaftaran Kelas:* ${kelasSD}` : '';

    const pesan = `Assalamu'alaikum ${namaAdmin},\n\nSaya ingin menanyakan informasi Sistem Penerimaan Murid Baru 2026-2027 di Sekolah Islam Bina Shaliha.\n\nBerikut adalah data kami:\n*Nama Orang Tua:* ${namaOrtu.trim()}\n*Nama Ananda:* ${namaAnak.trim()}\n*Unit Pilihan:* ${unit}${teksKelas}\n*Rencana Berkunjung:* ${rencanaKunjungan}\n*Mengetahui Info Bina Shaliha dari:* ${sumberInfo}\n\nMohon informasi lebih lanjut. Terima kasih.`;
    
    window.open(`https://wa.me/${adminTujuan}?text=${encodeURIComponent(pesan)}`, '_blank');

    // Set cooldown rate limiter
    localStorage.setItem('ppdb_last_submit', Date.now().toString());
    setIsSubmitting(true);
    setCooldownTime(60);
  };

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
    <main className="min-h-screen bg-[#F8FAFC] pb-24 selection:bg-yellow-400 selection:text-blue-900 overflow-hidden relative">
      
      {/* SEKSI 1: HERO */}
      <section className="relative pt-40 pb-32 bg-[#002B5B] text-white px-6 rounded-b-[4rem] md:rounded-b-[6rem] shadow-2xl overflow-hidden border-b-8 border-yellow-400">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[120px] -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px] -ml-20 -mb-20" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full mb-8 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-yellow-400">Tahun Ajaran 2026/2027</p>
          </div>
          <h1 className="text-4xl md:text-[6.5rem] font-black mb-8 leading-[1.1] tracking-tighter uppercase">
            Sistem Penerimaan <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 italic font-serif">Murid Baru</span>
          </h1>
          <p className="text-xl md:text-3xl font-medium text-blue-100 max-w-3xl mx-auto leading-relaxed border-t border-white/10 pt-8 mt-4 italic text-center">
            "Tumbuh Bersama Dalam Bingkai Islam Menuju Generasi Unggul."
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* KOLOM KIRI: ALUR & UNIT */}
          <div className="lg:col-span-7 space-y-10">
            {/* ALUR PENDAFTARAN */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100"
            >
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 text-left">
                <div className="text-left">
                  <h2 className="text-4xl font-black text-blue-950 uppercase tracking-tighter leading-none mb-4 text-left">Langkah <br/> <span className="text-yellow-500 italic font-serif text-left">Pendaftaran</span></h2>
                  <p className="text-gray-400 font-medium text-sm uppercase tracking-widest text-left">Prosedur bergabung bersama kami</p>
                </div>
                <div className="h-0.5 flex-grow bg-gray-50 mx-6 mb-2 hidden md:block" />
              </div>

              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {alurPendaftaran.map((item, i) => (
                  <motion.div 
                    key={i} 
                    variants={fadeInUp}
                    className="group flex items-start gap-6 p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-yellow-400 hover:bg-white transition-all duration-500 hover:shadow-xl"
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center text-3xl group-hover:bg-blue-900 group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-yellow-600 font-black text-[10px] uppercase tracking-widest mb-1 text-left">Langkah {item.step}</p>
                      <h4 className="font-black text-blue-950 text-xl mb-2 text-left">{item.title}</h4>
                      <p className="text-gray-500 text-xs font-medium leading-relaxed text-left">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* UNIT PENDIDIKAN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <motion.div 
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden bg-blue-900 p-10 rounded-[3rem] text-white shadow-2xl text-left"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-all group-hover:scale-150" />
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tight text-left">TK Islam <br/> Bina Shaliha</h3>
                <p className="text-blue-100/70 text-sm leading-relaxed mb-8 italic text-left">Pondasi karakter Islami sejak usia dini dengan metode belajar yang menyenangkan.</p>
                <div className="inline-flex px-4 py-2 bg-yellow-400 text-blue-900 rounded-xl font-black text-[10px] uppercase tracking-widest">Kuota Terbatas</div>
              </motion.div>

              <motion.div 
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl text-left"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full -mr-16 -mt-16 transition-all group-hover:scale-150" />
                <h3 className="text-2xl font-black text-blue-950 uppercase mb-4 tracking-tight text-left">SD Islam <br/> Bina Shaliha</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 italic text-left">Mencetak generasi Rabbani yang kompetitif dalam akademik dan adab sesuai Sunnah.</p>
                <div className="inline-flex px-4 py-2 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest">Akreditasi B</div>
              </motion.div>
            </div>

            {/* LOKASI SEKRETARIAT */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-8 text-left"
            >
              <div className="w-20 h-20 bg-yellow-100 rounded-[2rem] flex items-center justify-center text-3xl shadow-inner flex-shrink-0">📍</div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="font-black text-blue-950 text-xl uppercase mb-2 tracking-tight text-left">Lokasi Sekretariat</h4>
                <p className="text-gray-500 font-medium text-left">Jl. Rajawali No. 052, Beji, Kota Depok</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-2 text-left">Pelayanan: Senin - Sabtu (08.00 - 14.00 WIB)</p>
              </div>
              <a 
                href="https://maps.app.goo.gl/jowMfNWBXD1qW9Fs6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gray-50 hover:bg-yellow-400 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-gray-200 text-center"
              >
                Buka Peta
              </a>
            </motion.div>
          </div>

          {/* KOLOM KANAN: FORMULIR WA */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-yellow-400 p-8 md:p-10 rounded-[3.5rem] shadow-2xl sticky top-10 border-4 border-white"
            >
              <div className="text-left mb-8">
                <h2 className="text-3xl font-black text-blue-950 uppercase tracking-tighter leading-[0.9] mb-2">Form Pendaftaran</h2>
                <p className="text-blue-900/80 font-bold text-xs leading-relaxed italic">Isi data berikut untuk langsung terhubung dengan Admin kami.</p>
              </div>
              
              <form onSubmit={handleKirimWA} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-blue-950 uppercase tracking-widest mb-1 ml-2">Nama Orang Tua</label>
                  <input type="text" name="namaOrtu" value={formData.namaOrtu} onChange={handleInputChange} required className="w-full bg-white border-2 border-white focus:border-blue-900 px-5 py-3 rounded-2xl text-sm font-medium outline-none transition-colors" placeholder="Masukkan nama Anda" />
                </div>
                
                <div>
                  <label className="block text-xs font-black text-blue-950 uppercase tracking-widest mb-1 ml-2">Nama Ananda</label>
                  <input type="text" name="namaAnak" value={formData.namaAnak} onChange={handleInputChange} required className="w-full bg-white border-2 border-white focus:border-blue-900 px-5 py-3 rounded-2xl text-sm font-medium outline-none transition-colors" placeholder="Masukkan nama anak" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-blue-950 uppercase tracking-widest mb-1 ml-2">Unit</label>
                    <select name="unit" value={formData.unit} onChange={handleInputChange} className="w-full bg-white border-2 border-white focus:border-blue-900 px-4 py-3 rounded-2xl text-sm font-medium outline-none cursor-pointer">
                      <option value="TK">TK Islam</option>
                      <option value="SD">SD Islam</option>
                    </select>
                  </div>
                  
                  {formData.unit === 'SD' && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                      <label className="block text-xs font-black text-blue-950 uppercase tracking-widest mb-1 ml-2">Kelas (SD)</label>
                      <select name="kelasSD" value={formData.kelasSD} onChange={handleInputChange} className="w-full bg-white border-2 border-white focus:border-blue-900 px-4 py-3 rounded-2xl text-sm font-medium outline-none cursor-pointer">
                        <option value="Kelas 1">Kelas 1</option>
                        <option value="Kelas 2">Kelas 2</option>
                        <option value="Kelas 3">Kelas 3</option>
                        <option value="Kelas 4">Kelas 4</option>
                        <option value="Kelas 5">Kelas 5</option>
                        <option value="Kelas 6">Kelas 6</option>
                      </select>
                    </motion.div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black text-blue-950 uppercase tracking-widest mb-1 ml-2">Rencana Berkunjung</label>
                  <select name="rencanaKunjungan" value={formData.rencanaKunjungan} onChange={handleInputChange} className="w-full bg-white border-2 border-white focus:border-blue-900 px-5 py-3 rounded-2xl text-sm font-medium outline-none cursor-pointer">
                    <option value="Besok">Besok</option>
                    <option value="Minggu Depan">Minggu Depan</option>
                    <option value="Hanya Tanya-tanya">Hanya Tanya-tanya (Belum ada rencana)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-blue-950 uppercase tracking-widest mb-1 ml-2">Tahu Info Dari Mana?</label>
                  <select name="sumberInfo" value={formData.sumberInfo} onChange={handleInputChange} className="w-full bg-white border-2 border-white focus:border-blue-900 px-5 py-3 rounded-2xl text-sm font-medium outline-none cursor-pointer">
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Brosur / Spanduk">Brosur / Spanduk</option>
                    <option value="Keluarga / Teman">Keluarga / Teman</option>
                    <option value="Pencarian Google">Pencarian Google</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-blue-950 uppercase tracking-widest mb-1 ml-2">Pilih Admin Tujuan</label>
                  <select name="adminTujuan" value={formData.adminTujuan} onChange={handleInputChange} className="w-full bg-white border-2 border-white focus:border-blue-900 px-5 py-3 rounded-2xl text-sm font-bold outline-none cursor-pointer text-blue-900">
                    {formData.unit === 'TK' 
                      ? adminTK.map((adm, i) => <option key={i} value={adm.nomer}>{adm.nama}</option>)
                      : adminSD.map((adm, i) => <option key={i} value={adm.nomer}>{adm.nama}</option>)
                    }
                  </select>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full font-black text-lg py-4 rounded-2xl transition-colors shadow-lg flex items-center justify-center gap-3 ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed text-gray-200' 
                        : 'bg-blue-950 hover:bg-blue-900 text-white'
                    }`}
                  >
                    {!isSubmitting && <img src="/wa.png" alt="WA" className="w-6 h-6 brightness-0 invert" />}
                    {isSubmitting ? `TUNGGU ${cooldownTime} DETIK...` : 'KIRIM KE WHATSAPP'}
                  </button>
                </div>
              </form>

            </motion.div>
          </div>

        </div>
      </div>

      {/* FOOTER MINI */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-32 px-6 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="h-1 w-20 bg-gray-100 mx-auto mb-10 rounded-full" />
          <h5 className="text-gray-400 font-bold italic text-xs md:text-sm uppercase tracking-widest leading-loose text-center">
            "Keluarga Besar Bina Shaliha Menantikan Kehadiran Ananda <br/> Untuk Tumbuh Bersama Menjadi Generasi Unggul"
          </h5>
        </div>
      </motion.section>

    </main>
  );
}