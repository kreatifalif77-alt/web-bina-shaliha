import dbConnect from '@/lib/dbConnect'; // Pastikan path ini benar (sesuaikan dengan lokasi file dbConnect Anda)
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { email, password } = body;

    // 1. Cari User
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: 'Admin tidak ditemukan' }, { status: 400 });
    }

    // 2. Cek Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Password salah' }, { status: 400 });
    }

    // 3. Buat Token
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET || 'secret_fallback', // Gunakan fallback jika env lupa diisi
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({ 
      success: true, 
      token, 
      message: 'Login Berhasil' 
    });

    return response;

  } catch (error) {
    // Teks ini akan muncul di terminal VS Code (hitam), bukan di browser (F12)
    console.error("DETEKSI ERROR LOGIN:", error.message);
    
    return NextResponse.json({ 
      success: false, 
      message: "Terjadi kesalahan pada server: " + error.message 
    }, { status: 500 });
  }
}