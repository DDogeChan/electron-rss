<template>
  <v-app class="content">
    <v-navigation-drawer
      class="nav"
      app
      v-model="drawer"
      :mini-variant.sync="mini"
      v-on:mouseover.native="mini=false"
      v-on:mouseleave.native="mini=true"
      mini-variant-width=50
      width=200
      permanent
    >
      <v-list>
        <!-- <v-btn icon @click.stop="mini = !mini">
          <v-icon>menu</v-icon>
        </v-btn> -->
        <v-btn
          icon
          @click.stop="dialog=!dialog"
        >
          <v-icon>add</v-icon>
        </v-btn>
        <template v-for="(item, index) in sites">
          <v-list-tile
            :key="index"
            ripple
            :class="{'mini-tile':mini}"
            @click="siteItemClick(index)"
          >
            <v-list-tile-action>
              <v-badge
                v-if="feedCount[item.feed]>0&&mini"
                overlap
                color="cyan"
              ><span slot="badge">{{feedCount[item.feed]}}</span>
                <v-img
                  :src="getFavicon(item.src)"
                  width="20px"
                  position="left center"
                ></v-img>
              </v-badge>
              <v-img
                v-else
                :src="getFavicon(item.src)"
                max-width="16px"
                position="left center"
              ></v-img>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-badge
                v-if="feedCount[item.feed]>0"
                color="cyan"
              ><span slot="badge">{{feedCount[item.feed]}}</span><span>{{item.title}}</span></v-badge><span v-else>{{item.title}}</span>
            </v-list-tile-content>
          </v-list-tile>
          <!-- <v-divider v-if="index + 1 < sites.length" :key="`site-${index}`"></v-divider> -->
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container
        id="main-container"
        fill-height
      >
        <v-layout
          justify-start
          row
          fill-height
        >
          <v-list
            two-line
            id="acticle-list"
            :style="{height:listHeight}"
          >
            <template v-for="(item, index) in acticles">
              <v-list-tile
                :key="index"
                ripple
                @click="acticleClick(index)"
              >
                <v-list-tile-content id="acticle">
                  <v-list-tile-sub-title class="text--primary">{{item.title}}</v-list-tile-sub-title>
                  <v-list-tile-sub-title class="text--date">{{item.pubDate|dayjs}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider
                v-if="index + 1 < acticles.length"
                :key="`divider-${index}`"
              ></v-divider>
            </template>
          </v-list>
          <webview
            ref="webView"
            id="foo"
            :src="webViewSrc"
            autosize="on"
            @did-finish-load="didfinishload"
          ></webview>
          <v-speed-dial
            id="floatBtn"
            v-model="fab"
            :top="true"
            :bottom="false"
            :right="true"
            :left="false"
            direction="left"
            :open-on-hover="true"
            transition="slide-x-reverse-transition"
          >
            <v-btn
              slot="activator"
              v-model="fab"
              color="blue darken-2"
              dark
              fab
              small
            >
              <v-icon>menu</v-icon>
              <v-icon>close</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              small
              color="green"
              @click="openExternal"
            >
              <v-icon>open_in_browser</v-icon>
            </v-btn>

            <v-btn
              fab
              dark
              small
              color="indigo"
              @click="saveHtml"
            >
              <v-icon>save</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              small
              color="red"
              @click="switchMode"
            >
              <v-icon>chrome_reader_mode</v-icon>
            </v-btn>
          </v-speed-dial>
          <notifications
            group="foo"
            position="bottom right"
          />
        </v-layout>
      </v-container>

    </v-content>
    <v-progress-linear
      v-show="this.$store.getters.isLoading"
      id="loadbar"
      :indeterminate="true"
      height="5"
    ></v-progress-linear>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Privacy Policy
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Title*"
            required
            v-model="addTitle"
          ></v-text-field>
          <v-text-field
            label="Home Page*"
            required
            v-model="addHome"
          ></v-text-field>
          <v-text-field
            label="RSS URL*"
            required
            v-model="addUrl"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            flat
            @click="addFeed"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>
<script>
import { mapActions } from "vuex";
import Vue from "vue";
import { shell } from "electron";

export default {
  name: "landing-page",
  data() {
    return {
      addHome: "",
      addTitle: "",
      addUrl: "",
      dialog: false,
      fab: false,
      drawer: true,
      mini: true,
      webViewSrc: "https://www.v2ex.com/",
      sites: [
        {
          index: 0,
          title: "V2ex",
          src: "https://www.v2ex.com/",
          feed: "https://www.v2ex.com/index.xml"
        },
        {
          index: 1,
          title: "B站人文",
          src: "https://www.bilibili.com/",
          feed: "https://rsshub.app/bilibili/partion/124"
        },
        {
          index: 2,
          title: "微博热搜",
          src: "https://www.weibo.com/",
          feed: "https://rsshub.app/weibo/search/hot"
        },
        {
          index: 3,
          title: "掘金",
          src: "https://juejin.im/",
          feed: "https://rsshub.app/juejin/category/frontend"
        },
        {
          index: 4,
          title: "草榴",
          src: "http://www.t66y.com",
          feed: "https://rsshub.app/t66y/7/2"
        }
      ],
      acticles: [],
      listHeight: "760px",
      curFeed: "",
      feedCount: {},
      appPath: ""
    };
  },
  methods: {
    ...mapActions(["setLoadingState"]),
    openExternal() {
      shell.openExternal(this.$refs.webView.getURL());
    },
    addFeed() {
      this.sites.push({
        index: this.sites.length,
        title: this.addTitle,
        src: this.addHome,
        feed: this.addUrl
      });
      this.$db.update(
        { type: "sites" },
        { type: "sites", data: this.sites },
        { upsert: true },
        function(err, numReplaced, upsert) {}
      );

      this.dialog = false;
    },
    getHash(str) {
      const crypto = require("crypto");
      const hash = crypto.createHash("sha1");
      hash.update(this.$refs.webView.getURL());
      const hashkey = hash.digest("hex");
      return hashkey;
    },
    switchMode() {
      console.log("switchMode");
      const url = this.$refs.webView.getURL();
      const hashkey = this.getHash(url);

      this.$db.findOne({ key: hashkey }, (err, doc) => {
        if (doc) {
          console.log(findone);
        }
      });

      var read = require("node-readability");
      read(url, (err, article, meta) => {
        var html =
          '<html><head><meta charset="utf-8"><title>' +
          article.title +
          "</title></head><body><h1>" +
          article.title +
          "</h1>" +
          article.content +
          "</body></html>";

        const doc = { key: hashkey, doc: html };
        this.$db.insert(doc, function(err, newDoc) {
          //console.log(newDoc);
        });
        this.webViewSrc = "data:text/html," + html;
        article.close();
      });
    },
    saveHtml() {
      const notification = {
        title: "基本通知",
        body: "通知内容"
      };
      const myNotification = new window.Notification(
        notification.title,
        notification
      );
      myNotification.onclick = () => {
        console.log("通知被点击");
      };

      var path =
        this.appPath +
        this.$refs.webView
          .getURL()
          .replace(/^.*?:\/\//, "")
          .replace(/\//g, "_") +
        ".mhtml";
      console.log(path);
      var res = this.$refs.webView
        .getWebContents()
        .savePage(path, "MHTML", function(error) {
          var text = "";
          var type = "";
          if (error) {
            text = error;
            type = "error";
          } else {
            text = "save complete";
            type = "success";
          }
          Vue.notify({
            group: "foo",
            title: "savePage",
            text: text,
            type: type
          });
        });
    },
    didfinishload() {
      // console.log("didfinishload");
      this.setLoadingState(false);
    },
    getFavicon(domain) {
      // console.log(domain);
      // var res = await this.$http.get(domain + "/favicon.ico");
      // console.log(res.status);
      return (
        "https://statics.dnspod.cn/proxy_favicon/_/favicon?domain=" +
        domain.split("/")[2] //TODO:提取域名有问题
      );
    },
    acticleClick(index) {
      this.webViewSrc = this.acticles[index].link;
      console.log("click:" + this.webViewSrc);
      this.setLoadingState(true);
    },
    siteItemClick(index) {
      //this.webViewSrc = this.sites[index].src;
      this.curFeed = this.sites[index].feed;
      this.$electron.ipcRenderer.send("fetchFeed", this.curFeed);
      this.setLoadingState(true);
    }
  },
  created() {
    this.$electron.ipcRenderer.on("ping", (e, data) => {
      this.appPath = data;
      console.log(this.appPath);
      this.$electron.ipcRenderer.send("pong", "pong from render");
    });
    this.$electron.ipcRenderer.on("feed", (e, data) => {
      this.acticles = data;
      this.feedCount[this.curFeed] = this.acticles.length;
      this.setLoadingState(false);
    });
    this.$electron.ipcRenderer.on("feeds", (e, data) => {
      //console.log("ipcRenderer on feeds");
      //console.log(data);
      this.feedCount[data.site] = data.data.length;
    });
    this.$electron.ipcRenderer.on("resize", (e, data) => {
      this.listHeight = data[1] + "px";
    });
  },
  mounted() {
    this.$db.findOne({ type: "sites" }, (err, docs) => {
      if (docs) {
        this.sites = docs.data;
      } else {
        console.log("mounted with no data");
        this.$db.update(
          { type: "sites" },
          { type: "sites", data: this.sites },
          { upsert: true },
          function(err, numReplaced, upsert) {}
        );
      }
    });
  }
};
</script>
<style>
.content {
  height: 100%;
}

#foo {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.mini-tile a {
  padding-left: 0px !important;
}
#main-container {
  padding: 0;
  max-width: 100% !important;
}
#acticle {
  /* display: -webkit-box; */
}
#acticle-list {
  max-width: 320px;
  /* height: 100%; */
  /* height: 563px; */
  overflow-y: scroll;
}
#floatBtn {
  position: fixed;
}
#loadbar {
  position: fixed;
  top: 100%;
  margin-top: -5px;
  z-index: 99;
}
.nav {
  background-color: hsl(0, 0%, 96%) !important;
}
.v-badge__badge {
  width: 18px !important;
  height: 18px !important;
}
.v-list__tile {
  padding: 0 8px !important;
}
.text--primary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  white-space: normal !important;
  font-size: 16px !important;
}
.text--date {
  font-size: 12px !important;
  margin-top: auto;
  margin-bottom: 0;
  margin-left: auto;
  margin-right: 0;
  width: auto !important;
}
.v-list--two-line .v-list__tile {
  height: auto !important;
}
</style>


