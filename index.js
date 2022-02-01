const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const userRoutes = require("./server/routes/userRoutes");
const expRoutes = require("./server/routes/expRoutes");
const educRoutes = require("./server/routes/educRoutes");
const frndRoutes = require("./server/routes/frndRoutes");

require("dotenv").config({ path: "./.env" });
const dbConnect = require("./database/dbmongo");
const {
  notFound,
  errorHandler,
} = require("./server/middlewares/errorMiddleware");

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

// body parser
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

// database
dbConnect;

// routes
app.use("/users", userRoutes);
app.use("/exps", expRoutes);
app.use("/educs", educRoutes);
app.use("/friendship", frndRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
