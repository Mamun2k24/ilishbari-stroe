import React from "react";

const problems = [
  "পছন্দের আচারেও অনেক সময় স্বাদ ও ঝালের ভারসাম্য পাওয়া যায় না",
  "ব্যস্ত দিনে ঘরে বসে মজাদার আচার তৈরি করা কঠিন",
  "ভাত, খিচুড়ি কিংবা পোলাওয়ের সঙ্গে পছন্দমতো আচার খুঁজে পাওয়া যায় না",
];

const solutions = [
  "ইলিশ বাড়ির গরুর মাংসের আচার, চেপা শুঁটকি ভর্তা ও ইলিশের আচার",
  "বাছাই করা মসলা দিয়ে তৈরি ঝাল-টক-মজাদার স্বাদের আয়োজন",
  "ভাত, খিচুড়ি ও পোলাওয়ের সঙ্গে পরিবেশনের উপযোগী নানা স্বাদ",
];

const CalendarX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] text-red-500 shrink-0" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M8 3v4M16 3v4M3 10h18" />
    <path d="M10 13.5l4 4M14 13.5l-4 4" />
  </svg>
);

const CheckBox = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#34c77b" />
    <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const features = [
  {
    id: 1,
    title: "বাছাই করা মসলা",
    desc: "ইলিশ, গরুর মাংস ও চেপা শুঁটকির সঙ্গে মসলার সুস্বাদু সমন্বয়",
    icon: <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  },
  {
    id: 2,
    title: "তিন রকমের স্বাদ",
    desc: "গরুর মাংসের আচার, চেপা শুঁটকি ভর্তা ও ইলিশের আচার—পছন্দমতো বেছে নিন",
    icon: <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  },
  {
    id: 3,
    title: "হোম ডেলিভারি",
    desc: "আপনার ঠিকানায় অর্ডার পৌঁছে দেওয়ার সুবিধা",
    icon: <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  },
  {
    id: 4,
    title: "ক্যাশ অন ডেলিভারি",
    desc: "অর্ডারের জন্য ক্যাশ অন ডেলিভারি পেমেন্ট সুবিধা",
    icon: <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  },
  {
    id: 5,
    title: "সহজ অর্ডার প্রক্রিয়া",
    desc: "পছন্দের আচার নির্বাচন করে অনলাইনেই অর্ডার করুন",
    icon: <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>,
  },
  {
    id: 6,
    title: "ভাতের সঙ্গে দারুণ",
    desc: "ভাত, খিচুড়ি কিংবা পোলাওয়ের সঙ্গে আচারের মজাদার স্বাদ উপভোগ করুন",
    icon: <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  },
];

export default function ProblemSolutionFeatures() {
  return (
    <section className="w-full bg-gradient-to-b from-[#e1f0e4] via-[#e1f0e4] to-[#e8f3ec] py-10 sm:py-16 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16">
        <div className="max-w-[1120px] mx-auto">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-black leading-tight">সমস্যা ও সমাধান</h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-base text-gray-500">আপনার খাবারের সঙ্গে পছন্দের আচার পাচ্ছেন তো?</p>
          </div>
          <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 md:grid-cols-2 max-w-[1120px]">
            <div className="bg-white rounded-2xl border-2 border-red-100 p-5 sm:p-8 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-red-500"><span className="text-lg sm:text-xl">😟</span> সমস্যা</h3>
              <ul className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                {problems.map((t) => <li key={t} className="flex items-center gap-2.5 sm:gap-3 text-gray-700 text-sm sm:text-lg"><CalendarX />{t}</li>)}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border-2 border-emerald-200 p-5 sm:p-8 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-emerald-700"><span className="text-lg sm:text-xl">😊</span> আমাদের সমাধান</h3>
              <ul className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                {solutions.map((t) => <li key={t} className="flex items-center gap-2.5 sm:gap-3 text-gray-700 text-sm sm:text-lg"><CheckBox />{t}</li>)}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-black leading-tight">কেন ইলিশ বাড়ির <span className="text-[#064e3b]">আচার</span> বেছে নেবেন?</h2>
            <p className="text-xs sm:text-base text-gray-500 mt-1 sm:mt-2">তিন রকমের আচারে ভিন্ন ভিন্ন মজাদার স্বাদ</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-6">
            {features.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-3.5 sm:p-6 text-left shadow-sm border border-gray-100/80 transition hover:shadow-md flex flex-col items-start">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#064e3b] flex items-center justify-center mb-2.5 sm:mb-4 shrink-0">{item.icon}</div>
                <h3 className="text-xs sm:text-base font-bold text-gray-900 mb-1 sm:mb-2 leading-snug">{item.title}</h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
