import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --bg: #1c1f2d;
    --green: #a5ea9b;
    --pink: #ff61d8;
    --blue: #569cfa;
    --orange: #ffcc81;
    --cyan: #7ed1e2;

  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  @font-face {
    font-family: 'CoreCircus';
    src: url('assets/CoreCircus.eot');
    src: url('assets/CoreCircus.eot?#iefix') format('embedded-opentype'),
        url('assets/CoreCircus.woff2') format('woff2'),
        url('assets/CoreCircus.woff') format('woff'),
        url('assets/CoreCircus.ttf') format('truetype'),
        url('assets/CoreCircus.svg#CoreCircus') format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  ::-moz-selection {
    color: white;
    background: #f95152;
  }

  ::selection {
    color: white;
    background: #f95152;
  }
`;
