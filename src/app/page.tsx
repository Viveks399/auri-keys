import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden bg-white">
      {/* Background Image with Enhanced Effects */}
      <div className="absolute inset-0 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Logo/Title Section */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-display font-medium text-gray-900 mb-4 tracking-tight drop-shadow-sm">
            Auri Keys
          </h1>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 font-light tracking-wide uppercase letter-spacing-wider drop-shadow-sm">
            Real Estate Properties
          </p>
        </div>

        {/* Main Message */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-display font-normal text-gray-800 mb-8 leading-relaxed drop-shadow-sm">
            Website Under Maintenance
          </h2>
          <p className="text-base text-gray-500 max-w-md mx-auto leading-relaxed font-light drop-shadow-sm">
            We&apos;re building something beautiful for you. Coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
