import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

function Checkout({ cartItems = [] }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const [placingOrder, setPlacingOrder] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.productId.price * item.quantity,
    0
  );

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // PLACE ORDER
  // =========================

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/signin");
      return;
    }

    setPlacingOrder(true);

    try {
      const response = await fetch(
        "http://localhost:5000/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            shippingAddress: formData,
          }),
        }
      );

      const contentType =
        response.headers.get("content-type");

      let data = {};

      if (
        contentType &&
        contentType.includes("application/json")
      ) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to place order"
        );
      }

      alert("Order placed successfully!");

      navigate("/orders");

    } catch (error) {
      console.error(
        "Place order error:",
        error
      );

      alert(error.message);

    } finally {
      setPlacingOrder(false);
    }
  };

  // =========================
  // EMPTY CART
  // =========================

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">

        <h1>Your cart is empty</h1>

        <button
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>

      </div>
    );
  }

  // =========================
  // CHECKOUT PAGE
  // =========================

  return (
    <div className="checkout-page">

      <h1>Checkout</h1>

      <div className="checkout-container">

        {/* =========================
            SHIPPING ADDRESS
        ========================= */}

        <div className="checkout-form">

          <h2>1. Shipping Address</h2>

          <form onSubmit={handlePlaceOrder}>

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

            <label>
              Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
            />

            <label>
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
            />

            <label>
              State
            </label>

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
              required
            />

            <label>
              PIN Code
            </label>

            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter PIN code"
              required
            />

            <label>
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />

            <button
              type="submit"
              className="place-order-button"
              disabled={placingOrder}
            >
              {placingOrder
                ? "Placing Order..."
                : "Place Your Order"}
            </button>

          </form>

        </div>

        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <div className="checkout-summary">

          <h2>Order Summary</h2>

          {cartItems.map((item) => {

            const product = item.productId;

            return (
              <div
                className="checkout-product"
                key={product._id}
              >

                <img
                  src={product.image}
                  alt={product.title}
                />

                <div>

                  <h3>
                    {product.title}
                  </h3>

                  <p>
                    ₹{product.price}
                  </p>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                </div>

              </div>
            );
          })}

          <hr />

          <div className="checkout-total">

            <span>
              Order Total:
            </span>

            <strong>
              ₹{totalPrice}
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;