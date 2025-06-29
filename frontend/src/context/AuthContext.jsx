import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = localStorage.getItem("token");
        return !!token;
    });
    const [userEmail, setUserEmail] = useState(() => {
        return localStorage.getItem("userEmail") || null;
    });
    const [userId, setUserId] = useState(null);
    const [isTeacher, setIsTeacher] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuthentication = async () => {
        const token = localStorage.getItem("token");
        console.log('🔍 Checking authentication...', { token: token ? 'exists' : 'missing' });
        
        if (!token) {
            console.log('❌ No token found, setting logged out');
            setIsLoggedIn(false);
            setIsLoading(false);
            return;
        }

        try {
            console.log('📡 Calling isAuthenticated API...');
            const response = await fetch('http://localhost:3000/api/v1/isAuthenticated', {
                method: 'GET',
                headers: {
                    'x-access-token': token
                }
            });

            const data = await response.json();
            console.log('🔐 Authentication response:', data);

            if (data.success) {
                console.log('✅ User authenticated, ID:', data.data);
                setUserId(data.data);
                setIsLoggedIn(true);
                
                // Check if user is a teacher
                await checkTeacherStatus(data.data);
            } else {
                console.log('❌ Authentication failed, logging out');
                // Token is invalid, logout
                logout();
            }
        } catch (error) {
            console.error('🚨 Authentication check error:', error);
            logout();
        } finally {
            setIsLoading(false);
        }
    };

    const checkTeacherStatus = async (id) => {
        try {
            console.log('👨‍🏫 Checking teacher status for ID:', id);
            const response = await fetch(`http://localhost:3000/api/v1/isTeacher`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem("token")
                },
                body: JSON.stringify({ id: id })
            });

            const data = await response.json();
            console.log('👨‍🏫 Teacher status response:', data);

            if (data.success && data.data === true) {
                console.log('✅ User is a teacher');
                setIsTeacher(true);
            } else {
                console.log('❌ User is not a teacher (data.data =', data.data, ')');
                setIsTeacher(false);
            }
        } catch (error) {
            console.error('🚨 Teacher status check error:', error);
            setIsTeacher(false);
        }
    };

    const login = () => {
        setIsLoggedIn(true);
        const email = localStorage.getItem("userEmail");
        setUserEmail(email);
        // Check authentication and teacher status after login
        checkAuthentication();
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserEmail(null);
        setUserId(null);
        setIsTeacher(false);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
    };

    const getToken = () => {
        return localStorage.getItem("token");
    };

    const isTokenValid = () => {
        const token = getToken();
        if (!token) return false;
        
        try {
            // Basic JWT expiration check (you might want to add more validation)
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            return payload.exp > currentTime;
        } catch (error) {
            console.error('Token validation error:', error);
            return false;
        }
    };

    // Check authentication on app load
    useEffect(() => {
        if (isLoggedIn) {
            checkAuthentication();
        } else {
            setIsLoading(false);
        }
    }, []);

    // Check token validity periodically
    useEffect(() => {
        if (isLoggedIn && !isTokenValid()) {
            logout();
        }
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ 
            isLoggedIn, 
            userEmail,
            userId,
            isTeacher,
            isLoading,
            login, 
            logout, 
            getToken,
            isTokenValid,
            checkAuthentication
        }}>
            {children}
        </AuthContext.Provider>
    );
}; 