/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

// import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';

// import { TimelineLite } from 'gsap';
// import { add } from 'gsap-tools';

// export default class Hero extends PureComponent {

//   static propTypes = {
//     children: PropTypes.node,
//   }

//   componentDidMount() {
//     setTimeout(this.animate, 1000);
//   }

//   componentWillUnmount() {
//     this.disposer1();
//     // this.disposer2();
//     // this.disposer3();
//     // this.disposer4();
//   }

//   animate = () => {
//     const mainTimeline = new TimelineLite({ id: 'Everything' });
//     const circlesTimeline = new TimelineLite({ id: 'Circles' });
//     const logoTimeline = new TimelineLite({ id: 'Logo' });
//     const appleTimeline = new TimelineLite({ id: 'Apple Guy' });

//     mainTimeline.addLabel('start');

//     // get external timelines
//     circlesTimeline.add(this.circles.timelineEnter).add(this.circles.timelineLeave);
//     logoTimeline.add(this.logo.timelineEnter).add(this.logo.timelineLeave, '+=0.75');
//     appleTimeline.add(this.apple.timelineEnter);

//     mainTimeline
//       .add(circlesTimeline, 'start')
//       .add(logoTimeline, 'start')
//       .add(appleTimeline, logoTimeline.duration());

//     this.disposer1 = add(mainTimeline);
//     // this.disposer2 = add(circlesTimeline);
//     // this.disposer3 = add(logoTimeline);
//     // this.disposer4 = add(appleTimeline);
//   }

//   render() {
//     const { children } = this.props;

//     return (
//       <div className="hero">
//         <div className="hero__inner">
//           <Circles ref={(el) => { this.circles = el; }} />
//           <Logo ref={(el) => { this.logo = el; }} />
//           <AppleGuy ref={(el) => { this.apple = el; }} />
//           {children}
//         </div>
//       </div>
//     );
//   }
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import CarolineLogo from 'assets/svg/caroline-logo.svg';

// let blah: GreenSockGlobals

// import { gsap } from 'gsap';
// import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
// import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
// import CustomEase from 'gsap/';
// import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
// import { GSDevTools } from 'gsap/GSDevTools';
// import { InertiaPlugin } from 'gsap/InertiaPlugin';
// import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
// import { SplitText } from 'gsap/SplitText';
// import { CustomBounce } from 'gsap/CustomBounce';

// gsap.registerPlugin(
//   CSSRulePlugin,
//   ScrollToPlugin,
//   CustomEase,
//   DrawSVGPlugin,
//   GSDevTools,
//   InertiaPlugin,
//   MorphSVGPlugin,
//   SplitText,
//   CustomBounce
// );

// import DrawSVG from 'gsap/DrawSVGPlugin';

// import { CustomBounce } from 'gsap/EasePack';

import { gsap, TweenMax, TimelineMax, Linear, Power4 } from 'gsap';
import { add } from 'gsap-tools';
import s from './Logo.scss';

(window as any).gsap = gsap;

// import 'gsap/CustomEase';
// debugger;

// declare let CustomBounce: any;
// declare let DrawSVGPlugin: any;

// import 'gsap/CustomBounce';

const CustomEase = require('gsap/CustomEase').CustomEease;
const CustomBounce = require('gsap/CustomBounce');
const DrawSVG = require('gsap/DrawSVGPlugin');

// import 'gsap/CustomBounce';

// debugger;
// interface ILogoProps {
//   children: any;
// }

// export const Logo = ({children}: ILogoProps) => {
//   const renderLogo  = () => {

//   }s
// }

// declare let CustomBounce: any;
// declare const DrawSVGPlugin: any;

// const plugins = [PixiPlugin];
// PixiPlugin.registerPIXI(PIXI);

export class Logo extends PureComponent {
  disposer1: any;

  // static propTypes: ILogoProps = {
  //   children: PropTypes.node,
  // };

  componentDidMount() {
    this.animate();
    // setTimeout(this.animate, 2000);
  }

  componentWillUnmount() {
    this.disposer1();
    // this.disposer2();
    // this.disposer3();
    // this.disposer4();
  }

  animate = () => {
    TweenMax.set('#caroline-logo .path', { drawSVG: '0 0' });
    TweenMax.set('.dot-group', { yPercent: 100 });

    CustomBounce.CustomBounce.create('bounceSquash', {
      strength: 0.6,
      squash: 2,
    });

    CustomBounce.CustomBounce.create('bounceSquash2', {
      strength: 0.6,
      squash: 2,
    });
    const drawSVGLinear = { drawSVG: '100%', ease: Linear.easeNone };

    const tl = new TimelineMax();
    this.disposer1 = add(tl);

    tl.addLabel('i', 2.85)
      .set('#clips', { autoAlpha: 1 })
      .staggerTo('.cPath', 0.5, drawSVGLinear, 0.2)
      .staggerTo('.a1Path', 0.25, drawSVGLinear, 0.2, '-=0.35')
      .staggerTo('.a2Path', 0.25, drawSVGLinear, 0.1, '-=0.04')
      .staggerTo('.r1Path', 0.4, drawSVGLinear, 0.1, '-=0.02')
      .staggerTo('.r2Path', 0.3, drawSVGLinear, 0.07, '-=0.10')
      .staggerTo('.o1Path', 0.5, drawSVGLinear, 0.15, '-=0.20')
      .staggerTo('.o2Path', 0.5, drawSVGLinear, 0.15, '-=0.20')
      .staggerTo('.l1Path', 0.5, drawSVGLinear, 0.15, '-=0.20')
      .staggerTo('.l2Path', 0.35, drawSVGLinear, 0.2, '-=0.20')
      .staggerTo('.i1Path', 0.2, drawSVGLinear, 0.07, '-=0.10')
      .staggerTo('.i2Path', 0.2, drawSVGLinear, 0.07, '-=0.10')
      .staggerTo('.n1Path', 0.2, drawSVGLinear, 0.07, '-=0.10')
      .staggerTo('.n2Path', 0.2, drawSVGLinear, 0.07, '-=0.10')
      .staggerTo('.e1Path', 0.2, drawSVGLinear, 0.07, '-=0.10')
      .staggerTo('.e2Path', 0.2, drawSVGLinear, 0.07, '-=0.10')
      .from('#dot', 0.01, { autoAlpha: 0 }, '-=0.03')
      .to('#dot', 0.4, { yPercent: -500, ease: Power4.easeOut }, '-=0.01')
      .to('.dot-group', 0.4, { scale: 1.4, ease: Power4.easeOut }, '-=0.4')
      .to('#dot', 0.9, { yPercent: -150, ease: 'bounceSquash' })
      .to(
        '#dot',
        0.9,
        {
          scaleY: 0.6,
          scaleX: 1.2,
          ease: 'bounceSquash2-squash',
          transformOrigin: '50% bottom',
          delay: -0.9,
        },
        0
      )
      .staggerTo('.iPath', 0.5, drawSVGLinear, 0.05, 'i')
      .staggerTo('.ePath', 0.5, drawSVGLinear, 0.05, '-=0.3');

    // const mainTimeline = new TimelineLite({ id: 'Everything' });
    // const circlesTimeline = new TimelineLite({ id: 'Circles' });
    // const logoTimeline = new TimelineLite({ id: 'Logo' });
    // const appleTimeline = new TimelineLite({ id: 'Apple Guy' });

    // mainTimeline.addLabel('start');

    // // get external timelines
    // circlesTimeline.add(this.circles.timelineEnter).add(this.circles.timelineLeave);
    // logoTimeline.add(this.logo.timelineEnter).add(this.logo.timelineLeave, '+=0.75');
    // appleTimeline.add(this.apple.timelineEnter);

    // mainTimeline
    //   .add(circlesTimeline, 'start')
    //   .add(logoTimeline, 'start')
    //   .add(appleTimeline, logoTimeline.duration());

    // this.disposer1 = add(tl);
    // this.disposer2 = add(circlesTimeline);
    // this.disposer3 = add(logoTimeline);
    // this.disposer4 = add(appleTimeline);
  };

  render() {
    return (
      <div className={s.logo__container}>
        <CarolineLogo className={s.logo__graphic} />
      </div>
    );
  }
}
