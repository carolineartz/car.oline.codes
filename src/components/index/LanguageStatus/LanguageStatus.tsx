import * as React from "react"
import { LanguageText } from "components/index/LanguageStatus/LanguageText"
import { LanguageStatusAnimation } from "animation/LanguageStatusAnimation"

import { LanguageStatusInfo } from "components/index/LanguageStatus/LanguageStatusInfo"
import { Box } from "grommet"
import { ResponsiveText } from "components/ResponsiveText"

type LanguageStatusState = {
  currentLanguage: string
  apiEndpoint: string
  animation?: LanguageStatusAnimation
}

const DEFAULT_LANGUAGE = "TypeScripting"
const LOCAL_STORAGE_LANGUAGE_KEY = "gatsby__currentLanguage"

const googleSheetsApiEndpoint = (): string => {
  const sheetId: string | undefined = process.env.GATSBY_GOOGLE_SHEETS_SHEET_ID
  const apiKey: string | undefined = process.env.GATSBY_GOOGLE_SHEETS_API_KEY
  const targetCell: string | undefined = process.env.GATSBY_GOOGLE_SHEETS_LANGUAGE_CELL

  if (!sheetId || !apiKey || !targetCell) {
    throw new Error("Required environment variables not set.")
  }

  return `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!${targetCell}:${targetCell}?key=${apiKey}`
}
// TODO: Guard against API call and localStorage failures.
export class LanguageStatus extends React.PureComponent<{}, LanguageStatusState> {
  ref: React.RefObject<HTMLSpanElement>

  state = {
    currentLanguage: DEFAULT_LANGUAGE,
    apiEndpoint: googleSheetsApiEndpoint(),
    animation: undefined,
  }

  constructor(props = {}) {
    super(props)
    this.ref = React.createRef()
  }

  updateLanguage = async () => {
    const currentLanguageResponse = await fetch(this.state.apiEndpoint)
    // TODO: type check this response
    const currentLanguageData: any | undefined = await currentLanguageResponse.json()

    if (currentLanguageData && !currentLanguageData.error) {
      console.log(currentLanguageData)
      const currentLanguage: string = currentLanguageData.values[0][0]

      this.setState({ currentLanguage })
      localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, currentLanguage)
    }
  }

  componentDidMount() {
    const storedLanguage: string =
      localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) || DEFAULT_LANGUAGE
    this.setState({ currentLanguage: storedLanguage })

    setInterval(
      this.updateLanguage,
      parseInt(process.env.GATSBY_POLL_GOOGLE_SHEETS_CURRENT_LANGUAGE_INTERVAL_MS || "3600000")
    )

    this.updateLanguage()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(_prevProps = {}, prevState: LanguageStatusState) {
    if (this.ref.current && this.state.currentLanguage !== prevState.currentLanguage) {
      this.setState({ animation: new LanguageStatusAnimation(this.ref.current) })
    }
  }

  render() {
    return (
      <Box fill pad="small">
        <Box direction="row" alignContent="between" fill="horizontal">
          <Box flex="grow" pad="small">
            <ResponsiveText fontSize={{ min: "26px", max: "45px" }}>
              You can often find me coding. As it turns out, I am{" "}
              <strong>
                <em>currently</em>
              </strong>{" "}
              writing some
            </ResponsiveText>
            <LanguageText ref={this.ref} animation={this.state.animation}>
              {this.state.currentLanguage}
            </LanguageText>
          </Box>
          <Box>
            <LanguageStatusInfo />
          </Box>
        </Box>
      </Box>
    )
  }
}
