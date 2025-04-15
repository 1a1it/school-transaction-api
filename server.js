require('dotenv').config()
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const mongoose = require("mongoose");
const Transaction = require("./models/transaction"); //testing 
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "transaction-fe.vercel.app", 
}));

// Import routes
const transactionsRouter = require("./routes/transactionRoutes");
app.use("/transactions", transactionsRouter);

// Import auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);


// //testing (display all transactions)
// app.get("/", async (req, res) => {
//     const transactions = await Transaction.find();
//     res.json(transactions);
// }); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});