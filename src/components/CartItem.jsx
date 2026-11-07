// One row in the cart. It shows data and reports clicks upward; it owns no state.
function CartItem({ line, onChangeQty, onRemove, onUpdateNote }) {
    // Destructure 'item' object, 'qty' number, and 'note' string from the 'line' prop
    const { item, qty, note = '' } = line
    return (
        <li className="cart-line">
            <div>
                <p className="cart-name">{item.name}</p>
                <p className="muted">RM {item.price.toFixed(2)} each</p>
            </div>
            <div className="qty">
                <button type="button" onClick={() => onChangeQty(item.id, -1)}>
                    −
                </button>
                <span>{qty}</span>
                <button type="button" onClick={() => onChangeQty(item.id, 1) }>
                    +
                </button>
            </div>
            <p className="line-total">RM {(item.price * qty).toFixed(2)}</p>
            <button 
                type="button" 
                className="link danger" 
                onClick={() => onRemove(item.id)}
            >
                Remove
            </button>
            {/* Personal Feature (Digit 7): Controlled textarea for item notes */}
            <div className="cart-note-box">
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
            </div>
        </li>
    )
}
export default CartItem