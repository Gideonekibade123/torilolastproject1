import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://mascofashion.onrender.com/api/shop/products/${id}/`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ width: "300px" }} />
      <p>Price: ₦{product.price}</p>
      <button className="btn btn-dark" onClick={() => addToCart(product)}>
        Add to Cart 🛒
      </button>
    </div>
  );
};

export default ProductPage;