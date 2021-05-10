import { gsap } from "gsap";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import GSDevTools from "gsap/GSDevTools";

(gsap as any).registerPlugin(DrawSVGPlugin, GSDevTools);

export class CodingCatAnimation {
  private containerEl: HTMLElement;
  private noteEls: Element[];
  private pawRightUpEl: SVGElement;
  private pawRightDownEl: SVGElement;
  private pawLeftUpEl: SVGElement;
  private pawLeftDownEl: SVGElement;
  private terminalCodeLines: Element[];
  private mainTimeline: gsap.core.Timeline;
  private noteColorizer: () => string;

  constructor({
    animationContainerEl,
    musicNotes,
    paws,
    terminal,
  }: {
    animationContainerEl: HTMLElement;
    musicNotes: {
      rightContainer: SVGElement;
      leftContainer: SVGElement;
    };
    paws: {
      left: {
        up: SVGElement;
        down: SVGElement;
      };
      right: {
        up: SVGElement;
        down: SVGElement;
      };
    };
    terminal: SVGElement;
  }) {
    this.noteEls = [musicNotes.rightContainer, musicNotes.leftContainer].flatMap((container) => [
      ...container.children,
    ]);
    this.noteColorizer = this.createNoteColorizer();
    this.containerEl = animationContainerEl;
    this.pawRightUpEl = paws.right.up;
    this.pawRightDownEl = paws.right.down;
    this.pawLeftUpEl = paws.left.up;
    this.pawLeftDownEl = paws.left.down;
    this.terminalCodeLines = [...terminal.children];
    this.mainTimeline = gsap.timeline();

    gsap.set(this.noteEls, { scale: 0, autoAlpha: 1 });
  }

  animate() {
    this.mainTimeline
      .add(this.animatePaws())
      .add(this.animateTerminalLines(), 0)
      .add(this.animateNotes(), 0)
      .play();
  }

  kill() {
    this.mainTimeline.kill();
    // gsap.killTweensOf("*");
  }

  private animatePaws() {
    const animatePaw = (el: Element) => {
      return gsap.fromTo(
        el,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.01,
          repeatDelay: 0.19,
          yoyo: true,
          repeat: -1,
        }
      );
    };
    const tl = gsap.timeline();
    return tl
      .add(animatePaw(this.pawLeftUpEl), "start")
      .add(animatePaw(this.pawRightDownEl), "start")
      .add(animatePaw(this.pawLeftDownEl), "start+=0.19")
      .add(animatePaw(this.pawRightUpEl), "start+=0.19")
      .timeScale(1.6);
  }

  private animateNotes() {
    const rotator = gsap.utils.random(-50, 50, 1, true);
    const dir = (amt: number) => `${gsap.utils.random(["-", "+"])}=${amt}`;

    return gsap.fromTo(
      gsap.utils.shuffle(this.noteEls),
      {
        stroke: () => this.noteColorizer(),
        rotation: () => rotator(),
        x: () => gsap.utils.random(-25, 25, 1),
        autoAlpha: 1,
        y: 0,
        scale: 0,
      },
      {
        duration: 2,
        autoAlpha: 0,
        scale: 1,
        ease: "none",
        stagger: {
          from: "random",
          each: 0.5,
          repeat: -1,
        },
        rotation: () => dir(gsap.utils.random(20, 30, 1)),
        x: () => dir(gsap.utils.random(40, 60, 1)),
        y: () => gsap.utils.random(-200, -220, 1),
      }
    );
  }

  private animateTerminalLines() {
    return gsap.from(this.terminalCodeLines, {
      drawSVG: "0%",
      duration: 0.1,
      stagger: 0.1,
      ease: "none",
      repeat: -1,
    });
  }

  private createNoteColorizer() {
    const style = getComputedStyle(document.documentElement);

    try {
      const green = style.getPropertyValue("--green");
      const pink = style.getPropertyValue("--pink");
      const blue = style.getPropertyValue("--blue");
      const orange = style.getPropertyValue("--orange");
      const cyan = style.getPropertyValue("--cyan");

      const color1 = style.getPropertyPriority("--color-1");
      const color2 = style.getPropertyPriority("--color-2");
      const color3 = style.getPropertyPriority("--color-3");
      const color4 = style.getPropertyPriority("--color-4");
      const color5 = style.getPropertyPriority("--color-5");
      const color6 = style.getPropertyPriority("--color-6");
      const color7 = style.getPropertyPriority("--color-7");
      const color8 = style.getPropertyPriority("--color-8");

      return gsap.utils.random([green, pink, blue, orange, cyan, "#a3a4ec", "#67b5c0", "#fd7c6e"], true);
    } catch (e) {
      return gsap.utils.random(["pink"], true);
    }
  }
}

// const COLORS = ["#2f2cf3", "#2c00ef", "#4a00d5", "#6400c4", "#9700d4", "#cd00cc", "#c2008c"];
