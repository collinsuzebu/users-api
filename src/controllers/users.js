import {
  getUser,
  register,
  updateUser,
  deleteUser,
} from "../services/auth.service";
import { validateRegisterInput } from "../utils";

export const registerController = async (req, res, next) => {
  // validate user's input
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await register(req.body);
  return res.status(201).json(user);
};

export const getUserController = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "user ID is required" });
  }
  const user = await getUser(req.params.id);
  res.status(200).json(user);
};

export const updateUserController = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "user ID is required" });
  }

  const user = await updateUser(req.params.id, req.body);
  res.status(200).json(user);
};

export const deleteUserController = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "user ID is required" });
  }

  const deleted = await deleteUser(id);
  res.status(200).json(deleted);
};
