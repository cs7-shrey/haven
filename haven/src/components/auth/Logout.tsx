import { User } from "lucide-react"
import { Button } from "../ui/button";
import { FaUserCircle } from "react-icons/fa";

interface Props {
    loggedIn: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Logout: React.FC<Props> = ({ loggedIn, onClick }) => {
    // loggedIn = true;
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
