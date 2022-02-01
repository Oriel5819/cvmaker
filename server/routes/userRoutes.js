const router = require("express").Router();
const userController = require("../controllers/userCtrlr.js");
const { auth } = require("../middlewares/authMiddleware");

router.route("/").get(auth, userController.users);

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

router
  .route("/:id")
  .get(auth, userController.getUser)
  .put(auth, userController.updateUser)
  .delete(auth, userController.removeUser);

router.route("/friends").post(auth, userController.friends);
router.route("/others").post(auth, userController.others);

module.exports = router;
