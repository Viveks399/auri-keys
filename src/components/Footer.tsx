import React from "react";

const Footer = () => {
  return (
    <>
       <footer
         className="bg-gray-900 text-white sticky bottom-0 left-0 w-full"
         style={{
           zIndex: 0,
         }}
       >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Logo Section */}
          <div className="flex justify-center mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center mr-3">
                  <span className="text-gray-900 font-bold text-xl">A</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold tracking-wider">AURI</h2>
              <h2 className="text-2xl font-bold tracking-wider">KEYS</h2>
            </div>
          </div>

          {/* Navigation Section */}
          <nav className="flex justify-center mb-8">
            <ul className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-medium">
              <li><a href="/" className="hover:text-gray-300 transition-colors">Home</a></li>
              <li><a href="/list" className="hover:text-gray-300 transition-colors">List Layout</a></li>
              <li><a href="/half-map" className="hover:text-gray-300 transition-colors">Half Map Layout</a></li>
              <li><a href="/grid" className="hover:text-gray-300 transition-colors">Grid Layout</a></li>
              <li><a href="/blog" className="hover:text-gray-300 transition-colors">Blog</a></li>
              <li><a href="/contact" className="hover:text-gray-300 transition-colors">Contact</a></li>
            </ul>
          </nav>

          {/* Separator Line */}
          <div className="border-t border-gray-700 mb-8"></div>

          {/* Copyright and Social Media Section */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="mb-4 md:mb-0">
              <p>© Copyright. All rights reserved.</p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Facebook */}
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                aria-label="Facebook"
              >
                <span className="text-sm font-bold">f</span>
              </a>

              {/* Twitter */}
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 
                    4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 
                    1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 
                    4.067 6.13 1.64 3.162a4.822 4.822 
                    0 00-.666 2.475c0 1.71.87 3.213 
                    2.188 4.096a4.904 4.904 
                    0 01-2.228-.616v.06a4.923 
                    4.923 0 003.946 4.827 4.996 4.996 
                    0 01-2.212.085 4.936 4.936 
                    0 004.604 3.417 9.867 9.867 
                    0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 
                    13.995 0 007.557 2.209c9.053 0 13.998-7.496 
                    13.998-13.985 0-.21 0-.42-.015-.63A9.935 
                    9.935 0 0024 4.59z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 
                    0 0 0-2.122-2.136C19.505 
                    3.545 12 3.545 12 3.545s-7.505 
                    0-9.377.505A3.017 3.017 0 
                    0 0 .502 6.186C0 8.07 0 
                    12 0 12s0 3.93.502 
                    5.814a3.016 3.016 0 
                    0 0 2.122 2.136c1.871.505 
                    9.376.505 9.376.505s7.505 
                    0 9.377-.505a3.015 3.015 
                    0 0 0 2.122-2.136C24 
                    15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 
                    15.568V8.432L15.818 
                    12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                aria-label="LinkedIn"
              >
                <span className="text-xs font-bold">in</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
