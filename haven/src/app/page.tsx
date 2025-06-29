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

export default function Home() {
  const { waitingForMessage } = useSocketStore();
  return (
    <>
      <nav className="bg-primary">
        <div className="bg-primary text-primary p-8 flex justify-between" style={{ boxShadow: "0px 50px 100px black" }}>
          <Logo />
          <Logout />
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
        <div className="w-[60%] flex flex-col gap-4 items-start min-w-fit bg-primary rounded-lg px-0 md:px-10 py-10">
          <div className="text-6xl font-extrabold font-sans text-primary-foreground"
            style={{ textShadow: "0px 0px 1px black" }}
          >
            Find hotels with AI
          </div>
          <div className="rounded-md">
            <div className="flex flex-col justify-center items-center">
              <SearchBar />
            </div>
          </div>
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
