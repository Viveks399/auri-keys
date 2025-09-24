import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen relative flex items-start justify-center px-4 overflow-hidden bg-white pt-5 sm:pt-10 md:pt-38">
      {/* Background Image with Enhanced Effects */}
      <div className="absolute inset-0 z-0">
        {/* Desktop background Image */}
        <Image
          src="/assets/images/auri-keys-bg.jpg"
          alt="Auri Keys Background"
          fill
          className="object-contain blur-sm hidden md:block"
          priority
        />

        {/* Mobile Background Image */}
        <Image
          src="/assets/images/mobile-bg.jpg"
          alt="Auri Keys Mobile Background"
          fill
          className="object-cover blur-sm md:hidden"
          priority
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Logo/Title Section */}
        <div className="">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium text-gray-900 tracking-tight drop-shadow-sm">
            Auri Keys
          </h1>
          <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-2"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-light tracking-wide uppercase letter-spacing-wider drop-shadow-sm">
            Real Estate Properties
          </p>
        </div>

        {/* Main Message */}
        <div className="mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-normal text-gray-800 leading-relaxed drop-shadow-sm">
            Website Under Maintenance
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-md mx-auto leading-relaxed font-light drop-shadow-sm">
            We&apos;re building something beautiful for you. Coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
