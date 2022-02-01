const routes = require("express").Router();
const {
  register,
  login,
  update,
  remove,
} = require("../controllers/userController");

// Add routes
routes.post("/register", register);
routes.post("/login", login);
routes.put("/:id", update);
routes.delete("/:id", remove);

module.exports = routes;
