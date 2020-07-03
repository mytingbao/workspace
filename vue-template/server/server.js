const path = require("path");
const express = require("express");
const app = express();
const config = require("./config/config");
const server = app.listen(config.port, () => {
  console.log(`server running at 127.0.0.1:${config.port}`);
});

const chatServer = require("./chat_server");
chatServer.listen(server);

app.post("/api/login", (req, res) => {
  res.json({
    code: 200,
    data: {
      token: "4235435redfdfef525tgsdfg",
      message: "0k"
    }
  });
});

//静态页面的入口文件夹
app.use(express.static(path.join(__dirname, "dist")));
//把路由交给vue管理
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});
