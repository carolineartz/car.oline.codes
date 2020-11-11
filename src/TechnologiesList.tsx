import React from "react";
import "styled-components/macro";

import { Box, Text } from "grommet";
import { CSSTransition } from "react-transition-group";

import { ReactComponent as CssDoodleLogo } from "./logos/css-doodle.svg";
import { ReactComponent as FirebaseLogo } from "./logos/firebase.svg";
import { ReactComponent as GrommetLogo } from "./logos/grommet.svg";
import { ReactComponent as ReactLogo } from "./logos/react.svg";
import { ReactComponent as StyledComponentsLogo } from "./logos/styled-components.svg";
import { ReactComponent as TypeScriptLogo } from "./logos/typescript.svg";
import { ReactComponent as ElmLogo } from "./logos/elm.svg";
import { ReactComponent as PostCssLogo } from "./logos/postcss.svg";
import { ReactComponent as AngularLogo } from "./logos/angular.svg";
import { ReactComponent as GSAPLogo } from "./logos/gsap.svg";
import { ReactComponent as P5JSLogo } from "./logos/p5js.svg";

type TechnologyListProps = {
  react?: boolean;
  cssDoodle?: boolean;
  firebase?: boolean;
  postcss?: boolean;
  grommet?: boolean;
  styledComponents?: boolean;
  typescript?: boolean;
  gsap?: boolean;
  elm?: boolean;
  angular?: boolean;
  p5js?: boolean;
};

export const TechnologyList = ({
  react,
  cssDoodle,
  firebase,
  grommet,
  postcss,
  elm,
  gsap,
  styledComponents,
  typescript,
  angular,
  p5js,
}: TechnologyListProps) => {
  return (
    <Box direction="row" gap="medium">
      {Boolean(firebase) && <AnimatedTechnologyName logo={FirebaseLogo} color="#f4820a" label="Firebase" />}
      {Boolean(react) && <AnimatedTechnologyName logo={ReactLogo} color="#61dafb" label="React" />}
      {Boolean(typescript) && (
        <AnimatedTechnologyName logo={TypeScriptLogo} color="#007acc" label="TypeScript" />
      )}
      {Boolean(grommet) && <AnimatedTechnologyName logo={GrommetLogo} color="#865CD6" label="Grommet" />}
      {Boolean(styledComponents) && (
        <AnimatedTechnologyName logo={StyledComponentsLogo} color="#ff6196" label="Styled Components" />
      )}
      {Boolean(cssDoodle) && (
        <AnimatedTechnologyName logo={CssDoodleLogo} color="#60569d" label="Css Doodle" />
      )}
      {Boolean(elm) && <AnimatedTechnologyName logo={ElmLogo} color="#7FD13B" label="Elm" />}
      {Boolean(postcss) && <AnimatedTechnologyName logo={PostCssLogo} color="#de390b" label="PostCSS" />}
      {Boolean(angular) && <AnimatedTechnologyName logo={AngularLogo} color="#dd0132" label="Angular" />}
      {Boolean(gsap) && <AnimatedTechnologyName logo={GSAPLogo} color="#8AC640" label="GSAP" />}
      {Boolean(p5js) && <AnimatedTechnologyName logo={P5JSLogo} color="#ed225d" label="p5js" />}
    </Box>
  );
};

type AnimatedTechnologyNameProps = {
  logo: typeof StyledComponentsLogo;
  label: string;
  color: string;
};

const AnimatedTechnologyName = ({ logo: Logo, label, color }: AnimatedTechnologyNameProps) => {
  const [showLabel, setShowLabel] = React.useState(false);

  return (
    <Box
      align="center"
      background="transparent"
      gap="small"
      width="2em"
      height="4em"
      overflow="visible"
      onMouseOver={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
    >
      <Box width="2em" height="2em">
        <Logo />
      </Box>
      <CSSTransition in={showLabel} timeout={300} classNames="technology-name" unmountOnExit>
        <Text size="small" color={color} css="word-break: keep-all; white-space: nowrap">
          {label}
        </Text>
      </CSSTransition>
    </Box>
  );
};
