import { gsap } from "gsap"

export const HAND_CONTAINER_ID = "hand-container"
export const HAND_ID = "hand"
export const CURSOR_CIRCLES = "#bg > div"

const waveDuration = 0.1
const waves = 3

const GreetTimeline = (): GSAPTimeline => {
  gsap.set(`#${HAND_CONTAINER_ID}`, {
    scale: 0.7,
    transformOrigin: "50% 50%",
  })

  gsap.set(`#${HAND_ID}`, {
    transformOrigin: "90% 90%",
    rotation: 20,
    y: 10,
  })

  gsap.set(CURSOR_CIRCLES, {
    transformOrigin: "50% 50%",
    autoAlpha: 0,
  })

  const hand = (): GSAPTimeline =>
    gsap
      .timeline({
        repeat: waves,
        defaults: { ease: "power2.inOut", duration: waveDuration },
      })
      .to(`#${HAND_ID}`, { rotation: -2 })
      .to(`#${HAND_ID}`, { rotation: 15 })

  const waveHello = (): GSAPTimeline =>
    gsap
      .timeline({ delay: 0.5 })
      .to(`#${HAND_CONTAINER_ID}`, { duration: 0.2, ease: "circ", scale: 1.2 })
      .add(hand())
      .to(
        `#${HAND_CONTAINER_ID}`,
        { duration: 0.1, ease: "none", scale: 0.8 },
        `+=${waves * waveDuration + 0.15}`
      )

  return gsap.timeline({ defaults: { ease: "power2.in", duration: 0.25 } }).add(waveHello())
}

export default GreetTimeline
