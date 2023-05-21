const express = require("express");
const path = require("path");
const colors = require("colors");

const middleware = require("./middleware");

const app = express();

const PORT = 3000;

const server = app.listen(PORT, () =>
  console.log(`Server listening on port #${PORT}`.yellow)
);

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

// Routes
const loginRoute = require("./routes/loginRoutes");

app.use("/login", loginRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
  let payload = {
    pageTitle: "Home",
  };
  res.status(200).render("home", payload);
});
