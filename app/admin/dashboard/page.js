"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ guru: 0, berita: 0, galeri: 0, faq: 0, testimoni: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const mainMenus = [
    { 
      title: "Profil Guru & Staff", 
      desc: "Kelola data guru, pimpinan, yayasan, gelar, dan pendidikan", 
      icon: "👨‍🏫", 
      link: "/admin/dashboard/guru",
      color: "bg-emerald-600"
    },
    { 
      title: "Galeri & Berita", 
      desc: "Update foto kegiatan sekolah dan informasi berita terkini", 
      icon: "📸", 
      link: "/admin/dashboard/galeri",
      color: "bg-blue-600"
    },
    { 
      title: "Kelola FAQ", 
      desc: "Atur pertanyaan dan jawaban yang sering diajukan di Beranda", 
      icon: "❓", 
      link: "/admin/dashboard/faq",
      color: "bg-amber-500"
    },
    { 
      title: "Testimoni", 
      desc: "Kelola pesan kesan dari wali murid yang tampil di Beranda", 
      icon: "💬", 
      link: "/admin/dashboard/testimoni",
      color: "bg-pink-500"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header dengan Logout Terpisah */}
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-green-950 uppercase tracking-tighter leading-none">
              Panel Kendali <br />
              <span className="text-emerald-600 italic">Bina Shaliha</span>
            </h1>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.4em] mt-4">
              Administrator Dashboard Center 👋
            </p>
          </div>
          
          <Link href="/">
            <div className="group flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-md border border-red-50 hover:bg-red-600 transition-all duration-300 cursor-pointer">
              <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-xl group-hover:bg-white/20 group-hover:text-white transition-colors">
                🚪
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 group-hover:text-white/70">Keluar Sesi</p>
                <p className="text-sm font-black uppercase text-red-600 group-hover:text-white">Log Out</p>
              </div>
            </div>
          </Link>
        </header>

        {/* Grid Menu Utama (3 Kolom Besar) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mainMenus.map((menu, i) => (
            <Link key={i} href={menu.link}>
              <div className="group bg-white p-10 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-100 active:scale-95 cursor-pointer h-full flex flex-col justify-between relative overflow-hidden">
                {/* Decorative background icon */}
                <div className="absolute -right-6 -bottom-6 text-9xl opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                  {menu.icon}
                </div>

                <div className="relative z-10">
                  <div className={`w-20 h-20 ${menu.color} text-white rounded-[2rem] flex items-center justify-center text-4xl mb-10 shadow-2xl shadow-inherit group-hover:rotate-12 transition-transform duration-500`}>
                    {menu.icon}
                  </div>
                  <h3 className="text-3xl font-black text-green-950 uppercase mb-4 tracking-tight">
                    {menu.title}
                  </h3>
                  <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-xs">
                    {menu.desc}
                  </p>
                </div>
                
                <div className="mt-12 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-600 relative z-10">
                  Kelola Konten 
                  <span className="group-hover:translate-x-3 transition-transform duration-300">➜</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Statistik / Footer Panel */}
        <div className="bg-green-950 rounded-[3.5rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 flex flex-col items-center gap-10">
            <div className="text-center w-full">
              <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Statistik Data <span className="text-yellow-400">Sistem</span></h2>
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                <span className={`w-2 h-2 rounded-full ${loading ? 'bg-amber-400' : 'bg-green-400 animate-pulse'}`} />
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300">
                  {loading ? 'Sinkronisasi Data...' : `Live Update: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-12 w-full pt-8 border-t border-white/10">
              <div className="text-center">
                <p className="text-5xl font-black text-yellow-400 tracking-tighter">{loading ? '-' : stats.guru}</p>
                <p className="text-[10px] uppercase font-black tracking-[0.3em] text-emerald-300 mt-2">Data Guru</p>
              </div>
              <div className="text-center md:border-l border-white/10">
                <p className="text-5xl font-black text-yellow-400 tracking-tighter">{loading ? '-' : stats.galeri}</p>
                <p className="text-[10px] uppercase font-black tracking-[0.3em] text-emerald-300 mt-2">Foto Galeri</p>
              </div>
              <div className="text-center md:border-l border-white/10">
                <p className="text-5xl font-black text-yellow-400 tracking-tighter">{loading ? '-' : stats.berita}</p>
                <p className="text-[10px] uppercase font-black tracking-[0.3em] text-emerald-300 mt-2">Artikel Berita</p>
              </div>
              <div className="text-center border-l border-white/10">
                <p className="text-5xl font-black text-yellow-400 tracking-tighter">{loading ? '-' : stats.faq}</p>
                <p className="text-[10px] uppercase font-black tracking-[0.3em] text-emerald-300 mt-2">Total FAQ</p>
              </div>
              <div className="text-center border-l border-white/10 col-span-2 md:col-span-1">
                <p className="text-5xl font-black text-yellow-400 tracking-tighter">{loading ? '-' : stats.testimoni}</p>
                <p className="text-[10px] uppercase font-black tracking-[0.3em] text-emerald-300 mt-2">Testimoni</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-12 text-gray-400 text-[10px] font-bold uppercase tracking-[0.5em]">
          &copy; 2026 SIT Bina Shaliha Dashboard System
        </p>
      </div>
    </div>
  );
}