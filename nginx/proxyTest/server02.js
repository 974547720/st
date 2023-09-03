const express = require("express");
const app = express();

// 使用一个对象来存储用户的访问次数
const userAccessCounts = {};

// 中间件函数，用于增加用户的访问次数
app.use((req, res, next) => {
  const userId = req.ip; // 使用用户的ip作为唯一的标识符
  if (!userAccessCounts[userId]) {
    userAccessCounts[userId] = 1;
  } else {
    userAccessCounts[userId]++;
  }
  next();
});

// 路由处理程序，用于获取用户的访问次数
app.get("/", (req, res) => {
  const userId = req.ip; //使用用户的IP作为唯一标识
  console.log("userId", userId);
  const accessCount = userAccessCounts[userId] || 0;
  console.log("进入次数：", accessCount);
  res.json({ accessCount });
});

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Server2 is running on prot ${port}`);
});
