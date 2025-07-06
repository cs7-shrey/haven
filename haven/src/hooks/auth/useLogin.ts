import { useState } from "react";
import { handleApiError, loginUser } from "@/services/api";
import { useAuthStore } from "@/store/useAuthStore";


export const useLogin = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {setAuthUserEmail} = useAuthStore();
    
    const login = async (email: string, password: string) => {
        try {
            setIsLoggingIn(true);
            const response = await loginUser(email, password);
            if(response.status != 200) {
                throw new Error(response.data.detail);
            }
            setAuthUserEmail(email);
            return true;
        } 
        catch (error) {
            handleApiError(error, (err) => setError(err))
            return false;
        } 
        finally {
            setIsLoggingIn(false);
        }
    }

    return {
        login, isLoggingIn, error
    } as const;

}