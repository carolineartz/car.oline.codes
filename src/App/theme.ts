import { deepFreeze, deepMerge } from "grommet/utils";
import { grommet, ThemeType } from "grommet";

export const theme: ThemeType = deepFreeze(
  deepMerge(grommet, {
    global: {
      font: {
        family:
          "Work Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      },
      colors: {
        text: {
          light: "rgba(39, 36, 66, 1.000)",
        },
        brand: "#f95152",
        "accent-1": "#3BD2D3",
        "accent-2": "#CBE580",
        "accent-3": "#74DEDA",
      },
    },
    anchor: {
      fontWeight: 700,
      textDecoration: "underline",
    },
    card: {
      container: {
        round: "small",
        elevation: "small",
      },
      header: {},
      body: {},
      footer: {
        background: "background-contrast",
      },
    },
    icon: {
      size: {
        "medium-large": "72px",
        "medium-small": "18px",
        xmedium: "36px",
        xxxlarge: "256px",
      },
    },
  })
);
