const mongoose = require('mongoose')

const expSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId, ref:`Users`,
        trim: true
    },
    companyLogo:{
        type: String,
        trim: true
    },
    companyName:{
        type: String,
        trim: true
    },
    jobPosition:{
        type: String,
        trim: true
    },
    contractTitle:{
        type: String,
        trim: true
    },
    durationFrom:{
        type: String,
        trim: true
    },
    durationTo:{
        type: String,
        trim: true
    },
    address:{
        city:{
            type: String,
            trim: true
        },
        country:{
            type: String,
            trim: true
        }
    },
    description:{
        type: String,
        trim: true
    }
},  {
        timestamps: true
    }
);

module.exports = mongoose.model('Experiences', expSchema)