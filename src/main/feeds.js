let Parser = require("rss-parser");
let parser = new Parser();
async function fetchFeed(url) {
  let feed = await parser.parseURL(url);
  console.log(feed.title);
  return feed;
}
export { fetchFeed };
