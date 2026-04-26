import mongoose from 'mongoose';

const FasilitasSchema = new mongoose.Schema({
  namaFasilitas: { type: String, required: true },
  fotoUrl: String,
  keterangan: String
}, { timestamps: true });

export default mongoose.models.Fasilitas || mongoose.model('Fasilitas', FasilitasSchema);