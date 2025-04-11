const express = require("express");
const Transaction = require("../models/transaction");
const TransactionTwo = require("../models/transactionTwo");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// Fetch All Transactions
router.get("/", async (req, res) => {
    
    try {
        const transactions = await TransactionTwo.find();
        res.json(transactions);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
});

// Fetch Transactions by School
router.get("/school_id/:school_id", async (req, res) => {
  const transactions = await TransactionTwo.find({ school_id: req.params.school_id });
  res.json(transactions);
});

// Check Transaction Status
router.get("/status/:collect_id", async (req, res) => {
    try {
        const { collect_id } = req.params;
    
        // Find transaction with matching collect_id
        const transactionTwo = await TransactionTwo.findOne({ collect_id });
    
        if (!transactionTwo) {
          return res.status(404).json({ message: "Transaction not found" });
        }
    
        // Return only the status field
        res.json({ status: transactionTwo});
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      }
});

// Webhook to update transaction status
router.post("/webhook/status-update", async (req, res) => {
  const { order_info } = req.body;
  console.log(order_info);
  const transactionWebhook = await TransactionTwo.findOneAndUpdate(
    { collect_id: order_info.collect_id },
    { transaction_amount: order_info.transaction_amount, status: order_info.status },
    { new: true }
  );

  if (!transactionWebhook) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  res.json({ message: "Transaction updated", transactionWebhook});
});

// Manually update transaction status
router.post("/update", async (req, res) => {
  const { custom_order_id, status } = req.body;

  const transactionManual = await TransactionTwo.findOneAndUpdate(
    { custom_order_id },
    { status },
    { new: true }
  );  

  if (!transactionManual) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  res.json({ message: "Transaction manually updated", transactionManual });
});

// Protected Route - Only Authenticated Users Can Access
router.get("/protected-transactions", authMiddleware, async (req, res) => {
  try {
    const transactions = await TransactionTwo.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;