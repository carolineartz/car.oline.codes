import { gsap } from "gsap"
import { sampleSize, random, round } from "lodash"
import SplitText from "gsap/SplitText"

import { PointPosition } from "../hooks/use-point-position"

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
    this.timeline = gsap.timeline({ autoRemoveChildren: true })

    this.init()
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

  private updateLetters(this: LanguageStatusAnimation): void {
    const shuffled = this.characters.sort(() => 0.5 - Math.random())

    this._letters = shuffled.slice(0, this.numChars)
  }

  private translateLetters(this: LanguageStatusAnimation): void {
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
        ease: "power3.out",
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
    this.timeline.totalProgress(1)
    this.timeline.clear()
    this.timeline.kill()

    this.timeline = gsap.timeline()

    const rand = random(0.5, 0.7, true)
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
  }
}

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
