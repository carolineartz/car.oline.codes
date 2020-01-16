import { gsap, Elastic } from "gsap"
import { sampleSize, random, round } from "lodash"
import { PointPosition } from "../hooks/use-point-position"

import SplitText from "gsap/SplitText"

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
      const tr: number = round(random(0, 6, true), 2)
      return { pos: tr, neg: -tr }
    })
  }

  static translations(letterCount: number): Translations[] {
    return Array.from({ length: letterCount }, () => {
      const tr: number = round(random(10, 50, true), 2)
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
  private _letters: HTMLElement[] // the randomly picked ones; don't actually nee the reader -- just for debugging
  private picker: Picker<HTMLElement>

  constructor(element: HTMLElement) {
    this.element = element
    const splitText = new SplitText(element)

    this.characters = splitText.chars
    this.picker = new Picker(this.characters)

    this._letters = this.picker.pick()
    this.init()
  }

  init() {
    this.element.addEventListener("mouseenter", this.updateLetters.bind(this))
    this.element.addEventListener("mousemove", this.translateLetters.bind(this))
    this.element.addEventListener("mouseleave", this.resetTranslations.bind(this))
  }

  get letters() {
    return this._letters
  }

  get letterCount() {
    return this.letters.length
  }

  animate(pointPosition: PointPosition) {
    this.pointPosition = pointPosition
  }

  private updateLetters(this: LanguageStatusAnimation): HTMLElement[] {
    this._letters = this.picker.pick()
    return this.letters
  }

  private resetTranslations(this: LanguageStatusAnimation): Function {
    return () =>
      requestAnimationFrame(() => {
        // if we're on a touch device or something
        if (
          !this.pointPosition ||
          !this.pointPosition.directionX ||
          !this.pointPosition.directionY
        ) {
          return
        }
        gsap
          .timeline()
          .to(
            this.letters,
            {
              duration: 0.2,
              ease: "quad.out",
              y: this.pointPosition.directionY === "up" ? "-=80%" : "+=80",
              rotation: this.pointPosition.directionY === "up" ? "-=10" : "+=10",
              opacity: 0,
            },
            0
          )
          .to(
            this.letters,
            {
              ease: Elastic.easeOut.config(1, 0.4),
              startAt: {
                y: this.pointPosition.directionY === "up" ? "80%" : "-80%",
                opacity: 0,
              },
              stagger: 0.02,
              y: "0%",
              rotation: 0,
              opacity: 1,
            },
            0.2
          )
      })
  }

  private translateLetters(this: LanguageStatusAnimation): void {
    if (!this.pointPosition) return
    // Document scrolls
    const docScrolls = {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop,
    }
    const bounds = this.element.getBoundingClientRect()
    // Mouse position relative to this.element
    const relmousepos = {
      x: this.pointPosition.x - bounds.left - docScrolls.left,
      y: this.pointPosition.y - bounds.top - docScrolls.top,
    }

    const lettersTranslations = LetterTransformations.translations(this.letterCount)
    const lettersRotations = LetterTransformations.rotations(this.letterCount)

    for (const [index, letter] of this.letters.entries()) {
      gsap.to(letter, {
        duration: 3,
        ease: "expo.out",
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
}
