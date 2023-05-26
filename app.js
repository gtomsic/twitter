const express = require("express");
const path = require("path");
const colors = require("colors");
const bodyParser = require("body-parser");
const session = require("express-session");

const middleware = require("./middleware");
const db = require("./config");

const app = express();

const PORT = 3000;

const server = app.listen(PORT, () =>
  console.log(`Server listening on port #${PORT}`.yellow)
);

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// USING EXPRESS SESSION
app.use(
  session({
    secret: "onlymeandyou",
    resave: true,
    saveUninitialized: false,
  })
);

// Routes
const loginRoute = require("./routes/loginRoutes");
const registerRoutes = require("./routes/registerRoutes");
const logoutRoutes = require("./routes/logoutRoutes");

// API ROUTES
const postsApiRoutes = require("./routes/api/posts");

app.use("/login", loginRoute);
app.use("/register", registerRoutes);
app.use("/logout", logoutRoutes);
app.use("/api/posts", postsApiRoutes);

app.get("/", middleware.requireLogin, (req, res, next) => {
  let payload = {
    pageTitle: "Home",
    userLoggedIn: req.session.user,
  };
  res.status(200).render("home", payload);
});
