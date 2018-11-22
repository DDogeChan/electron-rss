const Koa = require("koa");
const cors = require("@koa/cors");
const app = new Koa();
app.use(cors());
// response
// app.use(ctx => {
//   ctx.body = "Hello Koa";
// });

//TODO:功能 使用Bookmarklet 从浏览器里面获取url处理
// use bookmarklet:
// javascript: (function () { var request = new XMLHttpRequest(); request.open("GET", 'http://127.0.0.1:3000/open?url=' + document.location.href); request.send(null); })();
app.use(async (ctx, next) => {
  ctx.status = 200;
  await next();
  console.log(ctx.request.query);
});

app.listen(3000);
