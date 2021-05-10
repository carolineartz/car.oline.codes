import React from "react"
import { ThemeContext, ThemeType } from "grommet";
import debounce from "lodash.debounce";

type ScreenSize = "small" | "medium" | "large"

export const useSceenSize = () => {
  const theme = React.useContext(ThemeContext) as ThemeType
  const [screenSize, setScreenSize] = React.useState<ScreenSize | undefined>();

  React.useEffect(() => {
    const smallBreakpoint = theme.global!.breakpoints!.small!.value!
    const mediumBreakpoint = theme.global!.breakpoints!.medium!.value!

    const debouncedFunction = debounce(() => {
      const width = window.innerWidth

      if (width <= smallBreakpoint) {
        setScreenSize("small")
      } else if (width <= mediumBreakpoint) {
        setScreenSize("medium")
      } else {
        setScreenSize("large")
      }
    }, 300, { leading: false })

    debouncedFunction() // set the initial screen size

    window.addEventListener("resize", debouncedFunction)

    return () => {
      debouncedFunction.cancel()
      window.removeEventListener("resize", debouncedFunction)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return screenSize
}

