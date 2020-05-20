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

describe("gatsby-plugin-internationalization", () => {
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
      it("calls gatsby navigate with path when current locale is the default locale", () => {
        const Component = () => {
          const { localizedNavigate } = useLocalization();

          return (
            <button onClick={() => localizedNavigate("foo")}>Click</button>
          );
        };

        renderWithProvider(<Component />, "en-GB", "en-GB");

        fireEvent.click(screen.getByText("Click"));
        expect(navigate).toHaveBeenCalledWith("foo", undefined);
      });

      it("calls gatsby navigate with localized path when current locale is not the default locale", () => {
        const Component = () => {
          const { localizedNavigate } = useLocalization();

          return (
            <button onClick={() => localizedNavigate("foo")}>Click</button>
          );
        };

        renderWithProvider(<Component />, "en-US", "en-GB");

        fireEvent.click(screen.getByText("Click"));
        expect(navigate).toHaveBeenCalledWith("en-us/foo", undefined);
      });

      it("calls gatsby navigate with optional options", () => {
        const Component = () => {
          const { localizedNavigate } = useLocalization();

          return (
            <button onClick={() => localizedNavigate("foo", { replace: true })}>
              Click
            </button>
          );
        };

        renderWithProvider(<Component />, "en-US", "en-GB");

        fireEvent.click(screen.getByText("Click"));
        expect(navigate).toHaveBeenCalledWith("en-us/foo", { replace: true });
      });
    });
  });

  describe("LocalizedLink", () => {
    it("Renders a standard href when current locale is the default locale", () => {
      renderWithProvider(
        <LocalizedLink to="bar">Bar</LocalizedLink>,
        "en-GB",
        "en-GB"
      );

      expect(screen.getByText("Bar")).toHaveAttribute("href", "bar");
    });

    it("Renders a localized href when current locale is not the default locale", () => {
      renderWithProvider(
        <LocalizedLink to="bar">Bar</LocalizedLink>,
        "en-US",
        "en-GB"
      );

      expect(screen.getByText("Bar")).toHaveAttribute("href", "en-us/bar");
    });
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
});
