import React from "react";

import { Nav, Anchor } from "grommet"
import * as Scroll from 'react-scroll';
import NavContext, {NavSection} from "@/NavContext";

const Scroller = Scroll.scroller;
const ScrollSpy = Scroll.scrollSpy;

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

  const handleSetActive = () => {
    const scroller = Scroller
    const spy = ScrollSpy
    debugger
    navContext.onActiveSection(to)
  }

  const handleSetInactive = () => {
    const scroller = Scroller
    const spy = ScrollSpy
    debugger
  }


  const handleClickLink = () => {
    const scroller = Scroller
    scroller.scrollTo(to, {
      duration: 500,
      smooth: true,
      // offset: -75
    })
  }

  return (
    <Anchor href={`#${to}`} onClick={handleClickLink} label={label} />
  )

  // return (
  //   <Scroll.Link
  //     activeClass="active"
  //     to={to}
  //     spy
  //     smooth
  //     hashSpy
  //     href={`#${to}`}
  //     duration={500}
  //     // offset={-50}
  //     // containerId="main-content"
  //     isDynamic
  //     onSetActive={handleSetActive}
  //     onSetInactive={handleSetInactive}
  //     ignoreCancelEvents={false}
  //   >
  //     {label}
  //   </Scroll.Link>
  // )
}
