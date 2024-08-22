module.exports = function (eleventyConfig) {
  return function () {
    const posts = eleventyConfig.getFilteredByGlob("**/*.md");
    return posts.map(post => {
      return {
        title: post.data.performance,
        url: post.url,
      };
    });
  };
};
