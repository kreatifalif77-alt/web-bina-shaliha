'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminAlert from '@/components/AdminAlert';

export default function TestimoniAdmin() {
  const [testimoni, setTestimoni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: null, namaWali: '', namaSiswa: '', angkatan: '', pesan: '', rating: 5, isActive: true });
  
  // Custom Alert State
  const [alertConfig, setAlertConfig] = useState({ isOpen: false, type: 'success', title: '', message: '', onConfirm: null, onCancel: null });

  const showAlert = (type, title, message, onConfirm = null, onCancel = null) => {
    setAlertConfig({
      isOpen: true,
      type,
      title,
      message,
      onConfirm: onConfirm || (() => setAlertConfig(prev => ({ ...prev, isOpen: false }))),
      onCancel: onCancel || (() => setAlertConfig(prev => ({ ...prev, isOpen: false })))
    });
  };

  const fetchTestimoni = async () => {
    try {
      const res = await fetch('/api/admin/testimoni');
      const data = await res.json();
      if (data.success) {
        setTestimoni(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimoni();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const url = formData.id ? `/api/admin/testimoni?id=${formData.id}` : '/api/admin/testimoni';
    const method = formData.id ? 'PUT' : 'POST';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          namaWali: formData.namaWali,
          namaSiswa: formData.namaSiswa,
          angkatan: formData.angkatan,
          pesan: formData.pesan,
          rating: Number(formData.rating),
          isActive: formData.isActive
        })
      });
      const data = await res.json();
      
      if (data.success) {
        setFormData({ id: null, namaWali: '', namaSiswa: '', angkatan: '', pesan: '', rating: 5, isActive: true });
        setIsEditing(false);
        fetchTestimoni();
        showAlert('success', 'Berhasil!', formData.id ? 'Testimoni berhasil diperbarui.' : 'Testimoni baru berhasil ditambahkan.');
      } else {
        showAlert('error', 'Gagal!', 'Terjadi kesalahan saat menyimpan testimoni.');
      }
    } catch (error) {
      console.error("Error saving", error);
      showAlert('error', 'Error!', 'Gagal terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      id: item._id,
      namaWali: item.namaWali,
      namaSiswa: item.namaSiswa,
      angkatan: item.angkatan || '',
      pesan: item.pesan,
      rating: item.rating,
      isActive: item.isActive
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = (id) => {
    showAlert(
      'confirm', 
      'Hapus Testimoni?', 
      'Tindakan ini tidak bisa dibatalkan.',
      () => performDelete(id)
    );
  };

  const performDelete = async (id) => {
    setAlertConfig(prev => ({ ...prev, isOpen: false })); // Close confirm dialog
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/testimoni?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchTestimoni();
        setTimeout(() => showAlert('success', 'Dihapus!', 'Testimoni berhasil dihapus dari sistem.'), 300);
      } else {
        setTimeout(() => showAlert('error', 'Gagal!', 'Gagal menghapus testimoni.'), 300);
      }
    } catch (error) {
      console.error("Error deleting", error);
      setTimeout(() => showAlert('error', 'Error!', 'Terjadi kesalahan server.'), 300);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 relative">
      <AdminAlert {...alertConfig} />

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/dashboard" className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-100 transition-colors">
            ⬅️ Kembali
          </Link>
          <h1 className="text-3xl font-black text-green-950 uppercase tracking-tight">Kelola <span className="text-pink-500">Testimoni</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Formulir Input */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-6">
              <h3 className="text-xl font-bold mb-6">{isEditing ? 'Edit Testimoni' : 'Tambah Testimoni'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Nama Wali Murid</label>
                  <input 
                    type="text" 
                    name="namaWali" 
                    value={formData.namaWali} 
                    onChange={handleInputChange} 
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-500 outline-none" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Nama Anak / Siswa</label>
                  <input 
                    type="text" 
                    name="namaSiswa" 
                    value={formData.namaSiswa} 
                    onChange={handleInputChange} 
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-500 outline-none" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Angkatan / Tahun Lulus (Opsional)</label>
                  <input 
                    type="text" 
                    name="angkatan" 
                    value={formData.angkatan} 
                    onChange={handleInputChange} 
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-500 outline-none" 
                    placeholder="Contoh: Angkatan 2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Pesan Testimoni</label>
                  <textarea 
                    name="pesan" 
                    value={formData.pesan} 
                    onChange={handleInputChange} 
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-500 outline-none" 
                    rows="4" 
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Rating (1-5)</label>
                    <input 
                      type="number" 
                      name="rating" 
                      min="1" max="5"
                      value={formData.rating} 
                      onChange={handleInputChange} 
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-500 outline-none" 
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Status Tampil</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="isActive" 
                        checked={formData.isActive} 
                        onChange={handleInputChange} 
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                    </label>
                  </div>
                </div>
                <div className="pt-4 flex gap-2">
                  <button type="submit" disabled={loading} className="flex-1 bg-green-950 text-white font-bold py-3 rounded-xl hover:bg-green-800 transition-colors disabled:opacity-50">
                    {loading ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambah Testimoni')}
                  </button>
                  {isEditing && (
                    <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: null, namaWali: '', namaSiswa: '', angkatan: '', pesan: '', rating: 5, isActive: true }); }} className="bg-red-50 text-red-600 font-bold py-3 px-4 rounded-xl hover:bg-red-100 transition-colors">
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Daftar Testimoni */}
          <div className="lg:col-span-2 space-y-4">
            {loading && testimoni.length === 0 ? (
              <div className="text-center py-10 text-gray-400 font-medium animate-pulse">Memuat data Testimoni...</div>
            ) : testimoni.length === 0 ? (
              <div className="bg-white p-10 rounded-3xl text-center border border-gray-100 shadow-sm">
                <span className="text-4xl block mb-4">💬</span>
                <h4 className="text-xl font-bold text-gray-700">Belum ada Testimoni</h4>
                <p className="text-gray-500">Silakan tambahkan testimoni baru di form sebelah kiri.</p>
              </div>
            ) : (
              testimoni.map((item) => (
                <div key={item._id} className={`bg-white p-6 rounded-2xl shadow-sm border transition-all ${!item.isActive ? 'border-red-200 opacity-60' : 'border-gray-100 hover:border-pink-300 hover:shadow-md'}`}>
                  <div className="flex justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded">⭐ {item.rating}/5</span>
                        {!item.isActive && <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">Disembunyikan</span>}
                      </div>
                      <h4 className="font-black text-green-950 text-lg leading-tight">Wali dari: {item.namaSiswa}</h4>
                      <p className="text-sm text-gray-400 font-medium mb-3">Oleh: {item.namaWali} {item.angkatan && `(${item.angkatan})`}</p>
                      <p className="text-gray-600 text-sm whitespace-pre-line italic">"{item.pesan}"</p>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <button onClick={() => handleEdit(item)} className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition-colors" title="Edit">✏️</button>
                      <button onClick={() => handleDeleteClick(item._id)} className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors" title="Hapus">🗑️</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
