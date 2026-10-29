import React from "react";

export default function LandingCustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: "রহিমা বেগম",
      location: "ঢাকা",
      letter: "র",
      review: "“মধুটার স্বাদ একদম আসল! প্রতিদিন সকালে খাই, খুব ভালো লাগে😍”",
      stars: 5,
    },
    {
      id: 2,
      name: "মোঃ কামাল",
      location: "সিলেট",
      letter: "ক",
      review: "“অনেক জায়গা থেকে মধু কিনেছি কিন্তু এত ভালো মধু আগে পাইনি। ধন্যবাদ!”",
      stars: 5,
    },
    {
      id: 3,
      name: "ফাতিমা আক্তার",
      location: "রাজশাহী",
      letter: "ফ",
      review: "“পরিবারের সবাই খাচ্ছি। বাচ্চারাও পছন্দ করে। প্যাকেজিংও খুব সুন্দর 📦”",
      stars: 5,
    },
    {
      id: 4,
      name: "তানভীর হাসান",
      location: "চট্টগ্রাম",
      letter: "ত",
      review: "“দ্রুত ডেলিভারি পেয়েছি। মধুর কোয়ালিটি অসাধারণ, আবার অর্ডার দেব ইনশাআল্লাহ!”",
      stars: 5,
    },
    {
      id: 5,
      name: "সুমাইয়া ইসলাম",
      location: "খুলনা",
      letter: "স",
      review: "“সুন্দরবনের আসল মধু পেয়ে খুশি হয়েছি। গন্ধ ও স্বাদ দুটোই দারুণ! 🍯”",
      stars: 5,
    },
    {
      id: 6,
      name: "সাকিব হোসেন",
      location: "বরিশাল",
      letter: "স",
      review: "“জিমে যাই, প্রতিদিন সকালে মধু খাই। এনার্জি অনেক বেড়েছে। সুপার কোয়ালিটি! 💪”",
      stars: 5,
    },
  ];

  return (
    <section className="w-full bg-[#f4f7f5] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="text-[#0e7a4d]">কাস্টমার</span>{" "}
            <span className="text-gray-900">রিভিউ</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-500 font-medium">
            আমাদের সন্তুষ্ট গ্রাহকদের মতামত
          </p>
        </div>

        {/* Reviews Grid: Mobile-e 1 column, Tablet-e 2, Desktop-e 3 per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-[#f59e0b] text-lg mb-4">
                  {"★".repeat(item.stars)}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed italic font-medium mb-6">
                  {item.review}
                </p>
              </div>

              {/* User Avatar & Info */}
              <div className="flex items-center gap-3 mt-auto pt-2">
                {/* Green Circle Avatar with Initial */}
                <div className="w-10 h-10 rounded-full bg-[#107044] text-white flex items-center justify-center font-bold text-base shrink-0">
                  {item.letter}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}