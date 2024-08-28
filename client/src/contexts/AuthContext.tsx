import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import { UserInterface } from '../interfaces/user';
import { requestHandler } from '../utils';
import Loader from '../components/Loader';
import { AuthContextInterface, RegisterInterface } from '../interfaces/authContext';
import {Notifier} from "../components/Notifier.tsx";

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
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<UserInterface | null>(null);
    const [notifier, setNotifier] = useState<{ type: string; message: string; show: boolean }>({ type: '', message: '', show: false });

    const navigate = useNavigate();

    const login = async (data: { email: string; password: string }) => {
        await requestHandler(
            async () => await authApi.loginUser(data),
            setIsLoading,
            (res) => {
                const { data } = res;
                setUser(data as UserInterface);
                setNotifier({ type: 'success', message: 'Logged in Successfully!', show: true });
                navigate('/me');
            },
            () => {
                setNotifier({ type: 'error', message: 'Login Failed!', show: true });
                navigate('/login');
            }
        );
    };

    const register = async (data: RegisterInterface) => {
        await requestHandler(
            async () => await authApi.registerUser(data),
            null,
            () => {
                setNotifier({ type: 'success', message: 'Registered Successfully!', show: true });
                navigate('/login');
            },
            () => {
                setNotifier({ type: 'error', message: 'Registration Failed!', show: true });
            }
        );
    };

    const logout = async () => {
        await requestHandler(
            async () => await authApi.logoutUser(),
            null,
            () => {
                setUser(null);
                setNotifier({ type: 'success', message: 'Logged out Successfully!', show: true });
                navigate('/login');
            },
            () => {
                setNotifier({ type: 'error', message: 'Logout Failed!', show: true });
            }
        );
    };

    const isAuthenticated = () => (!!user);

    useEffect(() => {
        const fetchUserData = async () => {
            await requestHandler(
                async () => await authApi.getUserData(),
                setIsLoading,
                (res) => {
                    setUser(res.data as UserInterface);
                    if (res.data){
                        setNotifier({ type: 'success', message: `Welcome back to Eventify`, show: true });
                    }
                    navigate('/me');
                },
                (error) => {
                    console.log(error);
                }
            );
        };
        if (user === null) {
            fetchUserData();
        }else {
            setIsLoading(false);
        }
    }, [user]);

  // Provide authentication-related data and functions through the context
  return (
      <>
          <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
              {isLoading ? <Loader /> : children}
              {notifier.show && <Notifier type={notifier.type} message={notifier.message} />}
          </AuthContext.Provider>
      </>
  );
};

// Export the context, provider component, and custom hook
// eslint-disable-next-line react-refresh/only-export-components
export { AuthContext, AuthProvider, useAuth };
