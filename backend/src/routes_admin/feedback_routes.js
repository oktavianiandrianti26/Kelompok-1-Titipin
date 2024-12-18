const express = require('express');
const router = express.Router();
const FeedbackController = require('../controllers_admin/feedback_controller');
const auth = require('../middleware/auth');

// Rute untuk membuat feedback baru
router.post('/', auth, FeedbackController.createFeedback);

// Rute untuk mendapatkan semua feedback (hanya admin)
router.get('/', auth, FeedbackController.getAllFeedbacks);

// Rute untuk mendapatkan feedback user saat ini
router.get('/user', auth, FeedbackController.getUserFeedbacks);

// Rute untuk admin membalas feedback
router.put('/:feedbackId/reply', auth, FeedbackController.replyFeedback);

module.exports = router;