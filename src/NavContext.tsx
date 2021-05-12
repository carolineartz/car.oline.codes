import React from "react"
import * as Scroll from 'react-scroll';

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
  onActiveIndex: ([index]: number[], animate?: boolean) => void
  onActiveSection: (section: NavSection) => void
  getSection: (index: number) => NavSection | undefined
  getIndex: (section: NavSection) => number | undefined
  shouldAnimateRef: React.MutableRefObject<boolean> | null
}

export const initialValue: NavContextType = {
  sections: [],
  onActiveIndex: () => {},
  onActiveSection: () => {},
  getSection: () => undefined,
  getIndex: () => undefined,
  shouldAnimateRef: null
}

const NavContext = React.createContext<NavContextType>(initialValue)

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const sections = React.useMemo(() => Object.keys(NAV_ITEMS) as NavSection[], [])
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined)
  const shouldAnimateRef = React.useRef(true)

  const handleChangeActiveIndex = React.useCallback(([index]: number[], animate = true) => {
    shouldAnimateRef.current = animate

    const currentlyActiveSection = typeof activeIndex === "number" ? Object.keys(NAV_ITEMS)[activeIndex] as NavSection : undefined
    const targetSection = sections[index]
    const scrollToSection = () => {
      if (targetSection) {
        scroller.scrollTo(targetSection, {
          duration: 300,
          smooth: true,
        })
      }
    }

    if (currentlyActiveSection === "projects" || targetSection === "projects") {
      shouldAnimateRef.current = false
    }

    if (typeof index === "number" && typeof activeIndex === "number" && activeIndex < index) {
      shouldAnimateRef.current = false
      setActiveIndex(undefined)
      setTimeout(scrollToSection, 10)
    } else if (targetSection) {
      scrollToSection()
    } else {
      setActiveIndex(undefined)
    }
  }, [activeIndex, sections])

  const handleDirectNavigation = React.useCallback(() => {
    const initialLocation = window.location.hash.substring(1)

    if (initialLocation && sections.includes(initialLocation as NavSection)) {
      const index = sections.indexOf(initialLocation as NavSection)
      handleChangeActiveIndex([index])
    }
  }, [handleChangeActiveIndex, sections])

  React.useEffect(() => {
    handleDirectNavigation()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useLayoutEffect(() => {
    const onScrollBegin = (to: string, element: any) => {
      const sectionHash: string | undefined = element?.id
      const sectionIndex = sections.indexOf(sectionHash as NavSection)

      if (sectionIndex !== -1) {
        setActiveIndex(sectionIndex)
      }
    }

    const onScrollEnd = (to: string, element: any) => {
      const windowHash = window.location.hash.substr(1)
      const sectionHash: string | undefined = element?.id

      if (sectionHash && windowHash !== sectionHash) {
        // window.location.hash = sectionHash
        updateHash(sectionHash)
      }
    }

    const handlePopState = (evt: any) => {
      handleDirectNavigation()
    }

    window.addEventListener("popstate", handlePopState)

    Scroll.Events.scrollEvent.remove('begin');
    Scroll.Events.scrollEvent.remove('end');

    Scroll.Events.scrollEvent.register('begin', onScrollBegin);
    Scroll.Events.scrollEvent.register('end', onScrollEnd);

    return () => {
      Scroll.Events.scrollEvent.remove('begin');
      Scroll.Events.scrollEvent.remove('end');

      window.removeEventListener("popstate", handlePopState)
    }
  }, [sections, activeIndex, handleDirectNavigation])

  const activeSection = typeof activeIndex === "number" ? Object.keys(NAV_ITEMS)[activeIndex] as NavSection : undefined

  return (
    <NavContext.Provider
      value={{
        shouldAnimateRef,
        sections,
        activeIndex,
        onActiveIndex: handleChangeActiveIndex,
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
        getIndex: (section: NavSection) => {
          const index = sections.indexOf(section)
          if (index === -1) {
            return undefined
          } else {
            return index
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
