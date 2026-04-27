"use client";

import { dataMap } from "@/data";
import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
// 1. Import 'use' from React
import { useEffect, useRef, useState, useMemo, use } from "react";

type DataMap = Record<string, Product[]>;

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const { ref, visible } = useInView();
  const transforms: Record<string, string> = {
    up: "translateY(56px)",
    left: "translateX(-56px)",
    right: "translateX(56px)",
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0)" : transforms[direction],
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  @keyframes rotateSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .product-card-container { position: relative; border-radius: 4px; overflow: hidden; background: #fff; border: 1px solid #ede8e0; transition: all 0.35s cubic-bezier(0.16,1,0.3,1); display: flex; flex-direction: column; height: 100%; cursor: pointer; }
  .product-card-container:hover { border-color: #c9a96e; transform: translateY(-8px); box-shadow: 0 24px 60px rgba(0,0,0,0.1); }
  .product-image-wrapper { width: 100%; aspect-ratio: 3/4; background: #f5f0e8; overflow: hidden; position: relative; }
  .product-info { padding: 32px 28px; display: flex; flex-direction: column; flex-grow: 1; }
  .product-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 800; color: #1a1a1a; margin-bottom: 12px; line-height: 1.2; }
  .product-desc { font-family: 'DM Sans', sans-serif; font-size: 14px; color: #7a7a7a; line-height: 1.6; margin-bottom: 20px; flex-grow: 1; }
  .product-specs { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 20px; }
  .spec-badge { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 2px; background: #f5f0e8; color: #8a7a6a; text-transform: uppercase; }
  .product-price { font-family: 'DM Sans', sans-serif; font-size: 18px; font-weight: 700; color: #c9a96e; margin-top: auto; }
  .cta-primary { display: inline-block; background: #c9a96e; color: #1a1a1a; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; padding: 14px; border-radius: 2px; margin-top: 16px; border: none; transition: 0.3s; }
  .cta-primary:hover { background: #d4b896; }
  @media (max-width: 1024px) { .product-grid { grid-template-columns: repeat(2, 1fr) !important; } }
  @media (max-width: 640px) { .product-grid { grid-template-columns: 1fr !important; } }
`;

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>; // 2. Params is now a Promise
}) {
  const [loading, setLoading] = useState(true);

  // 3. Unwrap params using use()
  const resolvedParams = use(params);
  const key = resolvedParams.category.toLowerCase();

  const products = useMemo(() => {
    const data = dataMap as unknown as DataMap;
    return data[key] || [];
  }, [key]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#fafaf7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "3px solid #e8ddd0",
            borderTopColor: "#c9a96e",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "32px", marginBottom: "16px" }}>
            Category Not Found
          </h1>
          <Link href="/catalogue" style={{ color: "#c9a96e" }}>
            Return to Catalogue
          </Link>
        </div>
      </div>
    );
  }

  const categoryTitle = key.charAt(0).toUpperCase() + key.slice(1);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        style={{
          background: "#fafaf7",
          minHeight: "100vh",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Hero Section */}
        <section
          style={{
            background: "#1a1a1a",
            color: "#fff",
            padding: "100px 48px",
          }}
        >
          <Reveal>
            <span
              style={{
                color: "#c9a96e",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "2px",
              }}
            >
              COLLECTION
            </span>
            <h1
              style={{
                fontSize: "48px",
                fontFamily: "'Playfair Display', serif",
                marginTop: "10px",
                color: "#fff",
              }}
            >
              {categoryTitle} Innerwear
            </h1>
          </Reveal>
        </section>

        {/* Product Grid */}
        <section
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px" }}
        >
          <div
            className="product-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "30px",
            }}
          >
            {products.map((product, i) => (
              <Reveal key={product.slug} delay={i * 0.05}>
                <Link
                  href={`/catalogue/${key}/${product.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="product-card-container">
                    <div className="product-image-wrapper">
                      {product.images && product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            fontSize: "40px",
                          }}
                        >
                          👕
                        </div>
                      )}
                    </div>
                    <div className="product-info">
                      <h2 className="product-name">{product.name}</h2>

                      {product.sizes && (
                        <div className="product-specs">
                          {product.sizes.slice(0, 4).map((s) => (
                            <span key={s.size} className="spec-badge">
                              {s.size}
                            </span>
                          ))}
                          {product.sizes.length > 4 && (
                            <span className="spec-badge">
                              +{product.sizes.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="product-price">
                        ₹{product.sizes?.[0]?.price || "N/A"}
                      </div>
                      <button className="cta-primary">View Details</button>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
