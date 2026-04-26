"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const menu = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '🏠' },
    { name: 'Data Guru', path: '/admin/dashboard/guru', icon: '👨‍🏫' },
    { name: 'Galeri & Berita', path: '/admin/dashboard/galeri', icon: '📸' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR FIXED */}
      <aside className="w-64 bg-green-950 text-white p-6 hidden md:block border-r-4 border-yellow-400">
        <div className="mb-10">
          <h2 className="text-yellow-400 font-black text-xl tracking-tighter uppercase">Bina Shaliha</h2>
          <p className="text-[10px] font-bold text-green-300 tracking-widest uppercase">Admin Panel</p>
        </div>
        
        <nav className="space-y-2">
          {menu.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 p-4 rounded-2xl font-bold text-sm transition-all ${
                pathname === item.path ? 'bg-white text-green-950 shadow-lg scale-105' : 'hover:bg-white/10 text-gray-300'
              }`}
            >
              <span>{item.icon}</span> {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-20 pt-10 border-t border-white/10">
          <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-white transition-colors">
            ⬅ Keluar ke Website
          </Link>
        </div>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}