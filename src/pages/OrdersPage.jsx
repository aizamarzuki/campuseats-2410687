import { Link } from 'react-router'
import { useMyOrders } from '../hooks/useMyOrders.js'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import OrderStatus from '../components/OrderStatus.jsx'
import OrderActions from '../components/OrderActions.jsx'

function OrdersPage() {
  const { orders, loading, error } = useMyOrders()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />

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
    <section>
      <h2>My orders</h2>
      <p className="muted">Status updates appear here live.</p>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="card">
            <p className="cart-name">{order.vendorName} · pickup {order.pickupTime}</p>
            
            {/* Render items and Digit 7 saved notes */}
            <ul className="order-items-breakdown">
              {order.items.map((item, idx) => (
                <li key={item.itemId || idx}>
                  <span>{item.qty}× {item.name}</span>
                  {item.note && item.note.trim() !== '' && (
                    <span className="muted"> — Note: <em>{item.note}</em></span>
                  )}
                </li>
              ))}
            </ul>

            <p className="muted">
              Placed {order.createdAt ? order.createdAt.toDate().toLocaleString('en-MY') : 'just now'}
            </p>
            <p className="price">RM {order.total.toFixed(2)}</p>
            
            <OrderStatus status={order.status} />
            {order.status === 'Received' && <OrderActions order={order} />}
          </li>
        ))}
      </ul>
    </section>
  )
}
export default OrdersPage