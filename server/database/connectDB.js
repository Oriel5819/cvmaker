const mongoose = require("mongoose");

mongoose
  .connect(process.env.LOCAL_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Connected"))
  .catch((err) => console.log(err.message));
