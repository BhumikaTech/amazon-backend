import { useState, useEffect } from "react";
import "./ProductSlider.css";
import Product from "./Product";

function ProductSlider({ search, addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="product-slider">
      <h2>Today's Deals</h2>

      <div className="slider">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product
              key={product._id}
              product={product}
              addToCart={addToCart}
            />
          ))
        ) : (
          <h2>No products found.</h2>
        )}
      </div>
    </div>
  );
}

export default ProductSlider;