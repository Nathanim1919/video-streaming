import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser, registerUser, getUserData } from '../api'; // Ensure you have an API call to get user data
import { UserInterface } from '../interfaces/user';
import { requestHandler } from '../utils';
import Loader from '../components/Loader';

// Create a context to manage authentication-related data and functions
const AuthContext = createContext<{
  user: UserInterface | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    email: string;
    fullName: string;
    profession: string;
    password: string;
    username: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
}>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  isAuthenticated: () => false,
});

// Create a hook to access the AuthContext
const useAuth = () => useContext(AuthContext);

// Create a component that provides authentication-related data and functions
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserInterface | null>(null);

  const navigate = useNavigate();

  // Function to handle user login
  const login = async (data: { email: string; password: string }) => {
    await requestHandler(
      async () => await loginUser(data),
      setIsLoading,
      async (res) => {
        const { data } = res;
        setUser(data);
        navigate('/me');
      },
      alert
    );
  };

  // Function to handle user registration
  const register = async (data: {
    fullName: string;
    username: string;
    email: string;
    password: string;
    profession: string;
  }) => {
    await requestHandler(
      async () => await registerUser(data),
      setIsLoading,
      () => {
        alert('Account created successfully! Go ahead and login.');
        navigate('/login');
      },
      alert
    );
  };

  const isAuthenticated = () => (user ? true : false);

  // Function to handle user logout
  const logout = async () => {
    await requestHandler(
      async () => await logoutUser(),
      null,
      () => {
        setUser(null);
        navigate('/login'); // Redirect to the login page after successful logout
      },
      alert // Display error alerts on request failure
    );
  };

  // Check for saved user during component initialization
  useEffect(() => {
    const fetchUserData = async() => {
        await requestHandler(
            async () => await getUserData(),
            setIsLoading,
            (res) => {
                setUser(res.data)
                navigate('/me')
            },
            (error) => {
                console.log(error)
                navigate('/')
            }
        );
    }
    fetchUserData()
  }, []);

  // Provide authentication-related data and functions through the context
  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

// Export the context, provider component, and custom hook
export { AuthContext, AuthProvider, useAuth };
