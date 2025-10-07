export default function PropertiesSection() {
  return (
    <div className="relative min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f5132] font-display">
            Browse our Off Plan properties
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Palace Villas Ostra */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src="/assets/images/landing page/real-estate-landing-1.avif" 
                alt="Palace Villas Ostra" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-[#0f5132] mb-2">Palace Villas Ostra</h3>
              <div className="flex items-center text-gray-500 mb-2">
                <svg className="w-4 h-4 mr-1 text-[#0f5132]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">The Oasis</span>
              </div>
              <p className="text-gray-700 text-sm mb-1"><span className="font-semibold text-[#0f5132]">Delivery Date:</span> Oct, 2029</p>
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-semibold text-[#0f5132]">Price from:</span> AED 13,130,000
              </p>
              <p className="text-gray-700 text-sm mb-5">
                <span className="font-semibold text-[#0f5132]">Developer:</span> EMAAR
              </p>
              <div className="flex gap-3">
                <button className="flex-1 bg-white text-[#0f5132] border border-[#0f5132]/30 hover:border-[#0f5132] px-4 py-2 rounded-full font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call
                </button>
                <button className="flex-1 bg-white text-[#0f5132] border border-[#0f5132]/30 hover:border-[#0f5132] px-4 py-2 rounded-full font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Whatsapp
                </button>
              </div>
            </div>
          </div>

          {/* Address Grand Downtown */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src="/assets/images/auri-keys.jpeg" 
                alt="Address Grand Downtown" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-[#0f5132] mb-2">Address Grand Downtown</h3>
              <div className="flex items-center text-gray-500 mb-2">
                <svg className="w-4 h-4 mr-1 text-[#0f5132]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Downtown</span>
              </div>
              <p className="text-gray-700 text-sm mb-1"><span className="font-semibold text-[#0f5132]">Delivery Date:</span> Dec, 2028</p>
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-semibold text-[#0f5132]">Price from:</span> AED 10,860,000
              </p>
              <p className="text-gray-700 text-sm mb-5">
                <span className="font-semibold text-[#0f5132]">Developer:</span> NSHAMA x EMAAR
              </p>
              <div className="flex gap-3">
                <button className="flex-1 bg-white text-[#0f5132] border border-[#0f5132]/30 hover:border-[#0f5132] px-4 py-2 rounded-full font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call
                </button>
                <button className="flex-1 bg-white text-[#0f5132] border border-[#0f5132]/30 hover:border-[#0f5132] px-4 py-2 rounded-full font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Whatsapp
                </button>
              </div>
            </div>
          </div>

          {/* The Acres */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src="/assets/images/landing page/real-estate-landing-2.avif" 
                alt="The Acres" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-[#0f5132] mb-2">The Acres</h3>
              <div className="flex items-center text-gray-500 mb-2">
                <svg className="w-4 h-4 mr-1 text-[#0f5132]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Dubailand</span>
              </div>
              <p className="text-gray-700 text-sm mb-1"><span className="font-semibold text-[#0f5132]">Delivery Date:</span> Dec, 2028</p>
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-semibold text-[#0f5132]">Price from:</span> AED 5,080,000
              </p>
              <p className="text-gray-700 text-sm mb-5">
                <span className="font-semibold text-[#0f5132]">Developer:</span> MERAAS
              </p>
              <div className="flex gap-3">
                <button className="flex-1 bg-white text-[#0f5132] border border-[#0f5132]/30 hover:border-[#0f5132] px-4 py-2 rounded-full font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call
                </button>
                <button className="flex-1 bg-white text-[#0f5132] border border-[#0f5132]/30 hover:border-[#0f5132] px-4 py-2 rounded-full font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Whatsapp
                </button>
              </div>
            </div>
          </div>

          {/* Talea by Beyond */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src="/assets/images/landing page/real-estate-landing-3.avif" 
                alt="Talea by Beyond" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-[#0f5132] mb-2">Talea by Beyond</h3>
              <div className="flex items-center text-gray-500 mb-2">
                <svg className="w-4 h-4 mr-1 text-[#0f5132]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Dubai Maritime City</span>
              </div>
              <p className="text-gray-700 text-sm mb-1"><span className="font-semibold text-[#0f5132]">Delivery Date:</span> Mar, 2029</p>
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-semibold text-[#0f5132]">Price from:</span> AED 2,200,000
              </p>
              <p className="text-gray-700 text-sm mb-5">
                <span className="font-semibold text-[#0f5132]">Developer:</span> Omniyat
              </p>
              <div className="flex gap-3">
                <button className="flex-1 bg-white text-[#0f5132] border border-[#0f5132]/30 hover:border-[#0f5132] px-4 py-2 rounded-full font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call
                </button>
                <button className="flex-1 bg-white text-[#0f5132] border border-[#0f5132]/30 hover:border-[#0f5132] px-4 py-2 rounded-full font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
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
