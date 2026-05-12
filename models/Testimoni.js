import mongoose from 'mongoose';

const testimoniSchema = new mongoose.Schema({
  namaWali: {
    type: String,
    required: [true, 'Nama wali murid wajib diisi'],
  },
  namaSiswa: {
    type: String,
    required: [true, 'Nama siswa wajib diisi'],
  },
  angkatan: {
    type: String,
  },
  pesan: {
    type: String,
    required: [true, 'Pesan testimoni wajib diisi'],
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

export default mongoose.models.Testimoni || mongoose.model('Testimoni', testimoniSchema);
