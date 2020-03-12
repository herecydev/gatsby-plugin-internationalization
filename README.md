# gatsby-plugin-internationalization

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
        defaultLocale: "en-GB"
      }
    }
  ]
};
```

In your code replace usage of `Link` from gatsby to `LocalizedLink` from gatsby-plugin-internationalization. The props are identical to the regular gatsby `Link`.

```diff
import * as React from "react";
-import { Link } from "gatsby";
+import { LocalizedLink } from "gatsby-plugin-internationalization";

const Index = () => {
  return (
- 	   <Link to="/gatsby-is-awesome">Awesome page</Link>
+      <LocalizedLink to="/gatsby-is-awesome">And now localized too!</LocalizedLink>
  );
};

export default Index;
```

## Configuration

| Name          | Type     | Description                                                                                                                                                                                                                                             | Example            |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| locales       | string[] | An array of locales, where each locale will be made available to each page. Each locale will be prefixed to the path, for example: `/gatsby-is-awesome/` becomes `/en-gb/gatsby-is-awesome/`. Use **ISO 639-1** and **ISO 3166** seperated with a hypen | ["en-GB", "en-US"] |
| defaultLocale | string   | Prevents this locale being prefixed to the path. Useful if you have a predominant language. All other locales will still be prefixed to the path as normal                                                                                              | "en-GB"            |
