'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function DetailBerita() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        // Ambil data dari API admin/post (pastikan URL benar)
        const res = await fetch('/api/admin/post');
        const data = await res.json();
        
        if (data.success) {
          // Cari data yang ID-nya cocok
          const detail = data.data.find(item => item._id === id);
          if (detail) {
            setPost(detail);
          }
        }
      } catch (err) {
        console.error("Gagal mengambil detail", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
    </div>
  );

  if (!post) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
      <h2 className="text-2xl font-black text-green-950 mb-4 uppercase">Warta Tidak Ditemukan</h2>
      <Link href="/berita" className="text-emerald-600 font-bold uppercase text-xs tracking-widest border-b-2 border-emerald-600"> Kembali </Link>
    </div>
  );

  return (
    <main className="min-h-screen bg-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section - Center Aligned */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Link href="/berita" className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-600 transition-colors mb-10 group">
            <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Warta Bina Shaliha</span>
          </Link>

          <div className="flex items-center justify-center gap-4 mb-6">
            <span className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
              post.unit === 'TK' ? 'bg-yellow-400 text-green-950' : 'bg-emerald-700 text-white'
            }`}>
              Unit {post.unit}
            </span>
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              {new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-green-950 uppercase tracking-tighter leading-[1.1] mb-12">
            {post.judul}
          </h1>
        </div>

        {/* --- Bagian FOTO UTAMA yang Diperbaiki --- */}
        <div className="flex justify-center mb-20">
          <div className="inline-block bg-white p-3 md:p-6 rounded-[2rem] md:rounded-[4rem] shadow-[0_25px_70px_rgba(0,0,0,0.07)] border border-gray-100">
            {/* Trik CSS: 'w-auto' dan 'h-auto' membuat kontainer mengikuti ukuran asli foto.
              'max-w-full' memastikan foto tidak meluber keluar layar HP.
              'rounded' dipasang langsung di tag <img> agar sudut foto ikut melengkung rapi.
            */}
            <img 
              src={post.images?.[0] || '/logo-bs.png'} 
              className="w-auto h-auto max-w-full max-h-[80vh] rounded-[1.5rem] md:rounded-[3.5rem] object-contain block mx-auto"
              alt={post.judul} 
            />
          </div>
        </div>

        {/* Content Section - Narrower for Readability */}
        <div className="max-w-3xl mx-auto mb-24">
          <div className="bg-emerald-50/50 border-l-4 border-emerald-500 p-8 mb-12 rounded-r-3xl shadow-inner">
            <p className="text-xl font-bold text-emerald-800 italic leading-relaxed">
              "{post.deskripsiSingkat}"
            </p>
          </div>

          {/* Menjaga Enter/Spasi dengan whitespace-pre-line */}
          <div className="text-gray-700 leading-loose text-lg whitespace-pre-line font-medium prose prose-emerald prose-lg max-w-none">
            {post.isiLengkap}
          </div>
        </div>

        {/* --- MULTI-FOTO GALERI SECTION --- */}
        {post.images && post.images.length > 1 && (
          <div className="pt-20 border-t-2 border-dashed border-gray-100">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 mb-4 bg-gray-100 rounded-full">
                <p className="text-gray-500 font-black uppercase text-[10px] tracking-[0.2em]">Dokumentasi Tambahan</p>
              </div>
              <h3 className="text-3xl font-black text-green-950 uppercase tracking-tighter italic">Galeri Kegiatan</h3>
              <p className="text-gray-400 font-medium mt-2">Klik foto untuk melihat ukuran penuh</p>
            </div>
            
            {/* Grid Galeri yang Responsif: 1 kolom di HP, 2 di Tablet, 3 di Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {post.images.slice(1).map((img, index) => (
                <a key={index} href={img} target="_blank" rel="noopener noreferrer" className="group block relative">
                  <article className="bg-white p-4 rounded-[2.5rem] shadow-lg border border-gray-50 hover:shadow-2xl hover:border-emerald-100 transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-100 relative">
                      <img 
                        src={img} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        alt={`Dokumentasi ${index + 1}`}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white font-black text-xs uppercase tracking-widest bg-emerald-600 px-4 py-2 rounded-full shadow-lg">Lihat Foto</span>
                      </div>
                    </div>
                  </article>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}