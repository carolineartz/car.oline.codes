import { gsap } from "gsap";
import GSDevTools from "gsap/GSDevTools";
import SplitText from "gsap/SplitText";

// const COLORS = ["#2f2cf3", "#2c00ef", "#4a00d5", "#6400c4", "#9700d4", "#cd00cc", "#c2008c"];

const COLORS = ["#ffcc81", "#ff61d8", "#569cfa", "#7ed1e2", "#a5ea9b"];
const CHAR_CLASS = "char";

enum STRETCH {
  MIN = "10%",
  MAX = "400%",
  END = "100%",
}

enum WEIGHT {
  MIN = 100,
  MAX = 900,
  END = 700,
}

(gsap as any).registerPlugin(SplitText, GSDevTools);

export class NameAnimation {
  private firstNameChars: Element[];
  private lastNameChars: Element[];
  private containerEl: HTMLElement;
  private mainTimeline: gsap.core.Timeline;
  private firstNameSplitText: SplitText;
  private lastNameSplitText: SplitText;
  private socialIconEls: Element[];
  private interpolateColor: (progress: number) => string;

  constructor({
    firstNameEl,
    lastNameEl,
    containerEl,
    socialContainerEl,
  }: {
    firstNameEl: HTMLElement;
    lastNameEl: HTMLElement;
    containerEl: HTMLElement;
    socialContainerEl: HTMLElement;
  }) {
    this.socialIconEls = [...socialContainerEl.children].filter((el) => el.nodeName === "svg");

    this.containerEl = containerEl;
    this.containerEl.style.setProperty("--name", COLORS[0]);
    this.containerEl.style.setProperty("--weight-end", WEIGHT.END.toString());

    this.firstNameSplitText = new SplitText(firstNameEl, {
      type: "chars",
      charsClass: CHAR_CLASS,
    });
    this.firstNameChars = this.firstNameSplitText.chars;

    this.lastNameSplitText = new SplitText(lastNameEl, {
      type: "chars",
      charsClass: CHAR_CLASS,
    });
    this.lastNameChars = this.lastNameSplitText.chars;

    this.mainTimeline = gsap.timeline({
      id: "main",
      smoothChildTiming: true,
    });

    this.interpolateColor = this.createInterpolator();

    this.init();
  }

  animate(onComplete: gsap.Callback = () => {}) {
    this.mainTimeline.eventCallback("onComplete", onComplete).play();
  }

  kill() {
    this.mainTimeline.kill();
    this.firstNameSplitText.revert();
    this.lastNameSplitText.revert();
  }

  private init() {
    gsap.set([...this.firstNameChars, this.lastNameChars], {
      fontStretch: STRETCH.MIN,
    });

    gsap.set(this.socialIconEls, {
      autoAlpha: 0,
    });

    this.mainTimeline
      .add(this.animateIn())
      .add(
        this.animateName(this.firstNameChars, { id: "first-name", timeScale: 1.5, startWeight: WEIGHT.MAX })
      )
      .add(
        this.animateName(this.lastNameChars, { id: "last-name", timeScale: 1.8, startWeight: WEIGHT.MIN }),
        "<0.25"
      )
      .add(this.animateLastNameDown())
      .add(this.animateSocialIn());
  }

  private animateIn() {
    return gsap.to(this.containerEl, {
      autoAlpha: 1,
      ease: "none",
    });
  }

  private animateName(chars: Element[], opts: { id?: string; timeScale?: number; startWeight: WEIGHT }) {
    return (
      gsap
        .timeline({ id: opts.id })
        .timeScale(opts.timeScale || 1)
        // animate color gradient, stretch to max, and weight to opposite of start
        .fromTo(
          chars,
          {
            position: "absolute",
            fontWeight: opts.startWeight,
            fontStretch: STRETCH.MIN,
          },
          {
            delay: 0.2,
            color: (i, _t, ts) => this.interpolateColor(i / ts.length),
            fontStretch: STRETCH.MAX,
            fontWeight: opts.startWeight === WEIGHT.MAX ? WEIGHT.MIN : WEIGHT.MAX,
            position: "relative",
            ease: "slow(0.1, 0.7, false)",
            stagger: 0.05,
          }
        )
        // animate width and weight to END
        .to([...chars].reverse(), {
          fontWeight: WEIGHT.END,
          fontStretch: STRETCH.END,
          ease: "circ.out",
          stagger: 0.05,
          delay: 1,
        })
    );
  }

  private animateLastNameDown() {
    return gsap.to(this.lastNameChars, {
      y: "70%",
      stagger: 0.05,
      duration: 0.45,
      ease: "back.out(8)",
    });
  }

  private animateSocialIn() {
    return gsap
      .timeline()
      .fromTo(
        this.socialIconEls,
        {
          x: window.innerWidth / 2,
          fill: COLORS[COLORS.length - 1],
        },
        {
          x: 0,
          autoAlpha: 1,
          stagger: 0.1,
          ease: "circ.in",
        }
      )
      .to(
        this.socialIconEls.flatMap((el) => [...el.children]),
        {
          fill: (i, _t, ts) =>
            this.interpolateColor(
              (i + (this.firstNameChars.length - ts.length)) / this.firstNameChars.length
            ),
        },
        0
      );
  }

  private createInterpolator(): (progress: number) => string {
    const style = getComputedStyle(document.documentElement);

    try {
      const green = style.getPropertyValue("--green");
      const pink = style.getPropertyValue("--pink");
      const blue = style.getPropertyValue("--blue");
      const orange = style.getPropertyValue("--orange");
      const cyan = style.getPropertyValue("--cyan");

      return gsap.utils.interpolate([orange, pink, blue, cyan, green]);
    } catch (e) {
      return (progress: number) => "#7ed1e2";
    }
  }
}
