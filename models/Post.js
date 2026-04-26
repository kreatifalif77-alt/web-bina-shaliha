import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  deskripsiSingkat: { type: String, required: true },
  isiLengkap: { type: String, required: true },
  
  // Kita ubah menjadi Array agar Galeri bisa isi banyak foto
  images: [{ type: String }], 
  
  // Untuk kompatibilitas (jika ada kode lama yang panggil fotoUrl)
  fotoUrl: { type: String }, 

  kategori: { 
    type: String, 
    enum: ['galeri', 'berita'], 
    required: true 
  },
  unit: { 
    type: String, 
    enum: ['TK', 'SD'], 
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);