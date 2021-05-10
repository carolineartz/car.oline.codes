import { Box, Grommet } from "grommet";
import "styled-components/macro";
import { Projects } from "@/components/Projects";
import { GlobalStyles } from "@/config/globalStyles";
import { theme } from "@/config/theme";
import { Fade } from "react-awesome-reveal";
import { NameIntro } from "@/components/NameIntro"

export const App = () => {
  return (
    <Grommet css="min-height: 100vh" theme={theme}>
      <GlobalStyles />
      <Fade triggerOnce>
        <NameIntro />
      </Fade>
      <Box id="section-portfolio" pad="medium" tag="section">
        <Projects />
      </Box>
    </Grommet>
  );
};
