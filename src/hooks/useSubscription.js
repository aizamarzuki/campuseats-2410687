import { useEffect, useState } from 'react'

export function useSubscription(subscribe, deps, initial = null) {
  const [data, setData] = useState(initial)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (deps.some((d) => d == null)) return
    setLoading(true)
    const unsubscribe = subscribe(
      ...deps,
      (value) => {
        setData(value)
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )
    return unsubscribe
  }, deps)

  return { data, loading, error }
}