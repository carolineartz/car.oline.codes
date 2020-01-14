import * as React from "react"
import { ResponsiveText } from "components/ResponsiveText"

type LanguageStatusState = {
  currentLanguage: string
  apiEndpoint: string
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
  state = {
    currentLanguage: DEFAULT_LANGUAGE,
    apiEndpoint: googleSheetsApiEndpoint(),
  }

  updateCurrentLanguage = async () => {
    const currentLanguageResponse = await fetch(this.state.apiEndpoint)
    const currentLanguageData: any | undefined = await currentLanguageResponse.json()

    if (currentLanguageData) {
      const lang: string = currentLanguageData.values[0][0]
      this.setState({ currentLanguage: lang })
      localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, lang)
    }
  }

  componentDidMount() {
    const storedLanguage: string =
      localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) || DEFAULT_LANGUAGE
    this.setState({ currentLanguage: storedLanguage })

    setInterval(
      this.updateCurrentLanguage,
      parseInt(process.env.GATSBY_POLL_GOOGLE_SHEETS_CURRENT_LANGUAGE_INTERVAL_MS || "3600000")
    )

    this.updateCurrentLanguage()
  }

  render() {
    return (
      <ResponsiveText fontSize={{ min: "50px", max: "99px" }}>
        {this.state.currentLanguage}
      </ResponsiveText>
    )
  }
}
