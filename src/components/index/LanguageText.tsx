import * as React from "react"
import { ResponsiveText } from "components/ResponsiveText"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LanguageStatusAnimation } from "animation/LanguageStatusAnimation"
import { usePointPosition } from "hooks/use-point-position"

type LanuageTextProps = {
  text: string
}

// const Text = ({ text }: LanuageTextProps) => {
//   const ref: React.RefObject<Node> = React.createRef()
//   const element = ref.current
// }type LanuageTextProps = {
//   text: string
// }

// const Text = ({ text }: LanuageTextProps) => {
//   const ref: React.RefObject<Node> = React.createRef()
//   const element = ref.current
// }

// const FancyButton = React.forwardRef((props, ref) => (
//   <button ref={ref} className="FancyButton">
//     {props.children}
//   </button>
// ));

// const MemoedComponent = React.memo((props) => {

// })
export const LanguageText = React.forwardRef((props, ref: React.Ref<HTMLDivElement> | null) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const ref: React.RefObject<HTMLDivElement> = React.createRef()
  // const ref = React.createRef()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const position = usePointPosition()
  const blah = ref as React.RefObject<HTMLDivElement>
  // return React.forwardRef((props, ref: React.Ref<HTMLSpanElement>) => {
  if (ref && blah && blah.current) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const animation = new LanguageStatusAnimation(blah.current, position)
    animation.animate()
  }

  return (
    <ResponsiveText fontSize={{ min: "50px", max: "99px" }}>
      <div ref={ref}>{props.children}</div>
    </ResponsiveText>
  )
  // })

  // return React.forwardRef(
  //   <ResponsiveText ref={ref} fontSize={{ min: "50px", max: "99px" }}>
  //     {text}
  //   </ResponsiveText>
  // )
})
