const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const todoRouter = reuqire("./routes/todo");

const app = express();

const port = 3030;

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/todo", todoRouter);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
