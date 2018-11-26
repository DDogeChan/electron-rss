import Datastore from "nedb";
import path from "path";
import { app } from "electron";
let dataPath = path.join(app.getPath("userData"), "/data.db");
console.log("dataPath=" + dataPath);
let db = new Datastore({
  autoload: true,
  filename: dataPath
});

export default db;
