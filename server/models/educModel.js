const mongoose = require("mongoose");

const educSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: `Users`,
      trim: true,
    },
    schoolLogo: {
      type: String,
      trim: true,
    },
    schoolName: {
      type: String,
      trim: true,
    },
    degree: {
      type: String,
      trim: true,
    },
    major: {
      type: String,
      trim: true,
    },
    durationFrom: {
      type: String,
      trim: true,
    },
    durationTo: {
      type: String,
      trim: true,
    },
    address: {
      city: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Educations", educSchema);
