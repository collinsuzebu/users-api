import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/app";
import { User } from "../src/models/user";
import { auth } from "../src/services/auth.service";

describe("Routes", () => {
  const data = {
    name: "collins",
    email: "collins@email.com",
    password: "123456",
  };

  let token;

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

  it("should POST -> a user can be created without authentication", async () => {
    await supertest(app)
      .post("/users")
      .send(data)
      .set("Accept", "application/json")
      .expect(201)
      .then((response) => {
        expect(response.body.userId).toBeDefined();
        expect(response.body.email).toEqual(data.email);
        token = response.body.token;
      });
  });

  it("should GET -> a specific user with authentication", async () => {
    const user = await User.create({ ...data, email: "collins@gm.com" });
    await supertest(app)
      .get("/users/" + user._id)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(JSON.stringify(response.body._id)).toBe(
          JSON.stringify(user._id)
        );
        expect(response.body.email).toBe(user.email);
      });
  });

  it("should PATCH -> a specific user data with authentication", async () => {
    const user = await User.create({ ...data, email: "collins@gm.com" });
    let d = { name: "collins uzebu" };

    await supertest(app)
      .patch("/users/" + user._id)
      .send(d)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(JSON.stringify(response.body._id)).toBe(
          JSON.stringify(user._id)
        );
        expect(response.body.name).toBe(d.name);
      });
  });

  it("should DELETE -> a specific user data with authentication", async () => {
    const user = await User.create({ ...data, email: "collins@gm.com" });

    await supertest(app)
      .delete("/users/" + user._id)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toBeUndefined();
        expect(response.body.name).toBeUndefined();
      });
  });
});
