"use client"

import { useContext, createContext, useState, ReactNode } from "react";

const AuthContext = createContext({
    isLoginPopupOpen: true,
    openLoginPopup: () => {},
    closeLoginPopup: () => {},
});

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
}

interface ContextProviderProps {
    children: ReactNode
}
export const AuthContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

    const openLoginPopup = () => setIsLoginPopupOpen(true);
    const closeLoginPopup = () => setIsLoginPopupOpen(false);

    return (
        <AuthContext.Provider
        value={{
            isLoginPopupOpen,
            openLoginPopup,
            closeLoginPopup,
        }}
        >
        {children}
        </AuthContext.Provider>
    );
}

