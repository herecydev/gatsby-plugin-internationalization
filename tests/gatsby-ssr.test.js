import "@testing-library/jest-dom";
import * as React from "react";
import { onRenderBody } from "../src/gatsby-ssr";

const locales = ["en-GB", "en-US"];

describe("lang attribute", () => {
  it("adds default locale lang attribute if pathname does not match locale", () => {
    const setHtmlAttributes = jest.fn();

    const pluginOptions = {
      defaultLocale: "en-GB",
      locales,
    };

    onRenderBody({ setHtmlAttributes, pathname: "/foo" }, pluginOptions);

    expect(setHtmlAttributes).toHaveBeenCalledWith({ lang: "en-GB" });
  });

  it("adds matching locale lang attribute if pathname matches locale", () => {
    const setHtmlAttributes = jest.fn();

    const pluginOptions = {
      defaultLocale: "en-GB",
      locales,
    };

    onRenderBody({ setHtmlAttributes, pathname: "/en-us/foo" }, pluginOptions);

    expect(setHtmlAttributes).toHaveBeenCalledWith({ lang: "en-US" });
  });
});

describe("lang attribute", () => {
  it("adds default locale lang attribute if pathname does not match locale", () => {
    const setHtmlAttributes = jest.fn();
    const setHeadComponents = jest.fn();

    const pluginOptions = {
      defaultLocale: "en-GB",
      locales,
      siteUrl: "https://website.com",
      htmlTags: true,
    };

    const actions = {
      setHtmlAttributes,
      setHeadComponents,
    };

    onRenderBody({ ...actions, pathname: "/" }, pluginOptions);
    onRenderBody({ ...actions, pathname: "/en-us/" }, pluginOptions);
    onRenderBody({ ...actions, pathname: "/foo/" }, pluginOptions);
    onRenderBody({ ...actions, pathname: "/en-us/foo/" }, pluginOptions);

    expect(setHeadComponents).toHaveBeenNthCalledWith(1, [
      <link rel="alternate" hreflang="en-gb" href={`https://website.com/`} />,
      <link
        rel="alternate"
        hreflang="en-us"
        href={`https://website.com/en-us/`}
      />,
    ]);

    expect(setHeadComponents).toHaveBeenNthCalledWith(2, [
      <link rel="alternate" hreflang="en-gb" href={`https://website.com/`} />,
      <link
        rel="alternate"
        hreflang="en-us"
        href={`https://website.com/en-us/`}
      />,
    ]);

    expect(setHeadComponents).toHaveBeenNthCalledWith(3, [
      <link
        rel="alternate"
        hreflang="en-gb"
        href={`https://website.com/foo/`}
      />,
      <link
        rel="alternate"
        hreflang="en-us"
        href={`https://website.com/en-us/foo/`}
      />,
    ]);

    expect(setHeadComponents).toHaveBeenNthCalledWith(4, [
      <link
        rel="alternate"
        hreflang="en-gb"
        href={`https://website.com/foo/`}
      />,
      <link
        rel="alternate"
        hreflang="en-us"
        href={`https://website.com/en-us/foo/`}
      />,
    ]);
  });
});
