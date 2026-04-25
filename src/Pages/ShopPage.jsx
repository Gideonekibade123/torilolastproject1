import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

/* 🔹 IMAGE CAROUSEL */
function ImageCarousel({ images, isActive }) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (isActive) setIndex(0);
  }, [isActive]);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div style={{ position: "relative" }}>
      <img
        src={images[index]}
        alt="product"
        className="card-img-top"
        style={{
          height: isActive ? "240px" : "200px",
          objectFit: "cover",
          transition: "0.3s",
        }}
      />
      {isActive && images.length > 1 && (
        <>
          <button onClick={prev} style={btnStyle("left")}>‹</button>
          <button onClick={next} style={btnStyle("right")}>›</button>
        </>
      )}
    </div>
  );
}

const btnStyle = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: "10px",
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.6)",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
  borderRadius: "50%",
});

/* 🔹 COLOR SELECTOR */
function ColorSelector({ colors, selectedColor, onSelect }) {
  return (
    <div className="d-flex justify-content-center gap-2 mb-2">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onSelect(color)}
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            border: selectedColor === color ? "2px solid #000" : "1px solid #ccc",
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
}

/* 🔹 SIZE SELECTOR */
function SizeSelector({ sizes, selectedSize, onSelect }) {
  return (
    <div className="d-flex justify-content-center gap-2 mb-3">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onSelect(size)}
          className="btn btn-sm"
          style={{
            border: selectedSize === size ? "2px solid #000" : "1px solid #ccc",
            fontWeight: selectedSize === size ? "bold" : "normal",
            background: "white",
          }}
        >
          {size}
        </button>
      ))}
    </div>
  );
}

/* 🔹 SHOP PAGE */
function ShopPage() {
  const { cart, addToCart } = useCart();

  const [products, setProducts] = React.useState([]);
  const [activeProductId, setActiveProductId] = React.useState(null);
  const [selectedColors, setSelectedColors] = React.useState({});
  const [selectedSizes, setSelectedSizes] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  /* 🔹 SEARCH STATE */
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://mascofashion.onrender.com/api/shop/products/");
        const data = await res.json();

        const formatted = data.map((item) => ({
          id: item.id,
          name: item.name,
          price: parseFloat(item.price),
          // images: item.images.length
            // ? item.images.map((img) => `https://mascofashion.onrender.com${img.image}`)
            // : ["https://via.placeholder.com/300x300?text=No+Image"],
          images: item.images.length
             ? item.images.map((img) => img.image_url)
             : ["https://via.placeholder.com/300x300?text=No+Image"],

          colors: ["black", "white", "gray"],
          sizes: ["S", "M", "L"],
        }));

        setProducts(formatted);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* 🔹 FILTER PRODUCTS */
  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();

    return (
      product.name.toLowerCase().includes(term) ||
      product.price.toString().includes(term)
    );
  });

  const handleAddToCart = (item) => {
    addToCart({
      ...item,
      selectedColor: selectedColors[item.id] || item.colors[0],
      selectedSize: selectedSizes[item.id] || item.sizes[0],
    });
  };

  if (loading) return <div className="text-center mt-5">Loading products...</div>;

  return (
    <div className="container mt-4">
      {/* HEADER */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <h2>Shop Page</h2>

        <input
          type="text"
          className="form-control"
          placeholder="Search product or price..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: "300px" }}
        />

        <Link to="/CartPage" className="btn btn-primary position-relative">
          🛒 Cart
          {cart.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cart.length}
            </span>
          )}
        </Link>
      </div>

      {/* PRODUCTS */}
      {filteredProducts.length === 0 ? (
        <h3>No product found</h3>
      ) : (
        <div className="row text-center">
          {filteredProducts.map((item) => (
            <div className="col-md-3 mb-4" key={item.id}>
              <div
                className="card shadow-sm p-2"
                onClick={() => setActiveProductId(item.id)}
                style={{
                  cursor: "pointer",
                  transform: activeProductId === item.id ? "scale(1.05)" : "scale(1)",
                  border: activeProductId === item.id ? "2px solid #00FFFF" : "1px solid #ddd",
                  transition: "0.3s",
                }}
              >
                <ImageCarousel images={item.images} isActive={activeProductId === item.id} />

                <div className="card-body">
                  <h5 style={{ fontWeight: activeProductId === item.id ? "bold" : "normal" }}>
                    {item.name}
                  </h5>

                  <p>₦{item.price}</p>

                  <ColorSelector
                    colors={item.colors}
                    selectedColor={selectedColors[item.id]}
                    onSelect={(color) =>
                      setSelectedColors({ ...selectedColors, [item.id]: color })
                    }
                  />

                  <SizeSelector
                    sizes={item.sizes}
                    selectedSize={selectedSizes[item.id]}
                    onSelect={(size) =>
                      setSelectedSizes({ ...selectedSizes, [item.id]: size })
                    }
                  />

                  <button
                    className="btn btn-dark w-100"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShopPage;








