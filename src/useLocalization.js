import { useContext } from "react";
import { localizationContext } from "./LocalizationContext"

const useLocalization = () => useContext(localizationContext);

export default useLocalization;
