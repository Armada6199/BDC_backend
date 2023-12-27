const express = require("express");
const app = express();
const loanRouter = require("./routes/loanRoute");
const cors = require("cors");
const path = require("path");
const {engine} = require('express-handlebars');
app.engine('handlebars', engine({
  extname: "handlebars",
  defaultLayout: false,
  layoutsDir: "views/layouts/"
}));
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, './views');
app.set('views', viewsPath);
app.set('view engine', 'handlebars');
app.use("/images", express.static(path.join(__dirname, "/public/images")));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.get("/", (req, res) => {
});

app.use("/", loanRouter);
const runServer = (PORT) => {
  app.listen(PORT, () => {
    console.log("Server Running on port " + PORT);
  });
};

module.exports = { runServer };
