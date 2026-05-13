"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // PERBAIKAN: Gunakan navigation, bukan router

export default function LoginAdmin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem('adminToken', data.token); // Simpan token di browser
        router.push('/admin/dashboard'); // Pindah ke dashboard setelah sukses
      } else {
        alert(data.message || "Email atau Password salah");
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-green-950 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-2xl overflow-hidden relative border-4 border-yellow-400/20">
        
        {/* Dekorasi Aksen Kuning */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-bl-[5rem] -mr-16 -mt-16 shadow-inner" />
        
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-green-950 mb-1 uppercase tracking-tighter italic">Login Admin</h2>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-10 opacity-70">SIT Islam Bina Shaliha</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-green-900 mb-2 ml-2 tracking-widest">Email Admin</label>
              <input 
                type="email" 
                required
                placeholder="admin@email.com"
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-yellow-500 font-bold transition-all text-green-950"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-green-900 mb-2 ml-2 tracking-widest">Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-yellow-500 font-bold transition-all text-green-950"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <button 
              disabled={loading}
              className="w-full bg-green-950 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-green-950 transition-all shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'MENGECEK AKSES...' : 'MASUK DASHBOARD ➜'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
