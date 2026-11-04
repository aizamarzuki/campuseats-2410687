import { useParams } from 'react'
import { useVendors } from '../hooks/useVendors.js'
import { useCart } from '../hooks/useCart.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function VendorPage() {
  // Extract dynamic segment ':id' from current URL (e.g., /vendor/kafe-uthman)
  const { id } = useParams()
  const { vendors, loading, error, reload } = useVendors()
  const { addToCart } = useCart()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  // Find vendor matching URL parameter ID
  const vendor = vendors.find((v) => v.id === id)

  // Handle unknown/invalid vendor IDs in URL
  if (!vendor) {
    return (
      <div className="card error">
        <h2>Vendor not found</h2>
        <p>No vendor exists with ID: "{id}"</p>
      </div>
    )
  }

  return (
    <section>
      <h2 className="section-title">Menu: {vendor.name}</h2>
      <p className="muted">{vendor.location} • Open: {vendor.openHours}</p>
      <MenuList items={vendor.menu} onAdd={addToCart} />
    </section>
  )
}
export default VendorPage