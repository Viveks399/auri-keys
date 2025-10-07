export default function PropertiesSection() {
  return (
    <div className="w-full bg-gray-900 py-12 pb-32 relative z-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-white font-display">
          Browse our Off Plan properties
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Palace Villas Ostra */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              alt="Exterior view of Palace Villas Ostra"
              className="w-full h-48 object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvFtrZWvJD0FQJ0i4fw_xwalwMk1xRBuJ_sUYerYYrxLSJskG2r1CwvitoUIaeeRyQL4spLqEMJ6oinO8CYySDdFKAaoBedWS-wXbEj53RxbSA82VkIbpPaxrarLzPiIlcroQMtNc90ie4-n7hk61nKnxllTfgLFMzTdd6s5TRfK1WrDZOcb0g2FHhvWgUFs5EuVU9SYeN_qHsRZNq-RoKRKvh8werItO1SnPEEpxiFbyMDrQkzdGxg5O8t1kkgQAYGE8ox7X8Sw"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                Palace Villas Ostra
              </h2>
              <div className="flex items-center text-gray-500 mb-2">
                <svg
                  className="w-4 h-4 mr-1 text-[#0f5132]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">The Oasis</span>
              </div>
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-semibold text-[#0f5132]">
                  Delivery Date:
                </span>{" "}
                Oct, 2029
              </p>
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-semibold text-[#0f5132]">
                  Price from:
                </span>{" "}
                AED 13,130,000
              </p>
              <p className="text-gray-700 text-sm mb-4">
                <span className="font-semibold text-[#0f5132]">Developer:</span>{" "}
                EMAAR
              </p>
              <div className="flex gap-3">
                <button
                  className="flex-1 bg-transparent text-[#0f5132] border border-[#0f5132] hover:bg-[#0f5132] hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call
                </button>
                <button
                  className="flex-1 bg-transparent text-[#0f5132] border border-[#0f5132] hover:bg-[#0f5132] hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  Whatsapp
                </button>
              </div>
            </div>
          </div>

          {/* Address Grand Downtown */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              alt="Interior of a modern apartment at Address Grand Downtown"
              className="w-full h-48 object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMIoJGcFPdxX9x9hxHOfaVUNZBQmQwXKhR26VyK-yehcDo9rH01i_op2TSdhD5I_MGMxlH-1YJmdVKiV4Fu-7omb_Yg3Ah42mG55qndwt_msEUZqEP5VT3IIBkAmOPYuQOOvGiwOdj_0r9tHne2J_LQIYZmWkr_1jig2NKoC09SC4-SSO1QrkdorgALSTBN0tJWY3KDskJdsT7VmZ-IW1rgi_1LAG1ALNBkzOqh6uS34axjzrGtHKnGUrbctKL9EE5Y4P-T9tzkQ"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                Address Grand Downtown
              </h2>
              <div className="flex items-center text-gray-500 mb-2">
                <svg
                  className="w-4 h-4 mr-1 text-[#0f5132]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">Downtown</span>
              </div>
              <div className="text-sm space-y-2 text-gray-600">
                <p>
                  <strong className="text-gray-900">Delivery Date:</strong> Dec,
                  2028
                </p>
                <p>
                  <strong className="text-gray-900">Price from:</strong> AED
                  10,860,000
                </p>
                <p>
                  <strong className="text-gray-900">Developer:</strong> NSHAMA x
                  EMAAR
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  className="flex-1 bg-transparent text-[#0f5132] border border-[#0f5132] hover:bg-[#0f5132] hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call
                </button>
                <button
                  className="flex-1 bg-transparent text-[#0f5132] border border-[#0f5132] hover:bg-[#0f5132] hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  Whatsapp
                </button>
              </div>
            </div>
          </div>

          {/* The Acres */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              alt="View of The Acres residential community with a lagoon"
              className="w-full h-48 object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYPUhAYle5R94PDNY4hfCQQnLWneZWZD_RdgfKSws6f7F-rSS2nizyozKjPpxy5B48pHroinwEXE-a3lg9Kknx7hsucah-1UTH58UUOl-ucWxfFFOGKSseOB2CmXVylLhhWiEZwDEXhCRNhaupq9OQ547ouSn2RoetR8_iTb8rdQ1q80k8CsGz4cOa3Hjp0_m4dQRO51rwr8sC12g0eTU8LyqR0XVVLIHAb4LevKiJZEFSOVxcLhWY46x0-YzPG9LTCa1SubEbxQ"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                The Acres
              </h2>
              <div className="flex items-center text-gray-500 mb-2">
                <svg
                  className="w-4 h-4 mr-1 text-[#0f5132]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">Dubailand</span>
              </div>
              <div className="text-sm space-y-2 text-gray-600">
                <p>
                  <strong className="text-gray-900">Delivery Date:</strong> Dec,
                  2028
                </p>
                <p>
                  <strong className="text-gray-900">Price from:</strong> AED
                  5,090,000
                </p>
                <p>
                  <strong className="text-gray-900">Developer:</strong> MERAAS
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  className="flex-1 bg-transparent text-[#0f5132] border border-[#0f5132] hover:bg-[#0f5132] hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call
                </button>
                <button
                  className="flex-1 bg-transparent text-[#0f5132] border border-[#0f5132] hover:bg-[#0f5132] hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  Whatsapp
                </button>
              </div>
            </div>
          </div>

          {/* Talea by Beyond */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              alt="Talea by Beyond apartment building with a pool"
              className="w-full h-48 object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy97rn-8oAxXd7CnTngpzmanJcj5brCU-AsBL0O-Cp8XFpIAHmtFd5y7cMkfaWWnlglYVCnvOctD_6Rg4Y0r8iKc2sVHB91ewlkQAo65ZS1ngj_4TQ42gswRmBGeCAz9n-9zg_rl6gxIBmQts2EJIJHileepGJ64_tiPfx0TlUtT205bjnb1sH0GBRnwQxfq2wU1pb_ZsVOyRSlIvyk5QgVMfyq-OOCpIaWoykFDEtSSZ4y8Ga8jpHGRRsUPtIoMJL5XcQ5F9q1g"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                Talea by Beyond
              </h2>
              <div className="flex items-center text-gray-500 mb-2">
                <svg
                  className="w-4 h-4 mr-1 text-[#0f5132]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">Dubai Maritime City</span>
              </div>
              <div className="text-sm space-y-2 text-gray-600">
                <p>
                  <strong className="text-gray-900">Delivery Date:</strong> Mar,
                  2029
                </p>
                <p>
                  <strong className="text-gray-900">Price from:</strong> AED
                  2,200,000
                </p>
                <p>
                  <strong className="text-gray-900">Developer:</strong> Omniyat
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  className="flex-1 bg-transparent text-[#0f5132] border border-[#0f5132] hover:bg-[#0f5132] hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call
                </button>
                <button
                  className="flex-1 bg-transparent text-[#0f5132] border border-[#0f5132] hover:bg-[#0f5132] hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  Whatsapp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
