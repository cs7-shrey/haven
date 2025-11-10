"use client"
import { User } from "lucide-react"
import { Button } from "../ui/button";
import { FaUserCircle } from "react-icons/fa";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuthContext } from "@/context/AuthContext";
import { useLogout } from "@/hooks/auth/useLogout";
import toast from "react-hot-toast";

const Logout: React.FC = () => {
    const { authUserEmail } = useAuthStore();
    const { openLoginPopup } = useAuthContext();
    const { logout } = useLogout({
        onError: (err) => toast.error(err)
    });
    const loggedIn = authUserEmail !== null
    const onClick = () => {
            const isLoggedIn = authUserEmail !== null;
            if(!isLoggedIn) {
              openLoginPopup();
            }
            else {
              logout();
            }
          }
    return (
        <Button
            onClick={onClick}
            className=' border-white/20 backdrop-blur-sm text-background text-md font-bold hover:bg-white/20'
        >
            {loggedIn ? <User/> : <FaUserCircle size={34} className=""
                style={{
                    scale: 1.3
                }} 
            />}
            {loggedIn ? "Log out" : "Log in"}
        </Button>
    )
}

export default Logout
