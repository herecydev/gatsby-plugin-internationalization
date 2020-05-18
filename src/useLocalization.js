import { useContext } from "react";
import { LocalizationContext } from "./LocalizationContext";

const errorMessage = `No localization provider is available

Explanation and suggested fixes can be found at https://github.com/herecydev/gatsby-plugin-internationalization#no-localization-provider-is-available`;

const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (context === 0 && process.env.NODE_ENV !== "production") {
    throw new Error(errorMessage);
  } else {
    return context;
  }
};

export default useLocalization;
