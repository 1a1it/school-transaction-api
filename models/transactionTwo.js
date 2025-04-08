const mongoose = require("mongoose");

const TransactionSchemaTwo = new mongoose.Schema(
  {
    collect_id: String,
    status: String,
    gateway: String,
    order_amount: Number,
    transaction_amount: Number,
    status: String,
    bank_refrence: String,
    custom_order_id: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "TransactionTwo",
  TransactionSchemaTwo,
  "collect_request_status"
);
