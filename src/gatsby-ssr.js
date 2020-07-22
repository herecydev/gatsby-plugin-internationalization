import * as React from "react";
import withLocalization from "./withLocalization";

export const wrapPageElement = withLocalization;

export const onRenderBody = (
  { setHtmlAttributes, setHeadComponents, pathname },
  pluginOptions
) => {
  const { locales, defaultLocale } = pluginOptions;

  let matchedLocale = defaultLocale;

  for (const locale of locales) {
    if (pathname.startsWith(`/${locale.toLowerCase()}/`)) {
      matchedLocale = locale;
      break;
    }
  }

  setHtmlAttributes({
    lang: matchedLocale,
  });

  if (pluginOptions.htmlTags) {
    const siteUrl = pluginOptions.siteUrl;

    const actualPath =
      matchedLocale === defaultLocale
        ? pathname
        : pathname.slice(matchedLocale.length + 1);

    const links = [];
    for (const locale of locales) {
      const lowerCaseLocale = locale.toLowerCase();
      const localizedPath =
        locale === defaultLocale
          ? actualPath
          : `/${lowerCaseLocale}${actualPath}`;
      links.push(
        <link
          rel="alternate"
          hreflang={`${lowerCaseLocale}`}
          href={`${siteUrl}${localizedPath}`}
        />
      );
    }

    setHeadComponents(links);
  }
};
