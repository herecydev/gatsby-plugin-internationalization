import * as React from "react";
import { useState } from "react";

export const localizationContext = React.createContext();
localizationContext.displayName = "Localization";

export const LocalizationProvider = ({ children, pageContext }) => {
  const [localization] = useState({
    locale: pageContext.locale,
    defaultLocale: pageContext.defaultLocale,
    locales: pageContext.locales
  });

  return (
    <localizationContext.Provider value={localization}>
      {children}
    </localizationContext.Provider>
  );
};
