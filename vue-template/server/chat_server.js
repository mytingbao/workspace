const avatarList = [
  "http://b-ssl.duitang.com/uploads/item/201410/09/20141009224754_AswrQ.jpeg",
  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593667260461&di=04dd17e45ae4cb6d74b8bcbe1091db8c&imgtype=0&src=http%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F01%2F3e%2F05%2F40%2Fthe-sandbar-that-links.jpg",
  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593665328548&di=f68eed237798de5bf97ed4722d2c03ff&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140105%2F20140105142259-2002661733.jpg",
  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593661708968&di=7245ab62a2a948c009e930700bc4ef10&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg",
  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593661708967&di=ab77200d423eaaf39d537a242834e9c2&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F86%2F10%2F01300000184180121920108394217.jpg",
  "http://img3.imgtn.bdimg.com/it/u=2714684979,4095105124&fm=11&gp=0.jpg"
];
const users = [];
const userList = [];
exports.listen = function (server) {
  const io = require("socket.io")(server);
  io.sockets.on("connection", function (socket) {
    socket.on("join", data => {
      if (!users.includes(data.username)) {
        const random = Math.ceil(Math.random() * 5);
        const result = {
          message: "你已加入房间成功",
          username: data.username,
          time: new Date().toLocaleString(),
          avatar: avatarList[random]
        };
        socket.emit("joinResult", result);

        socket.username = result.username;

        users.push(result.username);
        userList.push(result);

        io.emit("displayUser", userList, result);
      }
    });

    socket.on("message", (data, callback) => {
      callback({ ...data, side: "right" });
      socket.broadcast.emit("message", { ...data, side: "left" });
    });

    socket.on("disconnect", () => {
      var index = users.indexOf(socket.username);
      if (index > -1) {
        users.splice(index, 1); // 删除用户信息
        userList.splice(index, 1); // 删除用户信息
        io.emit("displayUser", userList);
      }
    });
  });
};
