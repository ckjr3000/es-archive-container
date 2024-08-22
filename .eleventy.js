module.exports = function(eleventyConfig) {
  
    eleventyConfig.addCollection("searchIndex", function(collectionApi) {
      return collectionApi.getAll();
    });

    return {
      dir: {
          input: "src",
          output: "_site"
      }
    }
  };