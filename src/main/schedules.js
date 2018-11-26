var schedule = require("node-schedule");
import { fetchFeed, fetchAll } from "./feeds";
var main = null;
function setSchedules(obj) {
  main = obj;
  schedule.scheduleJob("*/1 * * * *", function() {
    console.log("scheduleJob run!");
    fetchAll(main);
  });
}
export { setSchedules };
