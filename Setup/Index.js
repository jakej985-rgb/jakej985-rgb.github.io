const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// =======================
// 📂 File Upload Setup
// =======================
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// serve uploaded images
app.use("/uploads", express.static("uploads"));

// =======================
// 🧪 Test API
// =======================
app.get("/api", (req, res) => {
  res.json({ message: "Tattoo API running 🔥" });
});

// sample tattoos endpoint
app.get("/api/tattoos", (req, res) => {
  res.json([
    {
      id: 1,
      artist: "Jake",
      style: "Blackwork",
      image: "/uploads/sample.jpg"
    }
  ]);
});

// upload endpoint
app.post("/api/upload", upload.single("image"), (req, res) => {
  res.json({
    message: "Upload successful",
    file: req.file.filename
  });
});

// =======================
// 🌐 Serve Web App
// =======================
app.use(express.static(path.join(__dirname, "web")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "web", "index.html"));
});

// =======================
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
