import dbConnect from '@/lib/dbConnect';
import Teacher from '@/models/Teacher';
import { NextResponse } from 'next/server';

// 1. AMBIL SEMUA GURU (GET)
export async function GET() {
  await dbConnect();
  try {
    const teachers = await Teacher.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: teachers });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

// 2. SIMPAN GURU BARU (POST)
export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const teacher = await Teacher.create(body);
    return NextResponse.json({ success: true, data: teacher });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// 3. EDIT/UPDATE DATA GURU (PUT) - TAMBAHKAN INI
export async function PUT(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "ID diperlukan untuk update" }, { status: 400 });
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(id, body, {
      new: true, // mengembalikan data yang sudah diupdate
      runValidators: true // memastikan data baru tetap sesuai aturan model
    });

    if (!updatedTeacher) {
      return NextResponse.json({ success: false, message: "Data tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedTeacher });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 4. HAPUS GURU (DELETE)
export async function DELETE(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: "ID tidak ditemukan" }, { status: 400 });
    }

    await Teacher.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Data berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}