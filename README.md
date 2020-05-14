# gatsby-plugin-internationalization

No-nonsense framework for providing internationalization into your Gatsby site. Providing sensible, defined defaults without polluting your site with polyfills and messing with globals.

## Outcomes

By providing an array of locales, all pages in your site will automatically be prefixed with each locale. The `lang` html attribute will be set correctly as well

## Configuration

| Name          | Type     | Required | Description                                                                                                                                                                                                                                             | Example            |
| ------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| locales       | string[] | Required | An array of locales, where each locale will be made available to each page. Each locale will be prefixed to the path, for example: `/gatsby-is-awesome/` becomes `/en-gb/gatsby-is-awesome/`. Use **ISO 639-1** and **ISO 3166** seperated with a hypen | ["en-GB", "en-US"] |
| defaultLocale | string   | Optional | Prevents this locale being prefixed to the path. Useful if you have a predominant language. All other locales will still be prefixed to the path as normal                                                                                              | "en-GB"            |

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
