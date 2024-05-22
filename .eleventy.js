import CleanCSS from "clean-css";

export default function (eleventyConfig) {
  // Passthrough
  eleventyConfig.addPassthroughCopy({
    "./static/robots.txt": "/robots.txt",
  });

  eleventyConfig.addFilter("lowercaseFirstLetter", function (string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
}
