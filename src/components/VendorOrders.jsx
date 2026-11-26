import { useSubscription } from '../hooks/useSubscription.js'
import { subscribeToVendorOrders, updateOrderStatus, STATUSES } from '../services/orders.js'

function VendorOrders({ ownerUid }) {
  const { data: orders } = useSubscription(subscribeToVendorOrders, [ownerUid], [])
  const active = orders.filter((o) => o.status !== 'Collected')

  return (
    <div className="card">
      <h3>Incoming orders ({active.length})</h3>
      <ul className="cart-list">
        {active.map((order) => {
          const next = STATUSES[STATUSES.indexOf(order.status) + 1]
          return (
            <li key={order.id} className="cart-line">
              <p className="cart-name">{order.studentName} · {order.pickupTime}</p>
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
              <p className="tag">{order.status}</p>
              {next && (
                <button
                  className="btn btn-small"
                  onClick={() => updateOrderStatus(order.id, next)}
                >
                  Mark {next}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default VendorOrders