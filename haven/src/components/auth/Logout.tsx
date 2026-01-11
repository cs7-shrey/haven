"use client";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import { checkAuth, useAuthStore } from "@/store/useAuthStore";
import { useAuthContext } from "@/context/AuthContext";
import { useLogout } from "@/hooks/auth/useLogout";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const Logout: React.FC = () => {
	const { authUserEmail } = useAuthStore();
	const { openLoginPopup } = useAuthContext();
	const { logout } = useLogout({
		onError: (err) => toast.error(err),
	});
	const loggedIn = authUserEmail !== null;
	console.log("Logged in status:", loggedIn);
	console.log("Auth User Email:", authUserEmail);
	const onClick = () => {
		const isLoggedIn = authUserEmail !== null;
		if (!isLoggedIn) {
			openLoginPopup();
		} else {
			logout();
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<Button
			onClick={onClick}
            variant={"outline"}
			className={cn("px-6 py-2.5 rounded-xl",
                "font-medium text-sm border border-slate-700/50 shadow-sm", 
                "transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
                "bg-white/60 hover:bg-white/80 backdrop-blux-3xl"
            )}
		>
			{loggedIn ? (
				<>
					<User size={18} className="" />
					Log out
				</>
			) : (
				<>
					<User size={18} className="" />
					Log in
				</>
			)}
		</Button>
	);
};

export default Logout;
