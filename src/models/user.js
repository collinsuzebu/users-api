import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  let password = this._update.$set.password;
  try {
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      this._update.$set.password = hash;
    }
    next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.__v;
  delete obj.password;
  return obj;
};

const User = mongoose.model("User", UserSchema);

export { User };
