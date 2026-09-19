import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails({ addToCart }) {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `http://localhost:5000/products/${id}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Product not found"
                    );
                }

                setProduct(data);
            } catch (error) {
                console.error(
                    "Product details error:",
                    error
                );

                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="product-details-page">
                <h2>Loading product...</h2>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="product-details-page">
                <h2>
                    {error || "Product not found"}
                </h2>
            </div>
        );
    }

    return (
        <div className="product-details-page">

            <div className="product-details">

                {/* IMAGE */}

                <div className="product-details-image-container">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="product-details-image"
                    />
                </div>


                {/* PRODUCT INFORMATION */}

                <div className="product-details-info">

                    <h1>
                        {product.title}
                    </h1>


                    <div className="product-rating">
                        ⭐ {product.rating || 0} / 5
                    </div>


                    <hr />


                    <p className="product-details-price">
                        ₹{product.price}
                    </p>


                    <p className="product-details-description">
                        {product.description}
                    </p>


                    <p className="product-details-category">
                        <strong>
                            Category:
                        </strong>{" "}
                        {product.category}
                    </p>


                    <p className="product-details-stock">
                        <strong>
                            Available Stock:
                        </strong>{" "}
                        {product.stock}
                    </p>


                    <button
                        className="add-to-cart-btn"
                        onClick={() =>
                            addToCart(product)
                        }
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductDetails;