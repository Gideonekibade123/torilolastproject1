import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/shop/orders/${orderId}/`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unable to fetch order details");
        }

        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading order confirmation...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center text-danger">
        <h4>{error}</h4>
        <Link to="/Thankyou" className="btn btn-primary mt-3">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-success mb-3">🎉 Thank you for your order!</h2>

        <p>
          <strong>Order ID:</strong> {order?.id}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span className="badge bg-success">
            {order?.status || "Paid"}
          </span>
        </p>

        <p>
          <strong>Total Amount:</strong> ₦
          {Number(order?.total_amount || 0).toLocaleString()}
        </p>

        <hr />

        <h5>Items Purchased</h5>

        <ul className="list-group mb-3">
          {order?.items?.length ? (
            order.items.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between"
              >
                <span>
                  {item.product_name} × {item.quantity}
                </span>
                <span>₦{Number(item.price).toLocaleString()}</span>
              </li>
            ))
          ) : (
            <li className="list-group-item">No items found</li>
          )}
        </ul>

        <div className="d-flex gap-3">
          <Link to="/ShopPage" className="btn btn-outline-primary">
            Continue Shopping
          </Link>

          <Link to={`/orders/${order?.id}`} className="btn btn-primary">
            View Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
