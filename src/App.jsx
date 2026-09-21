import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./Home";
import Cart from "./Cart";
import ProductDetails from "./ProductDetails";
import Orders from "./order";
import Checkout from "./Checkout";

import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState("");

  // =========================
  // GET TOKEN
  // =========================

  const getToken = () => {
    return localStorage.getItem("token");
  };

  // =========================
  // FETCH CART
  // =========================

  const fetchCart = async () => {
    const token = getToken();

    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      const response = await fetch(
        "https://amazon-backend-0jvw.onrender.com/cart",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("Cart response:", data);

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setCartItems([]);
          return;
        }

        throw new Error(
          data.message || "Failed to fetch cart"
        );
      }

      setCartItems(data.items || []);
    } catch (error) {
      console.error("Cart error:", error);
    }
  };

  // =========================
  // LOAD CART
  // =========================

  useEffect(() => {
    fetchCart();
  }, []);

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = async (product) => {
    const token = getToken();

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const response = await fetch(
        "https://amazon-backend-0jvw.onrender.com/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: product._id,
            quantity: 1,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add product"
        );
      }

      await fetchCart();
    } catch (error) {
      console.error(
        "Add to cart error:",
        error
      );

      alert(error.message);
    }
  };

  // =========================
  // INCREASE QUANTITY
  // =========================

  const increaseQuantity = async (productId) => {
    const token = getToken();

    if (!token) {
      alert("Please login first");
      return;
    }

    const item = cartItems.find(
      (item) =>
        item.productId?._id === productId
    );

    if (!item) {
      return;
    }

    try {
      const response = await fetch(
        `https://amazon-backend-0jvw.onrender.com/cart/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            quantity: item.quantity + 1,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update quantity"
        );
      }

      await fetchCart();
    } catch (error) {
      console.error(
        "Increase quantity error:",
        error
      );
    }
  };

  // =========================
  // DECREASE QUANTITY
  // =========================

  const decreaseQuantity = async (productId) => {
    const token = getToken();

    if (!token) {
      alert("Please login first");
      return;
    }

    const item = cartItems.find(
      (item) =>
        item.productId?._id === productId
    );

    if (!item) {
      return;
    }

    if (item.quantity === 1) {
      await removeFromCart(productId);
      return;
    }

    try {
      const response = await fetch(
        `https://amazon-backend-0jvw.onrender.com/cart/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            quantity: item.quantity - 1,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to decrease quantity"
        );
      }

      await fetchCart();
    } catch (error) {
      console.error(
        "Decrease quantity error:",
        error
      );
    }
  };

  // =========================
  // REMOVE FROM CART
  // =========================

  const removeFromCart = async (productId) => {
    const token = getToken();

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const response = await fetch(
        `https://amazon-backend-0jvw.onrender.com/cart/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to remove product"
        );
      }

      await fetchCart();
    } catch (error) {
      console.error(
        "Remove cart error:",
        error
      );
    }
  };

  // =========================
  // ROUTES
  // =========================

  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <Home
              cartItems={cartItems}
              search={search}
              setSearch={setSearch}
              addToCart={addToCart}
            />
          }
        />

        {/* PRODUCT DETAILS */}
        <Route
          path="/product/:id"
          element={
            <ProductDetails
              addToCart={addToCart}
            />
          }
        />

        {/* CART */}
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />

        {/* CHECKOUT */}
        <Route
          path="/checkout"
          element={
            <Checkout
              cartItems={cartItems}
            />
          }
        />

        {/* ORDERS */}
        <Route
          path="/orders"
          element={<Orders />}
        />

        {/* SIGN IN */}
        <Route
          path="/signin"
          element={<SignIn />}
        />

        {/* SIGN UP */}
        <Route
          path="/signup"
          element={<SignUp />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;