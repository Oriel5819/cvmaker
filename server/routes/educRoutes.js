const router = require("express").Router();
const {
  getEduc,
  getEducByUser,
  getEducs,
  createEduc,
  editEduc,
  removeEduc,
} = require("../controllers/educCtrlr");
const { auth } = require("../middlewares/authMiddleware");

router.route("/").get(getEducs);
router.route("/create").post(auth, createEduc);
router.route("/user/:id").get(auth, getEducByUser);
router
  .route("/:id")
  .get(auth, getEduc)
  .put(auth, editEduc)
  .delete(auth, removeEduc);

module.exports = router;
