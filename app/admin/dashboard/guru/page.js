'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardGuru() {
  const [formData, setFormData] = useState({
    nama: '',
    gelar: '',
    bidangGuru: '',
    pendidikanTerakhir: '',
    universitas: '',
    foto: ''
  });
  
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editId, setEditId] = useState(null); // State untuk melacak ID yang sedang diedit

  // 1. AMBIL DATA GURU
  const fetchTeachers = async () => {
    try {
      const res = await fetch('/api/admin/teachers');
      const data = await res.json();
      if (data.success) {
        setTeachers(data.data);
      }
    } catch (err) {
      console.error("Gagal mengambil data guru:", err);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // 2. FUNGSI UPLOAD FOTO
  const handleUploadFoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const dataUpload = new FormData();
    dataUpload.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: dataUpload,
      });
      const data = await res.json();
      
      if (data.url) {
        setFormData(prev => ({ ...prev, foto: data.url }));
        alert("Foto berhasil diunggah!");
      } else {
        alert("Gagal upload: " + (data.error || "Cek Cloudinary"));
      }
    } catch (err) {
      alert("Gagal mengunggah foto.");
    } finally {
      setUploading(false);
    }
  };

  // 3. FUNGSI TRIGGER EDIT (Menaikkan data ke Form)
  const handleEdit = (teacher) => {
    setEditId(teacher._id);
    setFormData({
      nama: teacher.nama,
      gelar: teacher.gelar || '',
      bidangGuru: teacher.bidangGuru,
      pendidikanTerakhir: teacher.pendidikanTerakhir || '',
      universitas: teacher.universitas || '',
      foto: teacher.foto
    });
    // Scroll otomatis ke atas agar user tahu form sudah terisi data lama
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4. FUNGSI BATAL EDIT
  const cancelEdit = () => {
    setEditId(null);
    setFormData({ nama: '', gelar: '', bidangGuru: '', pendidikanTerakhir: '', universitas: '', foto: '' });
  };

  // 5. FUNGSI SIMPAN KE DATABASE (POST atau PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.foto) return alert("Mohon upload foto terlebih dahulu!");

    setLoading(true);
    try {
      // Logika penentuan: Jika ada editId pakai PUT, jika tidak pakai POST
      const method = editId ? 'PUT' : 'POST';
      // Jika edit, tambahkan ID di query params (sesuaikan dengan logika API kamu)
      const url = editId ? `/api/admin/teachers?id=${editId}` : '/api/admin/teachers';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        alert(editId ? "Berhasil memperbarui data!" : "Berhasil menyimpan data baru!");
        cancelEdit(); // Reset form dan balik ke mode Simpan
        fetchTeachers(); // Refresh list
      } else {
        alert("Gagal: " + (result.error || "Terjadi kesalahan database"));
      }
    } catch (err) {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  // 6. FUNGSI HAPUS DATA GURU
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus guru ini?")) return;
    
    try {
      const res = await fetch(`/api/admin/teachers?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert("Data guru berhasil dihapus!");
        fetchTeachers();
      }
    } catch (err) {
      alert("Gagal menghapus data.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-[3rem] overflow-hidden border border-gray-100">
        {/* HEADER BERUBAH WARNA SAAT EDIT */}
        <div className={`p-10 text-white flex justify-between items-center transition-colors duration-500 ${editId ? 'bg-yellow-600' : 'bg-emerald-900'}`}>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">
              {editId ? 'Edit Data Personel' : 'Manajemen SDM'}
            </h1>
            <p className="text-emerald-100/70 text-xs font-bold uppercase tracking-[0.3em] mt-2">
               {editId ? `Sedang mengubah profil: ${formData.nama}` : 'Tambah Profil Guru & Staf Bina Shaliha'}
            </p>
          </div>
          <Link href="/admin/dashboard" className="hidden md:block bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl text-[10px] font-black uppercase transition-all">
            Dashboard Utama
          </Link>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-emerald-900 mb-2 ml-1">Nama Lengkap</label>
              <input 
                name="nama" type="text" required
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-emerald-500 font-bold transition-all" 
                placeholder="Ahmad Subagja" 
                value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-emerald-900 mb-2 ml-1">Gelar Akademik</label>
              <input 
                name="gelar" type="text"
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-emerald-500 font-bold" 
                placeholder="S.Pd / M.Pd" 
                value={formData.gelar} onChange={(e) => setFormData({...formData, gelar: e.target.value})} 
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-emerald-900 mb-2 ml-1">Bidang Guru / Jabatan</label>
            <input 
              name="bidangGuru" type="text" required
              className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-emerald-500 font-bold" 
              placeholder="Kepala Sekolah / Guru Fiqih / Yayasan" 
              value={formData.bidangGuru} onChange={(e) => setFormData({...formData, bidangGuru: e.target.value})} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-emerald-900 mb-2 ml-1">Pendidikan Terakhir</label>
              <select 
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-emerald-500 font-bold"
                value={formData.pendidikanTerakhir} onChange={(e) => setFormData({...formData, pendidikanTerakhir: e.target.value})}
              >
                <option value="">Pilih Jenjang</option>
                <option value="D3">D3</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-emerald-900 mb-2 ml-1">Universitas</label>
              <input 
                type="text"
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-emerald-500 font-bold" 
                placeholder="Nama Kampus" 
                value={formData.universitas} onChange={(e) => setFormData({...formData, universitas: e.target.value})} 
              />
            </div>
          </div>

          <div className="pt-4 p-6 bg-emerald-50 rounded-[2rem] border-2 border-dashed border-emerald-200">
            <label className="block text-[10px] font-black uppercase text-emerald-900 mb-3 ml-1">Foto Profil</label>
            <div className="flex items-center gap-6">
              <input 
                type="file" accept="image/*" onChange={handleUploadFoto}
                className="text-xs file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
              />
              {uploading && <span className="text-[10px] font-black text-emerald-600 animate-pulse uppercase tracking-widest">Uploading...</span>}
            </div>
            {formData.foto && (
              <div className="mt-4 flex items-center gap-4">
                <img src={formData.foto} alt="Preview" className="w-20 h-20 object-cover rounded-2xl border-4 border-white shadow-xl" />
                <span className="text-[10px] text-emerald-600 font-black uppercase tracking-widest italic">✓ Foto Aktif</span>
              </div>
            )}
          </div>

          <div className="pt-6 flex gap-4">
            {editId ? (
              <>
                <button 
                  type="button" onClick={cancelEdit}
                  className="flex-1 bg-gray-200 text-gray-600 p-5 rounded-2xl font-black text-center uppercase tracking-widest hover:bg-gray-300 transition-all"
                >
                  Batal
                </button>
                <button 
                  type="submit" disabled={loading || uploading}
                  className="flex-[2] bg-yellow-500 hover:bg-yellow-600 p-5 rounded-2xl text-white font-black uppercase tracking-[0.2em] shadow-xl transition-all"
                >
                  {loading ? 'Memperbarui...' : 'Update Profil ➜'}
                </button>
              </>
            ) : (
              <>
                <Link href="/admin/dashboard" className="flex-1 bg-gray-200 text-gray-500 p-5 rounded-2xl font-black text-center uppercase tracking-widest hover:bg-gray-300 transition-all">
                  Kembali
                </Link>
                <button 
                  type="submit" disabled={loading || uploading}
                  className={`flex-[2] p-5 rounded-2xl text-white font-black uppercase tracking-[0.2em] shadow-xl transition-all ${
                    loading || uploading ? 'bg-gray-300' : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-emerald-200'
                  }`}
                >
                  {loading ? 'Menyimpan...' : 'Simpan Profil ➜'}
                </button>
              </>
            )}
          </div>
        </form>
      </div>

      {/* DAFTAR GURU DENGAN TOMBOL EDIT */}
      <div className="max-w-4xl mx-auto mt-16 bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-black text-green-950 uppercase tracking-tighter">Database Personel</h2>
          <span className="bg-yellow-400 text-green-950 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            {teachers.length} Personel
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {teachers.map((t) => (
            <div key={t._id} className="flex items-center justify-between p-5 bg-gray-50 rounded-[2rem] border border-gray-100 hover:border-emerald-200 transition-all group">
              <div className="flex items-center gap-5">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                   <img src={t.foto || '/logo-bs.png'} className="w-full h-full object-cover" alt={t.nama} />
                </div>
                <div>
                  <h4 className="font-black text-green-950 uppercase text-sm tracking-tight">{t.nama}</h4>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-0.5">{t.bidangGuru}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(t)}
                  className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(t._id)}
                  className="bg-red-50 text-red-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}

          {teachers.length === 0 && (
            <p className="text-center text-gray-400 py-10 font-bold italic text-sm">Belum ada data personel terinput.</p>
          )}
        </div>
      </div>
    </div>
  );
}