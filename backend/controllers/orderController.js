const Order = require("../models/order");
const Cart = require("../models/cart");

// =========================
// CREATE ORDER
// =========================

const createOrder = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { shippingAddress } = req.body;

        if (!shippingAddress) {
            return res.status(400).json({
                message: "Shipping address is required"
            });
        }

        const cart = await Cart.findOne({ userId })
            .populate("items.productId");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        const orderItems = cart.items.map((item) => ({
            productId: item.productId._id,
            title: item.productId.title,
            price: item.productId.price,
            quantity: item.quantity
        }));

        const totalAmount = orderItems.reduce(
            (total, item) => {
                return total + item.price * item.quantity;
            },
            0
        );

        const order = new Order({
            userId,
            items: orderItems,
            totalAmount,
            shippingAddress
        });

        await order.save();

        // Clear cart after order
        cart.items = [];
        await cart.save();

        res.status(201).json({
            message: "Order created successfully",
            order
        });

    } catch (error) {
        next(error);
    }
};


// =========================
// GET LATEST USER ORDER
// =========================

const getUserOrders = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const orders = await Order.find({ userId })
            .populate("items.productId")
            .sort({ createdAt: -1 })
            .limit(1);

        res.status(200).json(orders);

    } catch (error) {
        next(error);
    }
};


// =========================
// EXPORT CONTROLLERS
// =========================

module.exports = {
    createOrder,
    getUserOrders
};