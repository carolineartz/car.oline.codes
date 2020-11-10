import React from "react";

import "styled-components/macro";
import { GlobalStyles } from "./globalStyles";
import { Grommet, Box, Text, Heading } from "grommet";
import { theme } from "./theme";
import { CodingCatEmbed } from "../CodingCatEmbed";
import styled from "styled-components";

function App() {
  return (
    <Grommet css="min-height: 100vh; background-color: #1a1e2d;" theme={theme}>
      <GlobalStyles />
      {/* "page" 1 - intro*/}
      <Box id="section-intro" height="100vh" tag="section">
        <HeadingText>Caroline Artz</HeadingText>
        <Box justify="center" align="center" height={{ min: "100vh" }}>
          <CodingCatEmbed />
        </Box>
      </Box>
      {/* "page" 2 - portfolio */}
      <Box id="section-portfolio" height="100vh" tag="section" background="white"></Box>
    </Grommet>
  );
}

const HeadingText = styled(Heading)`
  font-family: CoreCircus;
  text-shadow: 10px 10px 0px #a5cbcc;
  // text-shadow: 10px 10px 0px #3f7fbf;
  position: absolute;
  letter-spacing: -15px;
  font-size: 150px;
  line-height: 130px;
  mix-blend-mode: color-dodge;
  color: black;
  pointer-events: none;
`;

export default App;
