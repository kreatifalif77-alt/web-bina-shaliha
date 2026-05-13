"use client";

import { useState, useEffect } from 'react';

export default function ManajemenAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const result = await res.json();
      if (result.success) {
        setUsers(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const url = editingUser 
        ? `/api/admin/users/${editingUser._id}`
        : '/api/admin/users';
        
      const method = editingUser ? 'PUT' : 'POST';
      
      const payload = { email };
      if (password) payload.password = password;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await res.json();
      if (result.success) {
        alert(editingUser ? 'User berhasil diupdate!' : 'User berhasil ditambahkan!');
        setModalOpen(false);
        fetchUsers();
      } else {
        alert('Gagal: ' + result.message);
      }
    } catch (error) {
      alert('Terjadi kesalahan saat memproses data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus admin ini?')) return;
    
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        alert('User berhasil dihapus!');
        fetchUsers();
      } else {
        alert('Gagal menghapus user: ' + result.message);
      }
    } catch (error) {
      alert('Terjadi kesalahan saat menghapus data.');
    }
  };

  const openAddModal = () => {
    setEditingUser(null);
    setEmail('');
    setPassword('');
    setModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setEmail(user.email);
    setPassword(''); // biarkan kosong untuk edit, jika diisi baru ganti password
    setModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-green-950 uppercase tracking-tighter italic">Manajemen Admin</h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Atur akses dan akun admin website</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-yellow-500 hover:bg-green-950 text-green-950 hover:text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest transition-all shadow-xl active:scale-95"
        >
          + Tambah Admin
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl border-4 border-yellow-400/20 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400 font-bold uppercase tracking-widest">Memuat data...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-green-950 text-white font-black uppercase tracking-widest text-xs">
                <tr>
                  <th className="p-5">No</th>
                  <th className="p-5">Email Login</th>
                  <th className="p-5">ID / Sistem</th>
                  <th className="p-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-100">
                {users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-5 font-bold text-gray-400">{index + 1}</td>
                    <td className="p-5 font-black text-green-950">{user.email}</td>
                    <td className="p-5">
                      <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-lg uppercase tracking-widest">
                        {user._id}
                      </span>
                    </td>
                    <td className="p-5 text-right space-x-2">
                      <button 
                        onClick={() => openEditModal(user)}
                        className="bg-green-100 text-green-900 hover:bg-green-950 hover:text-white px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all"
                      >
                        Ubah Info
                      </button>
                      <button 
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-100 text-red-900 hover:bg-red-600 hover:text-white px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-10 text-center text-gray-400 font-bold uppercase tracking-widest">Belum ada data admin</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-green-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400 rounded-bl-[4rem] -mr-10 -mt-10" />
            
            <h2 className="text-2xl font-black text-green-950 uppercase tracking-tighter italic relative z-10 mb-6">
              {editingUser ? 'Ubah Akun Admin' : 'Tambah Akun Admin'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div>
                <label className="block text-[10px] font-black uppercase text-green-900 mb-2 ml-2 tracking-widest">Email Akses</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sekolah.com"
                  className="w-full bg-gray-50 border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-yellow-500 font-bold transition-all text-green-950"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-black uppercase text-green-900 mb-2 ml-2 tracking-widest">
                  {editingUser ? 'Password Baru (Kosongkan jika tidak diubah)' : 'Password Baru'}
                </label>
                <input 
                  type="password" 
                  required={!editingUser}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-yellow-500 font-bold transition-all text-green-950"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-500 py-3 rounded-xl font-black uppercase tracking-widest hover:bg-gray-200 transition-all text-[10px]"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-green-950 text-white py-3 rounded-xl font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-green-950 transition-all disabled:opacity-50 text-[10px]"
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Akun ➜'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
