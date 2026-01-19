import RecentSearches from "@/components/RecentSearches";
import SearchBar from "@/components/search/SearchBar";
import Logo from "@/components/ui/Logo";
import Logout from "@/components/auth/Logout";
import HomePageLoader from "@/components/home/HomePageLoader";
import AnimatedContainer from "@/components/home/AnimatedContainer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation - Minimal */}
      <nav className="absolute top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-6 lg:px-8 py-6">
          <Logo />
          <Logout />
        </div>
      </nav>

      {/* Hero Section - Premium spacing and composition */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
        {/* Background Image with sophisticated overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(/hotel.jpg)` }}
          />
          {/* Gradient overlay for depth and readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/55 to-black/10" />
          {/* Subtle vignette effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
        </div>

        {/* Main content container */}
        <div className="relative z-10 w-full mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Heading Section */}
            <AnimatedContainer className="max-w-5xl" yOffset={10} duration={0.2}>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-semibold text-white tracking-tight leading-[1.05] [text-shadow:_0_8px_30px_rgb(0_0_0_/_0.4)]">
                <span className="opacity-95 font-light">Find hotels</span>
                <br className="sm:hidden" />
                <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-blue-100 drop-shadow-[0_0_15px_rgba(165,243,252,0.4)]">
                  {" "}with AI
                </span>
              </h1>
            </AnimatedContainer>

            {/* Subheading - Subtle and elegant */}
            <AnimatedContainer 
              className="max-w-2xl"
              yOffset={15}
              duration={0.25}
            >
              <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed tracking-wide">
                Discover your perfect stay with intelligent search
              </p>
            </AnimatedContainer>

            {/* Search Card - Elevated, refined */}
            <AnimatedContainer 
              className="w-full flex justify-center"
              yOffset={20}
              duration={0.3}
            >
              <div className="backdrop-blur-2xl bg-white/55 border border-white/20 rounded-3xl shadow-2xl shadow-black/20 p-4 md:p-10 lg:p-12">
                <SearchBar />
              </div>
            </AnimatedContainer>
          </div>
        </div>

        {/* Decorative elements - Subtle sophistication */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white z-[5]" />
      </div>

      {/* Recent Searches - Refined spacing */}
      <div className="relative z-10 -mt-8 pb-16">
        <div className="max-w-7xl mx-10">
          <RecentSearches />
        </div>
      </div>

      <HomePageLoader />
    </div>
  );
}
