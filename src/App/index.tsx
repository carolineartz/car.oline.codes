import React from "react";

import "styled-components/macro";
import { GlobalStyles } from "./globalStyles";
import { Grommet, Box, Text, Heading } from "grommet";
import { theme } from "./theme";
import { CodingCatEmbed } from "../CodingCatEmbed";

function App() {
  return (
    <Grommet css="min-height: 100vh; background-color: #1a1e2d;" theme={theme}>
      <GlobalStyles />
      <Box justify="center" align="center" height={{ min: "100vh" }}>
        <Heading margin="none">Caroline Artz</Heading>
        <CodingCatEmbed />
      </Box>
    </Grommet>
  );
}

export default App;
