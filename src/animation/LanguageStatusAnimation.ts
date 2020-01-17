// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { gsap, Elastic } from "gsap"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { sampleSize, random, round, without } from "lodash"
import { PointPosition } from "../hooks/use-point-position"

import SplitText from "gsap/SplitText"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import GSDevTools from "gsap/GSDevTools"

require("animation/bezier-easing.min.js")

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Picker<T> {
  private readonly pickCount: () => number
  readonly items: T[] // can be private but public now for logging

  constructor(items: T[]) {
    this.items = items

    const mid: number = gsap.utils.clamp(1, Math.round(items.length / 2), items.length)
    const max: number = gsap.utils.clamp(1, mid + 1, items.length)
    const min: number = gsap.utils.clamp(1, mid - 1, items.length)

    this.pickCount = gsap.utils.random([mid, max, min], true)
  }

  pick(): T[] {
    return sampleSize(this.items, this.pickCount())
  }
}

type Translations = {
  pos: number
  neg: number
}

type Rotations = {
  pos: number
  neg: number
}

class LetterTransformations {
  static rotations(letterCount: number): Rotations[] {
    return Array.from({ length: letterCount }, () => {
      const rr: number = round(random(0, 6, true), 2)
      return { pos: rr, neg: -rr }
    })
  }

  static translations(letterCount: number): Translations[] {
    return Array.from({ length: letterCount }, () => {
      const tr: number = round(random(5, 10, true), 2)
      return { pos: tr, neg: -tr }
    })
  }
}

const lineEq = (y2: number, y1: number, x2: number, x1: number, currentVal: number): number => {
  const m = (y2 - y1) / (x2 - x1)
  const b = y1 - m * x1
  return m * currentVal + b
}

export class LanguageStatusAnimation {
  characters: HTMLElement[]
  pointPosition?: PointPosition

  private element: HTMLElement
  private _letters: HTMLElement[] // the randomly picked ones; don't
  private numChars: number
  private timeline: GSAPTimeline

  constructor(element: HTMLElement) {
    this.element = element
    const splitText = new SplitText(element)

    this.characters = splitText.chars
    this.numChars = random(3, 5)
    this._letters = sampleSize(this.characters, 3)
    this.init()
    this.timeline = gsap.timeline({ autoRemoveChildren: true })
    // GSDevTools.create({ animation: this.timeline })
  }

  get letters() {
    return this._letters
  }

  get letterCount() {
    return this.letters.length
  }

  init() {
    if (this.element.firstElementChild) {
      ;(this.element.firstElementChild as HTMLElement).style.display = "inline-block"
    }
    this.element.addEventListener("mouseenter", this.updateLetters.bind(this))
    this.element.addEventListener("mousemove", this.translateLetters.bind(this))
    this.element.addEventListener("mouseleave", this.resetTranslations.bind(this))
  }

  animate(pointPosition: PointPosition) {
    this.pointPosition = pointPosition
  }

  // mouseenter
  private updateLetters(this: LanguageStatusAnimation): void {
    // this.timeline.tweenTo("foo")
    // this.timeline.removeLabel("foo")

    console.log(`%c Enter`, "color: #5FC462")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const prevLetters: HTMLElement[] = this.letters
    const shuffled = this.characters.sort(() => 0.5 - Math.random())
    this._letters = shuffled.slice(0, this.numChars)
    // this._letters = without(shuffled.slice(0, this.numChars), ...prevLetters)
    console.log(this.element)
  }

  private translateLetters(this: LanguageStatusAnimation): void {
    console.log(`%c Over`, "color: #FF7349")

    const bounds = this.element.getBoundingClientRect()

    const cursorPosition: { x: number; y: number } = this.pointPosition || {
      x: bounds.x + bounds.width / 2,
      y: bounds.y + bounds.height / 2,
    }

    // Document scrolls
    const docScrolls = {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop,
    }
    // Mouse position relative to this.element
    const relmousepos = {
      x: cursorPosition.x - bounds.left - docScrolls.left,
      y: cursorPosition.y - bounds.top - docScrolls.top,
    }

    const lettersTranslations = LetterTransformations.translations(this.letterCount)
    const lettersRotations = LetterTransformations.rotations(this.letterCount)

    for (const [index, letter] of this.letters.entries()) {
      this.timeline.to(letter, {
        duration: 1,
        // ease: "expo.out",
        ease: "power3.out",
        // stateAt: {
        //   x: bounds.x,
        //   y: bounds.y,
        // },
        y: lineEq(
          lettersTranslations[index].pos,
          lettersTranslations[index].neg,
          bounds.height,
          0,
          relmousepos.y
        ),
        rotation: lineEq(
          lettersRotations[index].pos,
          lettersRotations[index].neg,
          bounds.height,
          0,
          relmousepos.y
        ),
      })
    }
  }

  private reset() {
    const time = this.timeline.progress()
    this.timeline.to(
      this.characters,
      {
        duration: 0.3,
        rotation: 0,
        ease: "power4.in",
        y: 0,
        onComplete: this.timeline.clear,
      },
      time
    )
  }

  private resetTranslations(this: LanguageStatusAnimation): void {
    console.log(`%c Exit`, "color: #B13254")

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const children = this.timeline.getChildren()
    this.timeline.totalProgress(1)
    this.timeline.clear()
    this.timeline.kill()

    this.timeline = gsap.timeline()
    // eslint-disable-next-line no-debugger
    // debugger
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const rand = random(0.5, 0.7, true)
    const blah = () =>
      gsap
        .timeline()
        .to(
          this.letters,
          {
            duration: 0.2,
            ease: "quad.out",
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            y: pointPositionConditionalWithDefault("up", this.pointPosition, {
              ifTrue: "-=80%",
              ifFalse: "+=80%",
            }),
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            rotation: pointPositionConditionalWithDefault("up", this.pointPosition, {
              ifTrue: "-=10",
              ifFalse: "+=10",
            }),
            opacity: 0,
          },
          0
        )
        .to(
          this.letters,
          {
            duration: rand,
            ease: "elastic.out",
            startAt: {
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              y: pointPositionConditionalWithDefault("up", this.pointPosition, {
                ifTrue: "80%",
                ifFalse: "-80%",
              }),
              opacity: 0,
            },
            stagger: 0.02,
            y: "0%",
            opacity: 1,
          },
          "0.2"
        )
        .to(
          this.letters,
          {
            // y: "0",
            duration: rand,
            stagger: 0.02,
            rotation: "0%",
            ease: "power1.out",
          },
          "+=0.19"
        )
        .call(this.reset.bind(this))
    // GSDevTools.create({ animation: blah })
    this.timeline.add(blah(), "foo")
    console.log("end time", this.timeline.endTime())
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function pointPositionConditionalWithDefault(
  direction: "up" | "right" | "down" | "left",
  pointPosition?: PointPosition,
  {
    ifTrue = "0%",
    ifFalse = "0%",
    otherwise = "0%",
  }: { ifTrue?: string | number; ifFalse?: string | number; otherwise?: string | number } = {}
): string | number {
  if (!pointPosition) {
    return otherwise
  }
  switch (direction) {
    case "up":
    case "down":
      if (!pointPosition.directionY) {
        return otherwise
      } else {
        return pointPosition.directionY === direction ? ifTrue : ifFalse
      }
    case "right":
    case "left":
      if (!pointPosition.directionX) {
        return otherwise
      } else {
        return pointPosition.directionX === direction ? ifTrue : ifFalse
      }
  }
}
