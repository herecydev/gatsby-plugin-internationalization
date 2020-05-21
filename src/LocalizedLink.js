import * as React from "react";
import { Link } from "gatsby";
import useLocalization from "./useLocalization";

const LocalizedLink = ({ to, children, ...rest }) => {
  const { localizePath } = useLocalization();
  const path = localizePath(to);

  return (
    <Link to={path} {...rest}>
      {children}
    </Link>
  );
};

export default LocalizedLink;
