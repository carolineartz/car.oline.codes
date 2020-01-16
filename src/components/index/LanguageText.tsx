import * as React from "react"

import { ResponsiveText } from "components/ResponsiveText"
import { LanguageStatusAnimation } from "animation/LanguageStatusAnimation"
import { usePointPosition } from "hooks/use-point-position"

type LanuageTextProps = {
  children: React.ReactNode
  animation?: LanguageStatusAnimation
}

// May want to try this as a memo'd function -- Currently this is only a child of a Pure component...
export const LanguageText = React.forwardRef(
  ({ children, animation }: LanuageTextProps, ref: React.Ref<HTMLSpanElement>) => {
    if (animation) {
      const position = usePointPosition()
      animation.animate(position)
    }

    return (
      <ResponsiveText fontSize={{ min: "50px", max: "99px" }}>
        <span ref={ref}>{children}</span>
      </ResponsiveText>
    )
  }
)
