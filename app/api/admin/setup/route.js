import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  try {
    // Tentukan Email & Password Anda di sini
    const adminEmail = "admin@binashaliha.com";
    const plainPassword = "admin123"; 

    // Cek apakah admin sudah ada biar tidak double
    const existingUser = await User.findOne({ email: adminEmail });
    if (existingUser) {
      return NextResponse.json({ message: "Admin sudah terdaftar sebelumnya!" });
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    await User.create({ 
      email: adminEmail, 
      password: hashedPassword 
    });

    return NextResponse.json({ 
      success: true,
      message: "Akun Admin Berhasil Dibuat!",
      login_detail: {
        email: adminEmail,
        password: plainPassword
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}