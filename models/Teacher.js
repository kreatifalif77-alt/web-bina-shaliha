import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  gelar: { type: String }, // Contoh: S.Pd, M.Pd
  bidangGuru: { type: String, required: true }, // Contoh: Guru Fiqih, Walikelas
  pendidikanTerakhir: { type: String }, // Contoh: S1 Pendidikan Agama Islam
  universitas: { type: String }, // Contoh: UIN Sunan Kalijaga
  foto: { type: String, default: '' }, 
}, { timestamps: true });

export default mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);