let Parser = require("rss-parser");
let parser = new Parser();
import db from "./datastore";
let main = null;
async function fetchFeed(url) {
  let feed = await parser.parseURL(url);
  return feed;
}

function fetchAll(obj) {
  main = obj;
  var sites = [];
  db.findOne({ type: "sites" }, (err, docs) => {
    if (docs) {
      sites = docs.data;
      for (var i = 0; i < sites.length; i++) {
        async function fetch(feed) {
          var item = await fetchFeed(feed.feed);
          //console.log(res);
          var res = { site: feed.feed, data: item.items };
          main.webContents.send("feeds", res);
        }
        fetch(sites[i]);
      }
    }
  });
}
export { fetchFeed, fetchAll };
