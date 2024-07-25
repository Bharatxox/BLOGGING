const express = require("express");

const app = express();

mongoose
  .connect(`mongodb://localhost:27017/bloging`)
  .then(() => console.log("database connection established "))
  .catch((err) => console.error(err));

app.use("/api/v1/user");
app.use("/api/v1/blog");
app.use("app/v1/comment");

const port = 1000;

app.listen((port) => {
  console.log("listening on port at " + port);
});
