import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCart } from '../hooks/useCart.js'

// Array of options for the Mahallah (dormitory) dropdown selector
const MAHALLAHS = ['Ali', 'Aminah', 'Faruq', 'Asiah', 'Bilal', 'Hafsa', 'Uthman', 'Zubair']

/**
 * Pure helper function: validate
 * Validates form input fields manually and returns an object containing field errors.
 * 
 * @param {Object} values - Current form input values { name, mahallah, pickupTime }
 * @returns {Object} errors - Object containing error messages keyed by input name
 */
function validate(values) {
  const errors = {}

  // 1. Name validation: must not be empty after trimming whitespace and must be >= 3 chars
  if (values.name.trim().length < 3) {
    errors.name = 'Enter your name (at least 3 characters).'
  }

  // 2. Mahallah validation: must select an option from the dropdown
  if (!values.mahallah) {
    errors.mahallah = 'Please select a Mahallah.'
  }

  // 3. Pickup time validation: required and must fall between 07:00 and 22:00
  if (!values.pickupTime) {
    errors.pickupTime = 'Select a pickup time.'
  } else if (values.pickupTime < '07:00' || values.pickupTime > '22:00') {
    errors.pickupTime = 'Pickup time must be between 07:00 and 22:00.'
  }

  return errors
}

/**
 * Component: CheckoutForm
 * Manages user checkout details, runs client-side validation, submits orders to Context, 
 * and programmatically navigates to the Orders page.
 */
function CheckoutForm() {
  // Controlled component state for holding form field inputs
  const [values, setValues] = useState({ name: '', mahallah: '', pickupTime: '' })
  
  // State for storing validation error messages
  const [errors, setErrors] = useState({})
  
  // Custom hook: extracts order placement action from global CartContext
  const { placeOrder } = useCart()

  // React Router hook: enables programmatic URL navigation in JavaScript event handlers
  const navigate = useNavigate()

  /**
   * Universal change handler for controlled inputs
   * Uses ES6 dynamic computed property names ([name]: value) to update state dynamically.
   */
  function handleChange(e) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  /**
   * Form submission handler
   */
  function handleSubmit(e) {
    // Prevent default browser page reload on form submission
    e.preventDefault()

    // Execute validation helper
    const found = validate(values)
    setErrors(found)

    // Object.keys(found).length === 0 checks if the error object is empty
    if (Object.keys(found).length === 0) {
      // 1. Dispatch action to CartContext: saves order to localStorage history and clears cart
      placeOrder(values)

      // 2. Programmatically redirect user to '/orders' route upon successful order creation
      navigate('/orders')
    }
  }

  return (
    /* noValidate disables native browser tooltips so our custom React validation error text displays cleanly */
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h3>Checkout</h3>

      {/* --- NAME INPUT --- */}
      <label htmlFor="name">Name</label>
      <input 
        id="name" 
        name="name" 
        value={values.name} 
        onChange={handleChange} 
      />
      {/* Conditional rendering: displays error message if errors.name exists */}
      {errors.name && <p className="field-error">{errors.name}</p>}

      {/* --- MAHALLAH DROPDOWN --- */}
      <label htmlFor="mahallah">Mahallah</label>
      <select 
        id="mahallah" 
        name="mahallah" 
        value={values.mahallah} 
        onChange={handleChange}
      >
        <option value="">Select…</option>
        {MAHALLAHS.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      {errors.mahallah && <p className="field-error">{errors.mahallah}</p>}

      {/* --- PICKUP TIME INPUT --- */}
      <label htmlFor="pickupTime">Pickup time</label>
      <input 
        type="time" 
        id="pickupTime" 
        name="pickupTime" 
        value={values.pickupTime} 
        onChange={handleChange} 
      />
      {errors.pickupTime && <p className="field-error">{errors.pickupTime}</p>}

      {/* SUBMIT BUTTON */}
      <button type="submit" className="btn">Place order</button>
    </form>
  )
}
export default CheckoutForm