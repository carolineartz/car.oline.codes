import { Box, Grommet } from "grommet";
import "styled-components/macro";
import { theme } from "@/config/theme";
import { Fade } from "react-awesome-reveal";
import { NameIntro } from "@/components/NameIntro"
import { MainContent } from "@/components/MainContent";
import * as NavContext from "@/NavContext"
import {MainNav} from "@/components/MainNav"

export const App = () => {
  return (
    <Grommet css="min-height: 100vh" theme={theme}>
      <NavContext.Provider>
        <MainNav />
        <Fade triggerOnce>
          <NameIntro />
        </Fade>
        <MainContent />
        <Box id="section-portfolio" pad="medium" tag="section">
          {/* <Projects /> */}
        </Box>
      </NavContext.Provider>
    </Grommet>
  );
};
