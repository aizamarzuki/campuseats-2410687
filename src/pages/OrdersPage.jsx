import { useCart } from '../hooks/useCart.js'
import { Link } from 'react-router'

function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return (
      <div className="card empty-state">
        <h2>No Orders Yet</h2>
        <p className="muted">You haven't placed any orders yet.</p>
        <Link to="/" className="btn">Browse Vendors</Link>
      </div>
    )
  }

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="card order-card">
            <div className="order-header">
              <div>
                <h3>Order #{order.id}</h3>
                <p className="muted">Placed on: {order.date}</p>
              </div>
              <span className="badge-status">Pickup at {order.pickupTime}</span>
            </div>

            <div className="order-details">
              <p><strong>Customer:</strong> {order.name}</p>
              <p><strong>Mahallah:</strong> {order.mahallah}</p>
            </div>

            <hr />

            <ul className="order-items-list">
              {order.items.map((line) => (
                <li key={line.item.id} className="order-item-row">
                  <div>
                    <span>{line.qty}x {line.item.name}</span>
                    {/* Personal Feature (Digit 7): Display saved note if present */}
                    {line.note && line.note.trim() !== '' && (
                      <p className="order-item-note">
                        📝 <em>Note: {line.note}</em>
                      </p>
                    )}
                  </div>
                  <span>RM {(line.item.price * line.qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <div className="order-footer">
              <strong>Total Paid: RM {order.total.toFixed(2)}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrdersPage