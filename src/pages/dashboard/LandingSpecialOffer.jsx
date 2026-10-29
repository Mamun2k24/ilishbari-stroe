import React from "react";
import {
  FiShoppingCart,
  FiTruck,
  FiDollarSign,
} from "react-icons/fi";

const DEFAULT_BENEFITS = [
  { icon: "cart", title: "ঢাকায় ডেলিভারি", description: "ঢাকার ভিতরে দ্রুত ডেলিভারি" },
  { icon: "cash", title: "ক্যাশ অন ডেলিভারি", description: "দেশের যেকোনো জায়গায় পৌঁছে যাবে" },
  { icon: "truck", title: "ঢাকার বাইরে", description: "হাতে পেয়ে টাকা দিন" },
];

const ICONS = {
  cart: FiShoppingCart,
  truck: FiTruck,
  cash: FiDollarSign,
};

const LandingSpecialOffer = ({ theme = {}, content = {}, onOrderClick }) => {
  const offer = content.specialOffer || {};
  const headingBefore = offer.headingBefore ?? "আজ";
  const headingHighlight = offer.headingHighlight ?? "অর্ডার করলে পাচ্ছেন";
  const headingAfter = offer.headingAfter ?? "বিশেষ ডিসকাউন্ট!";
  const buttonText = offer.buttonText || "এখনই অর্ডার করুন 🍯";
  
  const benefits = Array.isArray(offer.benefits) && offer.benefits.length > 0
    ? offer.benefits
    : DEFAULT_BENEFITS;

  const scrollToCheckout = () => {
    if (typeof onOrderClick === "function") {
      onOrderClick();
      return;
    }
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="w-full bg-[#e8f3ec] py-2 md:py-12 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Main White Card Container */}
        <div className="bg-[#f8fbf9] rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-sm border border-gray-100/80 text-center">
          
          {/* Section Heading */}
          <div className="mb-5 sm:mb-8 text-center">
            <h2 className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
              <span className="text-xl sm:text-3xl md:text-4xl">🎁</span>
              <span>{headingBefore}</span>
              <span className="text-[#10b981]">{headingHighlight}</span>
              <span>{headingAfter}</span>
            </h2>
          </div>

          {/* Action Button (Mobile First Top / Desktop Bottom) */}
          <div className="mb-5 block md:hidden">
            <button
              type="button"
              onClick={scrollToCheckout}
              className="w-full inline-flex items-center justify-center bg-[#219653] hover:bg-[#1a7a43] text-white px-6 py-3 rounded-xl font-extrabold text-base shadow-sm transition-all active:scale-95"
            >
              {buttonText}
            </button>
          </div>

          {/* Benefits Grid: Mobile-e 2 top + 1 full bottom, Desktop-e 3 in 1 row */}
          <div className="w-full">
            {/* Mobile Layout */}
            <div className="block md:hidden space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {benefits.slice(0, 2).map((item, index) => {
                  const Icon = ICONS[item.icon] || FiTruck;
                  return (
                    <div
                      key={index}
                      className="bg-[#e1ece4] rounded-2xl p-3.5 sm:p-5 flex flex-col items-center justify-center text-center"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#064e3b] text-white flex items-center justify-center mb-2.5 shrink-0 shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-600 leading-tight font-medium">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* 3rd Card Full Width on Mobile */}
              {benefits[2] && (
                <div className="w-full">
                  {(() => {
                    const item = benefits[2];
                    const Icon = ICONS[item.icon] || FiTruck;
                    return (
                      <div className="bg-[#e1ece4] rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                        <div className="w-10 h-10 rounded-full bg-[#064e3b] text-white flex items-center justify-center mb-2.5 shrink-0 shadow-sm">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-gray-600 leading-tight font-medium">
                          {item.description}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Desktop Layout (3-Columns) */}
            <div className="hidden md:grid md:grid-cols-3 gap-5">
              {benefits.map((item, index) => {
                const Icon = ICONS[item.icon] || FiTruck;
                return (
                  <div
                    key={index}
                    className="bg-[#e1ece4] rounded-2xl p-6 flex flex-col items-center justify-center text-center transition hover:shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#064e3b] text-white flex items-center justify-center mb-4 shrink-0 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Button (Desktop Only at Bottom) */}
          <div className="hidden md:flex justify-center mt-8">
            <button
              type="button"
              onClick={scrollToCheckout}
              className="inline-flex items-center justify-center bg-[#219653] hover:bg-[#1a7a43] text-white px-8 py-3.5 rounded-xl font-bold text-lg shadow-md transition-all active:scale-95"
            >
              {buttonText}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LandingSpecialOffer;