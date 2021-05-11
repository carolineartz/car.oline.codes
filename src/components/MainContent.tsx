import "styled-components/macro";
import React from "react"
import { Text, Heading, Box, Accordion, AccordionPanel } from "grommet";
import * as Scroll from 'react-scroll';
import NavContext, {NAV_ITEMS} from "@/NavContext";
import { Projects } from "@/components/Projects";

const SCROLL_CONTAINER_ID = "main-content"

export const MainContent = () => {
  const navContext = React.useContext(NavContext)

  return (
    <Box fill='horizontal'>
      <Scroll.Element name={SCROLL_CONTAINER_ID} id={SCROLL_CONTAINER_ID}>
        <Accordion animate={navContext.shouldAnimateRef?.current} onActive={navContext.onActiveIndex} activeIndex={navContext.activeIndex}>
          <AccordionPanel id="foo" header={<AccordionHeading name={NAV_ITEMS.about.name} label={NAV_ITEMS.about.label} />}>
            <Box pad="medium">
              <Text>One</Text>
            </Box>
          </AccordionPanel>
          <AccordionPanel header={<AccordionHeading name={NAV_ITEMS.projects.name} label={NAV_ITEMS.projects.label} />}>
            <Box pad="medium">
              <Projects />
            </Box>
          </AccordionPanel>
          <AccordionPanel header={<AccordionHeading name={NAV_ITEMS.cv.name} label={NAV_ITEMS.cv.label} />}>
            <Box pad="medium">
              <Text>Three</Text>
            </Box>
          </AccordionPanel>
          <AccordionPanel header={<AccordionHeading name={NAV_ITEMS.contact.name} label={NAV_ITEMS.contact.label} />}>
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

