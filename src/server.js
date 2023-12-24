const express = require("express");
const app = express();
const loanRouter = require("./routes/loanRoute");
const cors = require("cors");
const path = require("path");
const { engine } = require("express-handlebars");
app.engine(
  "handlebars",
  engine({})
);
app.set("view engine", "handlebars");
console.log(path.join(__dirname, "/views"));
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/loan", loanRouter);
const runServer = (PORT) => {
  app.listen(PORT, () => {
    console.log("Server Running on port " + PORT);
  });
};

module.exports = { runServer };
