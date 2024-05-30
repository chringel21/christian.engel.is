const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");

export default function (eleventyConfig) {
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
    return string.charAt(0).toLowerCase() + string.slice(1);
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
}
