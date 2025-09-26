import Link from "next/link";

// Common styles for navigation links
const navLinkClasses = "text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors";

export default function Header() {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 bg-white/10 backdrop-blur-sm w-[85%] md:w-[70%] rounded-4xl shadow-lg mx-auto">
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-display font-semibold text-gray-200">
              Auri Keys
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className={navLinkClasses}>
                Home
              </Link>
              <Link href="/properties" className={navLinkClasses}>
                Properties
              </Link>
              <Link href="/about" className={navLinkClasses}>
                About
              </Link>
              <Link href="/contact" className={navLinkClasses}>
                Contact
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
