import "styled-components/macro";

import { Text, Anchor, Heading, Box, Spinner } from "grommet";
import React, {Suspense} from "react";
import { PortfolioItem } from "@/components/PortfolioItem";
import { TechnologyList } from "@/components/TechnologiesList";
import { Fade } from "react-awesome-reveal";

import loadjs from "loadjs"

export const Projects = () => {
  const [resource, setResource] = React.useState<undefined | boolean>()

  React.useEffect(() => {
    loadjs("https://cpwebassets.codepen.io/assets/embed/ei.js", {returnPromise: true})
      .then(() => {
        setResource(true)
      })
      .catch(function (pathsNotFound) {
        console.log(pathsNotFound)
       });
  }, [])

  return (
    <Box>
      <Heading level="1" css="margin-bottom: 2rem" size="large">
        Selected Projects
      </Heading>
      <Box gap="large" width={{ max: "1200px" }} alignSelf="center">
        <EachProject resource={resource} />
      </Box>
    </Box>
  );
};

const EachProject = ({resource}: {resource: boolean | undefined}) => {
  return (
    <Suspense fallback={<Spinner />}>
      {/* <Fade triggerOnce> */}
      <Fade triggerOnce>
      <PatternParty />
        <ShareASketch />
        <ElmInTheSpring />
        <BoxSizingApp resource={resource}  />
        <SpotlightCursor resource={resource} />
        <GSAPNameAnimation resource={resource}  />
        <MagneticCodePenLogo resource={resource} />
        </Fade>
      {/* </Fade> */}
    </Suspense>
  )
}

const PatternParty = (): JSX.Element => {
  return (
    <PortfolioItem
      label="Pattern Party"
      link="https://svg-pattern.party"
      github="https://github.com/carolineartz/pattern-party"
      imagePaths={["assets/pattern-party.gif"]}
      technologyList={<TechnologyList react cssDoodle firebase grommet styledComponents typescript />}
    >
      <Text margin={{ bottom: "medium" }}>
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
      imagePaths={["assets/share-a-sketch-shapes.gif", "assets/share-a-sketch-draw.gif"]}
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
      imagePaths={["assets/eits-conference-2019.gif"]}
      technologyList={<TechnologyList elm postcss />}
    />
  );
};

const BoxSizingApp = ({resource: _resource}: {resource: boolean | undefined}) => {
  return (
    <PortfolioItem
      direction="right"
      label="Interactive Box-Model Diagram"
      link="https://codepen.io/carolineartz/details/ogVXZj"
      technologyList={<TechnologyList angular />}
      slug="ogVXZj"
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

const SpotlightCursor = ({resource: _resource}: {resource: boolean | undefined}) => {
  return (
    <PortfolioItem
      label="Spotlight Cursor Text"
      link="https://codepen.io/carolineartz/details/rNaGQYo"
      slug="rNaGQYo"
      technologyList={<TechnologyList gsap />}
    >
      <Text>
        <Anchor
          href="https://codepen.io/2020/popular/pens/3"
          label="75th most ❤️ hearted pen of 2020"
        />

      </Text>
    </PortfolioItem>
  );
};

const GSAPNameAnimation = ({resource: _resource}: {resource: boolean | undefined})  => {
  return (
    <PortfolioItem
      label="Name Animation"
      direction="right"
      link="https://codepen.io/carolineartz/details/rNaGQYo"
      technologyList={<TechnologyList gsap />}
      slug="gOaQxWL"
    >
      <Box />
    </PortfolioItem>
  );
};

const MagneticCodePenLogo = ({resource: _resource}: {resource: boolean | undefined})  => {
  return (
    <PortfolioItem
      label="Magnetic CodePen Logo"
      text="A P5.js demo presented at the April 2015 CodePen Chicago Meetup."
      link="https://codepen.io/carolineartz/details/NPZJVz"
      technologyList={<TechnologyList p5js />}
      slug="NPZJVz"
    />
  );
};
