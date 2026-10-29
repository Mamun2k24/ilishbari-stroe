
import React from "react";

export const heroData = {
  badge: "সুন্দরবনের সেরা মধু",
  headlineMain: "খাঁটি সুন্দরবনের মধু",
  headlineHighlight: "— প্রকৃতির আসল উপহার 🍯",
  subHeadline:
    "১০০% প্রাকৃতিক ও ভেজালমুক্ত মধু, যা আপনার শরীরের শক্তি বাড়াবে এবং প্রতিদিনের জীবনে এনে দেবে সুস্থতা।",
  description:
    "সুন্দরবনের গহীন বন থেকে মৌয়ালদের হাতে সংগৃহীত, কোনো প্রক্রিয়াজাতকরণ ছাড়াই সরাসরি আপনার ঘরে পৌঁছে দিচ্ছি।",
  image:
    "https://rkweblab.com/wp-content/uploads/2026/09/honey-hero-v2-BNd05Zkx.png",
  bgImage:
    "https://rkweblab.com/wp-content/uploads/2026/09/imageye___-_imgi_1_hero-bg-CrliERXl.jpg",
  primaryBtnText: "এখনই অর্ডার করুন 🍯",
  secondaryBtnText: "যোগাযোগ করুন",
};

export const heroStats = [
  { value: "১৫০০+", label: "সন্তুষ্ট গ্রাহক" },
  { value: "১০০%", label: "খাঁটি ও প্রাকৃতিক" },
  { value: "৫০+", label: "জেলায় ডেলিভারি" },
];

const StatCard = ({ value, label }) => (
  <div className="flex min-h-[68px] flex-col items-center justify-center rounded-[9px] border border-white/20 bg-[#081e13]/90 px-2 py-2 text-center shadow-lg backdrop-blur-sm sm:min-h-[72px]">
    <span className="text-[18px] font-black leading-tight text-[#f59e0b] sm:text-[21px]">
      {value}
    </span>
    <span className="mt-2 text-[10px] font-medium text-gray-300 sm:text-[11px]">
      {label}
    </span>
  </div>
);

export default function StaticHero({
  onOrder,
  onContact,
}) {
  return (
    <section
      className="relative isolate flex min-h-[620px] w-full items-center overflow-hidden bg-[#04160d] font-sans text-white lg:min-h-[640px]"
    >
      <style>{`
        @keyframes honeyFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .honey-float {
          animation: honeyFloat 3.5s ease-in-out infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .honey-float {
            animation: none;
          }
        }
      `}</style>

      {/* ORIGINAL FOREST BACKGROUND */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${heroData.bgImage}")`,
        }}
      />

      {/* DARK GREEN OVERLAY */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#04160d]/65 via-[#04160d]/70 to-[#04160d]/85 lg:bg-gradient-to-r lg:from-[#04160d]/80 lg:via-[#04160d]/60 lg:to-[#04160d]/45" />

      {/* MAIN CONTAINER */}
      <div className="relative mx-auto w-full max-w-[1100px] px-4 py-7 sm:px-6 lg:px-4 lg:py-12">

        <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-8">

          {/* RIGHT IMAGE SECTION */}
          <div className="order-1 flex w-full flex-col items-center lg:order-2 lg:col-span-6">

            {/* FLOATING HONEY IMAGE */}
            <div className="flex h-[165px] w-full items-center justify-center sm:h-[250px] lg:h-[380px]">
              <img
                src={heroData.image}
                alt="খাঁটি সুন্দরবনের মধু"
                loading="eager"
                fetchPriority="high"
                className="honey-float h-full w-full max-w-[250px] object-contain drop-shadow-[0_18px_25px_rgba(0,0,0,0.3)] sm:max-w-[360px] lg:max-w-[480px]"
              />
            </div>

            {/* MOBILE STATS 2+1 */}
            <div className="mt-3 w-full max-w-[310px] lg:hidden">
              <div className="grid grid-cols-2 gap-2">
                <StatCard {...heroStats[0]} />
                <StatCard {...heroStats[1]} />
              </div>

              <div className="mt-1.5 flex justify-center">
                <div className="w-[49%]">
                  <StatCard {...heroStats[2]} />
                </div>
              </div>
            </div>

            {/* DESKTOP STATS 3 COLUMNS */}
            <div className="mt-5 hidden w-full grid-cols-3 gap-4 lg:grid">
              {heroStats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          </div>

          {/* LEFT CONTENT SECTION */}
          <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:col-span-6 lg:items-start lg:text-left">

            {/* BADGE */}
            <span className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#f59e0b] px-5 py-1.5 text-[12px] font-extrabold text-white shadow-sm lg:px-7 lg:py-2">
              🐝 {heroData.badge}
            </span>

            {/* HEADING */}
            <h1 className="mt-3 text-[25px] font-black leading-[1.32] tracking-tight sm:text-[36px] lg:mt-5 lg:text-[49px] lg:leading-[1.25]">
              <span className="block text-white">
                {heroData.headlineMain}
              </span>
              <span className="mt-1 block text-[#f59e0b]">
                {heroData.headlineHighlight}
              </span>
            </h1>

            {/* SUBHEADLINE */}
            <p className="mt-3 max-w-[420px] text-[12px] font-semibold leading-[1.85] text-white/95 sm:text-[14px] lg:mt-6 lg:text-[16px]">
              {heroData.subHeadline}
            </p>

            {/* DESCRIPTION */}
            <p className="mt-2.5 max-w-[420px] text-[11px] leading-[1.8] text-gray-300 sm:text-[12px] lg:mt-5 lg:text-[14px]">
              {heroData.description}
            </p>

            {/* BUTTONS */}
            <div className="mt-5 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row lg:mt-6 lg:gap-4">

              <button
                type="button"
                onClick={onOrder}
                className="flex min-h-[47px] w-full items-center justify-center rounded-lg bg-[#299e5f] px-7 py-3 text-[13px] font-extrabold text-white shadow-md transition-all duration-200 hover:bg-[#208b50] active:scale-95 sm:w-auto lg:min-h-[55px] lg:px-8 lg:text-[15px]"
              >
                {heroData.primaryBtnText}
              </button>

              <button
                type="button"
                onClick={onContact}
                className="flex min-h-[47px] w-full items-center justify-center rounded-lg border border-white/45 bg-white/10 px-7 py-3 text-[13px] font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 active:scale-95 sm:w-auto lg:min-h-[55px] lg:px-8 lg:text-[15px]"
              >
                {heroData.secondaryBtnText}
              </button>

            </div>

            {/* TRUST BADGES */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-semibold text-gray-100 lg:mt-5 lg:justify-start lg:text-[11px]">

              <div className="flex items-center gap-1">
                <span className="text-[13px] text-[#f59e0b]">
                  ★★★★★
                </span>
                <span>১৫০০+ হ্যাপি কাস্টমার</span>
              </div>

              <div className="flex items-center gap-1">
                🚚 <span>সারা দেশে ডেলিভারি</span>
              </div>

              <div className="flex items-center gap-1">
                💵 <span>ক্যাশ অন ডেলিভারি</span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
