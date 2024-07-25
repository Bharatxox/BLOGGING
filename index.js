const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");

const app = express();

//Middleware
app.use(express.json());

mongoose
  .connect(`mongodb://localhost:27017/bloging`)
  .then(() => console.log("database connection established "))
  .catch((err) => console.error(err));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/app/v1/comment", commentRouter);

const port = 10000;

app.listen(port, () => {
  console.log(`api running at port no ${port}`);
});
