import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
// Impor Model jika sudah ada, jika belum gunakan ini dulu untuk tes
export async function GET() {
  await dbConnect();
  try {
    // Sementara return data kosong dulu agar tidak error
    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}