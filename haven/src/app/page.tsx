import RecentSearches from "@/components/RecentSearches";
import SearchBar from "@/components/search/SearchBar";
import Logo from "@/components/ui/Logo";
import Logout from "@/components/auth/Logout";
import HomePageLoader from "@/components/home/HomePageLoader";
import AnimatedContainer from "@/components/home/AnimatedContainer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation - Floating, sophisticated */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mt-6 backdrop-blur-xl bg-white/80 border border-black/[0.08] rounded-2xl shadow-sm shadow-black/[0.03]">
            <div className="flex items-center justify-between px-6 lg:px-8 py-4">
              <Logo />
              <Logout />
            </div>
          </div>
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          {/* Subtle vignette effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
        </div>

        {/* Main content container */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Heading - Premium typography */}
            <AnimatedContainer 
              className="max-w-4xl"
              yOffset={10}
              duration={0.2}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1]">
                <span className="inline-block">Find hotels</span>
                {" "}
                <span className="inline-block bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                  with AI
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
              className="w-full max-w-4xl"
              yOffset={20}
              duration={0.3}
            >
              <div className="backdrop-blur-2xl bg-white/95 border border-white/20 rounded-3xl shadow-2xl shadow-black/20 p-8 md:p-10 lg:p-12">
                <SearchBar />
              </div>
            </AnimatedContainer>
          </div>
        </div>

        {/* Decorative elements - Subtle sophistication */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-[5]" />
      </div>

      {/* Recent Searches - Refined spacing */}
      <div className="relative z-10 -mt-16 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <RecentSearches />
        </div>
      </div>

      <HomePageLoader />
    </div>
  );
}
