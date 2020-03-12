exports.onCreatePage = ({ page, actions }, pluginOptions) => {
  if (page.context.locales) {
    return;
  }
  
  const { createPage, deletePage } = actions;
  deletePage(page);

  for (const locale of pluginOptions.locales) {
    const isDefault = pluginOptions.defaultLocale === locale;
    const path = isDefault ? page.path : `/${locale.toLowerCase()}${page.path}`;

    createPage({
      ...page,
      path,
      context: {
        ...page.context,
        locale,
        defaultLocale: pluginOptions.defaultLocale,
        locales: pluginOptions.locales
      }
    });
  }
};
