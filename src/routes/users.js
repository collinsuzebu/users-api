import express from "express";
import {
  getUserController,
  registerController,
  deleteUserController,
  updateUserController,
} from "../controllers/users";
import { auth } from "../services/auth.service";

const router = express.Router();

// @route POST /users/
// @desc Register a new user
// @access Public
router.post("/", registerController);

// @route GET users/id
// @desc Get a specific user by id
// @access Private
router.get("/:id", auth, getUserController);

// @route PATCH users/id
// @desc Update a specific user by id
// @access Private
router.patch("/:id", auth, updateUserController);

// @route DELETE users/id
// @desc Update a specific user by id
// @access Private
router.delete("/:id", auth, deleteUserController);

module.exports = router;
