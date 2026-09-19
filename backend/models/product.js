const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        image: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        rating: {
            type: Number,
            default: 0
        },

        stock: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Product =
    mongoose.models.Product ||
    mongoose.model("Product", productSchema);

module.exports = Product;