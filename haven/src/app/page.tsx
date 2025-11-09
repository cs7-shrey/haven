import RecentSearches from "@/components/RecentSearches";
import SearchBar from "@/components/search/SearchBar";
import Logo from "@/components/ui/Logo";
import Logout from "@/components/auth/Logout";
import HomePageLoader from "@/components/home/HomePageLoader";
import AnimatedContainer from "@/components/home/AnimatedContainer";

export default function Home() {
  return (
    <>
      <nav className="bg-primary">
        <div className="bg-primary text-primary p-8 flex justify-between" style={{ boxShadow: "0px 50px 100px black" }}>
          <Logo />
          <Logout/>
        </div>
      </nav>
      <div
        style={{
          background: `url(${"/hotel.jpg"})`,
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
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
          className="md:max-w-[90%] lg:max-w-[80%] flex flex-col gap-4 items-start w-fit bg-primary rounded-lg px-4 md:px-12 py-10"
        >
          <AnimatedContainer 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-sans text-primary-foreground"
            // style={{ textShadow: "0px 0px 1px black" }}
            yOffset={10}
            duration={0.2}
          >
            Find hotels with AI
          </AnimatedContainer>
          <AnimatedContainer 
            className="rounded-md"
            yOffset={20}
            duration={0.3}
          >
            <div className="flex flex-col justify-center items-center">
              <SearchBar />
            </div>
          </AnimatedContainer>
        </div>
      </div>
      <div>
        <RecentSearches />
      </div>
      <HomePageLoader />
    </>
  );
}
