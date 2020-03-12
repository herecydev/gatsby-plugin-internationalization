import React from "react";
import { Link } from "gatsby";
import useLocalization from "./useLocalization";

const LocalizedLink = ({ to, children, ...rest }) => {
  const { locale, defaultLocale } = useLocalization();
  const path =
    locale && locale !== defaultLocale ? `${locale.toLowerCase()}/${to}` : to;

  return (
    <Link to={path} {...rest}>
      {children}
    </Link>
  );
};

export default LocalizedLink;
