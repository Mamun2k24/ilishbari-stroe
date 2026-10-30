
import React from "react";

// SVG Icons — আগের মতোই থাকবে

const IconImmunity = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#103020]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const IconDigestion = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#103020]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 0a5 5 0 107.071 7.071 5 5 0 00-7.071-7.071z" />
  </svg>
);

const IconEnergy = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#103020]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const IconBrain = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#103020]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" />
  </svg>
);

const IconChildren = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#103020]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconSkin = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#103020]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export default function HoneyBenefits() {
  const benefits = [
    {
      id: 1,
      title: "বাছাই করা উপকরণ",
      desc: "নির্বাচিত উপকরণ ও মসলার সমন্বয়ে তৈরি আচার",
      icon: <IconImmunity />,
    },
    {
      id: 2,
      title: "খাবারের স্বাদ বাড়ায়",
      desc: "ভাত ও খিচুড়ির সঙ্গে খাবারে নতুন স্বাদ যোগ করে",
      icon: <IconDigestion />,
    },
    {
      id: 3,
      title: "ঝাল-মসলার দারুণ স্বাদ",
      desc: "প্রতিটি আচারে মসলার স্বাদ ও ঝালের মজাদার সমন্বয়",
      icon: <IconEnergy />,
    },
    {
      id: 4,
      title: "তিন রকমের আচার",
      desc: "ইলিশ, শুঁটকি ও গরুর মাংসের তিনটি ভিন্ন স্বাদ",
      icon: <IconBrain />,
    },
    {
      id: 5,
      title: "পরিবারের খাবারের সঙ্গী",
      desc: "দুপুর ও রাতের খাবারে বাড়তি স্বাদ যোগ করার জন্য",
      icon: <IconChildren />,
    },
    {
      id: 6,
      title: "মজাদার স্বাদ ও ঘ্রাণ",
      desc: "বাছাই করা মসলায় তৈরি সুস্বাদু আচারের আয়োজন",
      icon: <IconSkin />,
    },
  ];

  return (
    <section className="w-full bg-[#103020] py-10 sm:py-14 px-3 sm:px-6 lg:px-8 text-white font-sans mt-5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            আমাদের <span className="text-[#f59e0b]">আচারের বৈশিষ্ট্য</span>
          </h2>
          <p className="mt-1.5 text-xs sm:text-base text-gray-300 opacity-80">
            ইলিশ বাড়ির তিন রকমের আচারের মজাদার সব বৈশিষ্ট্য
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5">
          {benefits.map((item) => (
            <div
              key={item.id}
              className="bg-[#0b2418] border border-white/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 flex flex-col items-start transition hover:border-amber-500/40"
            >
              {/* White Circle Icon */}
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center mb-3 sm:mb-4 shrink-0 shadow-sm">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xs sm:text-lg font-bold text-white mb-1 sm:mb-2 leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[10px] sm:text-sm text-gray-300 leading-relaxed opacity-85">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
