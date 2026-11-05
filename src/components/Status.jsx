/**
 * Named Export: Loading Component
 * Displays a lightweight feedback indicator while asynchronous data is fetching.
 * Uses role="status" for accessibility so screen readers announce loading states.
 */
export function Loading() {
  return <p className="muted" role="status">Loading menus…</p>
}

/**
 * Named Export: ErrorMessage Component
 * Displays error feedback when a data fetch fails, along with an interactive retry trigger.
 * 
 * Props:
 * @param {string} message - Human-readable error message string passed from fetch error handling
 * @param {Function} onRetry - Callback function to re-trigger the data fetch operation
 */
export function ErrorMessage({ message, onRetry }) {
  return (
    /* role="alert" forces screen readers to announce critical error messages immediately */
    <div className="card error" role="alert">
      <p>Could not load menus: {message}</p>
      {/* Triggers the refetch callback (e.g., the 'reload' function from useVendors) */}
      <button className="btn" onClick={onRetry}>Try again</button>
    </div>
  )
}