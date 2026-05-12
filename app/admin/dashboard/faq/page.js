'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminAlert from '@/components/AdminAlert';

export default function FAQAdmin() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: null, pertanyaan: '', jawaban: '', urutan: 0, isActive: true });

  const [alertConfig, setAlertConfig] = useState({ isOpen: false, type: 'success', title: '', message: '', onConfirm: null, onCancel: null });

  const showAlert = (type, title, message, onConfirm = null, onCancel = null) => {
    setAlertConfig({
      isOpen: true, type, title, message,
      onConfirm: onConfirm || (() => setAlertConfig(prev => ({ ...prev, isOpen: false }))),
      onCancel: onCancel || (() => setAlertConfig(prev => ({ ...prev, isOpen: false })))
    });
  };

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/admin/faq');
      const data = await res.json();
      if (data.success) {
        setFaqs(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch FAQs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
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
    
    const url = formData.id ? `/api/admin/faq?id=${formData.id}` : '/api/admin/faq';
    const method = formData.id ? 'PUT' : 'POST';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pertanyaan: formData.pertanyaan,
          jawaban: formData.jawaban,
          urutan: Number(formData.urutan),
          isActive: formData.isActive
        })
      });
      const data = await res.json();
      
      if (data.success) {
        setFormData({ id: null, pertanyaan: '', jawaban: '', urutan: 0, isActive: true });
        setIsEditing(false);
        fetchFaqs();
        showAlert('success', 'Berhasil!', formData.id ? 'FAQ diperbarui.' : 'FAQ ditambahkan.');
      } else {
        showAlert('error', 'Gagal!', 'Gagal menyimpan FAQ.');
        setLoading(false);
      }
    } catch (error) {
      console.error("Error saving FAQ", error);
      showAlert('error', 'Error!', 'Terjadi kesalahan sistem.');
      setLoading(false);
    }
  };

  const handleEdit = (faq) => {
    setFormData({
      id: faq._id,
      pertanyaan: faq.pertanyaan,
      jawaban: faq.jawaban,
      urutan: faq.urutan,
      isActive: faq.isActive
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    showAlert('confirm', 'Hapus FAQ?', 'FAQ ini akan dihapus permanen.', () => performDelete(id));
  };

  const performDelete = async (id) => {
    setAlertConfig(prev => ({ ...prev, isOpen: false }));
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/faq?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchFaqs();
        setTimeout(() => showAlert('success', 'Dihapus!', 'FAQ berhasil dihapus.'), 300);
      } else {
        setTimeout(() => showAlert('error', 'Gagal!', 'Gagal menghapus FAQ.'), 300);
      }
    } catch (error) {
      console.error("Error deleting FAQ", error);
      setTimeout(() => showAlert('error', 'Error!', 'Terjadi kesalahan sistem.'), 300);
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
          <h1 className="text-3xl font-black text-green-950 uppercase tracking-tight">Kelola <span className="text-amber-500">FAQ</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Formulir Input */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-6">
              <h3 className="text-xl font-bold mb-6">{isEditing ? 'Edit FAQ' : 'Tambah FAQ Baru'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Pertanyaan</label>
                  <textarea 
                    name="pertanyaan" 
                    value={formData.pertanyaan} 
                    onChange={handleInputChange} 
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 outline-none" 
                    rows="3" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Jawaban</label>
                  <textarea 
                    name="jawaban" 
                    value={formData.jawaban} 
                    onChange={handleInputChange} 
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 outline-none" 
                    rows="5" 
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Urutan</label>
                    <input 
                      type="number" 
                      name="urutan" 
                      value={formData.urutan} 
                      onChange={handleInputChange} 
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 outline-none" 
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Status Aktif</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="isActive" 
                        checked={formData.isActive} 
                        onChange={handleInputChange} 
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>
                </div>
                <div className="pt-4 flex gap-2">
                  <button type="submit" disabled={loading} className="flex-1 bg-green-950 text-white font-bold py-3 rounded-xl hover:bg-green-800 transition-colors disabled:opacity-50">
                    {loading ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambah FAQ')}
                  </button>
                  {isEditing && (
                    <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: null, pertanyaan: '', jawaban: '', urutan: 0, isActive: true }); }} className="bg-red-50 text-red-600 font-bold py-3 px-4 rounded-xl hover:bg-red-100 transition-colors">
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Daftar FAQ */}
          <div className="lg:col-span-2 space-y-4">
            {loading && faqs.length === 0 ? (
              <div className="text-center py-10 text-gray-400 font-medium">Memuat data FAQ...</div>
            ) : faqs.length === 0 ? (
              <div className="bg-white p-10 rounded-3xl text-center border border-gray-100 shadow-sm">
                <span className="text-4xl block mb-4">❓</span>
                <h4 className="text-xl font-bold text-gray-700">Belum ada FAQ</h4>
                <p className="text-gray-500">Mulai tambahkan pertanyaan yang sering diajukan melalui formulir di samping.</p>
              </div>
            ) : (
              faqs.map((faq) => (
                <div key={faq._id} className={`bg-white p-6 rounded-2xl shadow-sm border transition-colors ${!faq.isActive ? 'border-red-200 opacity-60' : 'border-gray-100 hover:border-amber-400'}`}>
                  <div className="flex justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-gray-100 text-xs font-bold px-2 py-1 rounded text-gray-500">Urutan: {faq.urutan}</span>
                        {!faq.isActive && <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">Tidak Aktif</span>}
                      </div>
                      <h4 className="font-black text-green-950 text-lg leading-tight mb-2">Q: {faq.pertanyaan}</h4>
                      <p className="text-gray-600 text-sm whitespace-pre-line">A: {faq.jawaban}</p>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <button onClick={() => handleEdit(faq)} className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition-colors" title="Edit">✏️</button>
                      <button onClick={() => handleDelete(faq._id)} className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors" title="Hapus">🗑️</button>
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
