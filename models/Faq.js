import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  pertanyaan: {
    type: String,
    required: [true, 'Pertanyaan wajib diisi'],
  },
  jawaban: {
    type: String,
    required: [true, 'Jawaban wajib diisi'],
  },
  urutan: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

export default mongoose.models.Faq || mongoose.model('Faq', faqSchema);
