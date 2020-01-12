import * as React from "react"

export type PointPosition = {
  origin: "window" | "user"
  x: number
  y: number
}

/**
 * Custom hooks that returns the current cursor position or a default point if none exists.
 */
export const usePointPosition = (defaultPosition?: PointPosition) => {
  const getWindowPosition = (): PointPosition => ({
    origin: "window",
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  })

  const [position, setPosition] = React.useState<PointPosition>(
    defaultPosition || getWindowPosition()
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleWindowSetPosition = () => {
    setPosition(getWindowPosition())
  }

  const handleUserUpdatePosition = (evt: MouseEvent | TouchEvent) => {
    // once we've the target starts being set by user actions, don't set relative to the window anymore.
    document.body.removeEventListener("resize", handleWindowSetPosition)

    if (evt instanceof MouseEvent) {
      setPosition({ origin: "user", x: evt.clientX, y: evt.clientY })
    } else {
      // only going to report with the first touch in the list of its multi-touch, for now.
      const firstTouch = evt.changedTouches[0]
      setPosition({ origin: "user", x: firstTouch.clientX, y: firstTouch.clientY })
    }
  }

  React.useEffect(() => {
    document.body.addEventListener("resize", handleWindowSetPosition)
    document.body.addEventListener("touchstart", handleUserUpdatePosition)
    document.body.addEventListener("click", handleUserUpdatePosition)
    document.body.addEventListener("mousemove", handleUserUpdatePosition)

    return () => {
      document.body.removeEventListener("resize", handleWindowSetPosition, false)
      document.body.removeEventListener("touchstart", handleUserUpdatePosition, false)
      document.body.removeEventListener("click", handleUserUpdatePosition, false)
      document.body.removeEventListener("mousemove", handleUserUpdatePosition)
    }
  }, [position])

  return position
}
