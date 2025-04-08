const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected Successfully");

//     if (mongoose.connection.readyState === 1) {
//   const collections = await mongoose.connection.db.listCollections().toArray();
//   console.log("Available Collections:");
//   collections.forEach((i) => console.log(`- ${i.name}`));
// } else {
//   mongoose.connection.once("open", async () => {
//     const collections = await mongoose.connection.db.listCollections().toArray();
//     console.log("Available Collections:");
//     collections.forEach((col) => console.log(`- ${col.name}`));
//   });
}
  catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
