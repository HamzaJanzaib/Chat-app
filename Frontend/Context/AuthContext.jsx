import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { checkAuth } from '../Services/AuthServices/CheckAuth';
import { io } from 'socket.io-client';
import { BASE_URL } from '../config/config';
import { loginUser } from '../Services/AuthServices/Login';
import { registerUser } from '../Services/AuthServices/Register';
import { updateProfile } from '../Services/AuthServices/UpdateProfile';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    //Chack User
    const CheckUer = async () => {
        try {
            const data = await checkAuth(token);
            if (data.success) {
                setAuthUser(data.UserData);
                conectSocket(data.UserData);
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    //Auth User 
    const Auth = async (state, credentials) => {
        try {
            const data = state === "Register" ? (await registerUser(credentials)) : (await loginUser(credentials));
            if (data.success) {
                setAuthUser(data.UserData);
                conectSocket(data.UserData);
                setToken(data.token);
                localStorage.setItem('token', data.token);
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //Logout user and disconnect user socket
    const logout = async () => {
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        toast.success("Logout Successfully")
        socket?.disconnect();
    }

    //Update Profile 
    const UpdateProfile = async (credentials) => {
        try {
            const data = await updateProfile(credentials, token);
            if (data.success) {
                setAuthUser(data.UserData);
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //connect Socket into User
    const conectSocket = (userData) => {
        if (!userData || socket?.connected) return;
        const newSocket = io(BASE_URL, {
            query: {
                userId: userData._id,
            }
        })
        newSocket.connect();
        setSocket(newSocket);

        newSocket.on("online-users", (userIds) => {
            setOnlineUsers(userIds)
        })
    }

    useEffect(() => {
        CheckUer()
        // eslint-disable-next-line react-refresh/only-export-components
    }, [])

    const value = {
        authUser, setAuthUser,
        isAuthenticated, setIsAuthenticated,
        token, setToken,
        onlineUsers, setOnlineUsers,
        socket, setSocket,
        logout,
        Auth,
        UpdateProfile,
    };
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
}

