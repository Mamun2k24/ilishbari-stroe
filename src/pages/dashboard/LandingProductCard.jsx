import React from "react";

const LandingProductCard = ({ page, product, price, heroImage, onOrder }) => {
  const name = product?.productName || page?.title || "খাঁটি পদ্মার ইলিশের আচার";
  const image = product?.productImage?.[0] || heroImage;
  const description =
    product?.details ||
    page?.hero?.subHeadline ||
    "খাঁটি পদ্মার ইলিশ দিয়ে তৈরি আমাদের সুস্বাদু আচার, যা ঘরে বসেই এনে দেবে আসল দেশি স্বাদ। ঝাল, মসলা ও ইলিশের অনন্য সমন্বয়ে প্রতিটি খাবার হবে আরও মজাদার ও তৃপ্তিদায়ক।";
  const oldPrice = Number(page?.offer?.oldPrice || 1000);
  const currentPrice = Number(price || 999);
  
  // Percent Calculation
  const discount =
    oldPrice > currentPrice && currentPrice > 0
      ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
      : 0;
      
  // Discount label logic
  const discountLabel = page?.offer?.discountText || (discount > 0 ? `${discount}% ছাড়` : "");

  return (
    <section aria-labelledby="landing-product-heading" className="w-full py-10 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Inline Keyframes CSS for Up and Down Floating Animation */}
      <style>{`
        @keyframes floatProduct {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-product-float {
          animation: floatProduct 3s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-8 text-center">
          <h2 id="landing-product-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            আমাদের <span className="text-[#0e7a4d]">পণ্য</span>
          </h2>
        </div>

        {/* Product Main Card Container */}
        <article className="bg-[#f8fbf9] rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Product Image with Up-Down Animation */}
            <div className="md:col-span-5 flex items-center justify-center p-2">
              {image ? (
                <img
                  src={image}
                  alt={name}
                  loading="lazy"
                  className="animate-product-float max-h-[280px] sm:max-h-[320px] w-auto object-contain drop-shadow-md"
                />
              ) : (
                <span className="text-slate-400 font-medium">পণ্যের ছবি নেই</span>
              )}
            </div>

            {/* Right: Product Content Info */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2.5">
                {discountLabel ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#f59e0b] px-3.5 py-1 text-xs font-extrabold text-white shadow-sm">
                    🏷️ {discountLabel}
                  </span>
                ) : null}

                {/* Limited Stock Badge */}
                <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                  🔥 স্টক সীমিত!
                </span>
              </div>

              {/* Product Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                {name}
              </h3>

              {/* Product Description */}
              {description && (
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal whitespace-pre-line">
                  {description}
                </p>
              )}

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-3xl sm:text-4xl font-black text-[#0e7a4d]">
                  ৳{currentPrice.toLocaleString("en-BD")}
                </span>
                {oldPrice > currentPrice && (
                  <del className="text-lg text-gray-400 font-medium">
                    ৳{oldPrice.toLocaleString("en-BD")}
                  </del>
                )}
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-bold text-emerald-900">
                <span className="rounded-md bg-[#e1ece4] px-3 py-1.5 border border-emerald-200/50">
                  ✓ ১০০% খাঁটি
                </span>
                <span className="rounded-md bg-[#e1ece4] px-3 py-1.5 border border-emerald-200/50">
                  🌸 সুগন্ধি
                </span>
                <span className="rounded-md bg-[#e1ece4] px-3 py-1.5 border border-emerald-200/50">
                  💪 পুষ্টিকর
                </span>
              </div>

              {/* Action Button */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={onOrder}
                  className="w-full sm:w-auto min-w-[180px] rounded-xl bg-[#0e7a4d] hover:bg-[#0b633e] px-8 py-3.5 text-base font-extrabold text-white shadow-md transition-all active:scale-95"
                >
                  অর্ডার করুন
                </button>
              </div>

            </div>

          </div>
        </article>

      </div>
    </section>
  );
};

export default LandingProductCard;