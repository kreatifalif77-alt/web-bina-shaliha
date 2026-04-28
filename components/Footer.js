import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const socialMedia = [
    { 
      name: 'Instagram', 
      url: 'https://instagram.com/Binshaofficial', 
      handle: '@Binshaofficial', 
      iconPath: '/instagram.png' // Pastikan file ini ada di folder /public
    },
    { 
      name: 'YouTube', 
      url: 'https://youtube.com/@Channel Bina Shaliha', 
      handle: 'Channel Bina Shaliha', 
      iconPath: '/youtube.png' // Pastikan file ini ada di folder /public
    },
  ];

  return (
    <footer className="bg-green-950 text-white py-16 px-4 border-t-4 border-yellow-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Kolom 1: Logo & Nama Sekolah */}
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <Image 
                src="/logo-bs.png" // Pastikan file logo ini ada di folder /public
                alt="Logo SIT Bina Shaliha" 
                width={70} 
                height={70} 
                className="bg-white p-1 rounded-full shadow-md object-contain" // object-contain menjaga proporsi logo
            />
            <div>
              <h4 className="text-lg font-bold leading-tight text-white">Yayasan Al Musthofaiyah</h4>
              <h3 className="text-2xl font-extrabold text-yellow-400 leading-tight">Sekolah Islam Bina Shaliha</h3>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed italic text-sm">
            "TUMBUH BERSAMA DALAM BINGKAI ISLAM MENUJU GENERASI UNGGUL"
          </p>
        </div>

        {/* Kolom 2: Lokasi */}
        <div>
          <h4 className="font-bold mb-6 text-yellow-400 uppercase tracking-wider border-b border-yellow-500/30 pb-2 w-fit">Lokasi Kami</h4>
          <div className="text-gray-300 leading-relaxed text-sm">
            <span className="font-bold text-white block mb-1">Unit TK & SD:</span>
            Jl. Rajawali No. 052 Rt. 005/004<br />
            Kec. Beji, Kota Depok, 16421
          </div>
        </div>

        {/* Kolom 3: Kontak */}
        <div>
          <h4 className="font-bold mb-6 text-yellow-400 uppercase tracking-wider border-b border-yellow-500/30 pb-2 w-fit">Kontak</h4>
          <div className="text-gray-300 space-y-2 text-sm">
            <p><span className="font-bold text-white">Telp:</span> 021 - 7752794</p>
            <p><span className="font-bold text-white">WA:</span> +62 858-8302-7847</p>
          </div>
        </div>

        {/* Kolom 4: Media Sosial (REVISI: WARNA ASLI) */}
        <div>
          <h4 className="font-bold mb-6 text-yellow-400 uppercase tracking-wider border-b border-yellow-500/30 pb-2 w-fit">Media Sosial</h4>
          <div className="flex flex-col gap-4">
            {socialMedia.map((social, i) => (
              <a 
                key={i} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-3 hover:translate-x-2 transition-transform duration-300"
              >
                {/* Background kotak icon dibuat transparan (bg-white/5) agar warna asli logo menonjol */}
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-white/10 transition-all duration-300 flex items-center justify-center shadow-inner">
                  <Image 
                    src={social.iconPath}
                    alt={social.name}
                    width={28} // Sedikit diperbesar agar lebih jelas
                    height={28}
                    className="object-contain" // object-contain memastikan logo tidak gepeng
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{social.name}</span>
                  <span className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">{social.handle}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>

      <div className="text-center mt-16 pt-8 border-t border-green-900 text-gray-400 text-sm">
        © {new Date().getFullYear()} Sekolah Islam Bina Shaliha. All Rights Reserved.<br />
        <span className="italic mt-2 block text-gray-500 font-medium">Mendidik dengan Hati, Membina dengan Sunnah.</span>
      </div>
    </footer>
  );
}