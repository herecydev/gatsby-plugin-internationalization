import * as React from "react";
import { LocalizationProvider } from "./LocalizationContext";

const withLocalization = ({ element, props }) => (
  <LocalizationProvider pageContext={props.pageContext}>
    {element}
  </LocalizationProvider>
);

export default withLocalization;
