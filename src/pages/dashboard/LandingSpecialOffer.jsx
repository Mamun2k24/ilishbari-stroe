
import React from "react";
import {
  FiShoppingCart,
  FiTruck,
  FiDollarSign,
  FiGift,
  FiArrowRight,
} from "react-icons/fi";

const DEFAULT_BENEFITS = [
  {
    icon: "cart",
    title: "ঢাকায় ডেলিভারি",
    description: "ঢাকার ভিতরে দ্রুত ডেলিভারি",
  },
  {
    icon: "truck",
    title: "ঢাকার বাইরে",
    description: "হাতে পেয়ে টাকা দিন",
  },
  {
    icon: "cash",
    title: "ক্যাশ অন ডেলিভারি",
    description: "দেশের যেকোনো জায়গায় পৌঁছে যাবে",
  },
];

const ICONS = {
  cart: FiShoppingCart,
  truck: FiTruck,
  cash: FiDollarSign,
};

const LandingSpecialOffer = ({
  theme = {},
  content = {},
  onOrderClick,
}) => {
  // Theme settings
  const primary =
    theme.primary || "#064E2B";

  const buttonColor =
    theme.button || "#219653";

  const accentColor =
    theme.accent || "#2CA85D";

  const sectionBg =
    theme.sectionBg || "#E5F4E9";

  // Dynamic content
  const offer = content.specialOffer || {};

  const headingBefore =
    offer.headingBefore ?? "আজ";

  const headingHighlight =
    offer.headingHighlight ??
    "অর্ডার করলে পাচ্ছেন";

  const headingAfter =
    offer.headingAfter ??
    "বিশেষ ডিসকাউন্ট!";

  const buttonText =
    offer.buttonText ||
    "এখনই অর্ডার করুন";

  const benefits =
    Array.isArray(offer.benefits) &&
    offer.benefits.length > 0
      ? offer.benefits
      : DEFAULT_BENEFITS;

  const scrollToCheckout = () => {
    if (typeof onOrderClick === "function") {
      onOrderClick();
      return;
    }

    document
      .getElementById("checkout")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section
      className="relative w-full overflow-hidden py-12 md:py-20 px-4 sm:px-6"
      style={{
        backgroundColor: sectionBg,
      }}
    >
      <div className="relative max-w-5xl mx-auto">

        {/* MAIN OFFER CONTAINER */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[24px]
            md:rounded-[30px]
            border
            border-white/70
            bg-white/85
            shadow-[0_12px_45px_rgba(6,78,43,0.09)]
            px-5
            py-8
            sm:px-8
            md:px-12
            md:py-12
          "
        >

          {/* HEADING */}
          <div className="text-center mb-8 md:mb-10">

            <h2
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-2
                gap-y-1
                text-[24px]
                sm:text-[30px]
                md:text-[36px]
                lg:text-[40px]
                font-black
                leading-[1.5]
                tracking-tight
                text-gray-950
              "
            >
              <FiGift
                className="inline-block text-orange-500 mr-1"
                size={35}
              />

              <span>{headingBefore}</span>

              <span
                style={{
                  color: accentColor,
                }}
              >
                {headingHighlight}
              </span>

              <span>{headingAfter}</span>
            </h2>

          </div>

          {/* BENEFIT CARDS */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-4
              md:gap-5
            "
          >
            {benefits.map((item, index) => {
              const Icon =
                ICONS[item.icon] || FiTruck;

              return (
                <div
                  key={`${item.title}-${index}`}
                  className="
                    group
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    min-h-[190px]
                    md:min-h-[210px]
                    rounded-2xl
                    px-4
                    py-7
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                  "
                  style={{
                    backgroundColor:
                      "rgba(30, 150, 80, 0.10)",
                  }}
                >

                  {/* ICON CIRCLE */}
                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      w-[62px]
                      h-[62px]
                      md:w-[68px]
                      md:h-[68px]
                      rounded-full
                      text-white
                      mb-5
                      shadow-sm
                      group-hover:scale-105
                      transition-transform
                      duration-300
                    "
                    style={{
                      backgroundColor: primary,
                    }}
                  >
                    <Icon
                      size={28}
                      strokeWidth={2}
                    />
                  </div>

                  {/* TITLE */}
                  <h3
                    className="
                      text-[17px]
                      md:text-[19px]
                      font-extrabold
                      text-gray-950
                      leading-snug
                      mb-3
                    "
                  >
                    {item.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      text-[14px]
                      md:text-[15px]
                      leading-relaxed
                      text-gray-600
                    "
                  >
                    {item.description}
                  </p>

                </div>
              );
            })}
          </div>

          {/* ORDER BUTTON */}
          <div
            className="
              flex
              items-center
              justify-center
              mt-8
              md:mt-10
            "
          >
            <button
              type="button"
              onClick={scrollToCheckout}
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-3
                w-full
                sm:w-auto
                min-h-[60px]
                px-8
                md:px-12
                py-4
                rounded-xl
                text-white
                text-lg
                md:text-xl
                font-extrabold
                shadow-[0_8px_20px_rgba(20,130,60,0.18)]
                hover:-translate-y-1
                hover:shadow-xl
                active:scale-[0.98]
                transition-all
                duration-300
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
              "
              style={{
                background: `linear-gradient(110deg, ${primary}, ${buttonColor})`,
                outlineColor: primary,
              }}
            >
              <span>{buttonText}</span>

              <FiShoppingCart
                size={22}
                className="
                  transition-transform
                  group-hover:translate-x-1
                "
              />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LandingSpecialOffer;
