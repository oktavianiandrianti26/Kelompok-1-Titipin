const express = require("express");
const {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById,
  updateTransactionByBarangId,
} = require("../controllers_user/transactionController");
const authenticateToken = require("../middleware/auth");
const router = express.Router();

router.post("/", authenticateToken, createTransaction);
router.get("/", authenticateToken, getAllTransactions);
router.get("/:id", authenticateToken, getTransactionById);
router.put("/:id", authenticateToken, updateTransactionById);
router.put("/barang/:id", authenticateToken, updateTransactionByBarangId);
router.delete("/:id", authenticateToken, deleteTransactionById);

module.exports = router;
