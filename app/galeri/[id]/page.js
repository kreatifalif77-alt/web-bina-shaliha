'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function DetailGaleri() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        // Samakan dengan cara Berita mengambil data
        const res = await fetch('/api/admin/post');
        const data = await res.json();
        
        if (data.success) {
          const detail = data.data.find(item => item._id === id);
          if (detail) {
            setPost(detail);
          }
        }
      } catch (err) {
        console.error("Gagal mengambil detail galeri", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!post) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
      <h2 className="text-3xl font-black text-green-950 mb-4 uppercase tracking-tighter">Album Tidak Ditemukan</h2>
      <Link href="/galeri" className="px-8 py-3 bg-green-950 text-white rounded-xl font-bold uppercase text-xs tracking-widest"> Kembali ke Galeri </Link>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FDFDFD] pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER: STYLE MAJALAH MODERN --- */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <Link href="/galeri" className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-600 transition-colors mb-8 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Kembali ke Koleksi Galeri</span>
          </Link>

          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="bg-yellow-400 text-green-950 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
              Unit {post.unit}
            </span>
            <div className="h-px w-12 bg-gray-200"></div>
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              {new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-green-950 uppercase tracking-[-0.05em] leading-[0.85] mb-10">
            {post.judul}
          </h1>
        </div>

        {/* --- GRID FOTO UTAMA & DESKRIPSI (Layout Kece) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          
          {/* Foto Utama Besar (8 Kolom) */}
          <div className="lg:col-span-8">
            <div className="bg-white p-4 rounded-[3.5rem] shadow-2xl border border-gray-100 group overflow-hidden">
                <img 
                  src={post.images?.[0] || '/logo-bs.png'} 
                  className="w-full h-auto rounded-[2.5rem] object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt={post.judul} 
                />
            </div>
          </div>

          {/* Deskripsi Singkat & Isi (4 Kolom) */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="bg-green-950 p-10 md:p-14 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <span className="text-6xl font-black italic">INFO</span>
                </div>
                
                <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-yellow-400">Tentang Kegiatan</h3>
                
                {/* Deskripsi Singkat */}
                {post.deskripsiSingkat && (
                    <p className="text-lg font-bold italic text-green-100 mb-8 leading-relaxed border-l-4 border-yellow-400 pl-6">
                        "{post.deskripsiSingkat}"
                    </p>
                )}

                {/* Isi Lengkap */}
                <div className="text-green-50/80 leading-loose text-sm font-medium whitespace-pre-line">
                    {post.isiLengkap || "Dokumentasi momen berharga di lingkungan Bina Shaliha."}
                </div>
            </div>
          </div>
        </div>

        {/* --- MULTI-FOTO GALERI (Masonry Style) --- */}
        {post.images && post.images.length > 1 && (
          <div className="pt-20 border-t border-gray-100">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                    <h3 className="text-4xl font-black text-green-950 uppercase tracking-tighter italic">Koleksi Foto</h3>
                    <p className="text-gray-400 font-medium mt-2">Melihat lebih dekat setiap momen keceriaan.</p>
                </div>
                <div className="hidden md:block h-px flex-1 bg-gray-100 mx-10 mb-4"></div>
                <span className="text-yellow-500 font-black text-xs uppercase tracking-widest bg-yellow-50 px-6 py-2 rounded-full border border-yellow-100">
                    {post.images.length} TOTAL FOTO
                </span>
            </div>
            
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {post.images.slice(1).map((img, index) => (
                <div key={index} className="break-inside-avoid group relative rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img 
                    src={img} 
                    className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt={`Dokumentasi ${index + 1}`}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="bg-white text-green-950 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl">Zoom In</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FOOTER BUTTON */}
        <div className="mt-24 text-center">
            <Link href="/" className="inline-block bg-white text-green-950 border-2 border-green-950 px-16 py-5 rounded-2xl font-black hover:bg-green-950 hover:text-white transition-all shadow-xl hover:-translate-y-2 uppercase text-sm tracking-widest">
                ← Kembali ke Beranda
            </Link>
        </div>

      </div>
    </main>
  );
}