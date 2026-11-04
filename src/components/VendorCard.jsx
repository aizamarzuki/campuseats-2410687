import { Link } from 'react-router'

function VendorCard({ vendor }) {
  return (
    // Replaces button/div click handlers with declarative URL routing links
    <Link to={`/vendor/${vendor.id}`} className="card vendor-card">
      <div className="thumb" aria-hidden="true">{vendor.name.charAt(0)}</div>
      <div>
        <h3>{vendor.name}</h3>
        <p className="muted">{vendor.location}</p>
        <p className="muted">Open: {vendor.openHours}</p>
        <span className={vendor.isOpen ? 'status open' : 'status closed'}>
          {vendor.isOpen ? 'Open now' : 'Closed'}
        </span>
      </div>
    </Link>
  )
}
export default VendorCard