import "@testing-library/jest-dom";
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
