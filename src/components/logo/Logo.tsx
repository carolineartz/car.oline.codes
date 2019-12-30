/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { gsap } from 'gsap';

import CarolineLogo from 'assets/svg/caroline-logo.svg';
import WaveHello from 'assets/svg/hello.svg';
import s from './Logo.scss';

// TODO: if env === dev
(window as any).gsap = gsap;

require('gsap/DrawSVGPlugin');
require('gsap/CustomEase').CustomEease;

const CustomBounce = require('gsap/CustomBounce').CustomBounce;

export class Logo extends PureComponent {
  logoTimeline: GSAPStatic.Timeline;
  waveTimeline: GSAPStatic.Timeline;

  constructor(props: any) {
    super(props);

    this.logoTimeline = gsap.timeline({ delay: 1, defaults: { ease: 'power4.out' } });
    this.waveTimeline = gsap.timeline({
      repeat: 3,
      defaults: { ease: 'power2.inOut', duration: 0.1 },
    });
  }

  componentDidMount() {
    this.animate();
  }

  wave = () => {
    // scaling
    gsap.set('#hello', {
      scale: 0.5,
      transformOrigin: '50% 50%',
    });

    // waving
    gsap.set('#hand', {
      transformOrigin: '90% 90%',
      rotation: 20,
    });

    return this.waveTimeline.to('#hand', { rotation: -2 }).to('#hand', { rotation: 15 });
  };

  logo = () => {
    const drawSVGLinear = { drawSVG: '100%', ease: 'none' };

    gsap.set('#caroline-logo .path', { drawSVG: '0% 0%' });
    gsap.set('.dot-group', { yPercent: 100 });
    CustomBounce.create('myBounce', { strength: 0.6, squash: 2 });

    return this.logoTimeline
      .set('.logo', { autoAlpha: 1 })
      .to('.cPath', { duration: 0.5, stagger: 0.2, ...drawSVGLinear })
      .to('.a1Path', { duration: 0.25, stagger: 0.2, ...drawSVGLinear }, '-=0.35')
      .to('.a2Path', { duration: 0.25, stagger: 0.1, ...drawSVGLinear }, '-=0.04')
      .to('.r1Path', { duration: 0.4, stagger: 0.1, ...drawSVGLinear }, '-=0.02')
      .to('.r2Path', { duration: 0.3, stagger: 0.07, ...drawSVGLinear }, '-=0.10')
      .to('.o1Path', { duration: 0.5, stagger: 0.15, ...drawSVGLinear }, '-=0.20')
      .to('.o2Path', { duration: 0.5, stagger: 0.15, ...drawSVGLinear }, '-=0.20')
      .to('.l1Path', { duration: 0.5, stagger: 0.15, ...drawSVGLinear }, '-=0.20')
      .to('.l2Path', { duration: 0.35, stagger: 0.2, ...drawSVGLinear }, '-=0.20')
      .to('.i1Path', { duration: 0.2, stagger: 0.07, ...drawSVGLinear }, '-=0.10')
      .to('.i2Path', { duration: 0.2, stagger: 0.07, ...drawSVGLinear }, '-=0.10')
      .to('.n1Path', { duration: 0.2, stagger: 0.07, ...drawSVGLinear }, '-=0.10')
      .to('.n2Path', { duration: 0.2, stagger: 0.07, ...drawSVGLinear }, '-=0.10')
      .to('.e1Path', { duration: 0.2, stagger: 0.07, ...drawSVGLinear }, '-=0.10')
      .to('.e2Path', { duration: 0.2, stagger: 0.07, ...drawSVGLinear }, '-=0.10')
      .from('#dot', 0.01, { autoAlpha: 0 }, '-=0.03')
      .to('#dot', 0.4, { yPercent: -500, ease: 'power4.out' }, '-=0.01')
      .to('.dot-group', 0.4, { scale: 1.1, ease: 'power4.out' }, '-=0.4')
      .to('#dot', 0.9, { yPercent: -150, ease: 'myBounce' })
      .to('#dot', 0.9, {
        scaleY: 0.6,
        scaleX: 1.2,
        ease: 'myBounce-squash',
        // transformOrigin: 'bottom',
        delay: -0.9,
      });
  };

  animate = () => {
    gsap
      .timeline()
      .add(this.wave())
      .add(this.logo());
  };

  render() {
    return (
      <div>
        <div className={s.hello__container}>
          <WaveHello className={s.wave__graphic} />
        </div>
        <div className={s.logo__container}>
          <CarolineLogo className={s.logo__graphic} />
        </div>
      </div>
    );
  }
}
