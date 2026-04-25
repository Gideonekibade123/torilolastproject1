import React from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card p-3 shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="img-fluid"
        style={{ height: "200px", objectFit: "cover" }}
      />

      <h5 className="mt-3">{product.name}</h5>
      <p className="text-muted">₦{product.price.toLocaleString()}</p>

      <button
        className="btn btn-dark w-100"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;







{/*import React from "react";
   import { useCart } from "../context/CartContext"; 
   const ProductCard = ({ product }) => { const { addToCart } = useCart();
    return ( <div className="card p-3 shadow-sm"> 
    <img src={product.image} alt={product.name} 
    className="img-fluid" style={{ height: "200px", objectFit: "cover" }} />
     <h5 className="mt-3">{product.name}</h5> 
     <p className="text-muted">₦{product.price.toLocaleString()}</p>
      <button className="btn btn-dark w-100" onClick={() => addToCart(product)} > 
      Add to Cart </button> </div> ); }; export default ProductCard;}