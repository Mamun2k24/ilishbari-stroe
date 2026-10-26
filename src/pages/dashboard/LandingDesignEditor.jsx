
import React, { useState } from "react";

const defaultTheme = {
    primary: "#153f2d",
    accent: "#f59e0b",
    background: "#e4f3e9",
    button: "#169447",
    text: "#142c21",
};

export const landingThemeDefaults = defaultTheme;

export const landingContentDefaults = {
    problemTitle: "সমস্যা ও সমাধান",
    problems: [],
    solutions: [],
    whyTitle: "কেন আমাদের পণ্য সেরা?",
    galleryTitle: "আমাদের গ্যালারি",
    productTitle: "আমাদের পণ্য",
    benefitsTitle: "মধুর উপকারিতা",
    videoTitle: "দেখুন বিস্তারিত",
    ctaTitle: "আজই অর্ডার করুন",
    ctaDescription: "বিশেষ অফারটি মিস করবেন না",
    footerText: "",
};

const field =
    "w-full border border-slate-200 rounded-xl p-3 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 mt-2";

const section =
    "bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm";

const titleClass = "text-lg font-bold text-slate-900";

const toLines = (value) => (value || []).join("\n");

const fromLines = (value) =>
    value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

const fieldLabels = {
    problemTitle: "সমস্যা ও সমাধান Section Title",
    problems: "সমস্যার তালিকা",
    solutions: "সমাধানের তালিকা",
    whyTitle: "কেন আমাদের পণ্য সেরা? Title",
    galleryTitle: "Gallery Title",
    productTitle: "Product Title",
    benefitsTitle: "Benefits Title",
    videoTitle: "Video Title",
    ctaTitle: "Order CTA Title",
    ctaDescription: "Order CTA Description",
    footerText: "Footer Text",
};

export default function LandingDesignEditor({
    value,
    onChange,
}) {
    const theme = {
        ...defaultTheme,
        ...(value.theme || {}),
    };

    const content = {
        ...landingContentDefaults,
        ...(value.content || {}),
    };

    const update = (key, data) => {
        onChange({
            ...value,
            [key]: data,
        });
    };

    const updateContent = (key, data) => {
        update("content", {
            ...content,
            [key]: data,
        });
    };

    const updateArray = (key, index, prop, val) => {
        const next = [...(value[key] || [])];

        next[index] = {
            ...next[index],
            [prop]: val,
        };

        update(key, next);
    };

    const [uploadingGalleryIndex, setUploadingGalleryIndex] = useState(null);
    const [galleryUploadError, setGalleryUploadError] = useState("");

    const uploadGalleryImage = async (file, index) => {
        if (!file) return;
        setGalleryUploadError("");

        if (!file.type.startsWith("image/")) {
            setGalleryUploadError("শুধু Image File নির্বাচন করুন।");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setGalleryUploadError("ছবির সাইজ সর্বোচ্চ 10MB হতে পারবে।");
            return;
        }

        const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
        if (!apiKey) {
            setGalleryUploadError(".env ফাইলে VITE_IMGBB_API_KEY সেট করুন এবং Vite Restart দিন।");
            return;
        }

        setUploadingGalleryIndex(index);
        try {
            const formData = new FormData();
            formData.append("image", file);
            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
                { method: "POST", body: formData }
            );
            const result = await response.json();
            const imageUrl = result?.data?.url;
            if (!response.ok || !result?.success || !imageUrl) {
                throw new Error(result?.error?.message || "ImgBB Upload ব্যর্থ হয়েছে।");
            }
            updateArray("gallery", index, "image", imageUrl);
        } catch (error) {
            setGalleryUploadError(error.message || "Image Upload করা যায়নি।");
        } finally {
            setUploadingGalleryIndex(null);
        }
    };

    const arrayEditor = (
        key,
        heading,
        fields,
        initial
    ) => (
        <div className={section}>
            <div className="flex items-center justify-between gap-3">
                <h3 className={titleClass}>{heading}</h3>

                <button
                    type="button"
                    className="bg-emerald-700 text-white rounded-lg px-3 py-2 text-sm"
                    onClick={() =>
                        update(key, [
                            ...(value[key] || []),
                            { ...initial },
                        ])
                    }
                >
                    + Add
                </button>
            </div>

            {(value[key] || []).map((item, index) => (
                <div
                    key={index}
                    className="border rounded-xl p-3 space-y-3"
                >
                    {fields.map(
                        ({ name, label, type, multiline }) => (
                            <label
                                key={name}
                                className="block text-sm font-medium"
                            >
                                {label}

                                {multiline ? (
                                    <textarea
                                        className={field}
                                        rows={3}
                                        value={item[name] ?? ""}
                                        onChange={(e) =>
                                            updateArray(
                                                key,
                                                index,
                                                name,
                                                e.target.value
                                            )
                                        }
                                        placeholder="Text বা Emoji Paste করুন"
                                    />
                                ) : (
                                    <input
                                        className={field}
                                        type={type || "text"}
                                        value={item[name] ?? ""}
                                        onChange={(e) =>
                                            updateArray(
                                                key,
                                                index,
                                                name,
                                                type === "number"
                                                    ? Number(e.target.value)
                                                    : e.target.value
                                            )
                                        }
                                        placeholder={
                                            type === "number"
                                                ? ""
                                                : "Text বা Emoji Paste করুন"
                                        }
                                    />
                                )}
                            </label>
                        )
                    )}

                    {key === "gallery" && (
                        <div className="space-y-2 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/40 p-3">
                            <label className="block text-sm font-semibold text-emerald-900">
                                📤 Computer থেকে ছবি Upload করুন
                                <input
                                    type="file"
                                    accept="image/*"
                                    disabled={uploadingGalleryIndex !== null}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) uploadGalleryImage(file, index);
                                        e.target.value = "";
                                    }}
                                    className="block w-full mt-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-700 file:px-3 file:py-2 file:text-white file:cursor-pointer"
                                />
                            </label>
                            {uploadingGalleryIndex === index && (
                                <p className="text-xs text-emerald-700">ছবি
                                
                                
                                 Upload হচ্ছে...</p>
                            )}
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={item.title || `Gallery image ${index + 1}`}
                                    className="w-32 h-28 object-cover rounded-xl border bg-white"
                                />
                            )}
                            <p className="text-xs text-slate-500">Upload সফল হলে উপরের Image URL নিজে থেকেই পূরণ হবে। তারপর Landing Page Save করুন।</p>
                        </div>
                    )}

                    <button
                        type="button"
                        className="text-red-600 text-sm"
                        onClick={() =>
                            update(
                                key,
                                (value[key] || []).filter(
                                    (_, i) => i !== index
                                )
                            )
                        }
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );

    return (
        <div className="space-y-5">
            {/* Theme */}
            <div className={section}>
                <h3 className={titleClass}>
                    🎨 Landing Page Theme
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(theme).map(([key, val]) => (
                        <label
                            key={key}
                            className="text-sm capitalize font-semibold"
                        >
                            {key} color

                            <div className="flex gap-2 items-center mt-1">
                                <input
                                    type="color"
                                    value={
                                        /^#[0-9a-fA-F]{6}$/.test(val)
                                            ? val
                                            : defaultTheme[key]
                                    }
                                    onChange={(e) =>
                                        update("theme", {
                                            ...theme,
                                            [key]: e.target.value,
                                        })
                                    }
                                    className="h-11 w-14"
                                />

                                <input
                                    className={field}
                                    value={val}
                                    onChange={(e) =>
                                        update("theme", {
                                            ...theme,
                                            [key]: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Delivery charges: configurable per landing page */}
            <div className={section}>
                <h3 className={titleClass}>🚚 Delivery Charge Settings</h3>
                <p className="text-sm text-slate-500">
                    Checkout-এ শুধু ঢাকার মধ্যে / ঢাকার বাইরে থাকবে। জেলা ও উপজেলা থাকবে না।
                </p>
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
                                className={field}
                                value={value.orderForm?.[key] ?? fallback}
                                onChange={(e) => {
                                    const raw = e.target.value;
                                    update("orderForm", {
                                        ...(value.orderForm || {}),
                                        [key]: raw === "" ? 0 : Math.max(0, Number(raw) || 0),
                                    });
                                }}
                            />
                        </label>
                    ))}
                </div>
            </div>

            {/* Section Titles */}
            <div className={section}>
                <h3 className={titleClass}>
                    📝 Section Titles & Text
                </h3>

                <p className="text-sm text-slate-500">
                    যেকোনো Emoji Copy করে Text-এর সাথে Paste
                    করতে পারবেন। কোনো Fixed Emoji নেই।
                </p>

                {Object.entries(content).map(([key, val]) => (
                    <label
                        key={key}
                        className="block text-sm font-semibold"
                    >
                        {fieldLabels[key] || key}

                        {Array.isArray(val) ? (
                            <textarea
                                className={field}
                                rows={5}
                                value={toLines(val)}
                                onChange={(e) =>
                                    updateContent(
                                        key,
                                        fromLines(e.target.value)
                                    )
                                }
                                placeholder={
                                    key === "problems"
                                        ? "❌ বাজারে ভেজাল মধু পাওয়া যায়\n😟 আসল মধু চেনা কঠিন"
                                        : "✅ ১০০% খাঁটি মধু\n🍯 প্রাকৃতিক স্বাদ ও গন্ধ"
                                }
                            />
                        ) : (
                            <input
                                type="text"
                                className={field}
                                value={val}
                                onChange={(e) =>
                                    updateContent(
                                        key,
                                        e.target.value
                                    )
                                }
                                placeholder="Text বা Emoji Paste করুন"
                            />
                        )}

                        {Array.isArray(val) && (
                            <p className="text-xs text-slate-400 mt-1">
                                প্রতি লাইনে একটি Item লিখুন।
                                Emoji সহ পুরো Text Save হবে।
                            </p>
                        )}
                    </label>
                ))}
            </div>

            {galleryUploadError && (
                <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {galleryUploadError}
                </p>
            )}

            {/* Gallery */}
            {arrayEditor(
                "gallery",
                "🖼️ Gallery Images",
                [
                    {
                        name: "image",
                        label: "Image URL",
                    },
                    {
                        name: "title",
                        label: "Caption (Emoji Supported)",
                    },
                ],
                {
                    image: "",
                    title: "",
                }
            )}

            {/* Benefits */}
            {arrayEditor(
                "benefits",
                "🌿 Benefits",
                [
                    {
                        name: "icon",
                        label: "Emoji / Icon (যেমন 🍯, 🌿, 💚)",
                    },
                    {
                        name: "title",
                        label: "Title (Emoji Supported)",
                    },
                    {
                        name: "description",
                        label: "Description",
                        multiline: true,
                    },
                ],
                {
                    icon: "",
                    title: "",
                    description: "",
                }
            )}

            {/* Features */}
            {arrayEditor(
                "features",
                "✨ Why Choose Us",
                [
                    {
                        name: "title",
                        label: "Title (Emoji Supported)",
                    },
                    {
                        name: "description",
                        label: "Description",
                        multiline: true,
                    },
                ],
                {
                    title: "",
                    description: "",
                }
            )}

            {/* Testimonials */}
            {arrayEditor(
                "testimonials",
                "⭐ Customer Testimonials",
                [
                    {
                        name: "name",
                        label: "Customer Name",
                    },
                    {
                        name: "comment",
                        label: "Review",
                        multiline: true,
                    },
                    {
                        name: "rating",
                        label: "Rating (1-5)",
                        type: "number",
                    },
                ],
                {
                    name: "",
                    comment: "",
                    rating: 5,
                }
            )}

            {/* FAQ */}
            {arrayEditor(
                "faq",
                "❓ FAQ",
                [
                    {
                        name: "question",
                        label: "Question (Emoji Supported)",
                    },
                    {
                        name: "answer",
                        label: "Answer",
                        multiline: true,
                    },
                ],
                {
                    question: "",
                    answer: "",
                }
            )}

            <p className="text-xs text-slate-500">
                Emoji সরাসরি Copy–Paste করা যাবে।
                Images-এর জন্য Hosted URL ব্যবহার করুন।
                Customer Review প্রকাশের আগে অনুমতি নিশ্চিত করুন।
            </p>
        </div>
    );
}
