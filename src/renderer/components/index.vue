<template>
  <v-app class="content">
    <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" mini-variant-width=50 width=200 permanent>
      <v-list>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>menu</v-icon>
        </v-btn>
        <template v-for="(item, index) in sites">
          <v-list-tile :key="index" ripple :class="{'mini-tile':mini}" @click="siteItemClick(index)">
            <v-list-tile-action>
              <v-img :src="getFavicon(item.src)" max-width="16px" position="left center"></v-img>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-badge v-if="feedCount[item.feed]>0" color="grey"><span slot="badge">{{feedCount[item.feed]}}</span><span v-show="1">{{item.title}}</span></v-badge><span v-else>{{item.title}}</span>
            </v-list-tile-content>
          </v-list-tile>
          <!-- <v-divider v-if="index + 1 < sites.length" :key="`site-${index}`"></v-divider> -->
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container id="main-container" fill-height>
        <v-layout justify-start row fill-height>
          <v-list two-line id="acticle-list" :style="{height:listHeight}">
            <template v-for="(item, index) in acticles">
              <v-list-tile :key="index" ripple @click="acticleClick(index)">
                <v-list-tile-content id="acticle">{{item.title}}</v-list-tile-content>
              </v-list-tile>
              <v-divider v-if="index + 1 < acticles.length" :key="`divider-${index}`"></v-divider>
            </template>
          </v-list>
          <webview id="foo" :src="webViewSrc" autosize="on"></webview>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: "landing-page",
  data() {
    return {
      drawer: true,
      mini: false,
      webViewSrc: "https://www.v2ex.com/",
      sites: [
        {
          title: "V2ex",
          src: "https://www.v2ex.com/",
          feed: "https://www.v2ex.com/index.xml"
        },
        {
          title: "B站人文",
          src: "https://www.bilibili.com/",
          feed: "https://rsshub.app/bilibili/partion/124"
        },
        {
          title: "微博热搜",
          src: "https://www.weibo.com/",
          feed: "https://rsshub.app/weibo/search/hot"
        },
        {
          title: "掘金",
          src: "https://juejin.im/",
          feed: "https://rsshub.app/juejin/category/frontend"
        },
        {
          title: "草榴",
          src: "http://www.t66y.com",
          feed: "https://rsshub.app/t66y/7/2"
        }
      ],
      acticles: [],
      listHeight: "760px",
      curFeed: "",
      feedCount: {}
    };
  },
  methods: {
    getFavicon(domain) {
      return (
        "http://statics.dnspod.cn/proxy_favicon/_/favicon?domain=" +
        domain.split("/")[2] //TODO:提取域名有问题
      );
    },
    acticleClick(index) {
      this.webViewSrc = this.acticles[index].link;
      console.log("click:" + this.webViewSrc);
    },
    siteItemClick(index) {
      //this.webViewSrc = this.sites[index].src;
      this.curFeed = this.sites[index].feed;
      this.$electron.ipcRenderer.send("fetchFeed", this.curFeed);
    }
  },
  created() {
    this.$electron.ipcRenderer.on("ping", (e, data) => {
      console.log(data);
      this.$electron.ipcRenderer.send("pong", "pong from render");
    });
    this.$electron.ipcRenderer.on("feed", (e, data) => {
      console.log(data);
      this.acticles = data;
      this.feedCount[this.curFeed] = this.acticles.length;
    });
    this.$electron.ipcRenderer.on("resize", (e, data) => {
      this.listHeight = data[1] + "px";
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
  display: -webkit-box;
}
#acticle-list {
  max-width: 300px;
  /* height: 100%; */
  /* height: 563px; */
  overflow-y: scroll;
}
</style>


