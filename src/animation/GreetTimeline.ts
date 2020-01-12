import { gsap } from "gsap"

export const HAND_CONTAINER = "#intro__hand-container"
export const HAND = "#hand"
export const HELLO_TEXT = "#intro-text__hello-there"
export const CURSOR_CIRCLES = "#bg > div"

const waveDuration = 0.1
const waves = 3

const GreetTimeline = (): GSAPStatic.Timeline => {
  gsap.set(HAND_CONTAINER, {
    scale: 0.8,
    transformOrigin: "50% 50%",
  })

  gsap.set(HAND, {
    transformOrigin: "90% 90%",
    rotation: 20,
    y: 10,
  })

  gsap.set(CURSOR_CIRCLES, {
    transformOrigin: "50% 50%",
    autoAlpha: 0,
  })

  const fadeInText = (): GSAPStatic.Timeline =>
    gsap.timeline().to(HELLO_TEXT, { autoAlpha: 1, duration: 0.25, ease: "none" })

  const hand = (): GSAPStatic.Timeline =>
    gsap
      .timeline({
        repeat: waves,
        defaults: { ease: "power2.inOut", duration: waveDuration },
      })
      .to(HAND, { rotation: -2 })
      .to(HAND, { rotation: 15 })

  const waveHello = (): GSAPStatic.Timeline =>
    gsap
      .timeline({ delay: 0.5 })
      .to(HAND_CONTAINER, { duration: 0.2, ease: "circ", scale: 1.2 })
      .add(hand())
      .to(
        HAND_CONTAINER,
        { duration: 0.1, ease: "none", scale: 0.8 },
        `+=${waves * waveDuration + 0.15}`
      )

  return gsap
    .timeline({ defaults: { ease: "power2.in", duration: 0.25 } })
    .add(fadeInText())
    .add(waveHello())
}

export default GreetTimeline
