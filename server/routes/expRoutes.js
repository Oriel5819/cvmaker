const router = require("express").Router();
const {
  getExp,
  getExpByUser,
  getExps,
  createExp,
  editExp,
  removeExp,
} = require("../controllers/expCtrlr");
const { auth } = require("../middlewares/authMiddleware");

router.route("/").get(getExps);
router.route("/create").post(auth, createExp);
router.route("/user/:id").get(auth, getExpByUser);
router
  .route("/:id")
  .get(auth, getExp)
  .put(auth, editExp)
  .delete(auth, removeExp);

module.exports = router;
