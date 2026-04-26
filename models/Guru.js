import mongoose from 'mongoose';

const GuruSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  jabatan: { type: String, required: true }, // Contoh: Wali Kelas, Admin TU, Security
  unit: { type: String, enum: ['TK', 'SD', 'Yayasan'], required: true },
  jenis: { type: String, enum: ['Pendidik', 'Kependidikan'], required: true }, // PENTING: Untuk memisahkan Guru & Staff Operasional
  fotoUrl: { type: String, required: true },
  urutan: { type: Number, default: 0 }, // Untuk mengatur siapa yang tampil di atas
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Guru || mongoose.model('Guru', GuruSchema);