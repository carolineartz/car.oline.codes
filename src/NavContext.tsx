import React from "react"
import * as Scroll from 'react-scroll';
import { useTraceableState } from "./hooks/traceable";

const scroller = Scroll.scroller;

export type NavSection = "about" | "projects" | "cv" | "contact"

export type NavItem = {
  name: NavSection
  label: string
}

export const NAV_ITEMS: Record<NavSection, NavItem> = {
  about: {
    name: "about",
    label: "About"
  },
  projects: {
    name: "projects",
    label: "Projects"
  },
  cv: {
    name: "cv",
    label: "CV"
  },
  contact: {
    name: "contact",
    label: "Contact"
  }
}

type NavContextType = {
  sections: NavSection[]
  activeSection?: NavSection
  activeIndex?: number
  activeItem?: NavItem
  onActiveIndex: ([index]: number[]) => void
  onActiveSection: (section: NavSection) => void
  getSection: (index: number) => NavSection | undefined
}

export const initialValue: NavContextType = {
  sections: [],
  onActiveIndex: () => {},
  onActiveSection: () => {},
  getSection: () => undefined
}

const NavContext = React.createContext<NavContextType>(initialValue)

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const sections = React.useMemo(() => Object.keys(NAV_ITEMS) as NavSection[], [])
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined)
  // const nextActiveIndex = React.useRef<number | undefined>(undefined)

  // const [activeSection, setActiveSection] = React.useState<NavSection | undefined>()
  // const [activeItem, setActiveItem] = React.useState<NavItem | undefined>()

  React.useEffect(() => {
    const onScrollBegin = (to: string, element: any) => {
      console.log("BEGIN", "to", to, "emement", element)
      // setActiveIndex(undefined)
      const sectionHash: string | undefined = element?.id
      const sectionIndex = sections.indexOf(sectionHash as NavSection)

      if (sectionIndex !== -1) {
        setActiveIndex(sectionIndex)
      }
    }

    const onScrollEnd = (to: string, element: any) => {
      console.log("END", "to", to, "emement", element)

      const windowHash = window.location.hash.substr(1)
      const sectionHash: string | undefined = element?.id

      if (sectionHash && windowHash !== sectionHash) {
        updateHash(sectionHash)
      }

      // if (sectionHash && windowHash !== sectionHash) {
      //   window.location.hash = `#${sectionHash}`
      // }

      // const sectionIndex = sections.indexOf(windowHash as NavSection)
      // if (sectionIndex !== -1) {
      //   setActiveIndex(sectionIndex)
      // }

    }

    Scroll.Events.scrollEvent.register('begin', onScrollBegin);
    Scroll.Events.scrollEvent.register('end', onScrollEnd);

    return () => {
      Scroll.Events.scrollEvent.remove('begin');
      Scroll.Events.scrollEvent.remove('end');
    }
  }, [sections])

  // React.useEffect(() => {
  //   console.log("PREV", prevActiveIndex, "THIS", activeIndex)

  //   // const nextSection = typeof activeIndex === "number" ? Object.keys(NAV_ITEMS)[activeIndex] as NavSection : undefined
  //   // setActiveSection(nextSection)
  //   // setActiveItem(nextSection ? NAV_ITEMS[nextSection] : undefined)

  //   // debugger

  //   if (typeof activeIndex !== "undefined") {
  //     const section = sections[activeIndex]
  //     if (section) {
  //       const link = scroller.get(section)
  //       scroller.scrollTo(section, {
  //         duration: 500,
  //         smooth: true,
  //         // offset: -75
  //         // containerId: 'main-content',
  //       })
  //       scroller.setActiveLink(link)
  //     }
  //   }
  // }, [activeIndex, prevActiveIndex, sections])

  // React.useEffect(() => {
  //   const initialHash = window.location.hash.substr(1)
  //   const sectionIndex = sections.indexOf(initialHash as NavSection)

  //   if (sectionIndex !== -1) {
    //     setActiveIndex(sectionIndex)
    //   }
    // }, [sections, setActiveIndex])

    // const link = scroller.get(targetSection)
    // scroller.setActiveLink(link)
  const activeSection = typeof activeIndex === "number" ? Object.keys(NAV_ITEMS)[activeIndex] as NavSection : undefined

  return (
    <NavContext.Provider
      value={{
        sections,
        activeIndex,
        onActiveIndex: ([index]: number[]) => {
          const targetSection = sections[index]
          const scrollToSection = () => {
            if (targetSection) {
              scroller.scrollTo(targetSection, {
                duration: 300,
                smooth: true,
              })
            }
          }

          if (typeof index === "number" && typeof activeIndex === "number" && activeIndex < index) {
            setActiveIndex(undefined)
            setTimeout(scrollToSection, 500)
          }

          else if (targetSection) {
            scrollToSection()
          }

          else {
            setActiveIndex(undefined)
          }
        },
        activeItem: activeSection ? NAV_ITEMS[activeSection] : undefined,
        activeSection,
        onActiveSection: (section?: NavSection) => {
          if (!section) {
            setActiveIndex(undefined)
          }
          else {
            const index = sections.indexOf(section)
            if (index !== -1) {
              setActiveIndex(index)
            }
          }
        },
        getSection: (index: number) => {
          return sections[index]
        }
      }}
    >
      {children}
    </NavContext.Provider>
  )
}


function updateHash(hash: string, historyUpdate: boolean = false) {
  const hashVal = hash.indexOf("#") === 0 ? hash.substring(1) : hash;
  const hashToUpdate = hashVal ? `#${hashVal}` : "";
  const curLoc = window && window.location;
  const urlToPush = hashToUpdate
    ? curLoc.pathname + curLoc.search + hashToUpdate
    : curLoc.pathname + curLoc.search;
  historyUpdate
    ? window.history.pushState(null, "", urlToPush)
    : window.history.replaceState(null, "", urlToPush);
};

export default NavContext
