const { DateTime } = require("luxon");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/admin");
  eleventyConfig.addPassthroughCopy("./src/fonts");

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addNunjucksFilter("limit", (arr, limit) =>
    arr?.slice(0, limit)
  );

  //O primeiro argumento são os proprios posts, não há necessidade de passar eles na função
  eleventyConfig.addNunjucksFilter(
    "getRandom",
    (items, currentPage, quantity) => {
      if (!items?.length || items?.length < 2) return;

      let myItems = items?.filter((i) => {
        return i.url !== currentPage.url;
      });

      const shuffledPosts = shuffleArray(myItems);

      if (myItems.length === 0) return;
      return shuffledPosts.slice(0, quantity);
    }
  );

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
