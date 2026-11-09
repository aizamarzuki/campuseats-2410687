import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'

function CartItem({ line, onChangeQty, onRemove, onUpdateNote }) {
  const { item, qty, note = '' } = line
  const { user } = useAuth() // Read user state

  return (
    <li className="cart-line-card">
      <div className="cart-line-main">
        <div className="item-info">
          <p className="cart-name">{item.name}</p>
          <p className="muted">RM {item.price.toFixed(2)} each</p>
        </div>

        <div className="qty-controls">
          <button type="button" onClick={() => onChangeQty(item.id, -1)}>-</button>
          <span>{qty}</span>
          <button type="button" onClick={() => onChangeQty(item.id, 1)}>+</button>
        </div>

        <p className="line-total">RM {(item.price * qty).toFixed(2)}</p>
        
        <button type="button" className="link danger" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>

      {/* Personal Feature (Digit 7 - Week 5 Step) */}
      <div className="cart-note-box">
        {user ? (
          <>
            <label htmlFor={`note-${item.id}`} className="note-label">
              Special instructions / Note:
            </label>
            <textarea
              id={`note-${item.id}`}
              className="note-input"
              value={note}
              placeholder="e.g. Less ice, no sugar, extra sambal..."
              rows="2"
              onChange={(e) => onUpdateNote(item.id, e.target.value)}
            />
          </>
        ) : (
          <p className="muted">
            <Link to="/login">Log in to add notes</Link>
          </p>
        )}
      </div>
    </li>
  )
}

export default CartItem