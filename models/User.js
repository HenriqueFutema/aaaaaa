const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");

const UserSchema = mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: [this],
    following: [this],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  },
};

UserSchema.statics = {
  generateToken(id) {
    return jwt.sign({ id }, auth.secret, {
      expiresIn: auth.ttl,
    });
  },
};

module.exports = mongoose.model("User", UserSchema);
