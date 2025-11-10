import { useState } from "react";
import { handleApiError, signupUser } from "@/services/api";
import { useAuthStore } from "@/store/useAuthStore";


export const useSignup = () => {
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {setAuthUserEmail} = useAuthStore();
    
    const signup = async (name: string, email: string, password: string) => {
        try {
            setIsSigningUp(true);
            const response = await signupUser(name, email, password);
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
            setIsSigningUp(false);
        }
    }

    return {
        signup, isSigningUp, error
    } as const;

}