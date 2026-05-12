'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

  const phoneNumber = "6285883027847"; // Nomor Admin Bina Shaliha
  const message = "Halo Admin Bina Shaliha, saya ingin bertanya tentang...";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Cek Cooldown dari LocalStorage saat pertama kali render
  useEffect(() => {
    const lastClickTime = localStorage.getItem('wa_button_last_click');
    if (lastClickTime) {
      const timePassed = Date.now() - parseInt(lastClickTime);
      const cooldownMs = 60000; // 60 detik
      if (timePassed < cooldownMs) {
        setIsCooldown(true);
        setCooldownTime(Math.ceil((cooldownMs - timePassed) / 1000));
      }
    }
  }, []);

  // Timer hitung mundur untuk cooldown
  useEffect(() => {
    let interval;
    if (isCooldown && cooldownTime > 0) {
      interval = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsCooldown(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCooldown, cooldownTime]);

  const handleClick = (e) => {
    e.preventDefault(); // Hentikan aksi default <a>

    if (isCooldown) {
      alert(`Anti-Spam Aktif: Tunggu ${cooldownTime} detik sebelum menghubungi via WA lagi.`);
      return;
    }
    
    // Buka WhatsApp di tab baru secara manual
    window.open(whatsappUrl, '_blank');

    // Aktifkan cooldown
    localStorage.setItem('wa_button_last_click', Date.now().toString());
    setIsCooldown(true);
    setCooldownTime(60);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center group">
      {/* Tooltip untuk menampilkan waktu cooldown */}
      {isCooldown && (
        <div className="absolute -top-10 bg-gray-800 text-white text-xs font-bold py-1 px-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Tunggu {cooldownTime} detik
        </div>
      )}

      {/* Ping effect behind the button, hanya aktif jika tidak sedang cooldown */}
      {!isCooldown && (
        <div className="absolute w-full h-full bg-green-500 rounded-full animate-ping opacity-75"></div>
      )}
      
      {/* Button */}
      <motion.a
        href={isCooldown ? '#' : whatsappUrl}
        target={isCooldown ? '_self' : '_blank'}
        rel="noopener noreferrer"
        onClick={handleClick}
        whileHover={isCooldown ? {} : { scale: 1.1 }}
        whileTap={isCooldown ? {} : { scale: 0.9 }}
        className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-colors ${
          isCooldown ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-8 h-8 fill-white"
        >
          {/* FontAwesome WhatsApp Icon path */}
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </motion.a>
    </div>
  );
}
