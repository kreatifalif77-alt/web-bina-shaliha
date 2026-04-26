import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// 1. AMBIL DATA (GET)
export async function GET(req) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); 
    const kategori = searchParams.get('kategori');
    const unit = searchParams.get('unit');

    if (id) {
      const post = await Post.findById(id);
      if (!post) {
        return NextResponse.json({ success: false, message: "Data tidak ditemukan" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: post });
    }

    let query = {};
    if (kategori && kategori !== 'undefined') {
      query.kategori = kategori;
    }
    if (unit && unit !== 'undefined') {
      query.unit = unit;
    }

    const posts = await Post.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: posts }, {
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// 2. SIMPAN DATA BARU (POST)
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    if (!body.judul || !body.images || body.images.length === 0) {
      return NextResponse.json({ success: false, error: "Judul dan minimal 1 foto wajib diisi" }, { status: 400 });
    }

    const post = await Post.create(body);
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 3. UPDATE DATA (PUT) - TAMBAHKAN INI UNTUK FITUR EDIT
export async function PUT(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "ID diperlukan untuk update" }, { status: 400 });
    }

    // findByIdAndUpdate akan mencari data berdasarkan ID dan menggantinya dengan body baru
    const updatedPost = await Post.findByIdAndUpdate(id, body, { 
      new: true, // Mengembalikan data yang sudah terbaru
      runValidators: true // Memastikan data tetap valid sesuai model
    });

    if (!updatedPost) {
      return NextResponse.json({ success: false, message: "Data tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedPost });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 4. HAPUS DATA (DELETE)
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ success: false, message: "ID tidak ditemukan" }, { status: 400 });

    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) return NextResponse.json({ success: false, message: "Data tidak ditemukan" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Konten berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}