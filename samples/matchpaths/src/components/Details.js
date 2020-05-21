import React from "react"
import { useLocalization } from "gatsby-plugin-internationalization"

export default () => {
  const { locale } = useLocalization()
  return <div>Hello {locale} speaker!</div>
}
