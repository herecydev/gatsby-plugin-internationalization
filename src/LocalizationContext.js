import * as React from "react";
import { createContext } from "react";
import { useState } from "react";
import { navigate } from "gatsby";

export const LocalizationContext = createContext(0);
LocalizationContext.displayName = "Localization";

export const LocalizationProvider = ({ children, pageContext }) => {
  const { locale, defaultLocale, locales } = pageContext;
  const [localization] = useState({
    locale,
    defaultLocale,
    locales,
    localizedNavigate: (to, options) =>
      navigate(
        locale && locale !== defaultLocale
          ? `${locale.toLowerCase()}/${to}`
          : to,
        options
      ),
  });

  return (
    <LocalizationContext.Provider value={localization}>
      {children}
    </LocalizationContext.Provider>
  );
};
