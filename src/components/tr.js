import { useContext, useEffect, useState } from "react"
import { LanguageContext } from "./layout"

const Tr = ({ en, pl, children }) => {
  const { language } = useContext(LanguageContext)
  const [result, setResult] = useState(pl)

  useEffect(() => {
    const res = language === "en-US" ? en : pl
    setResult(res)
  }, [language, en, pl])

  return result ? result : children
}

export default Tr
