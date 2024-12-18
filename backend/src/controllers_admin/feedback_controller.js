const Feedback = require('../models/feedback_model');
const ResponseAPI = require('../utils/response');
const User = require('../models/user_model');
const Admin = require('../models/admin_model');

class FeedbackController {
    async createFeedback(req, res) {
      try {
        // Log request body untuk debugging
        console.log('Request Body:', req.body);
        console.log('User:', req.user);
  
        const { isi_feedback } = req.body;
  
        // Validasi input
        if (!isi_feedback) {
          return ResponseAPI.badRequest(res, 'Feedback tidak boleh kosong');
        }
  
        // Pastikan user_id benar-benar ada
        if (!req.user || !req.user.user_id) {
          return ResponseAPI.unauthorized(res, 'User tidak terautentikasi');
        }
  
        const newFeedback = new Feedback({
          user_id: req.user.user_id,
          isi_feedback
        });
  
        await newFeedback.save();
  
        return ResponseAPI.created(res, newFeedback, 'Feedback berhasil dikirim');
      } catch (error) {
        console.error('Error creating feedback:', error);
        return ResponseAPI.internalServerError(res, {
          message: error.message,
          stack: error.stack
        });
      }
    }

  // Mendapatkan semua feedback (untuk admin)
  async getAllFeedbacks(req, res) {
    try {
        const feedbacks = await Feedback.find()
            .populate('user_id', 'name email') // Mengambil data user terkait
            .sort({ tanggal: -1 }); // Urutkan berdasarkan tanggal terbaru

        if (!feedbacks || feedbacks.length === 0) {
            return ResponseAPI.success(res, [], 'Belum ada feedback');
        }

        return ResponseAPI.success(res, feedbacks, 'Daftar feedback');
    } catch (error) {
        console.error('Error di getAllFeedbacks:', error);
        return ResponseAPI.internalServerError(res, error.message);
    }
}

  // Admin membalas feedback
  async replyFeedback(req, res) {
    try {
        const user = await Admin.findOne({_id: req.user.user_id});
        if (!user || user.role !== 'admin') {
          console.log (req.user)
           return ResponseAPI.unauthorized(res, 'Hanya admin yang dapat membalas');
        }
        
        const { feedbackId } = req.params;
        const { admin_reply } = req.body;

        return ResponseAPI.success(res, null, 'Balasan berhasil dikirim');
    } catch (error) {
        console.error('Error saat membalas feedback:', error.message);
        return ResponseAPI.internalServerError(res, error.message);
    }
}

  // Mendapatkan feedback user saat ini
  async getUserFeedbacks(req, res) {
    try {
      const user_id = req.user.user_id;
      const feedbacks = await Feedback.find({ user_id })
        .sort({ tanggal: -1 });

      return ResponseAPI.success(res, feedbacks, 'Daftar feedback Anda');
    } catch (error) {
      return ResponseAPI.internalServerError(res, error.message);
    }
  }
}

module.exports = new FeedbackController();
