require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

connectDB();

// 🔥 IMPORTANT ROUTE PREFIX
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server Running ✔");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});