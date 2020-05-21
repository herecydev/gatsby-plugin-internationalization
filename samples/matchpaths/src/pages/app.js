import React from "react"
import Details from "../components/Details"
import { LocalizedRouter } from "gatsby-plugin-internationalization"

export default () => {
  return (
    <LocalizedRouter basepath="/app">
      <Details path="/details" />
    </LocalizedRouter>
  )
}
