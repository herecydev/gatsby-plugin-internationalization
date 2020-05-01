import * as React from "react";
import { useState } from "react";
import { navigate } from "gatsby";

export const LocalizationContext = React.createContext();
LocalizationContext.displayName = "Localization";

export const LocalizationProvider = ({ children, pageContext }) => {
  const { locale, defaultLocale, locales } = pageContext;
  const [localization] = useState({
    locale,
    defaultLocale,
    locales,
    localizedNavigate: to =>
      navigate(
        locale && locale !== defaultLocale
          ? `${locale.toLowerCase()}/${to}`
          : to
      )
  });

  return (
    <LocalizationContext.Provider value={localization}>
      {children}
    </LocalizationContext.Provider>
  );
};
