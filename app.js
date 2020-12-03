require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const path = require("path")


const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static("public"));
app.use('/static', express.static(path.join(__dirname, "\public")));

app.use(
  session({
    secret: "secret1",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect("mongodb://localhost:27017/sharanrajdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })
  .then(() => {
    console.log("DB is connected");
  });

mongoose.set("useCreateIndex", true);



//Import routes
const authRoutes = require("./route/auth")
const adminRoutes = require("./route/admin")
const coreRoutes = require("./route/core")

//Use routes imported
app.use("/", coreRoutes)
app.use("/", authRoutes)
app.use("/admin/", adminRoutes)


//server config
const port = process.env.PORT

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
