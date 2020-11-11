import "styled-components/macro";
import BrowserFrame from "react-browser-frame";

import { Box, Heading, Image, ResponsiveContext, Text, Anchor, Paragraph, Button } from "grommet";
import { SwitchTransition, CSSTransition } from "react-transition-group";

import React from "react";
import { Share } from "grommet-icons";
import { TechnologyList } from "./TechnologiesList";
import { PortfolioItem } from "./PortfolioItem";
import { Github, Next, Previous } from "grommet-icons";

type PortfolioProps = {
  items: Array<() => JSX.Element>;
};

type Direction = "left" | "right";

const PortfolioCarousel = ({ items }: PortfolioProps) => {
  const size = React.useContext(ResponsiveContext);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<Direction | null>(null);
  const [animationType, setAnimationType] = React.useState<"fade-left" | "fade-right">("fade-left");

  const Item = items[activeIndex];

  return (
    <Box height="100vh" pad="medium">
      <Heading color="accent-4" level="1" css="margin-bottom: 2rem">
        Selected Projects
      </Heading>
      <Box fill gap="small" direction="row" css="max-width: 100vw" width="100%" overflow="hidden">
        <Button
          size="large"
          icon={<Previous />}
          onClick={() =>
            setActiveIndex((prevActiveIndex) => {
              return prevActiveIndex - 1 < 0 ? items.length - 1 : prevActiveIndex - 1;
            })
          }
        />
        <Box flex="grow">
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={activeIndex}
              addEndListener={(node: HTMLElement, done) => {
                node.addEventListener("transitionend", done, false);
              }}
              classNames="fade"
            >
              <Item />
            </CSSTransition>
          </SwitchTransition>
        </Box>
        <Button
          size="large"
          icon={<Next />}
          onClick={() =>
            setActiveIndex((prevActiveIndex) => {
              return prevActiveIndex + 1 >= items.length ? 0 : prevActiveIndex + 1;
            })
          }
        />
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
      label="Share-a-Sketch"
      text="Web app with two modes, each updating in realtime sync across all connected users."
      link="https://share-a-sketch.web.app"
      github="https://github.com/carolineartz/share-a-sketch"
      imagePaths={["assets/Share_a_Sketch_Shapes.png", "assets/Share_a_Sketch_Draw.png"]}
      technologyList={<TechnologyList react firebase grommet styledComponents typescript />}
    >
      <Paragraph>
        One mode for creating patterns by changing the color and orientation of triangles.
      </Paragraph>
      <Paragraph>One mode for composing doodles with drawing, emojis, text, and shapes.</Paragraph>
    </PortfolioItem>
  );
};

const ElmInTheSpring = (): JSX.Element => {
  return (
    <PortfolioItem
      label="Elm in the Spring"
      text="Conference website for the 2019 Elm in the Spring, Elm language conference (co-organizer)."
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
      label="Interactive Box-Sizing Diagram"
      text="blah"
      link="https://2019.elminthespring.org"
      technologyList={<TechnologyList angular />}
      iframe={
        <iframe
          height="100%"
          style={{ width: "100%", minHeight: "60vh" }}
          scrolling="no"
          title="angular interactive box-model diagram"
          src="https://codepen.io/carolineartz/embed/ogVXZj?height=533&theme-id=14337&default-tab=result"
          loading="lazy"
        >
          See the Pen{" "}
          <a href="https://codepen.io/carolineartz/pen/ogVXZj">angular interactive box-model diagram</a> by
          Caroline Artz (<a href="https://codepen.io/carolineartz">@carolineartz</a>) on{" "}
          <a href="https://codepen.io">CodePen</a>.
        </iframe>
      }
    />
  );
};

export const Portfolio = () => {
  const items = [PatternParty, ShareASketch, ElmInTheSpring, BoxSizingApp];
  return <PortfolioCarousel items={items} />;
};
