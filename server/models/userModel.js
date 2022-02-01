const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    profile: {
      avatar: {
        type: String,
        trim: true,
      },
      cover: {
        type: String,
        trim: true,
      },
      company: {
        companyLogo: {
          type: String,
          trim: true,
        },
        companyName: {
          type: String,
          trim: true,
        },
        jobPosition: {
          type: String,
          trim: true,
        },
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
    },
    contact: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (entred_password) {
  return bcrypt.compare(entred_password, this.password);
};

module.exports = mongoose.model("Users", UserSchema);
