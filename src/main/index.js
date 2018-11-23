import { app, BrowserWindow, ipcMain, Menu, Tray, nativeImage } from "electron";
import { fetchFeed } from "./feeds.js";
import { resolve } from "url";
import { __await } from "tslib";
import "../renderer/store";
import "./httpserver";
import pkg from "../../package.json";
var fs = require("fs");
var path = require("path");
var iconPath = path.join(__dirname, "iconTemplate.png");

var appIcon = null;
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\");
}

let mainWindow;
const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 760,
    useContentSize: true,
    width: 1280
    // frame: false
  });
  mainWindow.setMenu(null);
  mainWindow.loadURL(winURL);
  // mainWindow.webContents.session.setProxy(
  //   { proxyRules: "socks5://127.0.0.1:1080" },
  //   function() {
  //     mainWindow.loadURL(winURL);
  //   }
  // );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  mainWindow.webContents.on("did-finish-load", () => {
    var path = app.getPath("userData") + "/electron-rss-saved/";
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    mainWindow.webContents.send("ping", path);
  });
  mainWindow.on("resize", () => {
    mainWindow.webContents.send("resize", mainWindow.getSize());
  });

  appIcon = new Tray(nativeImage.createFromPath(iconPath));
  var contextMenu = Menu.buildFromTemplate([
    { label: "Item1", type: "radio" },
    { label: "Item2", type: "radio" },
    { label: "Item3", type: "radio", checked: true },
    { label: "Item4", type: "radio" }
  ]);
  appIcon.setToolTip("This is my application.");
  appIcon.setContextMenu(contextMenu);
}
app.commandLine.appendSwitch("--no-proxy-server");
if (process.platform === "win32") {
  app.setAppUserModelId(pkg.build.appId);
}
app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (appIcon) appIcon.destroy();
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

ipcMain.on("pong", (e, data) => {
  console.log(data);
  async function sendping() {
    let res = await sleep(1000);
    //e.sender.send("ping", "ping from main");
    let feed = await fetchFeed("https://www.v2ex.com/index.xml");
    console.log(feed.items.length);
    e.sender.send("feed", feed.items);
  }
  sendping();
});

ipcMain.on("fetchFeed", (e, data) => {
  async function fetch() {
    let feed = await fetchFeed(data);
    e.sender.send("feed", feed.items);
  }
  fetch();
});
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
