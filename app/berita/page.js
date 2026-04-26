'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BeritaPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FIX: URL sekarang menggunakan '/post' tanpa huruf 's' sesuai folder terbaru Anda
    fetch('/api/admin/post?kategori=berita')
      .then(res => res.json())
      .then(data => {
        if (data.success) setPosts(data.data);
      })
      .catch(err => console.error("Error fetching news:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-24 px-6">
      {/* Header Section - Modern Center Alignment */}
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 bg-emerald-50 rounded-full border border-emerald-100">
          <p className="text-emerald-700 font-black uppercase text-[10px] tracking-[0.2em]">News & Updates</p>
        </div>
        <h1 className="text-6xl md:text-7xl font-black text-green-950 uppercase tracking-tighter leading-none mb-6">
          Warta Bina Shaliha
        </h1>
        <p className="max-w-2xl mx-auto text-gray-500 font-medium text-lg leading-relaxed italic">
          Kabar terbaru, prestasi, dan dokumentasi kegiatan harian siswa-siswi TK & SD Islam Bina Shaliha.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {loading ? (
          /* Loading State yang Elegan */
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
            <p className="text-gray-400 font-black uppercase text-xs tracking-widest italic">Menyusun Warta...</p>
          </div>
        ) : posts.length === 0 ? (
          /* Empty State jika belum ada berita */
          <div className="text-center py-24 bg-gray-50 rounded-[4rem] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold italic uppercase tracking-widest text-sm">Belum ada warta yang diterbitkan hari ini.</p>
          </div>
        ) : (
          /* Grid Berita - 3 Kolom */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <Link key={post._id} href={`/berita/${post._id}`} className="group relative block h-full">
                <article className="bg-white rounded-[3rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(16,185,129,0.12)] transition-all duration-500 h-full flex flex-col border border-gray-100 hover:-translate-y-3">
                  
                  {/* Image Container dengan Aspect Ratio Modern */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={post.images?.[0] || '/logo-bs.png'} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={post.judul}
                    />
                    {/* Badge Unit Sekolah */}
                    <div className="absolute top-6 left-6">
                      <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] shadow-xl ${
                        post.unit === 'TK' ? 'bg-yellow-400 text-green-950' : 'bg-emerald-700 text-white'
                      }`}>
                        Unit {post.unit}
                      </span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-10 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <span>{new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span className="text-emerald-600">Terbaru</span>
                    </div>

                    <h3 className="text-2xl font-black text-green-950 mb-4 leading-[1.15] group-hover:text-emerald-600 transition-colors uppercase tracking-tight">
                      {post.judul}
                    </h3>
                    
                    <p className="text-gray-500 text-[15px] font-medium mb-10 line-clamp-3 leading-relaxed italic">
                      {post.deskripsiSingkat}
                    </p>

                    {/* Footer Card */}
                    <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-[11px] font-black text-green-950 uppercase tracking-widest">Baca Selengkapnya</span>
                      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}