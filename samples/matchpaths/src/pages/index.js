import React from "react"
import {
  useLocalization,
  LocalizedLink,
} from "gatsby-plugin-internationalization"

export default () => {
  const { locale } = useLocalization()
  return (
    <>
      <div>Hello {locale} world!</div>
      <LocalizedLink to="/app/details">Go to your details page</LocalizedLink>
    </>
  )
}
