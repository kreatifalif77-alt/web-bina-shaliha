import mongoose from 'mongoose';

const ProgramSchema = new mongoose.Schema({
  namaProgram: { type: String, required: true },
  deskripsi: String,
  unit: { type: String, enum: ['TK', 'SD'], required: true },
  kategori: { type: String, enum: ['Unggulan', 'Ekskul', 'Kegiatan'], default: 'Unggulan' },
}, { timestamps: true });

export default mongoose.models.Program || mongoose.model('Program', ProgramSchema);