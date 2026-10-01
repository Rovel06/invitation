import { useEffect, useState } from 'react'
import type { CountdownTime } from '@/types/types'

const WEDDING_DATE = new Date('2027-06-14T15:00:00')

export function useCountdown(): CountdownTime {
  const [time, setTime] = useState<CountdownTime>(calculate())

  function calculate(): CountdownTime {
    const diff = WEDDING_DATE.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    return { days, hours, minutes, seconds }
  }

  useEffect(() => {
    const id = setInterval(() => setTime(calculate()), 1000)
    return () => clearInterval(id)
  }, [])

  return time
}
