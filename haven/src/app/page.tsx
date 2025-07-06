"use client"

import RecentSearches from "@/components/RecentSearches";
import SearchBar from "@/components/search/SearchBar";
import Logo from "@/components/ui/Logo";
// import Login from "@/components/auth/Login";
import { HashLoader } from "react-spinners";
import { useSocketStore } from "@/store/useSocketStore";
// import SignUp from "@/components/auth/SignUp";
// import { useAuthStore } from "@/store/useAuthStore";
// import AuthChecker from "@/context/AuthChecker";
import Logout from "@/components/auth/Logout";
import { motion } from "motion/react"
import { useAuthStore } from "@/store/useAuthStore";
import { useAuthContext } from "@/context/AuthContext";
import { useLogout } from "@/hooks/auth/useLogout";
import toast from "react-hot-toast";

export default function Home() {
  const { waitingForMessage } = useSocketStore();
  const { authUserEmail } = useAuthStore();
  const { openLoginPopup } = useAuthContext();
  const { logout } = useLogout({
    onError: (err) => toast.error(err)
  });
  return (
    <>
      <nav className="bg-primary">
        <div className="bg-primary text-primary p-8 flex justify-between" style={{ boxShadow: "0px 50px 100px black" }}>
          <Logo />
          <Logout loggedIn={authUserEmail !== null} onClick={() => {
            const isLoggedIn = authUserEmail !== null;
            if(!isLoggedIn) {
              openLoginPopup();
            }
            else {
              logout();
            }
          }}/>
        </div>
      </nav>
      <div
        style={{
          background: `url(${"/hotel.jpg"})`,
          backgroundPosition: "top left",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          position: "relative",
          height: "75vh",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
        className="flex flex-col justify-center items-center z-20 bg-no-repeat relative"
      >
        {/* hotel search form with location, checkin date and checkout date */}
        <div 
          className="w-[60%] flex flex-col gap-4 items-start min-w-fit bg-primary rounded-lg px-0 md:px-10 py-10"
        >
          <motion.div className="text-6xl font-extrabold font-sans text-primary-foreground"
            style={{ textShadow: "0px 0px 1px black" }}
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.2, ease: "easeInOut"}}
          >
            Find hotels with AI
          </motion.div>
          <motion.div 
            className="rounded-md"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3, ease: "easeInOut"}}
          >
            <div className="flex flex-col justify-center items-center">
              <SearchBar />
            </div>
          </motion.div>
        </div>
      </div>
      <div>
        <RecentSearches />
      </div>
      {waitingForMessage && <div className="fixed inset-0 top-0 left-0 z-50 flex justify-center items-center bg-secondary/50">
        <HashLoader />
      </div>}
    </>
  );
}
