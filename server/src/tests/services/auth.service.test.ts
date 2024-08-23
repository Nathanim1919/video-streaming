import { expect } from "chai";
import sinon from "sinon";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthService } from "../../auth/auth.service";
import { UserService } from "../../services/user.service";
import IUser from "../../interfaces/user.interface";

describe("AuthService", () => {
  let authService: AuthService; // Create a variable to hold an instance of AuthService

  /**
   * Create a stubbed instance of UserService
   * This is a fake instance of UserService that we can use to test AuthService
   * without actually calling the real UserService methods
   * We can also use this to control the behavior of UserService methods
   * and return specific values when they are called
   * This is useful for testing AuthService in isolation
   * without relying on the real UserService
   * We can also use this to test how AuthService handles different scenarios
   * and edge cases
   * For example, we can test how AuthService handles a scenario
   * where UserService returns a specific value
   * or throws an error
   * This allows us to test AuthService in a controlled environment
   * and focus on specific aspects of its behavior
   * without worrying about the real UserService implementation
   * This is a common practice in unit testing
   */
  let userServiceStub: sinon.SinonStubbedInstance<UserService>;

  beforeEach(() => {
    // Create a new instance of UserService stub
    userServiceStub = sinon.createStubInstance(UserService);
    authService = new AuthService();
    authService.userService = userServiceStub;
  });

  afterEach(() => {
    sinon.restore();
  });

  // Test suite for the register method
  describe("register", () => {
    it("should register a new user successfully", async () => {
      const userData: Partial<IUser> = {
        email: "test@gmail.com",
        password: "password",
      };

      // Stub the userFindByEmail method of UserService
      userServiceStub.userFindByEmail.resolves(null); // simulate no existing user
      userServiceStub.userCreate.resolves({
        _id: "12345",
        ...userData,
      } as IUser);

      const result = await authService.register(userData);
      expect(result).to.equal(`User registered successfully: 12345`);
    });

    it("should throw an error if user already exists", async () => {
      const userData: Partial<IUser> = {
        email: "test@gmail.com",
        password: "password",
      };

      // Stub the userFindByEmail method of UserService
      userServiceStub.userFindByEmail.resolves(userData as IUser);

      try {
        await authService.register(userData);
      } catch (error) {
        if (error instanceof Error) {
        expect(error.message).to.equal(
          "Registration failed: User already exists"
        );
      }
      }
    });
  });
});
