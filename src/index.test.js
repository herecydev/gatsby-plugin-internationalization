import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { navigate } from "gatsby";
import * as React from "react";
import { LocalizedLink, useLocalization } from "./index";
import { LocalizationProvider } from "./LocalizationContext";

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

      const { getByText } = renderWithProvider(<Component />, "en-GB", "en-GB");

      getByText("en-GB");
    });

    it("returns default locale", () => {
      const Component = () => {
        const { defaultLocale } = useLocalization();

        return <div>{defaultLocale}</div>;
      };

      const { getByText } = renderWithProvider(<Component />, "en-GB", "en-US");

      getByText("en-US");
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

      const { getByText } = renderWithProvider(<Component />, "en-GB", "en-GB");

      for (const locale of locales) {
        getByText(locale);
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

        const { getByText } = renderWithProvider(
          <Component />,
          "en-GB",
          "en-GB"
        );

        fireEvent.click(getByText("Click"));
        expect(navigate).toHaveBeenCalledWith("foo");
      });

      it("calls gatsby navigate with localized path when current locale is not the default locale", () => {
        const Component = () => {
          const { localizedNavigate } = useLocalization();

          return (
            <button onClick={() => localizedNavigate("foo")}>Click</button>
          );
        };

        const { getByText } = renderWithProvider(
          <Component />,
          "en-US",
          "en-GB"
        );

        fireEvent.click(getByText("Click"));
        expect(navigate).toHaveBeenCalledWith("en-us/foo");
      });
    });
  });

  describe("LocalizedLink", () => {
    it("Renders a standard href when current locale is the default locale", () => {
      const { getByText } = renderWithProvider(
        <LocalizedLink to="bar">Bar</LocalizedLink>,
        "en-GB",
        "en-GB"
      );

      expect(getByText("Bar")).toHaveAttribute("href", "bar");
	});
	
	it("Renders a localized href when current locale is not the default locale", () => {
		const { getByText } = renderWithProvider(
		  <LocalizedLink to="bar">Bar</LocalizedLink>,
		  "en-US",
		  "en-GB"
		);
  
		expect(getByText("Bar")).toHaveAttribute("href", "en-us/bar");
	  });
  });
});
