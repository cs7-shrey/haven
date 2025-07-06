import { useState } from "react";
import { handleApiError, logoutUser } from "@/services/api";
import { useAuthStore } from "@/store/useAuthStore";

interface Options {
    onError: (err: string) => void;
}

export const useLogout = (options?: Options) => {
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const {setAuthUserEmail} = useAuthStore();
    
    const logout = async () => {
        try {
            setIsLoggingOut(true);
            const response = await logoutUser();
            if(response.status != 200) {
                throw new Error(response.data.detail);
            }
            setAuthUserEmail(null);
            return true;
        } catch (error) {
            handleApiError(error, (err) => {
                setError(err);
                options?.onError(err);
            });
            return false;
        }
        finally {
            setIsLoggingOut(false);
        }
    }

    return {
        logout, isLoggingOut, error
    } as const;
}