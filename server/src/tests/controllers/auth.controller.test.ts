import { AuthService } from '../../auth/auth.service';
import IUser from '../../interfaces/user.interface';

// Mock UserService if necessary
jest.mock('../../services/user.service', () => ({
  UserService: jest.fn().mockImplementation(() => ({
    // userFindByEmail: jest.fn(),
    register: jest.fn(),
  })),
}));

// jest.mock('bcrypt', () => ({
//     hash: jest.fn(() => Promise.resolve('$2b$10$BSZLOXybp2ktxa/AThuTHeXoX/b6fxJRbpWVeoNPGf1boxbMRehm.'))
// }));

describe('User Registration', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  it('should register a new user', async () => {
    // Mock user data
    const userData:Partial<IUser> = {
      _id: 'some-user',
      email: 'test@example.com',
      password: 'password',
      username: 'testuser',
      profession: 'Developer',
      fullName: 'Test User',
      loginType: 'email',
      followers: [],
      following: [],
      events: [],
      rvps: [],
      rating: 0,
    };

    // Mock userCreate method to return the newly created user
    const newUser: Partial<IUser> = {
      ...userData,
    };
    (authService.userService.userCreate as jest.Mock).mockResolvedValueOnce(newUser);

    // Register the user
    const registrationMessage = await authService.register(userData);

    // Assertion
    expect(registrationMessage).toContain('User registered successfully');

    // Verify that userCreate method was called with the correct data
    expect(authService.userService.userCreate).toHaveBeenCalledWith(expect.objectContaining(userData));

    // Now your test will expect the hashed password
   // Example of fixed code
expect(authService.userService.userCreate).toHaveBeenCalledWith(expect.objectContaining({
    ...userData,
    password: expect.any(String)
  }));
  });

  // Add more test cases as needed
});
