const router = require('express').Router();
const friendshipController = require('../controllers/frndCtrlr');

router.get('/:id', friendshipController.getFriends);
// router.get('/:id', friendshipController.getOthers);
router.post('/:id', friendshipController.makeFriendship);

module.exports = router;