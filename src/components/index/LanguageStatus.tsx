import * as React from "react"
import { LanguageText } from "components/index/LanguageText"
import { LanguageStatusAnimation } from "animation/LanguageStatusAnimation"

type LanguageStatusState = {
  currentLanguage: string
  previousLanguage: string
  apiEndpoint: string
  animation?: LanguageStatusAnimation
}

const DEFAULT_LANGUAGE = "TypeScript"
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
    previousLanguage: "",
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

    if (currentLanguageData) {
      const currentLanguage: string = currentLanguageData.values[0][0]
      const previousLanguage: string = this.state.currentLanguage

      this.setState({ currentLanguage, previousLanguage })
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
      <LanguageText ref={this.ref} animation={this.state.animation}>
        {this.state.currentLanguage}
      </LanguageText>
    )
  }
}
