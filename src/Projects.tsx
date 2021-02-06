import "styled-components/macro";

import { Text, Anchor, Heading, Box, ThemeContext, ThemeType } from "grommet";
import React from "react";
import { PortfolioItem } from "./PortfolioItem";
import { TechnologyList } from "./TechnologiesList";

export const Projects = () => {
  return (
    <Box>
      <Heading color="accent-4" level="1" css="margin-bottom: 2rem" size="large">
        Selected Projects
      </Heading>
      <Box gap="large" width={{ max: "1200px" }} alignSelf="center">
        <PatternParty />
        <ShareASketch />
        <ElmInTheSpring />
        <BoxSizingApp />
        <SpotlightCursor />
        <GSAPNameAnimation />
        <MagneticCodePenLogo />
      </Box>
    </Box>
  );
};

const PatternParty = (): JSX.Element => {
  return (
    <PortfolioItem
      label="Pattern Party"
      link="https://svg-pattern.party"
      github="https://github.com/carolineartz/pattern-party"
      imagePaths={["assets/Pattern_Party.png"]}
      technologyList={<TechnologyList react cssDoodle firebase grommet styledComponents typescript />}
    >
      <Text color="accent-4" margin={{ bottom: "medium" }}>
        Web app for finding and sharing SVG patterns. In-app SVG generator via{" "}
        <Anchor href="https://doodad.dev" label="Doodad.dev" />.
      </Text>
    </PortfolioItem>
  );
};

const ShareASketch = (): JSX.Element => {
  return (
    <PortfolioItem
      direction="right"
      label="Share-a-Sketch"
      text="Web app with two modes, each updating in realtime sync across all connected users."
      link="https://share-a-sketch.web.app"
      github="https://github.com/carolineartz/share-a-sketch"
      imagePaths={["assets/Share_a_Sketch_Shapes.png", "assets/Share_a_Sketch_Draw.png"]}
      technologyList={<TechnologyList react firebase grommet styledComponents typescript />}
    >
      <Text css="padding-bottom: 1em">
        One mode for creating patterns by changing the color and orientation of triangles.
      </Text>
      <Text>One mode for composing doodles with drawing, emojis, text, and shapes.</Text>
    </PortfolioItem>
  );
};

const ElmInTheSpring = (): JSX.Element => {
  return (
    <PortfolioItem
      label="Elm in the Spring"
      text="Website for the 2019 Elm in the Spring Conference, an Elm language event (co-organizer)."
      link="https://2019.elminthespring.org"
      github="https://github.com/elm-in-the-spring/conference-2019"
      imagePaths={["assets/Elm_in_the_Spring_2019_Conference.png"]}
      technologyList={<TechnologyList elm postcss />}
    />
  );
};

const BoxSizingApp = () => {
  return (
    <PortfolioItem
      direction="right"
      label="Interactive Box-Model Diagram"
      link="https://codepen.io/carolineartz/details/ogVXZj"
      technologyList={<TechnologyList angular />}
      iframe={<ProjectIframe penId="ogVXZj" height={533} title="angular interactive box-model diagram" />}
    >
      <Text>
        An Angular.js app to visualize the box-model. Controls for changing the value of box-sizing highlight
        its effects on element size and which properties contribute. Featured in various developer resource
        roundups, picked as one of{" "}
        <Anchor
          href="https://davidwalsh.name/chris-coyiers-favorite-demos-ii"
          label="Chris Coyer's favorite demos for 2015"
        />
        , has over 150,000 views and 1500 ❤️s.
      </Text>
    </PortfolioItem>
  );
};

const SpotlightCursor = () => {
  return (
    <PortfolioItem
      label="Spotlight Cursor Text"
      link="https://codepen.io/carolineartz/details/rNaGQYo"
      technologyList={<TechnologyList gsap />}
      iframe={<ProjectIframe penId="rNaGQYo" title="Spotlight Cursor Text Screen" />}
    />
  );
};

const GSAPNameAnimation = () => {
  return (
    <PortfolioItem
      label="Name Animation"
      direction="right"
      link="https://codepen.io/carolineartz/details/rNaGQYo"
      technologyList={<TechnologyList gsap />}
      iframe={<ProjectIframe penId="gOaQxWL" title="GSAP Name Animation" />}
    />
  );
};

const MagneticCodePenLogo = () => {
  return (
    <PortfolioItem
      label="Magnetic CodePen Logo"
      text="A P5.js demo presented at the April 2015 CodePen Chicago Meetup."
      link="https://codepen.io/carolineartz/details/NPZJVz"
      technologyList={<TechnologyList p5js />}
      iframe={<ProjectIframe penId="NPZJVz" title="p5js magnetic codepen logo" />}
    />
  );
};

const ProjectIframe = ({ penId, height = 300, title }: { penId: string; height?: number; title: string }) => {
  return (
    <iframe
      style={{
        width: "100%",
        minHeight: "60vh",
        border: "none",
        // border: `3px solid ${brandColor}`,
        // borderRadius: "4px",
        padding: "10px",
        boxSizing: "border-box",
      }}
      scrolling="no"
      seamless
      title={title}
      src={`https://codepen.io/carolineartz/embed/${penId}?height=${height}&theme-id=39356&default-tab=result`}
      // loading="lazy"
    >
      See the Pen <a href={`https://codepen.io/carolineartz/pen/${penId}`}>{title} </a> by Caroline Artz (
      <a href="https://codepen.io/carolineartz">@carolineartz</a>) on <a href="https://codepen.io">CodePen</a>
      .
    </iframe>
  );
};
