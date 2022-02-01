const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config({ path: "./.env" });
const connectDB = require("./database/connectDB");

const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(morgan("dev"));

// database
connectDB;

// routes
app.use("/users", userRoutes);
// app.use("/experiences", expRoute);
// app.use("/educations", educRoute);
// app.use("/friends", frndRoute);

// middleware (always after routes)
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
