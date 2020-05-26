import * as React from "react";
import { createContext } from "react";
import { useState } from "react";
import { navigate } from "gatsby";

export const LocalizationContext = createContext(0);
LocalizationContext.displayName = "Localization";

export const LocalizationProvider = ({ children, pageContext }) => {
  const { locale, defaultLocale, locales } = pageContext;
  const localizePath = (path) =>
    locale && locale !== defaultLocale
      ? `/${locale.toLowerCase()}/${path}`
      : path;
  const [localization] = useState({
    locale,
    defaultLocale,
    locales,
    localizePath,
    localizedNavigate: (to, options) => navigate(localizePath(to), options),
  });

  return (
    <LocalizationContext.Provider value={localization}>
      {children}
    </LocalizationContext.Provider>
  );
};
