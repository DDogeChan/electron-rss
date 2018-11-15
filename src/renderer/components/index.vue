<template>
  <v-app class="content">
    <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" mini-variant-width=50 width=200 permanent>
      <v-list>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>menu</v-icon>
        </v-btn>
        <v-list-tile v-for="(item,index) in items" :key="index" :class="{'mini-tile':mini}" @click="listItemClick(index)">
          <v-list-tile-action>
            <v-img :src="getFavicon(item.src)" max-width="16px" position="left center"></v-img>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container id="main-container" fill-height>
        <v-layout justify-start row fill-height>
          <v-list two-line id="acticle-list" :style="{height:listHeight}">
            <template v-for="(item, index) in acticles">
              <v-list-tile :key="index" @click="acticleClick(index)">
                <v-list-tile-content id="acticle">{{item.title}}</v-list-tile-content>
              </v-list-tile>
              <v-divider v-if="index + 1 < acticles.length" :key="`divider-${index}`"></v-divider>
            </template>
          </v-list>
          <webview id="foo" :src="urlsrc" autosize="on"></webview>
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
      urlsrc: "https://www.github.com/",
      items: [
        { title: "V2ex", src: "https://www.v2ex.com/" },
        { title: "Github", src: "https://www.github.com/" }
      ],
      acticles: [],
      listHeight: "563px"
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
      this.urlsrc = this.acticles[index].link;
      console.log(this.urlsrc);
    },
    listItemClick(index) {
      console.log(index);
      this.urlsrc = this.items[index].src;
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


