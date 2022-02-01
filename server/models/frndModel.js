const mongoose = require('mongoose');

const FriendshipSchema = new mongoose.Schema({
    firstUserId:{
        type: mongoose.Types.ObjectId, ref:`Users`,
        trim: true,
        required: true
    },
    secondUserId:{
        type: mongoose.Types.ObjectId, ref:`Users`,
        trim: true,
        required: true
    },
    requested:{
        type: Boolean,
        required: true
    },
    confirmed:{
        type: Boolean,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Friendships', FriendshipSchema);