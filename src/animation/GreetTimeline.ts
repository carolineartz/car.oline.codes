import { gsap } from 'gsap';

export const HAND_CONTAINER = '#intro__hand-container';
export const HAND = '#hand';
export const HELLO_TEXT = '#intro-text__hello-there';

const waveDuration = 0.1;
const waves = 3;

const GreetTimeline = (): GSAPStatic.Timeline => {
  gsap.set(HAND_CONTAINER, {
    scale: 0.8,
    transformOrigin: '50% 50%',
  });

  gsap.set(HAND, {
    transformOrigin: '90% 90%',
    rotation: 20,
  });

  const fadeInText = (): GSAPStatic.Timeline =>
    gsap.timeline().to(HELLO_TEXT, { autoAlpha: 1, duration: 0.25, ease: 'power1.in' });

  const hand = (): GSAPStatic.Timeline =>
    gsap
      .timeline({
        delay: 1,
        repeat: waves,
        defaults: { ease: 'power2.inOut', duration: waveDuration },
      })
      .to(HAND, { rotation: -2 })
      .to(HAND, { rotation: 15 });

  const waveHello = (): GSAPStatic.Timeline =>
    gsap
      .timeline()
      .to(HAND_CONTAINER, { scale: 1.2 })
      .add(hand())
      .to(HAND_CONTAINER, { scale: 0.8 }, `+=${waves * waveDuration + 0.15}`);

  return gsap
    .timeline({ delay: 0.5, defaults: { ease: 'power2.inOut', duration: 0.25 } })
    .add(fadeInText())
    .add(waveHello());
};

export default GreetTimeline;
