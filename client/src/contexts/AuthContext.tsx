import React, {createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, logoutUser, registerUser } from '../api'
import { UserInterface } from '../interfaces/user'
import { LocalStorage , requestHandler} from '../utils'
import Loader from '../components/Loader'



// Create a context to manage authentication-related data and functions
const AuthContext = createContext<{
    user: UserInterface | null;
    token: string | null;
    login: (data: {email: string; password: string}) => Promise<void>;
    register: (data: {
        email:string;
        fullname: string;
        profession: string;
        password: string;
    }) => Promise<void>;
    logout: () => Promise<void>
}>({
    user: null,
    token:null,
    login: async () => {},
    register: async () => {},
    logout: async () => {}
})



// Create a hook to access the AuthContext
const useAuth = () => useContext(AuthContext);


// Create a component that provides authentication-related data and functions
const AuthProvider: React.FC<{children: React.ReactNode}> = ({
    children,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<UserInterface | null>(null);
    const [token, setToken] = useState<string | null>(null);


    const navigate = useNavigate();

    // Function to handle user login
    const login = async (data: {
        email: string;
        password: string
    }) => {
        alert("hey: ", data)
        await requestHandler(
            async () => await loginUser(data),
            setIsLoading,
            (res) => {
                const { data } = res;
                setUser(data.user);
                setToken(data.accessToken);
                LocalStorage.set('user', data.user);
                LocalStorage.set("token", data.accessToken)
                navigate("/me")
            },
            alert
        );
       
    };


    // Function to handle user registration
    const register = async (data: {
        fullname: string;
        email: string;
        password: string;
        profession: string;
    }) => {
        console.log("hey2")
        await requestHandler(
            async () => await registerUser(data),
            setIsLoading,
            () => {
                alert("Account created successfully! Go ahead and login.");
                navigate("/login");
            },
            alert
        )
    }


    // Function to handle user logout
    const logout = async () => {
        await requestHandler(
            async () => await logoutUser(),
            setIsLoading,
            () => {
                setUser(null);
                setToken(null);
                LocalStorage.clear(); // Clear local storage on logout
                navigate("/login"); // Redirect to the login page after successful logout
            },
            alert // Display error alerts on request failur
        );
    };



    //  Check for saved user and token in local storage during component initialization
    useEffect(() => {
        setIsLoading(true);
        const _token = LocalStorage.get("token");
        const _user = LocalStorage.get("user");
        if (_token && _user?._id){
            setUser(_user);
            setToken(_token);
        }

        setIsLoading(false);
    }, []);


    //  Provide authentication-related data and functions through the context
    return (
        <AuthContext.Provider value={{user, login, register, logout, token, setToken, setUser}}>
            {isLoading ? <Loader /> : children}
        </AuthContext.Provider>
    )
}




// Export the context, provider component, and custom hook
export { AuthContext, AuthProvider, useAuth };