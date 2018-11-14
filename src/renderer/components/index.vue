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
      <webview id="foo" :src="urlsrc"></webview>
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
      ]
    };
  },
  methods: {
    getFavicon(domain) {
      return (
        "http://statics.dnspod.cn/proxy_favicon/_/favicon?domain=" +
        domain.split("/")[2] //TODO:提取域名有问题
      );
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
  }
};
</script>
<style>
.content {
  height: 100%;
}

#foo {
  height: 100%;
}
.mini-tile a {
  padding-left: 0px !important;
}
</style>


