import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const databaseConnection = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((error) => console.log("❌ MongoDB connection error:", error));
};

export default databaseConnection;
