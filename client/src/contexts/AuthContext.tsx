import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import { UserInterface } from '../interfaces/user';
import { requestHandler } from '../utils';
import Loader from '../components/Loader';
import { AuthContextInterface, RegisterInterface } from '../interfaces/authContext';

// Create a context to manage authentication-related data and functions
const AuthContext = createContext<AuthContextInterface>({
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
      async () => await authApi.loginUser(data),
      setIsLoading,
      (res) => {
        const { data } = res;
        setUser(data);
        navigate('/me');
      },
      () => {
        navigate('/login');
      }
    );
  };

  // Function to handle user registration
  const register = async (data: RegisterInterface) => {
    await requestHandler(
      async () => await authApi.registerUser(data),
      setIsLoading,
      () => {
        navigate('/login');
      },
      alert
    );
  };

  const isAuthenticated = () => (user ? true : false);

  // Function to handle user logout
  const logout = async () => {
    await requestHandler(
      async () => await authApi.logoutUser(),
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
            async () => await authApi.getUserData(),
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
