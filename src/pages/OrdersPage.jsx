import { useCart } from '../hooks/useCart.js'

export default function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return <p className="muted">No orders placed yet.</p>
  }

  return (
    <section>
      <h2 className="section-title">My Orders</h2>
      <div className="cart-list">
        {orders.map((order) => (
          <div key={order.id} className="card" style={{ marginBottom: '1rem' }}>
            <h3>Order #{order.id}</h3>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Pickup Location:</strong> {order.mahallah}</p>
            <p><strong>Pickup Time:</strong> {order.pickupTime}</p>
            <p><strong>Total Paid:</strong> RM {order.total.toFixed(2)}</p>
            <ul>
              {order.items.map((line) => (
                <li key={line.item.id}>
                  {line.qty}x {line.item.name} (RM {(line.item.price * line.qty).toFixed(2)})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}