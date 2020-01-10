import * as React from "react"
import Helmet from "react-helmet"

import { helmet } from "utils/helmet"

import { Box, Grommet } from "grommet"
import { ThemeType } from "grommet/themes/base"

export interface GrommetThemeColors {
  // status
  "status-error": string
  "status-warning": string
  "status-ok": string
  "status-unknown": string
  "status-disabled": string
  "status-critical": string
  // theme
  brand: string
  "accent-1": string
  "accent-2": string
  "accent-3": string
  "accent-4": string
  "neutral-1": string
  "neutral-2": string
  "neutral-3": string
  "neutral-4": string
  "neutral-5": string
  // shades
  "light-1": string
  "light-2": string
  "light-3": string
  "light-4": string
  "light-5": string
  "light-6": string
  "dark-1": string
  "dark-2": string
  "dark-3": string
  "dark-4": string
  "dark-5": string
  "dark-6": string
  [name: string]: string
}
/*
const accentColors = ["#2AD2C9", "#614767", "#ff8d6d"]
const neutralColors = ["#425563", "#5F7A76", "#80746E", "#767676"]
const statusColors = {
	critical: "#F04953",
	error: "#F04953",
	warning: "#FFD144",
	ok: "#01a982",
	unknown: "#CCCCCC",
	disabled: "#CCCCCC",
}

const colors = {
	brand: "#01a982",
	focus: accentColors[0],
}

const colorArray = (array: string[], prefix: string) =>
	array.forEach((color, index) => {
		colors[`${prefix}-${index + 1}`] = color
	})

colorArray(accentColors, "accent")
colorArray(neutralColors, "neutral")
Object.keys(statusColors).forEach(color => {
	colors[`status-${color}`] = statusColors[color]
})

*/
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

const theme: ThemeType = {
  global: {
    colors: {
      brand: "#614767",
      background: "#fff",
    },
    font: {
      family: "Montserrat, sans-serif",
      size: "14px",
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
    weight: 600,
  },
}

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
