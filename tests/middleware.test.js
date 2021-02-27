import supertest from "supertest";
import app from "../src/app";
import { auth } from "../src/services/auth.service";

jest.mock("../src/services/auth.service", () => {
  return {
    auth: jest.fn((req, res, next) => next()),
    getUser: jest.fn(),
  };
});

describe("Auth Middleware", () => {
  test("test auth middleware calls next()", async () => {
    await supertest(app)
      .get("/users/1")
      .expect(200)
      .then((response) => {
        expect(auth).toHaveBeenCalledTimes(1);
      });
  });
});
