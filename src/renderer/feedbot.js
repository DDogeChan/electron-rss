//let RssFeedEmitter = require("./rss-feed-emitter");
import RssFeedEmitter from "./rss-feed-emitter";
let Datastore = require("nedb");
const crypto = require("crypto");
let util = require("util");
let em = require("events").EventEmitter;

function sha1(data) {
  return crypto
    .createHash("sha1")
    .update(data, "binary")
    .digest("hex");
}

let feedbot = class feedbot {
  constructor() {
    this.db = {};
    this.feeditems = {};
    this.feedlist = [];
    this.db.feedlist = new Datastore({
      filename: __dirname + "/db/feedlist",
      autoload: true
    });
    this.db.feedlist.ensureIndex({ fieldName: "url", unique: true }, function(
      err
    ) {});
    return (async () => {
      let getFeedsFromDB = () => {
        return new Promise((resolve, reject) => {
          this.db.feedlist.find({}, (err, docs) => {
            if (!err) {
              resolve(docs);
            } else {
              reject(err);
            }
          });
        });
      };
      let feeds = await getFeedsFromDB();
      this.feedlist = feeds;
      console.table(this.feedlist);
      feeds.forEach(element => {
        this.feedAdd(element);
      });
      return this;
    })();
  }
  getDomain(url) {
    let re = /(https?|ftp|file):\/\/(.+?)\/(.+)/gm;
    let res = re.exec(url);
    let domain = res[2];
    return domain;
  }
  urlAdd(rss) {
    let dbname = sha1(rss.url);
    let item = { url: rss.url, refresh: rss.refresh, dbname: dbname };
    this.db.feedlist.update(
      { url: item.url },
      item,
      { upsert: true },
      err => {}
    );
  }
  feedAdd(rss) {
    let dbname = sha1(rss.url);
    let item = { url: rss.url, refresh: rss.refresh, dbname: dbname };

    // this.db.feedlist.update(
    //   { url: item.url },
    //   item,
    //   { upsert: true },
    //   err => {}
    // );
    // this.db.feedlist.insert(item, err => {
    //   console.log(err);
    // });
    console.log(__dirname + "/db/" + dbname);
    this.db[dbname] = new Datastore({
      filename: __dirname + "/db/" + dbname,
      autoload: true
    });

    this.db[dbname].ensureIndex({ fieldName: "guid", unique: true }, function(
      err
    ) {});
    this.feeditems[dbname] = new RssFeedEmitter();
    this.feeditems[dbname].add(item);
    this.feeditems[dbname].on("new-item", item => {
      this.db[dbname].insert(item, err => {});
      this.emit("new-item", item);
    });
    this.feeditems[dbname].on("new-data", data => {
      console.table(data.newItems);
      this.emit("new-data", data);
    });
  }
  getFeedItems(domain) {
    let dbname = sha1(domain);
    if (!this.db[dbname]) return;
    return new Promise((resolve, reject) => {
      this.db[dbname].find({}, (err, docs) => {
        if (!err) {
          //console.log(docs.length);
          resolve(docs);
        } else {
          reject(err);
        }
      });
    });
  }
  getFeedList() {
    return this.feedlist;
  }
  getTest() {
    this.emit("test", "arg1", "arg2");
  }
};

// feeder.feedAdd({
//   url: "https://www.v2ex.com/index.xml",
//   refresh: 30000
// });
// feeder.feedAdd({
//   url: "https://www.cnbeta.com/backend.php",
//   refresh: 30000
// });

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

util.inherits(feedbot, em);
export default (async () => {
  let feeder = await new feedbot();
  // feeder.feedAdd({
  //   url: "https://www.cnbeta.com/backend.php",
  //   refresh: 30000
  // });
  return feeder;
})();
//module.exports = feedbot;
