import * as React from "react"
import { navigate } from "gatsby"

import { Anchor, AnchorProps } from "grommet"

/*
  Make the Gatsby Link behavior compatable with the Grommet link styling
*/

type LinkProps = { to: string; state?: any; replace?: boolean }
type InternalLinkProps = Exclude<AnchorProps & LinkProps, "href">

export const InternalLink = (props: InternalLinkProps) => {
  const { to, replace, state, ...rest } = props

  return (
    <Anchor
      onClick={async (event: any) => {
        event.preventDefault
        navigate(to, { replace, state })
      }}
      {...rest}
    />
  )
}
