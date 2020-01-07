import React, { PureComponent } from 'react';
import { gsap } from 'gsap';

import { Container } from 'components/container/Container';
import { Box } from 'components/box/Box';
import { Row } from 'components/row/Row';
import { Text } from 'components/intro/Text';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Circle } from 'components/svg-shape/Circle';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Paths } from 'react-svg-textures/build/lib';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Textures = require('react-svg-textures/umd/react-svg-textures');
// eslint-disable-next-line no-debugger
// debugger;
// import { Lines, Paths, Circles } from 'react-svg-textures';

import Caroline from 'assets/svg/caroline.svg';
import Hand from 'assets/svg/hand.svg';
import BongoCat from 'assets/svg/bongo-cat.svg';

import s from './Intro.scss';

import greet from './../../animation/GreetTimeline';
import introduce from './../../animation/IntroduceTimeline';

(window as any).gsap = gsap;

/* eslint-disable @typescript-eslint/no-var-requires */
const DrawSVGPlugin = require('gsap/DrawSVGPlugin');
const CustomEase = require('gsap/CustomEase');
const CustomBounce = require('gsap/CustomBounce');
/* eslint-enable @typescript-eslint/no-var-requires */

export class Intro extends PureComponent {
  constructor(props: any) {
    super(props);
    (gsap as any).registerPlugin(CustomEase, CustomBounce, DrawSVGPlugin);
  }

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    CustomBounce.CustomBounce.create('myBounce', { strength: 0.6, squash: 2 });
    gsap.set('#section-bongo-cat, #section-projects-intro', { autoAlpha: 0 });

    gsap
      .timeline()
      .add(greet())
      .add(introduce(), '>-3.5')
      .addLabel('projects-intro')
      .to('#section-projects-intro', { autoAlpha: 1 }, '<4.5');
    // .to('#section-bongo-cat', { autoAlpha: 1 }, '<0.1')
  };

  render() {
    const pat = <Textures.Paths id="test-squiggles" d="waves" strokeWidth={2} stroke="white" />;

    return [
      <Container id="section-greet-intro" key="greet-intro">
        <div className={s.intro}>
          <Row>
            <Box id="intro__hand-container" className={s.greeting__hand}>
              <Hand />
            </Box>
            <Box id="intro-text__hello-there" className={s.greeting__text}>
              <Text>hello, there</Text>
            </Box>
          </Row>
          <Row>
            <Box id="intro-text__im" className={s.introduction__text}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <Text>i'm</Text>
            </Box>
            <Box id="intro__name-container" className={s.introduction__name}>
              <Caroline />
            </Box>
          </Row>
        </div>
      </Container>,
      <Container id="section-projects-intro" key="projects-intro">
        <Row>
          <Box id="projects-intro__text" className={s.projects__text}>
            {
              // eslint-disable-next-line react/no-unescaped-entities
              <Text size="small">and these are some things i've worked on recently</Text>
            }
          </Box>
          <Box id="projects-intro__cat" className={s.projects__cat}>
            <BongoCat />
          </Box>
        </Row>
      </Container>,
      <Circle fill={pat} size={200} key="test-circle" />,
    ];
  }
}
