import { useEffect, useState } from "react"
import { useHotkeys as usHK } from 'react-hotkeys-hook'

export function useAutoScroll() {
  const [active, setActive] = useState(false)

  usHK('ctrl+k', (e) => {
    e.preventDefault()
    setActive(!active)
  }, [active])

  useEffect(() => {
    if (!active) {
      return
    }
    const max = document.documentElement.scrollHeight - document.documentElement.clientHeight
    let curr = 0
    let dir = 1
    const interval = setInterval(() => {
      if (curr >= max) {
        dir = -1
      } else if (curr <= 0) {
        dir = 1
      }
      window.scrollTo({ top: curr, behavior: "smooth" })
      curr += dir * 20
    }, 100)
    return () => {
      console.log("CLEAR INTERVAL")
      clearInterval(interval)
    }
  }, [active])
}

function useHotkeys(arg0: string, arg1: () => any, arg2: any[]) {
  throw new Error("Function not implemented.")
}
