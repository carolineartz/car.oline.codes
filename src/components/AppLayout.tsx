import * as React from "react"
import Helmet from "react-helmet"

import { helmet } from "utils/helmet"

import { Box, Grommet } from "grommet"
import { ThemeType } from "grommet/themes/base"
import { deepFreeze } from "grommet/utils"

const baseSpacing = 24,
  baseFontSize = baseSpacing * 0.75,
  fontScale = baseSpacing / 6,
  fontSizing = (factor: number) => ({
    size: `${baseFontSize + factor * fontScale}px`,
    height: `${baseSpacing + factor * fontScale}px`,
    // maxWidth chosen to be ~50 characters wide
    // see: https://ux.stackexchange.com/a/34125
    maxWidth: `${baseSpacing * (baseFontSize + factor * fontScale)}px`,
  })

const theme: ThemeType = deepFreeze({
  global: {
    colors: {
      active: "#f2f2f2",
      brand: "#080D33",
      focus: "#D5F72A",
      selected: "#43D8CE",
      "accent-1": "#2724F2",
      "accent-2": "#43D8CE",
      "accent-3": "#D5F72A",
      "dark-1": "#030513",
      "dark-2": "#080c2f",
      "dark-3": "#373F48",
      "dark-4": "#4C5069",
      "dark-5": "#797C8E",
      "dark-6": "#A7A7B3",
      "light-1": "#F8F9FB",
      "light-2": "#EFF0F5",
      "light-3": "#ECECF4",
      "light-4": "#E8EBF2",
      "light-5": "#D5D8DE",
      "light-6": "#CBCED4",
      "neutral-1": "#54A5A0",
      "neutral-2": "#4A3F60",
      "neutral-3": "#3D7A9E",
      "neutral-4": "#D4896A",
      "status-critical": "#FF5449",
      "status-error": "#FF5449",
      "status-warning": "#FF9249",
      "status-ok": "#5FC462",
      "status-unknown": "#A7A7B3",
      "status-disabled": "#A7A7B3",
    },
    font: {
      family: "Montserrat, sans-serif",
      size: "16px",
    },
  },
  anchor: {
    textDecoration: "none",
    fontWeight: 600,
    color: {
      dark: "accent-3",
      light: "accent-3",
    },
    hover: {
      textDecoration: "underline",
    },
  },
  heading: {
    level: {
      1: {
        small: { ...fontSizing(4) },
        medium: { ...fontSizing(8) },
        large: { ...fontSizing(16) },
      },
      2: {
        small: { ...fontSizing(2) },
        medium: { ...fontSizing(4) },
        large: { ...fontSizing(8) },
      },
      3: {
        small: { ...fontSizing(1) },
        medium: { ...fontSizing(1) },
        large: { ...fontSizing(4) },
      },
      4: {
        small: { ...fontSizing(0) },
        medium: { ...fontSizing(0) },
        large: { ...fontSizing(0) },
      },
    },
    weight: 400,
  },
})

type AppProps = {
  children: React.ReactNode
}

const App = ({ children }: AppProps) => (
  <div>
    <Grommet theme={theme} full={true}>
      <Helmet {...helmet} />
      <Box direction="row" justify="center" align="center" background={"brand"}>
        {children}
      </Box>
    </Grommet>
  </div>
)

export default App
