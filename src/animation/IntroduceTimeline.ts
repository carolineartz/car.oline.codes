import { gsap } from 'gsap';

const LOGO_PATH = '#caroline-logo .path';
const DOT_GROUP = '.dot-group';
const DOT = '#dot';
const INTRO_TEXT = '#intro-text__im';

const IntroduceTimeline = (): GSAPStatic.Timeline => {
  gsap.set(LOGO_PATH, { drawSVG: '0% 0%' });
  gsap.set(DOT_GROUP, { yPercent: 100 });

  const fadeInText = (): GSAPStatic.Timeline =>
    gsap.timeline().to(INTRO_TEXT, { autoAlpha: 1, duration: 0.25, ease: 'power1.in' });

  const drawName = (): GSAPStatic.Timeline => {
    const drawSVGLinear = { drawSVG: '100%', ease: 'none' };
    return gsap
      .timeline({ delay: 1, defaults: { ease: 'power4.out' } })
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
      .from(DOT, 0.01, { autoAlpha: 0 }, '-=0.03')
      .to(DOT, 0.4, { yPercent: -500, ease: 'power4.out' }, '-=0.01')
      .to(DOT_GROUP, 0.4, { scale: 1.0, ease: 'power4.out' }, '-=0.4')
      .to(DOT, 0.9, { yPercent: -100, ease: 'myBounce' })
      .to(DOT, 0.9, {
        scaleY: 0.6,
        scaleX: 1.2,
        ease: 'myBounce-squash',
        delay: -0.9,
      });
  };

  return gsap
    .timeline()
    .add(fadeInText())
    .add(drawName());
};

export default IntroduceTimeline;
