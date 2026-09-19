import { Link } from "react-router-dom";

function Product({ product, addToCart }) {
  return (
    <div className="product-card">

      <Link
        to={`/product/${product._id}`}
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />

        <h3>{product.title}</h3>

        <p>₹{product.price}</p>

        {product.rating && (
          <p>⭐ {product.rating}</p>
        )}
      </Link>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default Product;