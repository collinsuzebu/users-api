import { validateRegisterInput } from "../src/utils";

describe("validateRegisterInput", () => {
  it("should pass with all 3 inputs -> (name, email, password)", () => {
    const data = {
      name: "collins",
      password: "sixletters",
      email: "noverify@gmail.com",
    };
    const res = validateRegisterInput(data);

    expect(res.isValid).toBeTruthy();
    expect(res.errors).toEqual({});
  });

  it("should fail with a missing input -> (email)", () => {
    const data = {
      name: "collins",
      password: "sixletters",
    };
    const res = validateRegisterInput(data);

    expect(res.isValid).toBeFalsy();
    expect(res.errors).toEqual({ email: "Email field is required" });
  });
});
