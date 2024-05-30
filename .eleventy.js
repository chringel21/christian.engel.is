const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");

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

  eleventyConfig.addShortcode("ogImageSource", function ({ url }) {
    const fullUrl = "https://christian.engel.is" + url;
    return `https://v1.screenshot.11ty.dev/${encodeURIComponent(
      fullUrl
    )}/opengraph/`;
  });

  eleventyConfig.addFilter("lowercaseFirstLetter", function (string) {
    if (!string) return "";
    return string.charAt(0).toLowerCase() + string.slice(1);
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
};
