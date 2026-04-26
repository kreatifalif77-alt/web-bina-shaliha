import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: "File tidak terbaca oleh server" }, { status: 400 });
    }

    // Mengubah file menjadi buffer agar bisa dikirim ke Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Proses upload menggunakan Promise
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { 
          resource_type: 'auto', 
          folder: 'bina-shaliha-uploads',
          // Menambahkan timeout agar tidak gantung
          timeout: 60000 
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Error Detail:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    return NextResponse.json({ url: uploadResponse.secure_url });

  } catch (error) {
    console.error("Full Error System:", error);
    return NextResponse.json({ 
      error: "Gagal upload", 
      message: error.message 
    }, { status: 500 });
  }
}