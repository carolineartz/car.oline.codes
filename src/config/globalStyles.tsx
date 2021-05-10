import { createGlobalStyle } from "styled-components";

  //   ["#133F95", "#2460AD", "#3580C2", "#479FD1", "#71BEDE", "#9FDDED", "#CCFCFD"],
  // ["#f94e7c", "#f4c07b", "#f3e96e", "#8bcbb7", "#71b2d6", "#a87caa"],
  // ["#cb3c9b","#791b85","#3226C4","#605bcc", "#6685f3", "#4db1f9", "#02c6cc", "#1accb0"],
  // ["#f2d3a2","#e8a480","#d87373","#ba4578","#862589","#1e41b5"],
  // ["#927DF7","#DF79DD","#EE7CB4","#F19795","#F5B985","#F9DE87", "#FFFF9F"]

export const GlobalStyles = createGlobalStyle`
  :root {
    --bg: #fff;
    --green: #76fac5;
    --pink: #fa4dcf;
    --blue: #569cfa;
    --orange: #ffba81;
    --cyan: #28D7FE;

    --dark-turquoise: #30c5d2ff;
    --blue-green: #3698b8ff;
    --queen-blue: #3c6b9eff;
    --dark-slate-blue: #423e84ff;
    --spanish-violet: #452777ff;
    --blue-violet-color-wheel: #471069ff;

    /* --color-1: #30c5d2ff;
    --color-2: #3698b8ff;
    --color-3: #3c6b9eff;
    --color-4: #423e84ff;
    --color-5: #452777ff;
    --color-6: #471069ff;

    --color-1: #ff7c70;
    --color-2: #ccfff3;
    --color-3: #509ee2;
    --color-4: #4700ab;
    --color-5: #d8f628;
    --color-6: #8ecfeb; */

    --color-1: #cb3c9b;
    --color-2: #791b85;
    --color-3: #3226C4;
    --color-4: #605bcc;
    --color-5: #6685f3;
    --color-6: #4db1f9;
    --color-7: #02c6cc;
    --color-8: #1accb0;
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
