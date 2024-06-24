const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");
const { lowerCaseFirstLetter } = require("./_includes/functions");

const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "serverless",
    functionsDir: "./netlify/functions/",
    redirects: "netlify-toml-functions",
  });

  // Passthrough
  eleventyConfig.addPassthroughCopy({
    "./static/robots.txt": "/robots.txt",
    "./static/fonts/": "/fonts",
  });

  eleventyConfig.addTransform("htmlmin", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });

      return minified;
    }

    // If not an HTML output, return content as-is
    return content;
  });

  eleventyConfig.addShortcode("ogImageSource", function ({ content, emoji }) {
    const baseUrl =
      process.env.ELEVENTY_ENV === "development"
        ? "http://localhost:8888"
        : "https://christian.engel.is";
    const ogUrl = new URL(baseUrl + "/og-image");
    ogUrl.searchParams.append("content", lowerCaseFirstLetter(content));
    ogUrl.searchParams.append("emoji", emoji);
    return ogUrl.toString();
  });

  eleventyConfig.addFilter("lowerCaseFirstLetter", lowerCaseFirstLetter);

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
};
