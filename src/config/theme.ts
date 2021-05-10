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
        brand: "#cb3c9b",
        "accent-1": "#791b85",
        "accent-2": "#3226C4",
        "accent-3": "#4db1f9",
        "accent-4": "#1accb0",
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
