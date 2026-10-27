import React, { useState } from "react";

const SECTION_OPTIONS = [

  { key: "hero", label: "Hero Banner" },

  { key: "problem", label: "Problem & Solution" },

  { key: "features", label: "Why Choose Us" },

  { key: "product", label: "Product Gallery & Card" },

  { key: "benefits", label: "Benefits / Icon Cards" },

  { key: "reviews", label: "Customer Reviews" },

  { key: "video", label: "Video" },

  { key: "offer", label: "Special Offer" },

  { key: "checkout", label: "Checkout Form" },

];

const defaultTheme = { primary: "#153f2d", accent: "#f59e0b", background: "#e4f3e9", button: "#169447", text: "#142c21" };

export const landingThemeDefaults = defaultTheme;

export const landingContentDefaults = {

  problemTitle: "সমস্যা ও সমাধান", problems: [], solutions: [],

  whyTitle: "কেন আমাদের পণ্য সেরা?", galleryTitle: "আমাদের গ্যালারি",

  productTitle: "আমাদের পণ্য", benefitsTitle: "মধুর উপকারিতা",

  videoTitle: "দেখুন বিস্তারিত", ctaTitle: "আজই অর্ডার করুন",

  ctaDescription: "বিশেষ অফারটি মিস করবেন না", footerText: "",

};

const field = "w-full border border-slate-200 rounded-xl p-3 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500";

const section = "bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm";

const titleClass = "text-lg font-bold text-slate-900";

const toLines = value => (value || []).join("\n");

const fromLines = value => value.split("\n"); // Preserve spaces while typing

export default function LandingDesignEditor({ value, onChange }) {

  const [uploadingBenefit, setUploadingBenefit] = useState(null);
  const [uploadingGallery, setUploadingGallery] = useState(null);
  const [uploadingReview, setUploadingReview] = useState(null);
  const [uploadingComboBanner, setUploadingComboBanner] = useState(false);

  const uploadComboBanner = async (file) => {
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp", "image/gif"].includes(file.type)) {
      alert("PNG, JPG, WebP অথবা GIF ছবি নির্বাচন করুন।");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Banner image সর্বোচ্চ 5 MB হতে পারবে।");
      return;
    }
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    if (!apiKey) {
      alert("VITE_IMGBB_API_KEY সেট করা নেই।");
      return;
    }
    setUploadingComboBanner(true);
    try {
      const body = new FormData();
      body.append("image", file);
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
        { method: "POST", body }
      );
      const result = await response.json();
      if (!response.ok || !result?.data?.url) {
        throw new Error(result?.error?.message || "Upload failed");
      }
      onChange((prev) => ({
        ...prev,
        content: {
          ...(prev.content || {}),
          comboBanner: {
            ...(prev.content?.comboBanner || {}),
            image: result.data.url,
          },
        },
      }));
    } catch (error) {
      alert(`Combo banner upload failed: ${error.message}`);
    } finally {
      setUploadingComboBanner(false);
    }
  };

  // Upload a customer's profile photo using the existing ImgBB configuration.
  const uploadReviewImage = async (file, index) => {
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      alert("JPG, PNG অথবা WebP ছবি নির্বাচন করুন।");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Profile photo সর্বোচ্চ 5 MB হতে পারবে।");
      return;
    }
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    if (!apiKey) {
      alert("VITE_IMGBB_API_KEY সেট করা নেই।");
      return;
    }
    setUploadingReview(index);
    try {
      const body = new FormData();
      body.append("image", file);
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
        { method: "POST", body }
      );
      const result = await response.json();
      if (!response.ok || !result?.data?.url) {
        throw new Error(result?.error?.message || "Upload failed");
      }
      onChange((prev) => ({
        ...prev,
        testimonials: (prev.testimonials || []).map((item, i) =>
          i === index ? { ...item, image: result.data.url } : item
        ),
      }));
    } catch (error) {
      alert(`Profile photo upload failed: ${error.message}`);
    } finally {
      setUploadingReview(null);
    }
  };

  const uploadGalleryImage = async (file, index) => {
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp", "image/gif"].includes(file.type)) {
      alert("PNG, JPG, WebP অথবা GIF ছবি নির্বাচন করুন।");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("ছবি সর্বোচ্চ 5 MB হতে পারবে।");
      return;
    }
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    if (!apiKey) {
      alert("VITE_IMGBB_API_KEY সেট করা নেই।");
      return;
    }
    setUploadingGallery(index);
    try {
      const body = new FormData();
      body.append("image", file);
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
        { method: "POST", body }
      );
      const result = await response.json();
      if (!response.ok || !result?.data?.url) {
        throw new Error(result?.error?.message || "Upload failed");
      }
      onChange((prev) => ({
        ...prev,
        gallery: (prev.gallery || []).map((item, i) =>
          i === index ? { ...item, image: result.data.url } : item
        ),
      }));
    } catch (error) {
      alert(`Gallery image upload failed: ${error.message}`);
    } finally {
      setUploadingGallery(null);
    }
  };

  const uploadBenefitIcon = async (file, index) => {

    if (!file) return;

    if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type)) {

      alert('PNG, JPG, WebP অথবা GIF ছবি নির্বাচন করুন। SVG ImgBB-তে সমর্থিত নয়।');

      return;

    }

    if (file.size > 5 * 1024 * 1024) {

      alert('Icon image সর্বোচ্চ 5 MB হতে পারবে।');

      return;

    }

    const key = import.meta.env.VITE_IMGBB_API_KEY;

    if (!key) { alert('VITE_IMGBB_API_KEY সেট করা নেই।'); return; }

    setUploadingBenefit(index);

    try {

      const data = new FormData();

      data.append('image', file);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(key)}`, {

        method: 'POST', body: data,

      });

      const result = await response.json();

      if (!response.ok || !result?.data?.url) throw new Error(result?.error?.message || 'Upload failed');

      onChange(prev => ({

        ...prev,

        benefits: (prev.benefits || []).map((item, i) => i === index ? { ...item, icon: result.data.url } : item),

      }));

    } catch (error) {

      alert(`Icon upload failed: ${error.message}`);

    } finally {

      setUploadingBenefit(null);

    }

  };

  const theme = { ...defaultTheme, ...(value.theme || {}) };

  const content = { ...landingContentDefaults, ...(value.content || {}) };

  const update = (key, data) => onChange(prev => ({ ...prev, [key]: data }));

  const updateContent = (key, data) => onChange(prev => ({ ...prev, content: { ...landingContentDefaults, ...(prev.content || {}), [key]: data } }));

  const updateArray = (key, index, prop, val) => {

    onChange(prev => {
      const next = [...(prev[key] || [])];
      next[index] = { ...next[index], [prop]: val };
      return { ...prev, [key]: next };
    });

  };

  const arrayEditor = (key, heading, fields, initial) => (

    <div className={section}>

      <div className="flex items-center justify-between gap-3"><h3 className={titleClass}>{heading}</h3>

        <button type="button" className="bg-emerald-700 text-white rounded-lg px-3 py-2 text-sm" onClick={() => update(key, [...(value[key] || []), initial])}>+ Add</button></div>

      {(value[key] || []).map((item, index) => <div key={index} className="border rounded-xl p-3 space-y-3">

        {fields.map(({ name, label, type }) => <label key={name} className="block text-sm font-medium">{label}

          <input className={field} type={type || "text"} value={item[name] ?? ""} onChange={e => updateArray(key, index, name, type === "number" ? Number(e.target.value) : e.target.value)} /></label>)}

        {key === "testimonials" && (
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
            {item.image ? (
              <img
                src={item.image}
                alt={`${item.name || "Customer"} profile preview`}
                className="h-16 w-16 shrink-0 rounded-full border-2 border-white object-cover shadow-sm"
              />
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-900">
                {(item.name || "C").trim().charAt(0).toUpperCase() || "C"}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label className="inline-flex w-fit cursor-pointer items-center rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white">
                {uploadingReview === index ? "Uploading..." : "Upload Profile Photo"}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  disabled={uploadingReview !== null}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    e.target.value = "";
                    uploadReviewImage(file, index);
                  }}
                />
              </label>
              {item.image && (
                <button
                  type="button"
                  className="w-fit text-left text-xs font-semibold text-rose-600"
                  onClick={() => updateArray("testimonials", index, "image", "")}
                >
                  Remove Profile Photo
                </button>
              )}
              <span className="text-xs text-slate-500">JPG/PNG/WebP • Max 5 MB • Upload শেষে Save Changes চাপুন</span>
            </div>
          </div>
        )}

        {key === "gallery" && (
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
            {item.image && (
              <img
                src={item.image}
                alt={item.title || "Gallery preview"}
                className="h-20 w-20 rounded-lg border border-slate-200 bg-white object-cover"
              />
            )}
            <div className="flex flex-col gap-2">
              <label className="inline-flex w-fit cursor-pointer items-center rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white">
                {uploadingGallery === index ? "Uploading..." : "Upload Image from Computer"}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="hidden"
                  disabled={uploadingGallery !== null}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    e.target.value = "";
                    uploadGalleryImage(file, index);
                  }}
                />
              </label>
              <span className="text-xs text-slate-500">PNG/JPG/WebP/GIF • সর্বোচ্চ 5 MB • আপলোডের পর Save Changes চাপুন</span>
            </div>
          </div>
        )}

        {key === "benefits" && (

          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">

            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-3xl text-emerald-900 shadow-sm">

          {item.icon &&
typeof item.icon === "string" &&
(
  item.icon.trim().startsWith("https://") ||
  item.icon.trim().startsWith("http://") ||
  item.icon.trim().startsWith("data:image/")
) ? (
  <img
    src={item.icon.trim()}
    alt="Icon preview"
    className="h-10 w-10 object-contain"
  />
) : (
  <span>{item.icon || "✦"}</span>
)}

            </div>

            <div className="flex flex-col gap-2">

              <label className="inline-flex w-fit cursor-pointer items-center rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white">

                {uploadingBenefit === index ? "Uploading..." : "Upload Icon Image"}

                <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden"

                  disabled={uploadingBenefit !== null}

                  onChange={e => { const file = e.target.files?.[0]; e.target.value = ""; uploadBenefitIcon(file, index); }} />

              </label>

              {item.icon && <button type="button" className="text-left text-xs font-semibold text-rose-600"

                onClick={() => updateArray(key, index, "icon", "")}>Remove Icon</button>}

              <span className="text-xs text-slate-500">PNG/JPG/WebP/GIF • সর্বোচ্চ 5 MB • আপলোড শেষে Save Changes চাপুন</span>

            </div>

          </div>

        )}

        <button type="button" className="text-red-600 text-sm" onClick={() => update(key, (value[key] || []).filter((_, i) => i !== index))}>Remove</button>

      </div>)}

    </div>

  );

  return <div className="space-y-5">

    <div className={section}><h3 className={titleClass}>🎨 Landing Page Theme</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{Object.entries(theme).map(([key, val]) => <label key={key} className="text-sm capitalize font-semibold">{key} color

        <div className="flex gap-2 items-center mt-1"><input type="color" value={/^#[0-9a-fA-F]{6}$/.test(val) ? val : defaultTheme[key]} onChange={e => update("theme", { ...theme, [key]: e.target.value })} className="h-11 w-14" />

          <input className={field} value={val} onChange={e => update("theme", { ...theme, [key]: e.target.value })} /></div></label>)}</div>

    </div>

    <div className={section}>

      <h3 className={titleClass}>🎛️ Section Visibility (ON / OFF)</h3>

      <p className="text-sm text-slate-500">OFF করলে সেকশন লুকাবে, তথ্য মুছে যাবে না। Save Changes চাপুন।</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

        {SECTION_OPTIONS.map(({ key, label }) => {

          const enabled = content.sectionVisibility?.[key] !== false;

          return <label key={key} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3 cursor-pointer">

            <span className="text-sm font-semibold">{label}</span>

            <input type="checkbox" className="h-5 w-5 accent-emerald-600" checked={enabled}

              onChange={(e) => {
                  const checked = e.target.checked;
                  onChange((prev) => ({
                    ...prev,
                    content: {
                      ...(prev.content || {}),
                      sectionVisibility: {
                        ...(prev.content?.sectionVisibility || {}),
                        [key]: checked,
                      },
                    },
                  }));
                }} />

          </label>;

        })}

      </div>

    </div>

    {/* Per-page delivery charges: no district or upazila field */}

    <div className={section}>

      <h3 className={titleClass}>🚚 Delivery Charge Settings</h3>

      <p className="text-sm text-slate-500">ঢাকার মধ্যে ও ঢাকার বাইরে ডেলিভারি চার্জ সেট করুন। Save করলে এই Landing Page-এ কার্যকর হবে।</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {[

          { key: "deliveryChargeInsideDhaka", label: "ঢাকার মধ্যে (৳)", fallback: 60 },

          { key: "deliveryChargeOutsideDhaka", label: "ঢাকার বাইরে (৳)", fallback: 120 },

        ].map(({ key, label, fallback }) => (

          <label key={key} className="block text-sm font-semibold">

            {label}

            <input

              type="number"

              min="0"

              step="1"

              required

              className={field}

              value={value.orderForm?.[key] ?? fallback}

              onChange={(e) => {

                const raw = e.target.value;

                const charge = raw === "" ? "" : Math.max(0, Number(raw));

                update("orderForm", {

                  ...(value.orderForm || {}),

                  [key]: charge,

                });

              }}

            />

          </label>

        ))}

      </div>

    </div>

    <div className={section}><h3 className={titleClass}>📝 Section Titles & Text</h3>

      {Object.entries(content).filter(([key]) => key !== "sectionVisibility" && key !== "comboBanner").map(([key, val]) => <label key={key} className="block text-sm font-semibold">{key}

        {Array.isArray(val) ? <textarea className={field} rows={4} value={toLines(val)} onChange={e => updateContent(key, fromLines(e.target.value))} placeholder="One item per line" /> : <input className={field} value={val} onChange={e => updateContent(key, e.target.value)} />}

      </label>)}

    </div>

    <div className={section}>
      <h3 className={titleClass}>🎁 Hero-এর নিচে Combo Offer Banner</h3>
      <p className="text-sm text-slate-500">ছবি Upload করে Save Changes চাপুন। Banner-এ ক্লিক করলে Checkout-এ যাবে।</p>
      <label className="flex items-center gap-3 text-sm font-semibold">
        <input type="checkbox" checked={content.comboBanner?.enabled === true}
          onChange={e => updateContent("comboBanner", { ...(content.comboBanner || {}), enabled: e.target.checked })}
          className="h-5 w-5 accent-emerald-600" /> Banner ON / OFF
      </label>
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
        <label className={`inline-flex w-fit items-center rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white ${uploadingComboBanner ? "cursor-wait opacity-60" : "cursor-pointer hover:bg-emerald-800"}`}>
          {uploadingComboBanner ? "Uploading Banner..." : "📤 Upload Banner from Computer"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            disabled={uploadingComboBanner}
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              uploadComboBanner(file);
            }}
          />
        </label>
        {content.comboBanner?.image && (
          <button
            type="button"
            className="text-sm font-semibold text-rose-600 hover:underline"
            onClick={() => updateContent("comboBanner", { ...(content.comboBanner || {}), image: "" })}
          >
            Remove Banner Image
          </button>
        )}
        <p className="w-full text-xs text-slate-500">PNG/JPG/WebP/GIF • Max 5 MB • Upload শেষে Save Changes চাপুন</p>
      </div>
      <label className="block text-sm font-semibold">Banner Image URL
        <input className={field} value={content.comboBanner?.image || ""}
          onChange={e => updateContent("comboBanner", { ...(content.comboBanner || {}), image: e.target.value })}
          placeholder="https://.../combo-offer-banner.png" />
      </label>
      <label className="block text-sm font-semibold">Image description (Accessibility)
        <input className={field} value={content.comboBanner?.alt || ""}
          onChange={e => updateContent("comboBanner", { ...(content.comboBanner || {}), alt: e.target.value })}
          placeholder="৩ জারের কম্বো অফার ৯৯৯ টাকা" />
      </label>
      {content.comboBanner?.image && <img src={content.comboBanner.image} alt="Banner preview" className="w-full max-w-2xl rounded-xl" />}
    </div>

    {arrayEditor("gallery", "🖼️ Gallery Images", [{ name: "image", label: "Image URL" }, { name: "title", label: "Caption" }], { image: "", title: "" })}

    {arrayEditor("benefits", "🌿 Benefits", [{ name: "icon", label: "Icon URL অথবা Emoji (নিচে Image Upload করুন)" }, { name: "title", label: "Title" }, { name: "description", label: "Description" }], { icon: "", title: "", description: "" })}

    {arrayEditor("features", "✨ Why Choose Us", [{ name: "title", label: "Title" }, { name: "description", label: "Description" }], { title: "", description: "" })}

    {arrayEditor("testimonials", "⭐ Customer Testimonials", [{ name: "name", label: "Customer Name" }, { name: "comment", label: "Review" }, { name: "rating", label: "Rating (1-5)", type: "number" }], { name: "", image: "", comment: "", rating: 5 })}

    {arrayEditor("faq", "❓ FAQ", [{ name: "question", label: "Question" }, { name: "answer", label: "Answer" }], { question: "", answer: "" })}

    <p className="text-xs text-slate-500">Images can be entered as hosted URLs. Only publish customer reviews you have permission to display.</p>

  </div>;

}
