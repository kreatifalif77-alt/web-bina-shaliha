"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Sembunyikan navbar saat scroll ke bawah, tampilkan saat scroll ke atas
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
        setIsOpen(false); // tutup menu mobile jika sedang terbuka
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed w-full z-50 bg-white text-green-950 shadow-md border-b-2 border-green-900 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full lg:translate-y-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 md:w-14 md:h-14 transition-transform group-hover:scale-105">
              <Image 
                src="/logo-bs.png" 
                alt="Logo SIT Bina Shaliha" 
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-extrabold leading-none text-green-950 uppercase tracking-tighter">Bina Shaliha</span>
              <span className="text-[10px] md:text-xs font-bold text-yellow-600 tracking-widest uppercase">Sekolah Islam - Depok</span>
            </div>
          </Link>
          
          {/* Menu Desktop */}
          <div className="hidden lg:block">
            <div className="ml-4 flex items-center space-x-2">
              <Link href="/" className="hover:text-yellow-600 px-2 py-2 font-bold transition-all text-sm uppercase">Beranda</Link>
              <Link href="/profil" className="hover:text-yellow-600 px-2 py-2 font-bold transition-all text-sm uppercase">Profil</Link>
              <Link href="/struktur" className="hover:text-yellow-600 px-2 py-2 font-bold transition-all text-sm uppercase text-green-700">Struktur & Guru</Link>
              
              {/* MENU BARU DARI BROSUR */}
              <Link href="/galeri" className="hover:text-yellow-600 px-2 py-2 font-bold transition-all text-sm uppercase">Galeri</Link>
              <Link href="/berita" className="hover:text-yellow-600 px-2 py-2 font-bold transition-all text-sm uppercase">Berita</Link>
              
              <Link href="/unit-tk" className="hover:text-yellow-600 px-2 py-2 font-bold transition-all text-sm uppercase">TK</Link>
              <Link href="/unit-sd" className="hover:text-yellow-600 px-2 py-2 font-bold transition-all text-sm uppercase">SD</Link>
              
              <Link href="/ppdb" className="bg-yellow-500 hover:bg-green-900 hover:text-white px-5 py-2 rounded-full font-black transition-all shadow-md ml-2 text-sm uppercase">SPMB 2026</Link>
              
              {/* TOMBOL LOGIN ADMIN KHUSUS */}
              <Link href="/admin/login" className="border-2 border-green-900 text-green-900 hover:bg-green-900 hover:text-white px-4 py-2 rounded-xl font-black transition-all text-[10px] uppercase ml-4">
                Admin
              </Link>
            </div>
          </div>

          {/* Tombol Mobile */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md text-green-950 focus:outline-none">
              <span className="text-3xl font-bold">{isOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl pb-6">
          <div className="px-4 pt-4 space-y-1">
            <Link href="/" className="block py-3 border-b font-bold text-green-950 uppercase text-xs" onClick={() => setIsOpen(false)}>Beranda</Link>
            <Link href="/profil" className="block py-3 border-b font-bold text-green-950 uppercase text-xs" onClick={() => setIsOpen(false)}>Profil</Link>
            <Link href="/struktur" className="block py-3 border-b font-bold text-green-700 uppercase text-xs" onClick={() => setIsOpen(false)}>Struktur & Guru</Link>
            <Link href="/galeri" className="block py-3 border-b font-bold text-green-950 uppercase text-xs" onClick={() => setIsOpen(false)}>Galeri Kegiatan</Link>
            <Link href="/berita" className="block py-3 border-b font-bold text-green-950 uppercase text-xs" onClick={() => setIsOpen(false)}>Berita Terkini</Link>
            <Link href="/unit-tk" className="block py-3 border-b font-bold text-green-950 uppercase text-xs" onClick={() => setIsOpen(false)}>Unit TK</Link>
            <Link href="/unit-sd" className="block py-3 border-b font-bold text-green-950 uppercase text-xs" onClick={() => setIsOpen(false)}>Unit SD</Link>
            <Link href="/ppdb" className="block py-4 text-center bg-yellow-500 rounded-xl font-extrabold text-green-950 mt-4 uppercase text-sm" onClick={() => setIsOpen(false)}>SPMB 2026</Link>
            <Link href="/admin/login" className="block py-3 text-center text-gray-400 font-bold text-[10px] uppercase mt-4" onClick={() => setIsOpen(false)}>Login Admin</Link>
          </div>
        </div>
      )}
    </nav>
  );
}