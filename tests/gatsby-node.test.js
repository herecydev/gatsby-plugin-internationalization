import "@testing-library/jest-dom";
import { onCreatePage } from "../src/gatsby-node";

const locales = ["en-GB", "en-US"];

describe("pageCreation", () => {
  it("does not create pages for already processed pages", () => {
    const createPage = jest.fn();
    const deletePage = jest.fn();
    const actions = {
      createPage,
      deletePage,
    };

    const page = {
      path: "/foo",
      context: {
        locales,
      },
    };

    const pluginOptions = {
      locales,
    };

    onCreatePage({ page, actions }, pluginOptions);

    expect(deletePage).not.toHaveBeenCalled();
    expect(createPage).not.toHaveBeenCalled();
  });

  it("creates a page for each locale", () => {
    const createPage = jest.fn();
    const deletePage = jest.fn();
    const actions = {
      createPage,
      deletePage,
    };

    const page = {
      path: "/foo",
      context: {},
    };

    const pluginOptions = {
      locales,
    };

    onCreatePage({ page, actions }, pluginOptions);

    expect(deletePage).toHaveBeenCalledWith(page);
    expect(createPage).toHaveBeenCalledWith({
      ...page,
      path: "/en-gb/foo",
      context: {
        locale: "en-GB",
        locales,
      },
    });
    expect(createPage).toHaveBeenCalledWith({
      ...page,
      path: "/en-us/foo",
      context: {
        locale: "en-US",
        locales,
      },
    });
  });

  it("creates a page for each locale when supplied with a default locale", () => {
    const createPage = jest.fn();
    const deletePage = jest.fn();
    const actions = {
      createPage,
      deletePage,
    };

    const page = {
      path: "/foo",
      context: {},
    };

    const pluginOptions = {
      locales,
      defaultLocale: "en-GB",
    };

    onCreatePage({ page, actions }, pluginOptions);

    expect(deletePage).toHaveBeenCalledWith(page);
    expect(createPage).toHaveBeenCalledWith({
      ...page,
      path: "/foo",
      context: {
        locale: "en-GB",
        defaultLocale: "en-GB",
        locales,
      },
    });
    expect(createPage).toHaveBeenCalledWith({
      ...page,
      path: "/en-us/foo",
      context: {
        locale: "en-US",
        defaultLocale: "en-GB",
        locales,
      },
    });
  });

  it("handles matchpath for each locale", () => {
    const createPage = jest.fn();
    const deletePage = jest.fn();
    const actions = {
      createPage,
      deletePage,
    };

    const page = {
      path: "/foo",
      matchPath: "/bar/*",
      context: {},
    };

    const pluginOptions = {
      locales,
    };

    onCreatePage({ page, actions }, pluginOptions);

    expect(deletePage).toHaveBeenCalledWith(page);
    expect(createPage).toHaveBeenCalledWith({
      ...page,
      path: "/en-gb/foo",
      matchPath: "/en-gb/bar/*",
      context: {
        locale: "en-GB",
        locales,
      },
    });
    expect(createPage).toHaveBeenCalledWith({
      ...page,
      path: "/en-us/foo",
      matchPath: "/en-us/bar/*",
      context: {
        locale: "en-US",
        locales,
      },
    });
  });

  it("handles matchpath for each locale when supplied with a default locale", () => {
    const createPage = jest.fn();
    const deletePage = jest.fn();
    const actions = {
      createPage,
      deletePage,
    };

    const page = {
      path: "/foo",
      matchPath: "/bar/*",
      context: {},
    };

    const pluginOptions = {
      locales,
      defaultLocale: "en-GB",
    };

    onCreatePage({ page, actions }, pluginOptions);

    expect(deletePage).toHaveBeenCalledWith(page);
    expect(createPage).toHaveBeenCalledWith({
      ...page,
      path: "/foo",
      matchPath: "/bar/*",
      context: {
        locale: "en-GB",
        defaultLocale: "en-GB",
        locales,
      },
    });
    expect(createPage).toHaveBeenCalledWith({
      ...page,
      path: "/en-us/foo",
      matchPath: "/en-us/bar/*",
      context: {
        locale: "en-US",
        defaultLocale: "en-GB",
        locales,
      },
    });
  });
});
