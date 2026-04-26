"use client";

import { dataMap } from "@/data";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState } from "react";

/* TOOLTIP */
function Tooltip({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group w-fit">
      {children}
      <div
        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
        bg-gray-900 text-white text-xs px-2 py-1 rounded-md shadow-lg
        opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50"
      >
        {text}
      </div>
    </div>
  );
}

export default function ProductPage() {
  const params = useParams();

  const category = Array.isArray(params.category)
    ? params.category[0]
    : params.category;

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const categoryKey = category?.toLowerCase();

  const products = categoryKey ? dataMap[categoryKey] : undefined;

  // ✅ FIX: case-insensitive slug match
  const product = products?.find(
    (p) => p.slug.toLowerCase() === slug?.toLowerCase(),
  );

  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold text-red-500">Product not found</h1>
      </div>
    );
  }

  const lowestPrice = Math.min(...product.sizes.map((s) => s.price));

  const avgRating =
    product.links.reduce((a, l) => a + l.rating, 0) / product.links.length;

  /* ⭐ STAR RENDER */
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="relative w-5 h-5">
            <span className="text-gray-300 absolute">★</span>
            <span
              className="text-yellow-400 absolute overflow-hidden"
              style={{
                width: rating >= i ? "100%" : rating >= i - 0.5 ? "50%" : "0%",
              }}
            >
              ★
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="px-4 md:px-10 py-6">
      {/* TOP SECTION */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* IMAGE + CAROUSEL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="md:col-span-2 bg-white rounded-xl p-4"
        >
          {/* MAIN IMAGE */}
          <div className="relative w-full h-100 group overflow-hidden">
            {product.images?.[activeImg] && (
              <Image
                src={product.images[activeImg]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-contain transition-transform duration-300 group-hover:scale-150"
                loading="eager"
              />
            )}

            {/* ZOOM OVERLAY */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/5 pointer-events-none" />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4">
            {product.images?.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative w-16 h-16 border rounded cursor-pointer overflow-hidden ${
                  activeImg === i ? "border-black" : "border-gray-300"
                }`}
              >
                <Image
                  src={img}
                  alt="thumb"
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* BUY BOX */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="card p-4 sticky top-6 space-y-4 bg-white">
            <h1 className="text-xl font-semibold leading-snug">
              {product.name}
            </h1>

            <p className="text-2xl font-bold text-green-600">₹{lowestPrice}</p>

            {/* ⭐ AVG RATING */}
            <div className="flex items-center gap-2">
              {renderStars(avgRating)}
              <span className="text-sm text-gray-500">
                ({avgRating.toFixed(1)})
              </span>
            </div>

            <p className="text-sm text-gray-500">
              Available on {product.links.length} stores
            </p>

            {/* SIZES */}
            <div>
              <h3 className="font-semibold mb-2">Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <span
                    key={s.size}
                    className="px-3 py-1 border rounded bg-white text-sm hover:bg-gray-50 transition"
                  >
                    {s.size} - ₹{s.price}
                  </span>
                ))}
              </div>
            </div>

            <button className="btn btn-yellow w-full">View Best Deals</button>
          </div>
        </motion.div>
      </div>

      {/* STORE CARDS */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold mb-4">Buy From Trusted Stores</h2>

        <div className="grid sm:grid-cols-3 gap-5">
          {product.links.map((l, i) => (
            <motion.div
              key={l.platform}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card p-4 bg-white hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <p className="font-semibold capitalize text-lg">{l.platform}</p>

              <p className="text-xs text-gray-500">Seller: {l.seller}</p>

              {/* ⭐ WITH TOOLTIP */}
              <Tooltip text={`${l.platform} : ${l.rating.toFixed(1)} / 5`}>
                <div className="flex items-center gap-2 cursor-pointer mt-1">
                  {renderStars(l.rating)}
                  <span className="text-sm text-gray-600">
                    {l.rating.toFixed(1)}
                  </span>
                </div>
              </Tooltip>

              <a
                href={l.url}
                target="_blank"
                className="btn btn-yellow mt-4 text-center block"
              >
                Buy Now
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* DETAILS + SIZE CHART */}
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {/* PRODUCT DETAILS */}
        {product.details && product.details.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Product Details</h2>

            <div className="card p-5 bg-white">
              <ul className="space-y-2 text-sm text-gray-700">
                {product.details.slice(0, 5).map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">✔</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* SIZE CHART */}
        <div className="card p-4 bg-white">
          <h3 className="font-semibold mb-2">Size Chart</h3>

          {product.sizeChart ? (
            <div className="relative w-full h-64">
              <Image
                src={product.sizeChart}
                alt="Size Chart"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
          ) : (
            <p className="text-sm text-gray-500">No size chart available</p>
          )}
        </div>
      </div>
    </div>
  );
}
