"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminGaleri() {
  const [formData, setFormData] = useState({
    judul: '',
    deskripsiSingkat: '',
    isiLengkap: '',
    unit: 'TK',
    kategori: 'galeri',
    images: [],
  });
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editId, setEditId] = useState(null); // Melacak data yang sedang diedit
  const router = useRouter();

  // 1. FUNGSI AMBIL SEMUA POSTINGAN
  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/post'); 
      const data = await res.json();
      if (data.success) setPosts(data.data);
    } catch (err) {
      console.error("Gagal mengambil data postingan");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 2. FUNGSI UPLOAD KE CLOUDINARY
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    for (const file of files) {
      const dataUpload = new FormData();
      dataUpload.append('file', file);
      
      try {
        const res = await fetch('/api/admin/upload', { 
          method: 'POST', 
          body: dataUpload 
        });
        const data = await res.json();
        if (data.url) {
          setFormData(prev => ({ 
            ...prev, 
            images: [...prev.images, data.url] 
          }));
        }
      } catch (err) {
        console.error("Gagal upload file:", err);
      }
    }
    setUploading(false);
  };

  // 3. FUNGSI TRIGGER EDIT (Menaikkan data ke Form)
  const handleEdit = (post) => {
    setEditId(post._id);
    setFormData({
      judul: post.judul,
      deskripsiSingkat: post.deskripsiSingkat || '',
      isiLengkap: post.isiLengkap || '',
      unit: post.unit || 'TK',
      kategori: post.kategori || 'galeri',
      images: post.images || [],
    });
    // Scroll ke atas agar admin langsung melihat form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4. FUNGSI BATAL EDIT
  const cancelEdit = () => {
    setEditId(null);
    setFormData({ 
      judul: '', 
      deskripsiSingkat: '', 
      isiLengkap: '', 
      unit: 'TK', 
      kategori: 'galeri', 
      images: [] 
    });
  };

  // 5. FUNGSI SIMPAN KE DATABASE (POST atau PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.images.length === 0) return alert("Pilih foto terlebih dahulu!");
    
    setLoading(true);
    try {
      // Jika editId ada, gunakan method PUT, jika tidak gunakan POST
      const method = editId ? 'PUT' : 'POST';
      // Tambahkan param ?id= jika sedang mengedit
      const url = editId ? `/api/admin/post?id=${editId}` : '/api/admin/post';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        alert(editId ? "Konten Berhasil Diperbarui!" : "Konten Berhasil Ditayangkan!");
        cancelEdit(); // Reset mode dan form
        fetchPosts(); // Refresh daftar konten
      } else {
        alert("Gagal menyimpan data: " + (result.error || "Terjadi kesalahan database"));
      }
    } catch (error) {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  // 6. FUNGSI HAPUS
  const handleDelete = async (id) => {
    if (!confirm("Hapus postingan ini secara permanen?")) return;
    
    try {
      const res = await fetch(`/api/admin/post?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert("Postingan berhasil dihapus!");
        fetchPosts();
      }
    } catch (err) {
      alert("Gagal menghapus.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-green-950 text-white p-6">
        <Link href="/admin/dashboard" className="text-yellow-400 font-black text-xl uppercase tracking-tighter block mb-10">
          ← Dashboard
        </Link>
        <nav className="space-y-4">
          <div className={`p-4 rounded-xl border-l-4 font-bold text-sm transition-all duration-500 ${editId ? 'bg-orange-500/20 border-orange-400' : 'bg-white/10 border-yellow-400'}`}>
            {editId ? '⚠️ Mode Editing' : '📸 Form Management'}
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl p-10 border border-gray-100">
          <h2 className="text-3xl font-black text-green-950 mb-2 uppercase tracking-tighter">
            {editId ? 'Edit Konten' : 'Tambah Galeri & Berita'}
          </h2>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-10 italic">
            {editId ? `Revisi: ${formData.judul}` : 'Input Data Web Bina Shaliha'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase text-green-900 mb-2 ml-2 tracking-widest">Unit Sekolah</label>
                <select 
                  className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold outline-none focus:border-yellow-500"
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                >
                  <option value="TK">TK Islam Bina Shaliha</option>
                  <option value="SD">SD Islam Bina Shaliha</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-green-900 mb-2 ml-2 tracking-widest">Tampilkan Di Menu</label>
                <select 
                  className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold outline-none focus:border-yellow-500"
                  value={formData.kategori}
                  onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                >
                  <option value="galeri">Galeri Kegiatan (Foto)</option>
                  <option value="berita">Informasi Terkini (Berita)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-green-900 mb-2 ml-2 tracking-widest">Judul Kegiatan</label>
              <input 
                type="text" required
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold outline-none focus:border-yellow-500"
                placeholder="Contoh: Manasik Haji Cilik 2026"
                value={formData.judul}
                onChange={(e) => setFormData({...formData, judul: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-green-900 mb-2 ml-2 tracking-widest">Deskripsi Singkat</label>
              <input 
                type="text" required
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold outline-none focus:border-yellow-500"
                placeholder="Penjelasan pendek untuk kartu berita..."
                value={formData.deskripsiSingkat}
                onChange={(e) => setFormData({...formData, deskripsiSingkat: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-green-900 mb-2 ml-2 tracking-widest">Isi Lengkap</label>
              <textarea 
                rows="4" required
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-medium outline-none focus:border-yellow-500"
                placeholder="Tulis detail berita secara lengkap..."
                value={formData.isiLengkap}
                onChange={(e) => setFormData({...formData, isiLengkap: e.target.value})}
              ></textarea>
            </div>

            {/* Area Upload */}
            <div className="p-8 border-4 border-dashed border-gray-100 rounded-[2.5rem] text-center bg-gray-50/50">
              <input 
                type="file" multiple accept="image/*" 
                onChange={handleUpload} 
                className="hidden" id="upload-cloud"
              />
              <label htmlFor="upload-cloud" className="cursor-pointer bg-green-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-yellow-500 hover:text-green-950 transition-all shadow-lg inline-block">
                {uploading ? '⏳ Mengunggah...' : '📂 Tambah Foto'}
              </label>
              
              {formData.images.length > 0 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mt-6">
                  {formData.images.map((url, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden border-2 border-white shadow-sm group">
                      <img src={url} className="w-full h-full object-cover" alt="preview" />
                      <button 
                        type="button" 
                        onClick={() => setFormData({...formData, images: formData.images.filter((_, idx) => idx !== i)})} 
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                      >✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              {editId && (
                <button 
                  type="button" 
                  onClick={cancelEdit}
                  className="flex-1 py-5 rounded-2xl font-black uppercase tracking-widest bg-gray-200 text-gray-500 hover:bg-gray-300 transition-all"
                >
                  Batal
                </button>
              )}
              <button 
                type="submit"
                disabled={loading || uploading || formData.images.length === 0}
                className={`flex-[2] py-5 rounded-2xl font-black uppercase tracking-widest transition-all ${
                  loading || uploading || formData.images.length === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : editId ? 'bg-orange-500 text-white shadow-xl hover:bg-orange-600' : 'bg-green-950 text-white hover:bg-yellow-500 hover:text-green-950 shadow-xl'
                }`}
              >
                {loading ? 'Sedang Memproses...' : editId ? 'Perbarui Konten ➜' : 'Tayangkan Sekarang ➜'}
              </button>
            </div>
          </form>
        </div>

        {/* DAFTAR KONTEN DENGAN TOMBOL EDIT */}
        <div className="max-w-4xl mx-auto mt-16 pb-20">
          <h3 className="text-xl font-black text-green-950 uppercase mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm shadow-md">📋</span>
            Daftar Konten Terbit
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {posts.length === 0 ? (
                <p className="text-center text-gray-400 italic py-10">Belum ada data di database.</p>
            ) : (
                posts.map((p) => (
                    <div key={p._id} className="bg-white p-5 rounded-[2rem] shadow-md flex items-center justify-between border border-gray-100 hover:border-yellow-400 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                          <img src={p.images?.[0] || '/logo-bs.png'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="thumbnail" />
                        </div>
                        <div>
                          <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${p.kategori === 'berita' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                            {p.kategori}
                          </span>
                          <h4 className="font-bold text-green-950 text-sm line-clamp-1">{p.judul}</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{p.unit} Bina Shaliha</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(p)}
                          className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition-all font-black text-[10px] uppercase shadow-sm"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(p._id)}
                          className="bg-red-50 text-red-500 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition-all font-black text-[10px] uppercase shadow-sm"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}