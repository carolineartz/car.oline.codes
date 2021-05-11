import "styled-components/macro";
import React from "react"
import { Text, Anchor, Heading, Box, Spinner, Accordion, AccordionPanel, Nav } from "grommet";
import { PortfolioItem } from "@/components/PortfolioItem";
import { TechnologyList } from "@/components/TechnologiesList";
import { Fade } from "react-awesome-reveal";
import * as Scroll from 'react-scroll';
import NavContext, {NAV_ITEMS} from "@/NavContext";
import { Projects } from "@/components/Projects";

const scroller = Scroll.scroller;
const scrollSpy = Scroll.scrollSpy

const SCROLL_CONTAINER_ID = "main-content"

export const MainContent = () => {
  const navContext = React.useContext(NavContext)
  // const nextActiveIndex = React.useRef<number | undefined>(undefined)


  // const handleActiveChange = ([index]: number[]) => {
  //   console.log("HANDLE ACTIVE CHANGE", index)
  //   if (typeof index !== "undefined") {
  //     nextActiveIndex.current = index
  //     navContext.onActiveIndex([])
  //     debugger
  //   } else if (nextActiveIndex.current !== undefined) {
  //     navContext.onActiveIndex([nextActiveIndex.current])
  //     nextActiveIndex.current = undefined
  //     debugger
  //   } else {
  //     debugger
  //   }
  //   // navContext.onActiveIndex([index])
  //   // const nextSection = navContext.getSection(index)

  //   // if (nextSection) {
  //   //   const link = scroller.get(nextSection)
  //   //   scroller.setActiveLink(link)
  //   // }
  // }





  // React.useEffect(() => {
  //   // const foo = scrollSpy
  //   // scrollSpy.update()
  //   const activeIndex = navContext.activeIndex
  //   console.log("FOO", activeIndex)
  //   debugger
  // }, [navContext.activeIndex])

  return (
    <Box fill='horizontal'>
      <Scroll.Element name={SCROLL_CONTAINER_ID} id={SCROLL_CONTAINER_ID}>
        <Accordion animate={navContext.activeSection !== "projects" } onActive={navContext.onActiveIndex} activeIndex={navContext.activeIndex}>
          <AccordionPanel id="foo" header={<AccordionHeading name={NAV_ITEMS.about.name} label={NAV_ITEMS.about.label} />}>
            {/* <Scroll.Element id={NAV_ITEMS.about.name} name={NAV_ITEMS.about.name} /> */}
            <Box pad="medium">
              <Text>One</Text>
            </Box>
          </AccordionPanel>
          <AccordionPanel header={<AccordionHeading name={NAV_ITEMS.projects.name} label={NAV_ITEMS.projects.label} />}>
            {/* <Scroll.Element id={NAV_ITEMS.projects.name} name={NAV_ITEMS.projects.name} /> */}
            <Box pad="medium">
              <Projects />
            </Box>
          </AccordionPanel>
          <AccordionPanel header={<AccordionHeading name={NAV_ITEMS.cv.name} label={NAV_ITEMS.cv.label} />}>
            {/* <Scroll.Element id={NAV_ITEMS.cv.name} name={NAV_ITEMS.cv.name} /> */}
            <Box pad="medium">
              <Text>Three</Text>
            </Box>
          </AccordionPanel>
          <AccordionPanel header={<AccordionHeading name={NAV_ITEMS.contact.name} label={NAV_ITEMS.contact.label} />}>
            {/* <Scroll.Element id={NAV_ITEMS.contact.name} name={NAV_ITEMS.contact.name} /> */}
            <Box pad="medium">
              <Text>Four</Text>
            </Box>
          </AccordionPanel>
        </Accordion>
          {!navContext.activeItem && <Box height="100vh"></Box>}
      </Scroll.Element>
    </Box>
  )
}


type AccordionHeadingProps = {
  name: string,
  label: string
  active?: boolean
}
const AccordionHeading = ({name, label, active = false}: AccordionHeadingProps) => {
  return (
    <Scroll.Element id={name} name={name}>
      <Box pad={{ horizontal: "large" }}>
        <Heading color={active ? "brand" : undefined} level="2">{label}</Heading>
      </Box>
    </Scroll.Element>
  )
}

