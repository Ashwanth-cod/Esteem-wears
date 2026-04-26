"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
  // Your requested gradient update
  const mainGradient =
    "linear-gradient(150deg, #141414 0%, #1e1a16 60%, #241e18 100%)";

  return (
    <div
      style={{
        width: "100%", // Changed from 100vw to 100% to prevent horizontal scroll white lines
        minHeight: "100vh",
        overflowX: "hidden",
        background: "#141414",
        color: "#fff",
        fontFamily: "'DM Sans', sans-serif",
        margin: 0,
        padding: 0,
      }}
    >
      {/* ================= HERO ================= */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "120px 48px",
          background: mainGradient, // Updated gradient applied
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* glow */}
        <div
          style={{
            position: "absolute",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,169,110,0.15), transparent 70%)",
            top: "-200px",
            right: "-200px",
            pointerEvents: "none",
          }}
        />

        <div style={{ width: "100%", position: "relative", zIndex: 2 }}>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: "72px",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: "24px",
            }}
          >
            Built on Legacy.
            <br />
            <span style={{ color: "#c9a96e" }}>Driven by Trust.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              maxWidth: "600px",
              fontSize: "16px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.8,
            }}
          >
            From Tiruppur’s textile heartland to homes across India, Esteem
            Innerwear has spent decades redefining everyday comfort with organic
            cotton, precision craftsmanship, and consistent quality.
          </motion.p>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section
        style={{
          padding: "120px 48px",
          background: "#0f0f0f",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // Better responsiveness
          gap: "20px",
        }}
      >
        {[
          ["40+", "Years Experience"],
          ["1L+", "Customer Reviews"],
          ["4.1★", "Average Rating"],
          ["10+", "Online Years"],
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "40px",
              border: "1px solid rgba(201,169,110,0.15)",
              borderRadius: "8px",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.03), transparent)",
              textAlign: "center",
            }}
          >
            <div
              style={{ fontSize: "40px", color: "#c9a96e", fontWeight: 800 }}
            >
              {item[0]}
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", marginTop: "8px" }}>
              {item[1]}
            </div>
          </div>
        ))}
      </section>

      {/* ================= STORY ================= */}
      <section
        style={{
          padding: "140px 48px",
          background: "linear-gradient(180deg, #141414 0%, #1a1410 100%)",
        }}
      >
        <h2
          style={{
            fontSize: "48px",
            fontFamily: "'Playfair Display', serif",
            marginBottom: "40px",
          }}
        >
          Our Story
        </h2>

        <div style={{ display: "grid", gap: "24px", maxWidth: "900px" }}>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.9 }}>
            Founded by Krishnaswamy P in Tiruppur, Esteem began as a small
            textile vision rooted in craftsmanship and discipline.
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.9 }}>
            Over 40 years, we evolved into a trusted innerwear brand delivering
            comfort-first clothing to families across India.
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.9 }}>
            Today, Esteem operates across major marketplaces like Amazon,
            Flipkart, and Meesho — maintaining consistency at scale.
          </p>
        </div>
      </section>

      {/* ================= PRINCIPLES ================= */}
      <section
        style={{
          padding: "140px 48px",
          background: "linear-gradient(135deg, #1a1410, #141414)",
        }}
      >
        <h2
          style={{
            fontSize: "48px",
            fontFamily: "'Playfair Display', serif",
            marginBottom: "60px",
          }}
        >
          Simplicity. Quality. Consistency.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            ["Organic Cotton", "100% skin-safe breathable fabric"],
            ["Precision Made", "Crafted with decades of expertise"],
            ["Built for Families", "Comfort for all age groups"],
          ].map((f, i) => (
            <div
              key={i}
              style={{
                padding: "40px",
                borderRadius: "8px",
                background:
                  "linear-gradient(145deg, rgba(201,169,110,0.08), rgba(255,255,255,0.02))",
                border: "1px solid rgba(201,169,110,0.15)",
              }}
            >
              <h3 style={{ color: "#fff", marginBottom: "10px" }}>{f[0]}</h3>
              <p style={{ color: "rgba(255,255,255,0.6)" }}>{f[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PLATFORM ================= */}
      <section
        style={{
          padding: "140px 48px",
          background: "#0f0f0f",
        }}
      >
        <h2
          style={{
            fontSize: "48px",
            fontFamily: "'Playfair Display', serif",
            marginBottom: "60px",
          }}
        >
          Available Everywhere
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            ["Amazon", "#ff9900"],
            ["Flipkart", "#2874f0"],
            ["Meesho", "#9b30d9"],
          ].map((p, i) => (
            <div
              key={i}
              style={{
                padding: "40px",
                borderRadius: "10px",
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.05), transparent)",
                border: `1px solid ${p[1]}55`,
              }}
            >
              <div style={{ color: p[1], fontWeight: 800 }}>{p[0]}</div>
              <p style={{ color: "rgba(255,255,255,0.5)" }}>
                Trusted seller presence
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section
        style={{
          padding: "160px 48px",
          textAlign: "center",
          background: mainGradient, // Consistent gradient applied here too
        }}
      >
        <h2
          style={{
            fontSize: "52px",
            fontFamily: "'Playfair Display', serif",
            marginBottom: "20px",
          }}
        >
          Experience Comfort
        </h2>

        <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "40px" }}>
          Join 1,00,000+ families who trust Esteem every day.
        </p>

        <Link
          href="/catalogue"
          style={{
            display: "inline-block",
            background: "#c9a96e",
            color: "#1a1a1a",
            padding: "16px 38px",
            borderRadius: "2px",
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            transition: "all 0.25s ease",
            boxShadow: "0 10px 30px rgba(201,169,110,0.25)",
          }}
        >
          Explore Collection
        </Link>
      </section>
    </div>
  );
}
