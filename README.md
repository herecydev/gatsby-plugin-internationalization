# gatsby-plugin-internationalization

No-nonsense framework for providing internationalization into your Gatsby site. Providing sensible, defined defaults without polluting your site with polyfills and messing with globals.

## Outcomes

By providing an array of locales, all pages in your site will automatically be prefixed with each locale. The `lang` html attribute will be set correctly as well

## Configuration

| Name          | Type     | Required | Description                                                                                                                                                                                                                                             | Example              |
| ------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| locales       | string[] | Required | An array of locales, where each locale will be made available to each page. Each locale will be prefixed to the path, for example: `/gatsby-is-awesome/` becomes `/en-gb/gatsby-is-awesome/`. Use **ISO 639-1** and **ISO 3166** seperated with a hypen | ["en-GB", "en-US"]   |
| defaultLocale | string   | Optional | Prevents this locale being prefixed to the path. Useful if you have a predominant language. All other locales will still be prefixed to the path as normal                                                                                              | "en-GB"              |
| siteUrl       | string   | Optional | Required if "htmlTags" is true. The scheme and domain of the site                                                                                                                                                                                       | "https://mysite.com" |
| htmlTags      | boolean  | Optional | Generates `<link rel="alternate" />` elements in the head, so site crawlers can detect alternate locales for each page                                                                                                                                    | true                 |

## Usage

In your `gatsby-config.js`

```js
module.exports = {
  plugins: [
    //... other plugins
    {
      resolve: `gatsby-plugin-internationalization`,
      options: {
        locales: ["en-GB", "en-US"],
        defaultLocale: "en-GB",
      },
    },
  ],
};
```

In your code replace usage of `Link` from gatsby to `LocalizedLink` from gatsby-plugin-internationalization. The props are identical to the regular gatsby `Link`.

```diff
import * as React from "react";
-import { Link } from "gatsby";
+import { LocalizedLink } from "gatsby-plugin-internationalization";

const Index = () => {
  return (
-      <Link to="/gatsby-is-awesome">Awesome page</Link>
+      <LocalizedLink to="/gatsby-is-awesome">And now localized too!</LocalizedLink>
  );
};

export default Index;
```

Similarly, replace `navigate` with `localizedNavigate` that is returned from `useLocalization`.

```diff
import * as React from "react";
-import { navigate } from "gatsby";
+import { useLocalization } from "gatsby-plugin-internationalization";

const Index = () => {
+ const { localizedNavigate } = useLocalization();
  return (
-      <button onClick={() => navigate("/")}>Go back</button>
+      <button onClick={() => localizedNavigate("/")}>Go back</button>
  );
};

export default Index;
```

## API

### LocalizedLink

`<LocalizedLink to="/foo">Foo</LocalizedLink>`

A component that accepts all the props of Gatsby's `Link` component but will automatically prefix the correct locale onto the pathname, i.e. `/foo` will navigate to `/en-US/foo` if the current locale is `en-US`.

### useLocalization

`const { locale, defaultLocale, locales, localizedNavigate } = useLocalization()`

Returns an object that contains:

- locale - The current locale
- defaultLocale - The default locale configured
- locales - An array of locales configured
- localizedNavigate - A function that accepts a path and will navigate to the localized version of that path

### LocalizationProvider

```jsx
<LocalizationProvider pageContext={{ locale, defaultLocale, locales }}>
  <MyComponent />
</LocalizationProvider>
```

The [React context](https://reactjs.org/docs/context.html) that is used by this plugin. Only really useful if you're trying to test your Gatsby site. You can use in your test code, providing the correct data for the child components.

### LocalizationContext

```jsx
<LocalizationContext.Provider
  value={{ locale, defaultLocale, locales, localizedNavigate }}
>
  <MyComponent />
</LocalizationContext.Provider>
```

The [React context](https://reactjs.org/docs/context.html) that is used by this plugin. Can be used to provide more specific behavior.

### LocalizedRouter

```jsx
<LocalizedRouter basepath="/app">
  <Details path="/details" />
</LocalizedRouter>
```

Provides a `<Router />` from @reach/router that automatically has the correct locale prefixed to the basepath supplied.

## Client-only routes/Matchpaths

If a page has a matchPath set, it will automatically be prefixed with the locale. A [LocalizedRouter](#LocalizedRouter) is exported that will handle the prefixing of the basepath for the client-side routing. Alternatively, you can use the `useLocalization` hook to form the paths yourself.

> ⚠ To take advantage of this behavior, you must remember that order of plugins matters, so if you are using `gatsby-plugin-create-client-paths` it must be configured **before** `gatsby-plugin-internationalization`

For further information see the [matchpaths sample](https://github.com/herecydev/gatsby-plugin-internationalization/tree/master/samples/matchpaths).

## FAQ

### No localization provider is available

There is no `<LocalizationContext.Provider />` available for either `<LocalizedLink />` or `useLocalization()` to use. There are 2 common reasons this can occur;

#### Using wrapRootElement

You are trying to consume localization information in `wrapRootElement`. Unfortunately because there is no page related information, the plugin cannot provide any localization related information.

Fix:

```jsx
// ❌
const wrapRootElement = ({ element }) => (
  <MyLocalizationConsumer>{element}</MyLocalizationConsumer>
);

// ✅
const wrapPageElement = ({ element }) => (
  <MyLocalizationConsumer>{element}</MyLocalizationConsumer>
);
```

#### Using wrapPageElement at a site level

You are trying to consume localization information in `wrapPageElement` but using a site level plugin, i.e. in your gatsby-browser.js. Due to the way that plugins are ordered by gatsby, your site level will always "win" vs the gatsby-plugin-internationalization and will sit **higher** in the react tree. Again, we face a similar problem to above where the plugin cannot provide any localization related information.

Fix:

```jsx
// ❌
const wrapPageElement = ({ element }) => (
  <MyLocalizationConsumer>{element}</MyLocalizationConsumer>
);

// ✅ We can add another LocalizationProvider above our consumer and all is right in the world 👌
import { LocalizationProvider } from "gatsby-plugin-internationalization";

const wrapPageElement = ({ element, props }) => (
  <LocalizationProvider {...props}>
    <MyLocalizationConsumer>{element}</MyLocalizationConsumer>
  </LocalizationProvider>
);
```
