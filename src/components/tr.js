import React, { useContext, useEffect, useState } from "react"
import { LanguageContext } from "./layout"

const Tr = ({ children }) => {
  const { language } = useContext(LanguageContext)
  const [result, setResult] = useState("")

  useEffect(() => {
    const text = String(children)
    const res = language === "en-US" ? text.split("|")[0] : text.split("|")[1]
    setResult(res)
  }, [language])

  return result ? result : children
}

export default Tr
