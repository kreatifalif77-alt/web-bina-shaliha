'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function GaleriPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/post?kategori=galeri')
      .then(res => res.json())
      .then(data => {
        if (data.success) setPosts(data.data);
      })
      .catch(err => console.error("Error fetching gallery:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-24 px-6">
      {/* Header Galeri */}
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 bg-yellow-50 rounded-full border border-yellow-100">
          <p className="text-yellow-700 font-black uppercase text-[10px] tracking-[0.2em]">Visual Journey</p>
        </div>
        <h1 className="text-6xl md:text-7xl font-black text-green-950 uppercase tracking-tighter leading-none mb-6">
          Galeri Kegiatan
        </h1>
        <p className="max-w-2xl mx-auto text-gray-500 font-medium text-lg leading-relaxed italic">
          Dokumentasi keceriaan dan momen berharga putra-putri kami di lingkungan sekolah.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-yellow-100 border-t-yellow-500 rounded-full animate-spin"></div>
            <p className="text-gray-400 font-black uppercase text-xs tracking-widest italic">Membuka Album...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 rounded-[4rem] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold italic uppercase tracking-widest text-sm">Belum ada foto kegiatan yang diunggah.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              /* FIX: Arahkan ke /galeri/bukan /berita/ agar tampilannya konsisten */
              <Link key={post._id} href={`/galeri/${post._id}`} className="group block relative">
                <article className="bg-white p-4 rounded-[3rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(234,179,8,0.15)] transition-all duration-500 h-full flex flex-col border border-gray-100 hover:-translate-y-3">
                  
                  {/* Image Frame */}
                  <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-inner">
                    <img 
                      src={post.images?.[0] || '/logo-bs.png'} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={post.judul}
                    />
                    
                    {/* Badge Jumlah Foto */}
                    {post.images?.length > 1 && (
                      <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-lg border border-white">
                        <p className="text-[10px] font-black text-green-950 uppercase tracking-widest">
                          📸 {post.images.length} Foto
                        </p>
                      </div>
                    )}

                    {/* Badge Unit */}
                    <div className="absolute top-6 left-6">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md ${
                        post.unit === 'TK' ? 'bg-yellow-400 text-green-950' : 'bg-emerald-600 text-white'
                      }`}>
                        Unit {post.unit}
                      </span>
                    </div>
                  </div>

                  {/* Content Detail */}
                  <div className="px-4 py-8 text-center">
                    <h3 className="text-xl font-black text-green-950 mb-3 leading-tight group-hover:text-yellow-600 transition-colors uppercase tracking-tight">
                      {post.judul}
                    </h3>
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
                      {new Date(post.createdAt).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                    </p>
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