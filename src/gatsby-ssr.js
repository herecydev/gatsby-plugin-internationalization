import withLocalization from "./withLocalization";

export const wrapPageElement = withLocalization;

export const onRenderBody = (
  { setHtmlAttributes, pathname },
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
};
