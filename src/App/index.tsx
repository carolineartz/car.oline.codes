import { Box, Grommet, ResponsiveContext } from "grommet";
import React from "react";

import "styled-components/macro";
import { Projects } from "./../Projects";
import { GlobalStyles } from "./globalStyles";
import { theme } from "./theme";
import { Fade } from "react-awesome-reveal";
import {NameIntro} from "./../NameIntro"

const AppContent = () => {

  const screenSize = React.useContext(ResponsiveContext);


  return (
    <>
      <Fade>
        <NameIntro />
      </Fade>
      <Box id="section-portfolio" pad="medium" tag="section" background="white">
        <Projects />
      </Box>
    </>
  );
};

// type HeadingTextProps = HeadingProps & {
//   fontSize: string;
// };

// const HeadingText = styled(Heading)<HeadingTextProps>`
//   font-family: Livvic, sans-sarif;
//   font-weight: 900;
//   text-shadow: 0.09em 0.09em 0px #a5cbcc;
//   position: absolute;
//   font-size: ${(props) => props.fontSize};
//   mix-blend-mode: color-dodge;
//   color: black;
//   line-height: 1;
//   pointer-events: none;
//   text-transform: uppercase;
// `;

export const App = () => {
  return (
    <Grommet css="min-height: 100vh" theme={theme}>
      <GlobalStyles />
      <AppContent />
    </Grommet>
  );
};
