import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { navigate } from "gatsby";
import * as React from "react";
import { LocalizedLink, useLocalization } from "../src/index";
import { LocalizationProvider } from "../src/LocalizationContext";

const locales = ["en-GB", "en-US"];

const renderWithProvider = (element, locale, defaultLocale) =>
  render(
    <LocalizationProvider pageContext={{ locale, defaultLocale, locales }}>
      {element}
    </LocalizationProvider>
  );

describe("useLocalization", () => {
  it("returns current locale", () => {
    const Component = () => {
      const { locale } = useLocalization();

      return <div>{locale}</div>;
    };

    renderWithProvider(<Component />, "en-GB", "en-GB");

    screen.getByText("en-GB");
  });

  it("returns default locale", () => {
    const Component = () => {
      const { defaultLocale } = useLocalization();

      return <div>{defaultLocale}</div>;
    };

    renderWithProvider(<Component />, "en-GB", "en-US");

    screen.getByText("en-US");
  });

  it("returns all locales", () => {
    const Component = () => {
      const { locales } = useLocalization();

      return (
        <div>
          {locales.map((locale) => (
            <div key={locale}>{locale}</div>
          ))}
        </div>
      );
    };

    renderWithProvider(<Component />, "en-GB", "en-GB");

    for (const locale of locales) {
      screen.getByText(locale);
    }
  });

  describe("localizedNavigate", () => {
    test.each([
      ["/foo", "en-GB", "en-GB", "/foo"],
      ["/foo", "en-US", "en-GB", "/en-us/foo"],
      ["foo", "en-GB", "en-GB", "foo"],
      ["foo", "en-US", "en-GB", "foo"],
      ["../foo", "en-GB", "en-GB", "../foo"],
      ["../foo", "en-US", "en-GB", "../foo"],
    ])(
      "gatsby navigate uses locale prefix",
      (to, currentLocale, defautLocale, expected) => {
        const Component = () => {
          const { localizedNavigate } = useLocalization();

          return <button onClick={() => localizedNavigate(to)}>Click</button>;
        };

        renderWithProvider(<Component />, currentLocale, defautLocale);

        fireEvent.click(screen.getByText("Click"));
        expect(navigate).toHaveBeenCalledWith(expected, undefined);
      }
    );

    it("calls gatsby navigate with optional options", () => {
      const Component = () => {
        const { localizedNavigate } = useLocalization();

        return (
          <button onClick={() => localizedNavigate("/foo", { replace: true })}>
            Click
          </button>
        );
      };

      renderWithProvider(<Component />, "en-US", "en-GB");

      fireEvent.click(screen.getByText("Click"));
      expect(navigate).toHaveBeenCalledWith("/en-us/foo", { replace: true });
    });
  });
});

describe("LocalizedLink", () => {
  test.each([
    ["/foo", "en-GB", "en-GB", "/foo"],
    ["/foo", "en-US", "en-GB", "/en-us/foo"],
    ["foo", "en-GB", "en-GB", "foo"],
    ["foo", "en-US", "en-GB", "foo"],
    ["../foo", "en-GB", "en-GB", "../foo"],
    ["../foo", "en-US", "en-GB", "../foo"],
  ])(
    "gatsby link uses locale prefix",
    (to, currentLocale, defautLocale, expected) => {
      renderWithProvider(
        <LocalizedLink to={to}>Link</LocalizedLink>,
        currentLocale,
        defautLocale
      );

      expect(screen.getByText("Link")).toHaveAttribute("href", expected);
    }
  );
});

describe("error handling", () => {
  it("throws an error when no provider is available", () => {
    const spy = jest.spyOn(console, "error");
    spy.mockImplementation(() => {});

    const Component = () => {
      const { locale } = useLocalization();

      return <div>{locale}</div>;
    };

    expect(() => render(<Component />)).toThrowError(
      `No localization provider is available

Explanation and suggested fixes can be found at https://github.com/herecydev/gatsby-plugin-internationalization#no-localization-provider-is-available`
    );

    spy.mockRestore();
  });
});
