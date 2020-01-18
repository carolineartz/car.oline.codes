import * as React from "react"

import { Box, DropButton, Anchor, ThemeContext } from "grommet"
import { Help } from "grommet-icons"
import { ResponsiveText } from "components/ResponsiveText"

const renderContent = (): JSX.Element => (
  // figure out why the theme context extend isn't adding an underline to my anchor
  <ThemeContext.Extend value={{ theme: { anchor: { textDecoration: "underline" } } }}>
    <Box pad="medium" width="large" background="accent-3">
      <ResponsiveText fontSize={{ min: "12px", max: "30px" }}>
        The language displayed here corresponds to the current language I'm writing in my
        text-editor at at this time. The value updates through a customized{" "}
        <Anchor
          color="light-1"
          label="Code::Stats"
          style={{ textDecoration: "underline" }}
          href="https://codestats.net/users/carolineartz"
        />{" "}
        VSCode plugin, a Zapier Zap, and Google Sheets API.
      </ResponsiveText>
    </Box>
  </ThemeContext.Extend>
)

export const LanguageStatusInfo = (): JSX.Element => (
  <DropButton
    margin={{ right: "1em" }}
    alignSelf="center"
    dropContent={renderContent()}
    dropProps={{ align: { top: "bottom" } }}
  >
    <Box
      height="24px"
      width="24px"
      align="center"
      justify="center"
      border={{ color: "light-1", size: "small" }}
      round="full"
    >
      <Help size="small" />
    </Box>
  </DropButton>
)
