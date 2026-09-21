const express = require("express");
require("./db");

const Product = require("./models/product");

const app = express();

const PORT = process.env.PORT || 5000;

// CORS: allow your frontend to call this backend
const allowedOrigins = [
    "http://localhost:5173",
    "https://amazon-clone-react-12.onrender.com"
];

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Vary", "Origin");
    }

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

// Middleware
app.use(express.json());


// Home route
app.get("/", (req, res) => {
    res.send("Amazon Clone Backend");
});


// Get all products
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching products",
            error: error.message
        });
    }
});


// Add a new product
app.post("/products", async (req, res) => {
    try {
        const product = new Product(req.body);

        await product.save();

        res.status(201).json({
            message: "Product added successfully",
            product: product
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding product",
            error: error.message
        });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
