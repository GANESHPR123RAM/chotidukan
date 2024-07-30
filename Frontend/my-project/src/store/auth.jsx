import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [services, setservices] = useState("");


    const AuthorizationToken = `Bearer ${token}`;


    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    let isLoggedIn = !!token;


    console.log('isLoggedIn', isLoggedIn);


    //tackling the logout functionality
    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
    }

    //jwt authentication to get current user data


    const userAuthentication = async () => {
          
        if (!token) return;

        setIsLoading(true);

        try {
            // setIsLoading(true);
            const response = await fetch('http://localhost:5000/api/auth/user', {
                method: 'GET',
                headers: {
                    Authorization: AuthorizationToken,
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log("user data ", data.userData);
                setUser(data.userData);
                // setIsLoading(false);
            }else{
                logoutUser();
                console.error("Error fetching user data");
                // setIsLoading(false);
            }

        } catch (error) {
            console.error("")
            logoutUser();
        }
        finally {
            setIsLoading(false);
        }
    }



    const getServices = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/data/service', {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.msg);
                setservices(data.msg);
            } else {
                console.error("Error fetching services data");
            }

        }
        catch (error) {
            console.log(`services frontend error ${error}`);
        }
    }

    // to fetch the data from data base

    // useEffect(() => {
    //     getServices();
    //     userAuthentication();
    // }, []);

    useEffect(() => {
        if (token) {
            userAuthentication();
        }
    }, [token]);

    useEffect(() => {
        if (isLoggedIn) {
            getServices();
        }
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services, AuthorizationToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContextValue;
};
