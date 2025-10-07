import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-gradient-to-t from-gray-900/90 to-gray-900 dark:from-gray-900/95 dark:to-gray-900 text-gray-300/80 sticky bottom-0 left-0 w-full"
      style={{ zIndex: 0 }}
    >
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Auri Keys */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold text-white mb-6">
              About Auri Keys
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Auri Keys helps you find your dream home in Dubai's most
              prestigious communities.
            </p>
            <p className="text-sm leading-relaxed">
              123 Luxury Lane,
              <br />
              Downtown Dubai, UAE
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-lg font-bold text-white mb-6"
              style={{ color: "#d4af37" }}
            >
              Quick Links
            </h3>
            <nav className="space-y-3">
              <a
                className="block text-sm hover:text-white transition-colors"
                href="#"
              >
                Home
              </a>
              <a
                className="block text-sm hover:text-white transition-colors"
                href="#"
              >
                Properties
              </a>
              <a
                className="block text-sm hover:text-white transition-colors"
                href="#"
              >
                Communities
              </a>
              <a
                className="block text-sm hover:text-white transition-colors"
                href="#"
              >
                Off-Plan
              </a>
              <a
                className="block text-sm hover:text-white transition-colors"
                href="#"
              >
                About Us
              </a>
              <a
                className="block text-sm hover:text-white transition-colors"
                href="#"
              >
                Careers
              </a>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h3
              className="text-lg font-bold text-white mb-6"
              style={{ color: "#d4af37" }}
            >
              Resources
            </h3>
            <nav className="space-y-3">
              <a
                className="block text-sm hover:text-white transition-colors"
                href="#"
              >
                Blog
              </a>
              <a
                className="block text-sm hover:text-white transition-colors"
                href="#"
              >
                Guides
              </a>
              <a
                className="block text-sm hover:text-white transition-colors"
                href="#"
              >
                Mortgage Calculator
              </a>
              <a
                className="block text-sm hover:text-white transition-colors"
                href="#"
              >
                FAQs
              </a>
              <a
                className="block text-sm hover:text-white transition-colors"
                href="#"
              >
                Market Reports
              </a>
            </nav>
          </div>

          {/* Concierge Service Hub */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3
              className="text-lg font-bold text-white mb-6"
              style={{ color: "#d4af37" }}
            >
              Concierge Service Hub
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Experience unparalleled personal assistance for your luxury real
              estate needs. Connect with us directly.
            </p>
            <div className="space-y-4">
              <button className="w-full bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg text-sm hover:opacity-90 transition-opacity flex items-center justify-center">
                <span className="material-symbols-outlined mr-2">chat</span>
                Direct Chat
              </button>
              <button className="w-full bg-transparent border border-yellow-500 text-yellow-500 font-bold py-3 px-6 rounded-lg text-sm hover:bg-yellow-500/10 transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined mr-2">
                  phone_in_talk
                </span>
                Request a Callback
              </button>
            </div>
            <div className="mt-8">
              <nav className="space-y-2">
                <a
                  className="block text-xs hover:text-white transition-colors"
                  href="#"
                >
                  Terms & Conditions
                </a>
                <a
                  className="block text-xs hover:text-white transition-colors"
                  href="#"
                >
                  Privacy Policy
                </a>
                <a
                  className="block text-xs hover:text-white transition-colors"
                  href="#"
                >
                  Cookie Policy
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
            <p className="text-xs text-gray-300/60">
              © 2025 Auri Keys Real Estate. All Rights Reserved.
            </p>
            <div className="flex items-center space-x-5">
              {/* Instagram */}
              <a
                className="text-gray-300/70 hover:text-white transition-colors"
                href="#"
              >
                <svg
                  fill="currentColor"
                  height="22"
                  viewBox="0 0 256 256"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                </svg>
              </a>
              {/* Facebook */}
              <a
                className="text-gray-300/70 hover:text-white transition-colors"
                href="#"
              >
                <svg
                  fill="currentColor"
                  height="22"
                  viewBox="0 0 256 256"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                </svg>
              </a>
              {/* YouTube */}
              <a
                className="text-gray-300/70 hover:text-white transition-colors"
                href="#"
              >
                <svg
                  fill="currentColor"
                  height="22"
                  viewBox="0 0 256 256"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,39.88,131,40,128,40s-57.56-.12-91.84,13.12a24,24,0,0,0-14.49,16.4C19.08,79.5,16,97.74,16,128s3.08,48.5,5.67,58.48a24,24,0,0,0,14.49,16.41C69,215.56,120.4,216,127.34,216h1.32c6.94,0,58.37-.44,91.18-13.11a24,24,0,0,0,14.49-16.41c2.59-10,5.67-28.22,5.67-58.48S236.92,79.5,234.33,69.52Zm-15.49,113a8,8,0,0,1-4.77,5.49c-31.65,12.22-85.48,12-86,12H128c-.54,0-54.33.2-86-12a8,8,0,0,1-4.77-5.49C34.8,173.39,32,156.57,32,128s2.8-45.39,5.16-54.47A8,8,0,0,1,41.93,68c30.52-11.79,81.66-12,85.85-12h.27c.54,0,54.38-.18,86,12a8,8,0,0,1,4.77,5.49C221.2,82.61,224,99.43,224,128S221.2,173.39,218.84,182.47ZM112,148.24V107.76a4,4,0,0,1,6.22-3.32l32,20.24a4,4,0,0,1,0,6.64l-32,20.24A4,4,0,0,1,112,148.24Z"></path>
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                className="text-gray-300/70 hover:text-white transition-colors"
                href="#"
              >
                <svg
                  fill="currentColor"
                  height="22"
                  viewBox="0 0 256 256"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Zm40-88.61a8,8,0,0,1-6.23-13.41,56,56,0,0,0-81.18-81.18,8,8,0,0,1,7-13.82,72,72,0,0,1,104.2,104.2A8,8,0,0,1,168,127.39Z"></path>
                </svg>
              </a>
            </div>
            <p className="text-xs text-gray-300/60">
              Website by Your Agency Name
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
