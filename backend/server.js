const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

const authMiddleware = require("./middleware/authMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");

dotenv.config();

const app = express();

// =========================
// DEBUG
// =========================

console.log("authMiddleware:", typeof authMiddleware);
console.log("adminMiddleware:", typeof adminMiddleware);
console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);

// =========================
// CORS
// =========================

app.use(cors());

// =========================
// BODY PARSER
// =========================

app.use(express.json());

// =========================
// DATABASE
// =========================

connectDB();

// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
    res.json({
        message: "Amazon Clone Backend is running"
    });
});

// =========================
// AUTH ROUTES
// =========================

app.use("/auth", authRoutes);

// =========================
// USER ROUTES
// =========================

app.use("/users", userRoutes);

// =========================
// PRODUCT ROUTES
// =========================

app.use("/products", productRoutes);

// =========================
// CART ROUTES
// =========================

app.use("/cart", cartRoutes);

// =========================
// ORDER ROUTES
// =========================

app.use("/orders", orderRoutes);

// =========================
// PROTECTED ROUTES
// =========================

app.use("/protected", protectedRoutes);

// =========================
// ERROR HANDLER
// =========================

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: "Server error",
        error: err.message
    });
});

// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});