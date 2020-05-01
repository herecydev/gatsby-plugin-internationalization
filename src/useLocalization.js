import { useContext } from "react";
import { LocalizationContext } from "./LocalizationContext";

const useLocalization = () => useContext(LocalizationContext);

export default useLocalization;
