import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head'; // Import Head untuk paksa favicon

export const metadata = {
  title: 'Sekolah Islam Bina Shaliha - Depok',
  description: 'Membangun Generasi Rabbani yang Cerdas dan Berakhlak Mulia',
  icons: {
    icon: '/logo-bs.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      {/* KODE SAKTI: Memaksa browser lewat tag head HTML standar */}
      <head>
        <link rel="icon" href="/logo-bs.png" sizes="any" />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        {/* Navbar akan muncul di semua halaman otomatis */}
        <Navbar />
        
        {/* Bungkus children dengan main flex-grow agar footer tetap di bawah */}
        <main className="flex-grow pt-20">
          {children}
        </main>

        {/* Menampilkan Footer di bagian paling bawah */}
        <Footer />
      </body>
    </html>
  );
}