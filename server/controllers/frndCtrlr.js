const Friendship = require("../models/frndModel");

const friendshipController = {
  getFriends: async (req, res) => {
    let friends = {
      friendsId: [],
      friendships: [],
    };
    try {
      friends.friendships = await Friendship.find({
        $or: [{ firstUserId: req.params.id }, { secondUserId: req.params.id }],
      });

      // console.log('fr>>>>>>>>>>>', friends.friendships);

      friends.friendships.map((friendship, key) => {
        // console.log('>>>>>>>>>>>>>', friendship.firstUserId.toString(), friendship.secondUserId.toString(), req.params.id);

        if (friendship.firstUserId.toString() === req.params.id) {
          friends.friendsId.push(friendship.secondUserId);
        }
        if (friendship.secondUserId.toString() === req.params.id) {
          friends.friendsId.push(friendship.firstUserId);
        }
      });

      res.status(200).json(friends.friendsId);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  makeFriendship: async (req, res) => {
    try {
      const state = await Friendship.create(req.body);
      res.status(200).json(state);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = friendshipController;
