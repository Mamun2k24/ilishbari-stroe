import React from "react";

const LandingProductCard = ({ page, product, price, heroImage, onOrder }) => {
  const name = product?.productName || page?.title || "আমাদের পণ্য";
  const image = product?.productImage?.[0] || heroImage;
  const description = product?.details || page?.hero?.subHeadline || "";
  const oldPrice = Number(page?.offer?.oldPrice || 0);
  const currentPrice = Number(price || 0);
  const discount = oldPrice > currentPrice && currentPrice > 0
    ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
    : 0;
  const discountLabel = page?.offer?.discountText || (discount ? `${discount}% ছাড়` : "");
  return (
    <section aria-labelledby="landing-product-heading" className="mt-12 md:mt-16">
      <h2 id="landing-product-heading" className="mb-7 text-center text-3xl md:text-4xl font-black">
        {page?.content?.productTitle || "আমাদের পণ্য"}
      </h2>
      <article className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-emerald-100 bg-white/80 p-5 shadow-lg shadow-emerald-900/5 sm:p-8 md:p-10">
        <div className="grid grid-cols-1 items-center gap-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12">
          <div className="flex min-h-64 items-center justify-center rounded-2xl bg-white/70 p-5 sm:min-h-80">
            {image ? <img src={image} alt={name} loading="lazy" className="h-64 w-full object-contain sm:h-80" /> : <span className="text-slate-500">পণ্যের ছবি নেই</span>}
          </div>
          <div className="min-w-0 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              {discountLabel && <span className="rounded-full px-4 py-1.5 text-sm font-bold text-white" style={{background:"var(--lp-accent)"}}>🏷️ {discountLabel}</span>}
              <span className="text-sm font-bold text-rose-600">🔥 স্টক সীমিত!</span>
            </div>
            <div>
              <h3 className="text-2xl font-black leading-snug md:text-3xl">{name}</h3>
              {description && <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600 md:text-base">{description}</p>}
            </div>
            <div className="flex flex-wrap items-baseline gap-4">
              <strong className="text-3xl font-black md:text-4xl" style={{color:"var(--lp-button)"}}>৳{currentPrice.toLocaleString("en-BD")}</strong>
              {oldPrice > currentPrice && <del className="text-lg text-slate-500">৳{oldPrice.toLocaleString("en-BD")}</del>}
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold sm:text-sm">
              {["✅ মানসম্মত পণ্য", "🌸 যত্নসহকারে নির্বাচিত", "💪 নির্ভরযোগ্য সেবা"].map(label => <span key={label} className="rounded-full bg-emerald-50 px-3 py-2 text-emerald-900">{label}</span>)}
            </div>
            <button type="button" onClick={onOrder} className="rounded-xl px-9 py-4 text-base font-extrabold text-white shadow-md transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" style={{background:"var(--lp-button)"}}>অর্ডার করুন</button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default LandingProductCard;
