"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
  className?: string;
}) {
  const { ref, visible } = useInView();
  const transforms: Record<string, string> = {
    up: "translateY(56px)",
    left: "translateX(-56px)",
    right: "translateX(56px)",
    fade: "translateY(0px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0)" : transforms[direction],
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useInView();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!visible) return;
    const duration = 1800;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [visible, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const ACCENTS = [
  "#c9a96e",
  "#8b9e7a",
  "#7a8b9e",
  "#9e7a8b",
  "#8b7a9e",
  "#9e8b7a",
];

function FeatureCard({
  title,
  desc,
  delay,
  index,
}: {
  title: string;
  desc: string;
  delay: number;
  index: number;
}) {
  const accent = ACCENTS[index % ACCENTS.length];
  return (
    <Reveal delay={delay} direction="up">
      <div
        className="feature-card"
        style={{ "--accent": accent } as React.CSSProperties}
      >
        <div className="feature-bar" />
        <h3 className="feature-title">{title}</h3>
        <p className="feature-desc">{desc}</p>
      </div>
    </Reveal>
  );
}

function StatCard({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} direction="up">
      <div className="stat-card">
        <div className="stat-value">
          <CountUp target={value} suffix={suffix} />
        </div>
        <div className="stat-label">{label}</div>
      </div>
    </Reveal>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { overflow-x: hidden; }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes pulseRing {
    0%, 100% { transform: scale(1); opacity: 0.4; }
    50%       { transform: scale(1.08); opacity: 0.8; }
  }
  @keyframes floatY {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-12px); }
  }
  @keyframes scrollLine {
    0%, 100% { transform: translateY(0); opacity: 1; }
    50%       { transform: translateY(6px); opacity: 0.4; }
  }

  .hero-line-1 { animation: fadeSlideUp 1s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
  .hero-line-2 { animation: fadeSlideUp 1s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
  .hero-line-3 { animation: fadeSlideUp 1s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
  .hero-line-4 { animation: fadeSlideUp 1s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
  .hero-visual  { animation: fadeIn 1.4s ease 0.3s both; }

  .rotating-ring {
    will-change: transform;
    animation: rotateSlow 40s linear infinite;
  }
  .rotating-ring-reverse {
    will-change: transform;
    animation: rotateSlow 28s linear infinite reverse;
  }
  .pulse-ring {
    will-change: transform, opacity;
    animation: pulseRing 4s ease-in-out infinite;
  }
  .float-badge {
    will-change: transform;
  }
  .float-badge-0 { animation: floatY 3.5s ease-in-out 0s infinite; }
  .float-badge-1 { animation: floatY 3.5s ease-in-out 0.6s infinite; }
  .float-badge-2 { animation: floatY 3.5s ease-in-out 1.2s infinite; }

  .marquee-track {
    will-change: transform;
    animation: marquee 22s linear infinite;
    display: flex;
    white-space: nowrap;
  }

  .scroll-line {
    will-change: transform, opacity;
    animation: scrollLine 2s ease-in-out infinite;
  }

  .cta-primary {
    display: inline-block;
    background: #c9a96e;
    color: #1a1a1a;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 16px 36px;
    border-radius: 2px;
    text-decoration: none;
    transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  }
  .cta-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 36px rgba(201,169,110,0.35);
    background: #d4b896;
  }
  .cta-ghost {
    display: inline-block;
    background: transparent;
    color: rgba(255,255,255,0.75);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 15px 36px;
    border-radius: 2px;
    border: 1px solid rgba(255,255,255,0.2);
    text-decoration: none;
    transition: border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
  }
  .cta-ghost:hover {
    border-color: rgba(255,255,255,0.5);
    color: #fff;
    transform: translateY(-3px);
  }

  /* Feature cards — pure CSS hover, no JS state */
  .feature-card {
    background: #fafaf7;
    border: 1px solid #e8e2d9;
    border-radius: 4px;
    padding: 36px 32px;
    transition: background 0.35s cubic-bezier(0.16,1,0.3,1),
                border-color 0.35s cubic-bezier(0.16,1,0.3,1),
                transform 0.35s cubic-bezier(0.16,1,0.3,1),
                box-shadow 0.35s cubic-bezier(0.16,1,0.3,1);
    cursor: default;
    position: relative;
    overflow: hidden;
  }
  .feature-card:hover {
    background: #fff;
    border-color: var(--accent);
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.08);
  }
  .feature-bar {
    width: 32px;
    height: 2px;
    background: var(--accent);
    margin-bottom: 24px;
    transition: width 0.35s ease;
  }
  .feature-card:hover .feature-bar {
    width: 48px;
  }
  .feature-title {
    font-size: 17px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 12px;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: -0.01em;
  }
  .feature-desc {
    font-size: 14px;
    color: #7a7a7a;
    line-height: 1.75;
    margin: 0;
    font-family: 'DM Sans', sans-serif;
  }

  /* Stat cards */
  .stat-card {
    border-left: 1px solid rgba(255,255,255,0.12);
    padding-left: 36px;
  }
  .stat-value {
    font-family: 'Playfair Display', serif;
    font-size: 52px;
    font-weight: 800;
    color: #c9a96e;
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .stat-label {
    font-size: 13px;
    color: rgba(255,255,255,0.4);
    margin-top: 10px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .platform-pill {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background: #fff;
    border: 1px solid #ede8e0;
    border-radius: 4px;
    padding: 28px 24px;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    cursor: default;
    text-decoration: none;
  }
  .platform-pill:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 60px rgba(0,0,0,0.09);
    border-color: #c9a96e;
  }

  @media (max-width: 900px) {
    .hero-grid { flex-direction: column !important; }
    .features-grid { grid-template-columns: 1fr 1fr !important; }
    .stats-row { flex-direction: column !important; gap: 32px !important; }
    .story-grid { flex-direction: column !important; }
  }
  @media (max-width: 600px) {
    .features-grid { grid-template-columns: 1fr !important; }
    .platform-grid { grid-template-columns: 1fr !important; }
    .hero-title { font-size: 48px !important; }
  }
`;

const MARQUEE_ITEMS = [
  "100% Organic Cotton",
  "Skin-Safe Dyes",
  "Family Innerwear",
  "30+ Years Craftsmanship",
  "1 Lakh+ Reviews",
  "Amazon Prime Seller",
  "Flipkart Golden Seller",
  "Meesho Top Seller",
];

const FEATURES = [
  {
    title: "100% Organic Cotton",
    desc: "Only the finest certified organic cotton — soft, breathable, and completely free from harmful chemicals.",
  },
  {
    title: "Skin-Safe Dyes",
    desc: "Certified hypoallergenic dyes gentle on all skin types, from newborns to seniors.",
  },
  {
    title: "Built to Last",
    desc: "Decades of garment expertise behind every stitch — engineered for durability without sacrificing comfort.",
  },
  {
    title: "For the Whole Family",
    desc: "Kids to adults — our full range covers every age, size, and need under one trusted brand.",
  },
  {
    title: "Always Affordable",
    desc: "Premium quality should never carry a premium price. The best value in Indian innerwear.",
  },
  {
    title: "Reliable Supply",
    desc: "Strong operational backbone ensures products are always in stock — fast dispatch, no delays.",
  },
];

const HERO_STATS = [
  { n: "40", s: "+", l: "Years Expertise" },
  { n: "1", s: "L+", l: "Reviews" },
  { n: "4.1", s: "★", l: "Avg Rating" },
];

export default function HomePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: "#fafaf7",
          color: "#1a1a1a",
        }}
      >
        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section
          style={{
            minHeight: "100vh",
            background:
              "linear-gradient(150deg, #141414 0%, #1e1a16 60%, #241e18 100%)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            paddingTop: "88px",
          }}
        >
          {/* Background geometry — GPU-composited via will-change on CSS classes */}
          <div
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            <div
              className="rotating-ring"
              style={{
                position: "absolute",
                top: "-15%",
                right: "-8%",
                width: "680px",
                height: "680px",
                border: "1px solid rgba(201,169,110,0.08)",
                borderRadius: "50%",
              }}
            />
            <div
              className="rotating-ring-reverse"
              style={{
                position: "absolute",
                top: "-5%",
                right: "2%",
                width: "480px",
                height: "480px",
                border: "1px solid rgba(201,169,110,0.05)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "20%",
                right: "10%",
                width: "500px",
                height: "500px",
                background:
                  "radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-10%",
                left: "-5%",
                width: "400px",
                height: "400px",
                background:
                  "radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)",
                borderRadius: "50%",
              }}
            />
            {[20, 35, 50, 65, 80].map((pct) => (
              <div
                key={pct}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: `${pct}%`,
                  width: "1px",
                  background: "rgba(255,255,255,0.02)",
                }}
              />
            ))}
          </div>

          <div
            className="hero-grid"
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "80px 48px",
              display: "flex",
              alignItems: "center",
              gap: "80px",
              width: "100%",
              position: "relative",
            }}
          >
            {/* LEFT */}
            <div style={{ flex: 1 }}>
              <div className="hero-line-1" style={{ marginBottom: "32px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "32px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "1px",
                      background: "#c9a96e",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#c9a96e",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Est. Tiruppur · Since 30+ Years
                  </span>
                </div>
              </div>

              <h1
                className="hero-title hero-line-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "76px",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.02,
                  letterSpacing: "-0.025em",
                  marginBottom: "32px",
                }}
              >
                Comfort
                <br />
                <em style={{ fontStyle: "italic", color: "#c9a96e" }}>
                  Knitted
                </em>
                <br />
                into Every
                <br />
                Thread.
              </h1>

              <p
                className="hero-line-3"
                style={{
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.85,
                  maxWidth: "420px",
                  marginBottom: "44px",
                  fontWeight: 400,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                100% organic cotton innerwear for every member of your family —
                crafted with four decades of expertise and skin-safe dyes.
                Trusted by over one lakh families across India.
              </p>

              {/* Mini stats */}
            </div>

            {/* RIGHT — geometric visual */}
            <div
              className="hero-visual"
              style={{
                flex: "1 1 420px",
                maxWidth: "420px",
                position: "relative",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "clamp(420px, 70vh, 520px)",
                  borderRadius: "8px",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-center",
                  padding: "clamp(30px, 4vw, 36px)",
                }}
              >
                <div
                  className="hero-line-4"
                  style={{
                    display: "flex",
                    gap: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <Link href="/catalogue" className="cta-primary">
                    Shop Collection
                  </Link>

                  <Link href="#story" className="cta-ghost">
                    Our Story
                  </Link>
                </div>

                <div
                  className="hero-line-4"
                  style={{
                    display: "flex",
                    gap: "0",
                    paddingTop: "36px",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    flexWrap: "wrap",
                  }}
                >
                  {HERO_STATS.map((s, i) => (
                    <div
                      key={s.l}
                      style={{
                        paddingRight: "40px",
                        marginRight: "40px",
                        borderRight:
                          i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "32px",
                          fontWeight: 800,
                          color: "#c9a96e",
                          lineHeight: 1,
                        }}
                      >
                        {s.n}
                        {s.s}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "rgba(255,255,255,0.35)",
                          marginTop: "6px",
                          fontWeight: 500,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                        }}
                      >
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div
            style={{
              position: "absolute",
              bottom: "36px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              animation: "fadeIn 1s ease 1.4s both",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Scroll
            </span>
            <div
              className="scroll-line"
              style={{
                width: "1px",
                height: "56px",
                background:
                  "linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)",
              }}
            />
          </div>
        </section>

        {/* ── MARQUEE ──────────────────────────────────────────────────── */}
        <div
          style={{
            background: "#c9a96e",
            padding: "16px 0",
            overflow: "hidden",
          }}
        >
          <div className="marquee-track">
            {Array(4)
              .fill(MARQUEE_ITEMS)
              .flat()
              .map((item, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#1a1a1a",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginRight: "56px",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {item}
                  <span style={{ marginLeft: "56px", opacity: 0.4 }}>—</span>
                </span>
              ))}
          </div>
        </div>

        {/* ── STORY ────────────────────────────────────────────────────── */}
        <section
          id="story"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "140px 48px",
          }}
        >
          <div
            className="story-grid"
            style={{ display: "flex", gap: "100px", alignItems: "center" }}
          >
            {/* Left panel */}
            <div style={{ flex: "0 0 400px" }}>
              <Reveal direction="left">
                <div
                  style={{
                    background: "#1a1a1a",
                    borderRadius: "4px",
                    padding: "60px 52px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "100px",
                      height: "100px",
                      borderBottom: "1px solid rgba(201,169,110,0.15)",
                      borderLeft: "1px solid rgba(201,169,110,0.15)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "60px",
                      height: "60px",
                      borderTop: "1px solid rgba(201,169,110,0.1)",
                      borderRight: "1px solid rgba(201,169,110,0.1)",
                    }}
                  />
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#c9a96e",
                      marginBottom: "20px",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Founder
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "64px",
                      fontWeight: 800,
                      color: "#c9a96e",
                      lineHeight: 1,
                      marginBottom: "4px",
                    }}
                  >
                    40+
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.4)",
                      fontFamily: "'DM Sans', sans-serif",
                      marginBottom: "48px",
                    }}
                  >
                    Years of mastery
                  </div>
                  <div
                    style={{
                      paddingTop: "32px",
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#fff",
                        fontFamily: "'DM Sans', sans-serif",
                        marginBottom: "4px",
                      }}
                    >
                      Krishnaswamy P
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.35)",
                        fontFamily: "'DM Sans', sans-serif",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      Founder & Director
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right text */}
            <div style={{ flex: 1 }}>
              <Reveal direction="right" delay={0.1}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "1px",
                      background: "#c9a96e",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#c9a96e",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Our Legacy
                  </span>
                </div>
              </Reveal>
              <Reveal direction="right" delay={0.2}>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "54px",
                    fontWeight: 800,
                    lineHeight: 1.08,
                    color: "#1a1a1a",
                    letterSpacing: "-0.02em",
                    marginBottom: "32px",
                  }}
                >
                  Three Decades
                  <br />
                  <em
                    style={{
                      fontStyle: "italic",
                      color: "#6b6b6b",
                      fontWeight: 700,
                    }}
                  >
                    of Trust
                  </em>
                </h2>
              </Reveal>
              <Reveal direction="right" delay={0.3}>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#6b6b6b",
                    lineHeight: 1.85,
                    marginBottom: "20px",
                    maxWidth: "520px",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Esteem Innerwear was born in Tiruppur — India&apos;s textile
                  capital — with a simple mission: bring comfort that every
                  family deserves. Our founder Krishnaswamy P spent over four
                  decades mastering the art of garment manufacturing before
                  channeling that expertise into Esteem.
                </p>
              </Reveal>
              <Reveal direction="right" delay={0.4}>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#6b6b6b",
                    lineHeight: 1.85,
                    marginBottom: "44px",
                    maxWidth: "520px",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  From traditional craftsmanship to modern e-commerce, we
                  combine both worlds — serving customers on Amazon, Flipkart,
                  and Meesho for over a decade with an unbroken commitment to
                  quality, comfort, and affordability.
                </p>
              </Reveal>
              <Reveal direction="right" delay={0.5}>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {[
                    "Tiruppur-Based",
                    "Family Values",
                    "Organic Materials",
                    "10+ Years Online",
                  ].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#8a7a6a",
                        background: "#f0ece4",
                        border: "1px solid #e0d8cc",
                        borderRadius: "2px",
                        padding: "8px 16px",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────────────────── */}
        <section
          style={{
            background: "#141414",
            padding: "120px 48px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            {[15, 30, 45, 60, 75, 90].map((pct) => (
              <div
                key={pct}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: `${pct}%`,
                  width: "1px",
                  background: "rgba(255,255,255,0.02)",
                }}
              />
            ))}
          </div>

          <div
            className="trust-section-inner"
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              gap: "64px",
            }}
          >
            {/* ── Left: text + stats ── */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <Reveal direction="up">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "1px",
                      background: "#c9a96e",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#c9a96e",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    By the Numbers
                  </span>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "52px",
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-0.02em",
                    marginBottom: "72px",
                  }}
                >
                  Trust, Measured.
                </h2>
              </Reveal>

              <div className="stats-row" style={{ display: "flex" }}>
                <StatCard
                  value={100000}
                  suffix="+"
                  label="Customer Reviews"
                  delay={0.1}
                />
                <StatCard
                  value={4}
                  suffix=".1+"
                  label="Avg Rating"
                  delay={0.15}
                />
                <StatCard
                  value={40}
                  suffix="+"
                  label="Years Expertise"
                  delay={0.2}
                />
                <StatCard
                  value={10}
                  suffix="+"
                  label="Years Online"
                  delay={0.3}
                />
              </div>
            </div>

            {/* ── Right: floating award image ── */}
            <Reveal direction="up" delay={0.2}>
              <div
                style={{
                  flexShrink: 0,
                  width: "260px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                {/* Glow ring behind the award */}
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "220px",
                      height: "220px",
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle, rgba(201,169,110,0.18) 0%, transparent 70%)",
                    }}
                  />
                  <Image
                    src="https://res.cloudinary.com/desmywzoz/image/upload/v1777385399/gold_seller_shbjad.png"
                    alt="Award"
                    width={180}
                    height={180}
                    style={{
                      width: "350px",
                      height: "auto",
                      objectFit: "contain",
                      position: "relative",
                      zIndex: 1,
                      filter: "drop-shadow(0 8px 32px rgba(201,169,110,0.35))",
                      animation: "awardFloat 4s ease-in-out infinite",
                    }}
                  />
                </div>

                {/* Caption below the award */}
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#c9a96e",
                      fontFamily: "'DM Sans', sans-serif",
                      marginBottom: "6px",
                    }}
                  >
                    Gold seller Excellence
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.4)",
                      fontFamily: "'DM Sans', sans-serif",
                      lineHeight: 1.6,
                    }}
                  >
                    Top Seller on Flipkart.
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Float animation keyframes + mobile responsive */}
          <style>{`
            @keyframes awardFloat {
              0%, 100% { transform: translateY(0px); }
              50%       { transform: translateY(-12px); }
            }

            @media (max-width: 768px) {
              .trust-section-inner {
                flex-direction: column !important;
                align-items: center !important;
                text-align: center;
              }
              .stats-row {
                flex-wrap: wrap;
                justify-content: center;
              }
            }
          `}</style>
        </section>

        {/* ── FEATURES ─────────────────────────────────────────────────── */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "140px 48px",
          }}
        >
          <div style={{ marginBottom: "80px" }}>
            <Reveal direction="up">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background: "#c9a96e",
                  }}
                />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#c9a96e",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Why Esteem
                </span>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "52px",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: "#1a1a1a",
                  letterSpacing: "-0.02em",
                  maxWidth: "480px",
                }}
              >
                Crafted for Every Family.
              </h2>
            </Reveal>
          </div>

          <div
            className="features-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {FEATURES.map((f, i) => (
              <FeatureCard
                key={f.title}
                title={f.title}
                desc={f.desc}
                delay={i * 0.08}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* ── PLATFORMS ────────────────────────────────────────────────── */}
        <section style={{ background: "#f5f0e8", padding: "120px 48px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "80px" }}>
              <Reveal direction="up">
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "1px",
                      background: "#c9a96e",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#c9a96e",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Platform Recognition
                  </span>
                  <div
                    style={{
                      width: "40px",
                      height: "1px",
                      background: "#c9a96e",
                    }}
                  />
                </div>
              </Reveal>
              <Reveal direction="up" delay={0.1}>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "52px",
                    fontWeight: 800,
                    color: "#1a1a1a",
                    letterSpacing: "-0.02em",
                    marginBottom: "16px",
                  }}
                >
                  Trusted Nationwide.
                </h2>
              </Reveal>
              <Reveal direction="up" delay={0.2}>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#7a7a7a",
                    maxWidth: "480px",
                    margin: "0 auto",
                    lineHeight: 1.8,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Over 1 lakh reviews and a 4.1+ rating across platforms —
                  earned through decades of delivering on our promise.
                </p>
              </Reveal>
            </div>

            <div
              className="three-col"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
              }}
            >
              <style>{`
                @media (max-width: 1024px) {
                  .three-col {
                    grid-template-columns: 1fr 1fr !important;
                  }
                }
                @media (max-width: 640px) {
                  .three-col {
                    grid-template-columns: 1fr !important;
                  }
                }
              `}</style>

              {[
                {
                  name: "Amazon",
                  badge: "Prime Seller",
                  color: "#883D11",
                  desc: "Buy any 2 products from us on Amazon, get 10% off.",
                  links: [
                    {
                      label: "Esteem Innerwear",
                      href: "https://www.amazon.in/storefront?me=A34AJOT31SQCLN",
                    },
                  ],
                },
                {
                  name: "Flipkart",
                  badge: "Golden Seller",
                  color: "#2874F0",
                  desc: "Flipkart Plus benefits. Fast 2-day shipping across India.",
                  links: [
                    {
                      label: "Keyar Exports",
                      href: "https://www.flipkart.com/search?q=ESTEEM%20innerwear&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off",
                    },
                  ],
                },
                {
                  name: "Meesho",
                  badge: "Top Seller",
                  color: "#9B30D9",
                  desc: "Available all across India.",
                  links: [
                    {
                      label: "Keyar Exports",
                      href: "https://www.meesho.com/KEYAREXPORTS",
                    },
                    {
                      label: "ARS Clothing",
                      href: "https://www.meesho.com/ARSCLOTHING",
                    },
                    {
                      label: "Esteem Wears",
                      href: "https://www.meesho.com/EsteemWears",
                    },
                  ],
                },
              ].map((p, i) => (
                <Reveal key={p.name} direction="up" delay={i * 0.12}>
                  <div
                    style={{
                      padding: "40px",
                      background: "#fafaf7",
                      border: "1px solid #e8e2d9",
                      borderRadius: "4px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "2px",
                        background: p.color,
                        marginBottom: "16px",
                      }}
                    />
                    <div
                      style={{
                        fontSize: "32px",
                        fontWeight: 800,
                        color: "#1a1a1a",
                        fontFamily: "'Playfair Display', serif",
                        marginBottom: "6px",
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: p.color,
                        marginBottom: "16px",
                      }}
                    >
                      {p.badge}
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#7a7a7a",
                        lineHeight: 1.75,
                        margin: "0 0 24px",
                      }}
                    >
                      {p.desc}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {p.links.map((link, j) => (
                        <Reveal
                          key={link.label}
                          direction="up"
                          delay={i * 0.12 + j * 0.08}
                        >
                          <Link
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shop-link"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              fontSize: "18px",
                              fontWeight: 700,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: p.color,
                              textDecoration: "none",
                              borderBottom: `1px solid ${p.color}`,
                              paddingBottom: "2px",
                              width: "fit-content",
                            }}
                          >
                            {link.label}{" "}
                            <span style={{ fontSize: "14px" }}>→</span>
                          </Link>
                        </Reveal>
                      ))}
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#7a7a7a",
                        lineHeight: 1.75,
                        margin: "24px 0 0",
                      }}
                    >
                      View on the above platform to shop our full collection and
                      read reviews from
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Rating display */}
            <Reveal direction="up" delay={0.2}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "6px",
                    marginBottom: "16px",
                  }}
                >
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: "28px",
                        height: "28px",
                        background: "#c9a96e",
                        clipPath:
                          "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                      }}
                    />
                  ))}
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      background:
                        "linear-gradient(to right, #c9a96e 10%, #e0d8cc 10%)",
                      clipPath:
                        "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "72px",
                    fontWeight: 800,
                    color: "#1a1a1a",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  4.1
                  <span
                    style={{ fontSize: "28px", color: "#bbb", fontWeight: 700 }}
                  >
                    /5
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#9a9a9a",
                    marginTop: "12px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  Average across 1,00,000+ verified reviews
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section
          style={{
            background: "linear-gradient(150deg, #141414 0%, #1e1a16 100%)",
            padding: "140px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "700px",
                height: "700px",
                border: "1px solid rgba(201,169,110,0.06)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "500px",
                height: "500px",
                border: "1px solid rgba(201,169,110,0.04)",
                borderRadius: "50%",
              }}
            />
          </div>
          <div
            style={{
              maxWidth: "680px",
              margin: "0 auto",
              position: "relative",
            }}
          >
            <Reveal direction="up">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background: "#c9a96e",
                  }}
                />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#c9a96e",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Shop Now
                </span>
                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background: "#c9a96e",
                  }}
                />
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "60px",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  marginBottom: "24px",
                }}
              >
                Comfort Your Family
                <br />
                <em style={{ fontStyle: "italic", color: "#c9a96e" }}>
                  Deserves.
                </em>
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <p
                style={{
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.85,
                  marginBottom: "48px",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Join over one lakh families who have made Esteem their everyday
                choice. Shop our full collection on your preferred platform.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <a className="cta-primary" href="catalogue">
                  View our products
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
