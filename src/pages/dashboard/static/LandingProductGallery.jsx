import React, { useState } from "react";

export default function LandingProductGallery({ title }) {
  // Gallery images array
  const galleryImages = [
    {
      id: 1,
      src: "https://ilishbari.store/assets/illish-DlHvObFQ.png",
      alt: "খাঁটি মধু চামচে পড়া দৃশ্য",
    },
    {
      id: 2,
      src: "https://ilishbari.store/assets/illish-DlHvObFQ.png",
      alt: "সুন্দরবনের মৌয়াল মধু সংগ্রহ করছে",
    },
    {
      id: 3,
      src: "https://i.ibb.co.com/s9LcZfkM/hilsha-removebg-preview.png",
      alt: "মৌমাছি ও মধুর চাক",
    },
    {
      id: 4,
      src: "https://i.ibb.co.com/Q3kTw2sy/hilsha.jpg",
      alt: "আমাদের মধু জার ও চাক",
    },
  ];

  // Active Main Image State
  const [selectedImage, setSelectedImage] = useState(galleryImages[0].src);

  return (
    <section className="w-full bg-[#e8f3ec] py-5 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto text-center">
        
        {/* Section Heading */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
            আমাদের <span className="text-[#064e3b]">গ্যালারি</span>
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-gray-600 font-medium">
            সুন্দরবন থেকে আপনার টেবিল পর্যন্ত
          </p>
        </div>

        {/* Gallery Card Container */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-gray-100">
          
          {/* Main Featured Image */}
          <div className="relative overflow-hidden rounded-2xl  aspect-[4/3] mb-3.5">
            <img
              src={selectedImage}
              alt="আমাদের গ্যালারি প্রডাক্ট"
              className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
            />
          </div>

          {/* Thumbnail Grid: Mobile-e grid-cols-2, Desktop-e grid-cols-4 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {galleryImages.map((img) => {
              const isActive = selectedImage === img.src;
              return (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setSelectedImage(img.src)}
                  className={`relative overflow-hidden rounded-xl bg-gray-50 aspect-square transition-all duration-200 outline-none focus:outline-none ${
                    isActive
                      ? "ring-2 ring-[#064e3b] border-2 border-emerald-600 scale-[0.98]"
                      : "border border-gray-200 hover:opacity-90"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle Dark Overlay for Non-Active Images */}
                  {!isActive && (
                    <div className="absolute inset-0  transition-opacity hover:bg-transparent" />
                  )}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}