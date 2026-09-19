import { useEffect, useState } from "react";
import "./order.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/orders",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log("ORDERS DATA:", data);

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch orders"
          );
        }

        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Orders error:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <h2 className="orders-loading">
        Loading orders...
      </h2>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <h1>Your Orders</h1>
        <p>You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>

      {orders.map((order) => (
        <div
          className="order-card"
          key={order._id}
        >
          <div className="order-header">
            <div>
              <p>Order ID</p>
              <strong>{order._id}</strong>
            </div>

            <div>
              <p>Status</p>
              <strong className="order-status">
                {order.status}
              </strong>
            </div>
          </div>

          <hr />

          {order.items && order.items.length > 0 ? (
            order.items.map((item) => (
              <div
                className="order-item"
                key={item._id || item.productId}
              >
                <div>
                  <h3>{item.title}</h3>

                  <p>
                    Price: ₹{item.price}
                  </p>

                  <p>
                    Quantity: {item.quantity}
                  </p>
                </div>

                <strong>
                  ₹{item.price * item.quantity}
                </strong>
              </div>
            ))
          ) : (
            <p>No items found in this order.</p>
          )}

          <hr />

          <div className="order-total">
            <strong>
              Total: ₹{order.totalAmount}
            </strong>
          </div>

          {order.shippingAddress && (
            <div className="shipping-address">
              <h3>Shipping Address</h3>

              <p>
                {order.shippingAddress.name}
              </p>

              <p>
                {order.shippingAddress.address}
              </p>

              <p>
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.state}
              </p>

              <p>
                PIN: {order.shippingAddress.pincode}
              </p>

              <p>
                Phone: {order.shippingAddress.phone}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Orders;