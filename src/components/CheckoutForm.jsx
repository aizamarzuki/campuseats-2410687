import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCart } from '../hooks/useCart.js'

const MAHALLAHS = ['Ali', 'Aminah', 'Faruq', 'Asiah', 'Bilal', 'Hafsa', 'Uthman', 'Zubair']

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 3) errors.name = 'Enter your name (at least 3 characters).'
  if (!values.mahallah) errors.mahallah = 'Please select a Mahallah.'
  if (!values.pickupTime) {
    errors.pickupTime = 'Select a pickup time.'
  } else if (values.pickupTime < '07:00' || values.pickupTime > '22:00') {
    errors.pickupTime = 'Pickup time must be between 07:00 and 22:00.'
  }
  return errors
}

export default function CheckoutForm() {
  const [values, setValues] = useState({ name: '', mahallah: '', pickupTime: '' })
  const [errors, setErrors] = useState({})
  
  const { placeOrder } = useCart()
  const navigate = useNavigate() // Programmatic navigation function

  function handleChange(e) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)

    if (Object.keys(found).length === 0) {
      placeOrder(values)   // 1. Process order in context
      navigate('/orders') // 2. Redirect user to /orders page programmatically
    }
  }

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h3>Checkout</h3>

      <label htmlFor="name">Name</label>
      <input id="name" name="name" value={values.name} onChange={handleChange} />
      {errors.name && <p className="field-error">{errors.name}</p>}

      <label htmlFor="mahallah">Mahallah</label>
      <select id="mahallah" name="mahallah" value={values.mahallah} onChange={handleChange}>
        <option value="">Select…</option>
        {MAHALLAHS.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      {errors.mahallah && <p className="field-error">{errors.mahallah}</p>}

      <label htmlFor="pickupTime">Pickup time</label>
      <input type="time" id="pickupTime" name="pickupTime" value={values.pickupTime} onChange={handleChange} />
      {errors.pickupTime && <p className="field-error">{errors.pickupTime}</p>}

      <button type="submit" className="btn">Place order</button>
    </form>
  )
}