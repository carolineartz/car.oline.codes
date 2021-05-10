import { gsap } from "gsap";
import GSDevTools from "gsap/GSDevTools";
import SplitText from "gsap/SplitText";

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
  private colors: string[];
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
    this.colors = this.setColors();
    this.interpolateColor = this.createInterpolator(this.colors);

    this.socialIconEls = [...socialContainerEl.children].filter((el) => el.nodeName === "svg");

    this.containerEl = containerEl;
    this.containerEl.style.setProperty("--name", this.colors[0]);
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
          fill: this.colors[this.colors.length - 1],
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

  private setColors() {
    const style = getComputedStyle(document.documentElement);

    const color1 = style.getPropertyValue("--color-1");
    const color2 = style.getPropertyValue("--color-2");
    const color3 = style.getPropertyValue("--color-3");
    const color4 = style.getPropertyValue("--color-4");
    const color5 = style.getPropertyValue("--color-5");
    const color6 = style.getPropertyValue("--color-6");
    const color7 = style.getPropertyValue("--color-7");
    const color8 = style.getPropertyValue("--color-8");

    return [color1, color2, color3, color4, color5, color6, color7, color8];
  }

  private createInterpolator(colors: string[]): (progress: number) => string {
    try {
      return gsap.utils.interpolate(colors);
    } catch (e) {
      return (progress: number) => "#7ed1e2";
    }
  }
}
