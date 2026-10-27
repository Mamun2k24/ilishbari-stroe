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

import IlishBariFooter from "./IlishBariFooter";
import LandingReviewsCarousel from "./LandingReviewsCarousel";
import LandingMobileStickyOrder from "./LandingMobileStickyOrder";



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

  const insideDhaka = Number(shippingSettings?.insideDhakaRate ?? 0);

  const outsideDhaka = Number(shippingSettings?.outsideDhakaRate ?? 0);

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

    <main style={{ "--lp-primary": theme.primary, "--lp-accent": theme.accent, "--lp-bg": theme.background, "--lp-button": theme.button, "--lp-text": theme.text, background: "var(--lp-bg)", color: "var(--lp-text)" }} className={`min-h-screen font-sans ${showSection("checkout") ? "pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0" : ""}`}>

      {showSection("hero") && <section className="relative overflow-hidden text-white" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,35,23,.93) 0%, rgba(5,35,23,.72) 38%, rgba(5,35,23,.26) 72%, rgba(5,35,23,.10) 100%), url("${page.hero?.backgroundImage || "https\://i.ibb.co.com/KpzYJ1VQ/cover.jpg"}")`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundColor: "var(--lp-primary)" }}>

        <div className="max-w-6xl mx-auto px-4 pt-7 pb-5 md:px-5 md:py-24 grid md:grid-cols-2 gap-5 md:gap-10 items-center">

          <div className="space-y-3 md:space-y-5">

            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold" style={{ background: "var(--lp-accent)", color: "#18251a" }}>{page.hero?.badge || "প্রিমিয়াম কোয়ালিটি"}</span>

            <h1 className="text-[27px] sm:text-4xl md:text-6xl font-extrabold leading-[1.2] md:leading-[1.25] tracking-normal">

              {page.hero?.headline || page.title}

            </h1>

            <p className="text-[13px] leading-5 sm:text-base md:text-lg font-bold" style={{ color: "var(--lp-accent)" }}>{page.hero?.subHeadline}</p>

            <div className="flex flex-wrap gap-2 md:gap-3">{showSection("checkout") && <button onClick={scrollCheckout} className="rounded-xl px-4 py-2.5 text-sm md:px-7 md:py-3 md:text-base font-bold text-white" style={{ background: "var(--lp-button)" }}>{page.hero?.buttonText || "অর্ডার করুন"}</button>}{(showSection("product") || showSection("checkout")) && <button onClick={() => document.getElementById(showSection("product") ? "product-section" : "checkout")?.scrollIntoView({ behavior: "smooth" })} className="rounded-xl border border-white/50 px-4 py-2.5 text-sm md:px-7 md:py-3 md:text-base font-bold">বিস্তারিত দেখুন</button>}</div>

          </div>

          <img src={heroImage} alt={page.title} className="w-full max-h-[230px] sm:max-h-[330px] md:max-h-[450px] object-contain rounded-2xl md:rounded-3xl" />

        </div>

      </section>}

      {/* Hero-এর ঠিক নিচে Dynamic Combo Offer Banner */}
      {content.comboBanner?.enabled === true && content.comboBanner?.image && (
        <section className="mx-auto max-w-6xl px-2 py-2 sm:px-5 sm:py-4 md:py-6" aria-label="কম্বো অফার">
          {/* Strong, noticeable offer animation — only the combo banner. */}
          <style>{`
            @keyframes lpOfferEntrance {
              0% { opacity: 0; transform: scale(.88) translateY(25px); }
              65% { opacity: 1; transform: scale(1.035) translateY(0); }
              100% { opacity: 1; transform: scale(1); }
            }
            @keyframes lpOfferAttention {
              0%, 68%, 100% { transform: scale(1); filter: saturate(1); }
              74% { transform: scale(1.025) rotate(-.4deg); filter: saturate(1.15); }
              80% { transform: scale(1.025) rotate(.4deg); }
              86% { transform: scale(1.015) rotate(0); }
              92% { transform: scale(1); }
            }
            @keyframes lpOfferBorder {
              0%, 60%, 100% { box-shadow: 0 0 0 2px rgba(255,190,0,.15); }
              70%, 85% { box-shadow: 0 0 0 4px #fbbf24, 0 0 30px 8px rgba(251,191,36,.55); }
            }
           
.lp-combo-animated {
  position: relative;
  isolation: isolate;
  transform-origin: center;
  animation: lpOfferEntrance .85s cubic-bezier(.2,.9,.25,1.2) both,
             lpOfferAttention 3s ease-in-out 1s infinite,
             lpOfferBorder 3s ease-in-out 1s infinite;
  will-change: transform;
}

            @media (prefers-reduced-motion: reduce) {
              .lp-combo-animated { animation: none; }
            }
          `}</style>
          <button
            type="button"
            onClick={scrollCheckout}
            disabled={!showSection("checkout")}
            className="lp-combo-animated block w-full overflow-hidden rounded-lg sm:rounded-xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700 disabled:cursor-default"
            aria-label="কম্বো অফার দেখুন এবং অর্ডার করুন"
          >
            <img
              src={content.comboBanner.image}
              alt={content.comboBanner.alt || "৩ জারের কম্বো অফার"}
              className="block h-auto w-full object-contain"
              loading="eager"
            />
          </button>
        </section>
      )}

      {showSection("problem") && <section className="max-w-5xl mx-auto px-5 py-14"><h2 className="text-center text-3xl font-black mb-8">{content.problemTitle || "সমস্যা ও সমাধান"}</h2>

        <div className="grid md:grid-cols-2 gap-5">{[["সমস্যা", content.problems || [], "#fff7f1"], ["আমাদের সমাধান", content.solutions || [], "#f4fff6"]].map(([title, list, bg]) => <div key={title} className="rounded-xl bg-white p-6 shadow-sm border-t-4" style={{ borderColor: title === "সমস্যা" ? "var(--lp-accent)" : "var(--lp-button)" }}><h3 className="font-bold mb-4">{title}</h3>{list.map((line, i) => <p key={i} className="mb-2 text-sm">✓ {line}</p>)}</div>)}</div>

      </section>}

      {showSection("features") && <section className="max-w-6xl mx-auto px-3 pb-7 mt-2 sm:px-5 sm:pb-14 md:mt-8"><h2 className="text-center text-xl font-black mb-4 sm:text-3xl sm:mb-8">{content.whyTitle || "কেন আমাদের পণ্য সেরা?"}</h2><div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">{(page.features || []).map((item, i) => <div key={i} className="rounded-xl bg-white p-3 sm:p-6 shadow-sm"><div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full text-white flex items-center justify-center mb-2 sm:mb-3 text-sm sm:text-base" style={{ background: "var(--lp-primary)" }}>✓</div><h3 className="font-bold text-xs leading-5 sm:text-base">{item.title}</h3><p className="text-[11px] leading-[1.55] sm:text-sm opacity-70 mt-1 sm:mt-2">{item.description}</p></div>)}</div></section>}

      {showSection("product") && <section className="py-8 bg-white/50" id="product-section">

        <div className="max-w-5xl mx-auto px-5">

          <LandingProductGallery page={page} product={product} heroImage={heroImage} title={content.galleryTitle || "আমাদের গ্যালারি"} />

          {showSection("checkout") && <LandingProductCard page={page} product={product} price={price} heroImage={heroImage} onOrder={scrollCheckout} />}

        </div>

      </section>}

      {showSection("benefits") && (
//        <section
//   className="py-7 sm:py-12 lg:py-14 text-white"
//   style={{
//     background:
//       "linear-gradient(135deg, #003D29 0%, #005B36 55%, #08764A 100%)",
//   }}
// >
<section
  className="relative overflow-hidden py-7 sm:py-12 lg:py-14 text-white"
  style={{
    backgroundImage: `
      linear-gradient(
        135deg,
        rgba(0, 45, 28, 0.72),
        rgba(0, 70, 43, 0.58)
      ),
      url("https://i.ibb.co.com/yn4T1NFB/vive.jpg")
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#005B36",
  }}
>
          <div className="max-w-6xl mx-auto px-3 sm:px-5">
            <h2 className="text-center text-xl sm:text-3xl font-black mb-4 sm:mb-8">
              {content.benefitsTitle || "মধুর উপকারিতা"}
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {(page.benefits || []).map((item, i) => (
                <div key={item._id || i} className="min-w-0 rounded-xl border border-white/15 bg-[#081d15]/80 p-3 sm:p-5 lg:p-7 shadow-sm">
                  <div className="mb-2 sm:mb-4 flex h-9 w-9 sm:h-14 sm:w-14 lg:h-16 lg:w-16 items-center justify-center overflow-hidden rounded-full bg-white text-lg sm:text-2xl lg:text-3xl text-emerald-900 shadow-sm">
                    {item.icon && (item.icon.trim().startsWith("https://") || item.icon.trim().startsWith("http://") || item.icon.trim().startsWith("data:image/")) ? (
                      <img src={item.icon.trim()} alt="" loading="lazy" className="h-6 w-6 sm:h-9 sm:w-9 lg:h-10 lg:w-10 object-contain" />
                    ) : (
                      <span aria-hidden="true">{item.icon || "✦"}</span>
                    )}
                  </div>
                  <h3 className="text-xs leading-5 sm:text-base font-bold break-words">{item.title}</h3>
                  <p className="text-[11px] leading-[1.55] sm:text-sm sm:leading-6 opacity-80 mt-1 sm:mt-2 break-words">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {showSection("reviews") && page.reviewSection?.enabled !== false && reviews.length > 0 && (
        <LandingReviewsCarousel reviews={reviews} title={page.reviewSection?.title || "আমাদের সন্তুষ্ট গ্রাহকরা"} />
      )}

      {showSection("video") && page.video?.enabled && page.video?.url && <section className="max-w-4xl mx-auto px-5 py-2"><h2 className="text-center text-3xl font-black mb-7">{content.videoTitle || "দেখুন বিস্তারিত"}</h2><div className="aspect-video rounded-2xl overflow-hidden bg-black"><iframe title="Product video" className="w-full h-full" src={page.video.url.replace("watch?v=", "embed/").split("&")[0]} allowFullScreen /></div></section>}

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



            {/* Right: Order Summary Card */}

            <div className="order-1 lg:order-2 lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200/80 p-3 sm:p-5 md:p-6 h-fit space-y-3 sm:space-y-5">

              <h2 className="text-lg font-black text-slate-900 border-b pb-3">

                অর্ডার সারাংশ

              </h2>



              {/* Product mini card */}

              <div className="flex items-center gap-3.5 bg-white rounded-xl p-3 border border-slate-200 shadow-sm">

                <img

                  src={product?.productImage?.[0] || page.hero?.image}

                  alt={product?.productName}

                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover border shrink-0"

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

              <div className="space-y-2 bg-white rounded-xl p-3 sm:p-4 border border-slate-200 shadow-sm text-sm">

                <div className="flex justify-between text-slate-600">

                  <span>পণ্যের মূল্য:</span>

                  <span className="font-semibold">৳{price * quantity}</span>

                </div>



                <div className="flex justify-between text-slate-600">

                  <span>ঢাকা ও ঢাকার বাইরে ফ্রি ডেলিভারি</span>

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

              className="order-2 lg:order-1 lg:col-span-7 space-y-4"

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

              {/* Delivery area selector hidden; existing shipping logic remains unchanged. */}



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
              {/* Cash on Delivery only. Existing order submission logic is unchanged. */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-900">
                ✅ Cash on Delivery — পণ্য হাতে পেয়ে টাকা দিন
              </div>



              <button

                type="submit"

                disabled={submittingOrder || shippingLoading || shippingError}

                className="w-full bg-rose-600 hover:bg-rose-700 active:scale-98 text-white py-4 rounded-2xl font-black text-base md:text-lg shadow-xl shadow-rose-200 transition"

              >

                ✅ ৳{total} দিয়ে অর্ডার নিশ্চিত করুন

              </button>

            </form>

          </div>

        </section>}

      </div>

      {/* <footer className="px-5 py-10 text-center text-white" style={{background:"var(--lp-primary)"}}>{content.footerText || page.title}</footer>

     */}



      <IlishBariFooter />

      {showSection("checkout") && <LandingMobileStickyOrder onOrder={scrollCheckout} />}



    </main>

  );

};

export default LandingPageView;
