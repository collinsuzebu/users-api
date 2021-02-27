import jwt from "jsonwebtoken";
import { JWT_KEY } from "../constants";
import { User } from "../models/user";

/* 
Create a new user
*/
export async function register(data) {
  let user = await User.findOne({ email: data.email });
  if (user) {
    return {
      error: "Email already exists",
    };
  }

  user = new User({
    name: data.name,
    email: data.email,
    password: data.password,
  });

  const token = jwt.sign({ userId: user._id }, JWT_KEY, { expiresIn: "1h" });

  await user.save();
  return { userId: user._id, email: user.email, name: user.name, token: token };
}

/*
Get a user by id
*/
export async function getUser(id) {
  const user = await User.findById(id);

  if (!user) {
    return { error: "User not found" };
  }

  return user;
}

/*
Update a user's record
*/
export async function updateUser(id, data) {
  let userFields = {
    name: data.name,
    email: data.email,
    password: data.password,
  };

  const user = await User.findOneAndUpdate(
    { _id: id },
    { $set: userFields },
    { new: true, omitUndefined: true, runValidators: true }
  );
  return user;
}

export async function deleteUser(id) {
  const user = await User.findById(id);
  if (user) {
    user.remove();
  }
  return {
    success: true,
  };
}

// SImple Authentication Middleware
export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({
      status: 403,
      message: "FORBIDDEN",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ status: 401, message: "UNAUTHORIZED" });
    }

    req.user = user;
    return next();
  });
};
