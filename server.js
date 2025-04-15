require('dotenv').config()
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const mongoose = require("mongoose");
const Transaction = require("./models/transaction"); //testing 
connectDB();

const app = express();
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173', // Local 
  'https://transaction-fe.vercel.app/' 
];

app.use(cors({
  origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT;


const transactionsRouter = require("./routes/transactionRoutes");
app.use("/transactions", transactionsRouter);

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
