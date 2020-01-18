/* eslint-disable prettier/prettier */
import * as React from "react"

type XDirection = "left" | "right"
type YDirection = "up" | "down"

export type PointPosition = {
  origin: "window" | "user"
  x: number
  y: number
  directionX?: XDirection
  directionY?: YDirection
}

/**
 * Custom hooks that returns the current cursor position or a default point if none exists.
 */
export const usePointPosition = (defaultPosition?: PointPosition) => {
  // gatsby uses SSR so we don't have window during build
  const getWindowPosition = (): PointPosition => {
    if (typeof window !== `undefined`) {
      return {
        origin: "window",
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      }
    } else {
      return {
        origin: "window",
        x: 0,
        y: 0
      }
    }
  }

  const [position, setPosition] = React.useState<PointPosition>(
    defaultPosition || getWindowPosition()
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleWindowSetPosition = () => {
    setPosition(getWindowPosition())
  }

  const handleUserUpdatePosition = (event: MouseEvent | TouchEvent) => {
    // once we've the target starts being set by user actions, don't set relative to the window anymore.
    document.body.removeEventListener("resize", handleWindowSetPosition)

    if (event instanceof MouseEvent) {
      let directionX: XDirection | undefined = undefined
      let directionY: YDirection | undefined = undefined

      if (event.pageY < position.y) {
        directionY = "up";
      } else if (event.pageY > position.y) {
        directionY = "down";
      }

      if (event.pageX < position.x) {
        directionX = "left";
      } else if (event.pageX > position.x) {
        directionX = "right";
      }

      setPosition({ origin: "user", x: event.clientX, y: event.clientY, directionX, directionY})
    } else {
      // only going to report with the first touch in the list of its multi-touch, for now.
      const firstTouch = event.changedTouches[0]
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
