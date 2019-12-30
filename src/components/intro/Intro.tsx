import React, { PureComponent } from 'react';
import { gsap } from 'gsap';
const CustomBounce = require('gsap/CustomBounce').CustomBounce;
const CustomEase = require('gsap/CustomEase').CustomEease;
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('gsap/DrawSVGPlugin');

(window as any).gsap = gsap;

/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars */
// const DrawSVGPlugin = require('gsap/DrawSVGPlugin');
// const CustomBounce = require('gsap/CustomBounce').CustomBounce;
// import CustomBounce from 'gsap/CustomBounce';
// debugger;
/* eslint-enable @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars */

import { Container } from 'components/container/Container';
import { Box } from 'components/box/Box';

import { Row } from 'components/row/Row';

import Caroline from 'assets/svg/caroline.svg';
import Hand from 'assets/svg/hand.svg';

import s from './Intro.scss';

import greet from './../../animation/GreetTimeline';
import introduce from './../../animation/IntroduceTimeline';

export class Intro extends PureComponent {
  componentDidMount() {
    this.animate();
  }

  animate = () => {
    (gsap as any).registerPlugin(CustomEase, CustomBounce);
    CustomBounce.create('myBounce', { strength: 0.6, squash: 2 });

    gsap
      .timeline()
      .add(greet())
      .add(introduce());
  };

  render() {
    return (
      <Container>
        <div className={s.intro}>
          <Row>
            <Box id="intro__hand-container" className={s.greeting__hand}>
              <Hand />
            </Box>
            <Box id="intro-text__hello-there" className={s.greeting__text}>
              <div>hello, there</div>
            </Box>
          </Row>
          <Row>
            <Box id="intro-text__im" className={s.introduction__text}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <div>I'm</div>
            </Box>
            <Box id="intro__name-container" className={s.introduction__name}>
              <Caroline />
            </Box>
          </Row>
        </div>
      </Container>
    );
  }
}

// export const Intro = ({ children }: IIntroProps) => {
//   return (
//     <Container>
//       <div className={s.intro}>
//         <Row></Row>
//       </div>
//     </Container>
//   );
// };

// {/* <div className={s.intro__col}>{children}</div> */}
