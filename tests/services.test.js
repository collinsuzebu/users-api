import mongoose from "mongoose";
import {
  deleteUser,
  getUser,
  register,
  updateUser,
} from "../src/services/auth.service";

describe("Test New User Creation", () => {
  let globalUser;

  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/TestUsersDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async (done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });

  it("should create a new user", async () => {
    const userData = {
      name: "collins",
      password: "123456",
      email: "collins@gopro.com",
    };

    const user = await register(userData);
    expect(user.userId).toBeDefined();
    expect(user.name).toEqual(userData.name);

    globalUser = user;
  });

  it("should get a specific user", async () => {
    const user = await getUser(globalUser.userId);
    expect(user.email).toEqual(globalUser.email);
  });

  it("should update the records of an existing user", async () => {
    const newData = {
      name: "Collins Uzebu",
    };
    const user = await updateUser(globalUser.userId, newData);
    expect(user.name).toEqual(newData.name);
    expect(user.email).toEqual(globalUser.email);
  });

  it("should delete an existing user", async () => {
    const user = await deleteUser(globalUser.userId);
    expect(user.email).toBeUndefined;
  });
});
