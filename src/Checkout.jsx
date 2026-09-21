import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cartItems }) {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!address.trim()) {
      alert("Please enter your delivery address");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/signin");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://amazon-clone-react-2026.onrender.com/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: cartItems,
            totalAmount,
            address,
            paymentMethod,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      alert("Order placed successfully!");

      navigate("/orders");
    } catch (error) {
      console.error("Place order error:", error);
      alert(error.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <div className="checkout-details">
          <h2>Delivery Address</h2>

          <form onSubmit={handlePlaceOrder}>
            <textarea
              placeholder="Enter your delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="5"
            />

            <h2>Payment Method</h2>

            <label>
              <input
                type="radio"
                value="Cash on Delivery"
                checked={paymentMethod === "Cash on Delivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>

            <br />

            <label>
              <input
                type="radio"
                value="Online Payment"
                checked={paymentMethod === "Online Payment"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Online Payment
            </label>

            <br />

            <button type="submit" disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item._id}>
              <p>{item.title}</p>
              <p>
                ₹{item.price} × {item.quantity}
              </p>
              <p>₹{item.price * item.quantity}</p>
            </div>
          ))}

          <hr />

          <h2>Total: ₹{totalAmount}</h2>
        </div>
      </div>
    </div>
  );
}

export default Checkout;