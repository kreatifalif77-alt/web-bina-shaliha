import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Guru from '@/models/Guru';
import Post from '@/models/Post';
import Faq from '@/models/Faq';
import Testimoni from '@/models/Testimoni';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI);
};

export async function GET() {
  try {
    await connectDB();

    const [totalGuru, totalBerita, totalGaleri, totalFaq, totalTestimoni] = await Promise.all([
      Guru.countDocuments(),
      Post.countDocuments({ kategori: 'berita' }),
      Post.countDocuments({ kategori: 'galeri' }),
      Faq.countDocuments(),
      Testimoni.countDocuments()
    ]);

    return NextResponse.json({
      success: true,
      data: {
        guru: totalGuru,
        berita: totalBerita,
        galeri: totalGaleri,
        faq: totalFaq,
        testimoni: totalTestimoni
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
