import React from "react";

import { Nav, Anchor } from "grommet"
import NavContext, {NavSection} from "@/NavContext";

export const MainNav = () => {
  return (
    <Nav direction="row">
      <NavLink to="about" label="About" />
      <NavLink to="projects" label="Projects" />
      <NavLink to="cv" label="CV" />
      <NavLink to="contact" label="Contact" />
  </Nav>
  )
}

const NavLink = ({ to, label }: { to: NavSection, label: string }) => {
  const navContext = React.useContext(NavContext)

  const handleClickLink: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault()

    const index = navContext.getIndex(to)

    if (typeof index === "number") {
      navContext.onActiveIndex([index], to === navContext.activeSection)
    }
  }

  return (
    <Anchor href={`#${to}`} onClick={handleClickLink} label={label} />
  )
}
