import { useState, useEffect } from 'react'

/**
 * Custom Hook: useVendors
 * Fetches vendor data from /api/vendors.json and exposes loading/error states.
 */
export function useVendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  // Increment reloadKey to force useEffect execution (retry mechanism)
  const reload = () => setReloadKey((k) => k + 1)

  useEffect(() => {
    const controller = new AbortController() // Allows cancelling fetch on unmount
    setLoading(true)
    setError(null)

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : [data]
        setVendors(list)
        setLoading(false) // Clear loading on success
      })
      .catch((err) => {
        // Only set error state if fetch wasn't cancelled by AbortController
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to fetch vendors')
          setLoading(false) // Clear loading on failure
        }
      })

    // Abort active fetch if the component using this hook unmounts
    return () => controller.abort()
  }, [reloadKey])

  return { vendors, loading, error, reload }
}