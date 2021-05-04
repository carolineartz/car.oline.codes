import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
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

  [class*="Portfolo___StyledCarousel"] > div:last-child > div > * {
    pointer-events: all;
  }

  .technology-name-enter {
    opacity: 0;
    transform: scale(0.9);
  }
  .technology-name-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms, transform 300ms;
  }
  .technology-name-exit {
    opacity: 1;
  }

  .technology-name-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }

  /* **************************** */
  .fade-left-enter,
  .fade-right-enter {
    opacity: 0;
    transform: translateX(-100%);
  }
  .fade-right-enter-active,
  .fade-left-enter-active {
    opacity: 1;
    transform: translateX(0%);
  }
  .fade-left-exit,
  .fade-right-exit {
    opacity: 1;
    transform: translateX(0%);
  }
  .fade-left-exit-active,
  .fade-right-exit-active {
    opacity: 0;
    transform: translateX(100%);
  }
  .fade-left-enter-active,
  .fade-right-exit-active {
    transition: opacity 500ms, transform 500ms;
  }

.fade-enter{
   opacity: 0;
}
.fade-exit{
   opacity: 1;
}
.fade-enter-active{
   opacity: 1;
}
.fade-exit-active{
   opacity: 0;
}
.fade-enter-active,
.fade-exit-active{
   transition: opacity 500ms;
}
`;
