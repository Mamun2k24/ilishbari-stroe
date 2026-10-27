import React, { useState } from "react";
import LandingProductGallery from "./LandingProductGallery";
import LandingProductCard from "./LandingProductCard";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import LandingSpecialOffer from "./LandingSpecialOffer";

import {
  FiShoppingCart,
  FiCheckCircle,
  FiMinus,
  FiPlus,
  FiTruck,
  FiShield,
  FiCreditCard,
  FiPhoneCall,
  FiZap,
} from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const LandingPageView = () => {
  
  const { slug } = useParams();
  const location = useLocation();
  const isHomepageRoute = location.pathname === "/";

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [shippingOption, setShippingOption] = useState("inside");
  const [submittingOrder, setSubmittingOrder] = useState(false);

  const [orderForm, setOrderForm] = useState({
    name: "",
    mobile: "",
    address: "",
    senderNumber: "",
    transactionId: "",
  });

  const {
    data: page,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["landing-page", isHomepageRoute ? "homepage" : slug],
    enabled: isHomepageRoute || Boolean(slug),
    retry: false,
    queryFn: async () => {
      const res = await axiosSecure.get(
        isHomepageRoute
          ? "/api/landing-pages/public/homepage"
          : `/api/landing-pages/public/${encodeURIComponent(slug)}`
      );
      return res.data.data || res.data;
    },
  });

  const { data: shippingSettings, isLoading: shippingLoading, isError: shippingError } = useQuery({
    queryKey: ["public-shipping-settings"],
    queryFn: async () => {
      // If the router is mounted elsewhere, adjust this URL to its actual mount path.
      const res = await axiosSecure.get("/api/shipping-settings");
      return res.data?.data || res.data;
    },
    staleTime: 60 * 1000,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600 font-medium text-sm">পেজ লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (isError || !page) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border text-center max-w-md w-full">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            !
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">ল্যান্ডিং পেজ পাওয়া যায়নি!</h2>
          <p className="text-sm text-slate-500">লিংকটি সঠিক নয় অথবা অফারটি বর্তমানে স্থগিত রয়েছে।</p>
        </div>
      </div>
    );
  }

  const product = page.product;

// Dashboard Product Price will be the main price
const price = Number(product?.price ?? 0);
  const insideDhaka = Number(shippingSettings?.insideDhakaRate ?? 60);
  const outsideDhaka = Number(shippingSettings?.outsideDhakaRate ?? 120);
  const productSubtotal = price * quantity;
  const campaign = shippingSettings?.campaign || {};
  const now = Date.now();
  const campaignActive = Boolean(campaign.active) &&
    (!campaign.startAt || now >= new Date(campaign.startAt).getTime()) &&
    (!campaign.endAt || now <= new Date(campaign.endAt).getTime());
  const freeThreshold = Number(campaignActive ? campaign.freeThreshold : shippingSettings?.freeThreshold) || 0;
  const baseDeliveryCharge = shippingOption === "inside" ? insideDhaka : outsideDhaka;
  const deliveryCharge = freeThreshold > 0 && productSubtotal >= freeThreshold ? 0 : baseDeliveryCharge;
  const total = productSubtotal + deliveryCharge;

   const theme = { primary: "#153f2d", accent: "#f59e0b", background: "#e4f3e9", button: "#169447", text: "#142c21", ...(page.theme || {}) };
   const content = page.content || {};
   const showSection = (key) => content.sectionVisibility?.[key] !== false;

   
   const scrollCheckout = () => { if (showSection("checkout")) document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" }); };
   const heroImage = page.hero?.image || product?.productImage?.[0];
   const reviews = page.testimonials || [];
   return (
    <main style={{ "--lp-primary": theme.primary, "--lp-accent": theme.accent, "--lp-bg": theme.background, "--lp-button": theme.button, "--lp-text": theme.text, background: "var(--lp-bg)", color: "var(--lp-text)" }} className="min-h-screen font-sans">
      {showSection("hero") && <section className="relative overflow-hidden text-white" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,35,23,.93) 0%, rgba(5,35,23,.72) 38%, rgba(5,35,23,.26) 72%, rgba(5,35,23,.10) 100%), url("${page.hero?.backgroundImage || "https://i.ibb.co.com/KpzYJ1VQ/cover.jpg"}")`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundColor: "var(--lp-primary)" }}>
        <div className="max-w-6xl mx-auto px-5 py-14 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold" style={{ background: "var(--lp-accent)", color: "#18251a" }}>{page.hero?.badge || "প্রিমিয়াম কোয়ালিটি"}</span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.25] tracking-normal">
  {page.hero?.headline || page.title}
</h1>
            <p className="text-lg font-bold" style={{ color: "var(--lp-accent)" }}>{page.hero?.subHeadline}</p>
            <div className="flex flex-wrap gap-3">{showSection("checkout") && <button onClick={scrollCheckout} className="rounded-xl px-7 py-3 font-bold text-white" style={{ background: "var(--lp-button)" }}>{page.hero?.buttonText || "অর্ডার করুন"}</button>}{(showSection("product") || showSection("checkout")) && <button onClick={() => document.getElementById(showSection("product") ? "product-section" : "checkout")?.scrollIntoView({behavior:"smooth"})} className="rounded-xl border border-white/50 px-7 py-3 font-bold">বিস্তারিত দেখুন</button>}</div>
          </div>
          <img src={heroImage} alt={page.title} className="w-full max-h-[450px] object-contain rounded-3xl" />
        </div>
      </section>}
      {showSection("problem") && <section className="max-w-5xl mx-auto px-5 py-14"><h2 className="text-center text-3xl font-black mb-8">{content.problemTitle || "সমস্যা ও সমাধান"}</h2>
        <div className="grid md:grid-cols-2 gap-5">{[["সমস্যা",content.problems || [],"#fff7f1"],["আমাদের সমাধান",content.solutions || [],"#f4fff6"]].map(([title, list, bg]) => <div key={title} className="rounded-xl bg-white p-6 shadow-sm border-t-4" style={{borderColor:title==="সমস্যা"?"var(--lp-accent)":"var(--lp-button)"}}><h3 className="font-bold mb-4">{title}</h3>{list.map((line,i)=><p key={i} className="mb-2 text-sm">✓ {line}</p>)}</div>)}</div>
      </section>}
      {showSection("features") && <section className="max-w-6xl mx-auto px-5 pb-14 mt-2 md:mt-8"><h2 className="text-center text-3xl font-black mb-8">{content.whyTitle || "কেন আমাদের পণ্য সেরা?"}</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{(page.features || []).map((item,i)=><div key={i} className="rounded-xl bg-white p-6 shadow-sm"><div className="w-11 h-11 rounded-full text-white flex items-center justify-center mb-3" style={{background:"var(--lp-primary)"}}>✓</div><h3 className="font-bold">{item.title}</h3><p className="text-sm opacity-70 mt-2">{item.description}</p></div>)}</div></section>}
      {showSection("product") && <section className="py-14 bg-white/50" id="product-section">
        <div className="max-w-5xl mx-auto px-5">
          <LandingProductGallery page={page} product={product} heroImage={heroImage} title={content.galleryTitle || "আমাদের গ্যালারি"} />
          {showSection("checkout") && <LandingProductCard page={page} product={product} price={price} heroImage={heroImage} onOrder={scrollCheckout} />}
        </div>
      </section>}
      {showSection("benefits") && <section className="py-14 text-white" style={{background:"var(--lp-primary)"}}><div className="max-w-6xl mx-auto px-5"><h2 className="text-center text-3xl font-black mb-8">{content.benefitsTitle || "মধুর উপকারিতা"}</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{(page.benefits || []).map((item,i)=><div key={i} className="rounded-xl border border-white/15 bg-[#081d15]/80 p-7 shadow-sm"><div className="mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white text-3xl text-emerald-900 shadow-sm">{item.icon && /^(https?:\/\/|data:image\/)/i.test(item.icon.trim()) ? <img src={item.icon.trim()} alt="" loading="lazy" className="h-10 w-10 object-contain" /> : <span aria-hidden="true">{item.icon || "✦"}</span>}</div><h3 className="font-bold">{item.title}</h3><p className="text-sm opacity-80 mt-2">{item.description}</p></div>)}</div></div></section>}
      {showSection("reviews") && page.reviewSection?.enabled !== false && reviews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-5 py-14">
          <h2 className="text-center text-3xl font-black mb-9">
            {page.reviewSection?.title || "আমাদের সন্তুষ্ট গ্রাহকরা"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            {reviews.map((review, index) => {
              const rating = Math.max(1, Math.min(5, Number(review.rating) || 5));
              return (
                <article key={review._id || index} className="bg-white border border-slate-200 rounded-md shadow-sm p-4 text-slate-700 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    {review.image ? (
                      <img src={review.image} alt={review.name || "Customer"} className="w-10 h-10 rounded-full object-cover shrink-0" loading="lazy" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold shrink-0" aria-hidden="true">
                        {(review.name || "C").trim().charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-bold text-blue-600 text-sm leading-5 break-words">{review.name || "Customer"}</h3>
                      {review.dateLabel && <p className="text-[11px] text-slate-400 mt-0.5">{review.dateLabel}</p>}
                    </div>
                  </div>
                  <p className="text-[13px] leading-5 whitespace-pre-line mb-3">{review.comment}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-amber-500 text-base tracking-tight" aria-label={`${rating} out of 5 stars`}>{"★".repeat(rating)}<span className="text-slate-300">{"★".repeat(5 - rating)}</span></span>
                    <span className="text-xs">{rating}/5</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex gap-5 text-[11px] font-semibold text-slate-500">
                    <span>Like</span><span>Reply</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
      {showSection("video") && page.video?.enabled && page.video?.url && <section className="max-w-4xl mx-auto px-5 py-14"><h2 className="text-center text-3xl font-black mb-7">{content.videoTitle || "দেখুন বিস্তারিত"}</h2><div className="aspect-video rounded-2xl overflow-hidden bg-black"><iframe title="Product video" className="w-full h-full" src={page.video.url.replace("watch?v=", "embed/").split("&")[0]} allowFullScreen /></div></section>}
      {/* SPECIAL OFFER SECTION */}
      {showSection("offer") && <LandingSpecialOffer
        theme={theme}
        content={content}
        onOrderClick={scrollCheckout}
      />}
      <div className="max-w-6xl mx-auto px-3.5 sm:px-5 py-6 md:py-10">
        {/* 6. CHECKOUT SECTION */}
        {showSection("checkout") && <section
          id="checkout"
          className="bg-white border-2 border-rose-500/90 rounded-3xl p-5 md:p-10 shadow-xl scroll-mt-20 space-y-8"
        >
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-2xl md:text-3xl font-black text-rose-600">
              অর্ডার সম্পন্ন করুন
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              সঠিক নাম, ঠিকানা ও মোবাইল নম্বর দিয়ে নিচের ফর্মটি পূরণ করুন
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Customer Form */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (submittingOrder) return;
                if (shippingLoading || shippingError) {
                  alert("ডেলিভারি চার্জ লোড হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
                  return;
                }
                if (!product?._id) {
                  alert("পণ্য পাওয়া যায়নি।");
                  return;
                }
                setSubmittingOrder(true);
                try {
                  const guestId = window.crypto?.randomUUID?.() ||
                    `guest-${Date.now()}-${Math.random().toString(36).slice(2)}`;
                  const orderPayload = {
                    guestId,
                    cartItems: [{ productId: product._id, quantity: Number(quantity) }],
                    shippingOption,
                    district: shippingOption === "inside" ? "Dhaka" : "",
                    paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" :
                      paymentMethod === "bkash" ? "bKash" : "Nagad",
                    manualPayment: paymentMethod === "cod" ? null : {
                      senderNumber: orderForm.senderNumber,
                      transactionId: orderForm.transactionId,
                    },
                    customer: { name: orderForm.name.trim(), mobile: orderForm.mobile.trim() },
                    address: orderForm.address.trim(),
                  };
                  const response = await axiosSecure.post("/api/order", orderPayload);
                  if (!response.data?.order) throw new Error("অর্ডারের তথ্য পাওয়া যায়নি।");
                  // Keep guest access credentials for guest order lookup if needed later.
                  if (response.data.guestAccessToken) {
                    sessionStorage.setItem(`landing-guest-order-${response.data.order._id}`, JSON.stringify({
                      guestId,
                      guestAccessToken: response.data.guestAccessToken,
                    }));
                  }
                  navigate("/order-success", {
                    state: { order: response.data.order, guestAccessToken: response.data.guestAccessToken },
                  });
                } catch (error) {
                  console.error("Landing page order failed:", error);
                  alert(error.response?.data?.message || error.message || "অর্ডার জমা হয়নি। আবার চেষ্টা করুন।");
                } finally {
                  setSubmittingOrder(false);
                }
              }}
              className="lg:col-span-7 space-y-4"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  আপনার নাম *
                </label>
                <input
                  required
                  name="name"
                  placeholder="সম্পূর্ণ নাম লিখুন"
                  value={orderForm.name}
                  onChange={(e) =>
                    setOrderForm({
                      ...orderForm,
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  মোবাইল নম্বর *
                </label>
                <input
                  required
                  type="tel"
                  name="mobile"
                  placeholder="১১ ডিজিটের মোবাইল নম্বর"
                  value={orderForm.mobile}
                  onChange={(e) =>
                    setOrderForm({
                      ...orderForm,
                      mobile: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  ডেলিভারি এলাকা *
                </label>
                <select
                  required
                  value={shippingOption}
                  onChange={(e) => setShippingOption(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition"
                >
                  <option value="inside">ঢাকার মধ্যে — ৳{insideDhaka}</option>
                  <option value="outside">ঢাকার বাইরে — ৳{outsideDhaka}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  সম্পূর্ণ ঠিকানা *
                </label>
                <textarea
                  required
                  rows="3"
                  placeholder="বাসা নং, রোড নং, এলাকা বা গ্রামের নাম"
                  value={orderForm.address}
                  onChange={(e) =>
                    setOrderForm({
                      ...orderForm,
                      address: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition"
                />
              </div>

              {/* PAYMENT SECTION */}
              <div className="pt-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
                  পেমেন্ট পদ্ধতি নির্বাচন করুন
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label
                    className={`border-2 rounded-2xl p-3.5 cursor-pointer flex items-center gap-3 transition ${
                      paymentMethod === "cod"
                        ? "border-emerald-500 bg-emerald-50/60 text-emerald-950 font-bold"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-xs md:text-sm">Cash On Delivery</span>
                  </label>

                  <label
                    className={`border-2 rounded-2xl p-3.5 cursor-pointer flex items-center gap-3 transition ${
                      paymentMethod === "bkash"
                        ? "border-pink-500 bg-pink-50/60 text-pink-950 font-bold"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "bkash"}
                      onChange={() => setPaymentMethod("bkash")}
                      className="text-pink-600 focus:ring-pink-500"
                    />
                    <span className="text-xs md:text-sm">bKash Payment</span>
                  </label>

                  <label
                    className={`border-2 rounded-2xl p-3.5 cursor-pointer flex items-center gap-3 transition ${
                      paymentMethod === "nagad"
                        ? "border-orange-500 bg-orange-50/60 text-orange-950 font-bold"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "nagad"}
                      onChange={() => setPaymentMethod("nagad")}
                      className="text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-xs md:text-sm">Nagad Payment</span>
                  </label>
                </div>
              </div>

              {/* Manual Mobile Payment Details */}
              {paymentMethod !== "cod" && (
                <div className="space-y-3 bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-2">
                  <p className="text-xs font-bold text-slate-700">
                    {paymentMethod === "bkash"
                      ? `📌 বিকাশ সেন্ড মানি নম্বর: ${import.meta.env.VITE_BKASH_PAYMENT_NUMBER || "নম্বর সেট করা হয়নি"}`
                      : `📌 নগদ সেন্ড মানি নম্বর: ${import.meta.env.VITE_NAGAD_PAYMENT_NUMBER || "নম্বর সেট করা হয়নি"}`}
                  </p>

                  <input
                    required
                    placeholder="যে নম্বর থেকে টাকা পাঠিয়েছেন"
                    value={orderForm.senderNumber}
                    onChange={(e) =>
                      setOrderForm({
                        ...orderForm,
                        senderNumber: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:border-rose-500 outline-none"
                  />

                  <input
                    required
                    placeholder="Transaction ID (TrxID)"
                    value={orderForm.transactionId}
                    onChange={(e) =>
                      setOrderForm({
                        ...orderForm,
                        transactionId: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:border-rose-500 outline-none"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={submittingOrder || shippingLoading || shippingError}
                className="w-full bg-rose-600 hover:bg-rose-700 active:scale-98 text-white py-4 rounded-2xl font-black text-base md:text-lg shadow-xl shadow-rose-200 transition"
              >
                ✅ ৳{total} দিয়ে অর্ডার নিশ্চিত করুন
              </button>
            </form>

            {/* Right: Order Summary Card */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200/80 p-5 md:p-6 h-fit space-y-5">
              <h2 className="text-lg font-black text-slate-900 border-b pb-3">
                অর্ডার সারাংশ
              </h2>

              {/* Product mini card */}
              <div className="flex items-center gap-3.5 bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
                <img
                  src={product?.productImage?.[0] || page.hero?.image}
                  alt={product?.productName}
                  className="w-16 h-16 rounded-xl object-cover border shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-slate-800 truncate">
                    {product?.productName || page.title}
                  </h3>
                  <p className="text-rose-600 font-black text-base mt-0.5">
                    ৳{price}
                  </p>
                </div>
              </div>

              {/* Quantity Changer */}
              <div className="flex items-center justify-between bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
                <span className="text-xs md:text-sm font-semibold text-slate-600">পরিমাণ (Quantity)</span>

                <div className="flex items-center border rounded-lg overflow-hidden bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-slate-200 active:bg-slate-300 text-slate-700 transition"
                  >
                    <FiMinus className="text-xs" />
                  </button>

                  <span className="px-3 text-sm font-bold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-slate-200 active:bg-slate-300 text-slate-700 transition"
                  >
                    <FiPlus className="text-xs" />
                  </button>
                </div>
              </div>

              {/* Price Calculation Rows */}
              <div className="space-y-2.5 bg-white rounded-xl p-4 border border-slate-200 shadow-sm text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>পণ্যের মূল্য:</span>
                  <span className="font-semibold">৳{price * quantity}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>ডেলিভারি চার্জ ({shippingOption === "inside" ? "ঢাকার মধ্যে" : "ঢাকার বাইরে"}):</span>
                  <span className="font-semibold">৳{deliveryCharge}</span>
                </div>

                <div className="border-t pt-2.5 flex justify-between font-black text-base md:text-lg text-slate-900">
                  <span>মোট বিল:</span>
                  <span className="text-rose-600">৳{total}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 text-center">
                * কোনো অগ্রিম ফি ছাড়াই পণ্য দেখে ক্যাশ অন ডেলিভারিতে নিতে পারবেন
              </div>
            </div>

          </div>
        </section>}
      </div>
      <footer className="px-5 py-10 text-center text-white" style={{background:"var(--lp-primary)"}}>{content.footerText || page.title}</footer>
    </main>
  );
};
export default LandingPageView;
