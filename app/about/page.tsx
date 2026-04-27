"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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
      { threshold }, // threshold is a dependency but it's stable (default param), so it's fine
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]); // Added threshold to deps
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
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
  body { overflow-x: hidden; }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes pulseRing {
    0%, 100% { transform: scale(1); opacity: 0.4; }
    50%       { transform: scale(1.08); opacity: 0.8; }
  }

  .hero-line-1 { animation: fadeSlideUp 1s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
  .hero-line-2 { animation: fadeSlideUp 1s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
  .hero-line-3 { animation: fadeSlideUp 1s cubic-bezier(0.16,1,0.3,1) 0.4s both; }

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

  .timeline-item {
    position: relative;
    padding-left: 40px;
  }
  .timeline-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, #c9a96e, transparent);
  }
  .timeline-item::after {
    content: '';
    position: absolute;
    left: -6px;
    top: 0;
    width: 14px;
    height: 14px;
    background: #c9a96e;
    border-radius: 50%;
    border: 3px solid #141414;
  }

  .team-card {
    padding: 40px;
    background: linear-gradient(145deg, rgba(255,255,255,0.05), transparent);
    border: 1px solid rgba(201,169,110,0.15);
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  .team-card:hover {
    border-color: rgba(201,169,110,0.4);
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  }

  .value-card {
    padding: 36px;
    background: #fafaf7;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  .value-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.08);
  }

  @media (max-width: 900px) {
    .two-col { flex-direction: column !important; }
    .three-col { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 600px) {
    .hero-title { font-size: 48px !important; }
    .section-title { font-size: 36px !important; }
  }
`;

export default function About() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          overflowX: "hidden",
          background: "#fafaf7",
          color: "#1a1a1a",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section
          style={{
            minHeight: "100vh",
            background:
              "linear-gradient(150deg, #141414 0%, #1e1a16 60%, #241e18 100%)",
            display: "flex",
            alignItems: "center",
            padding: "120px 48px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Geometry */}
          <div
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            <div
              style={{
                position: "absolute",
                top: "-15%",
                right: "-8%",
                width: "680px",
                height: "680px",
                border: "1px solid rgba(201,169,110,0.08)",
                borderRadius: "50%",
                animation: "rotateSlow 40s linear infinite",
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
          </div>

          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              position: "relative",
              width: "100%",
            }}
          >
            <Reveal>
              <div
                style={{
                  display: "flex",
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
                  }}
                >
                  Our Journey
                </span>
              </div>
            </Reveal>

            <div className="hero-line-2">
              <h1
                className="hero-title"
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
                Built on Legacy.
                <br />
                <em style={{ fontStyle: "italic", color: "#c9a96e" }}>
                  Driven
                </em>{" "}
                by Trust.
              </h1>
            </div>

            <div className="hero-line-3">
              <p
                style={{
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.85,
                  maxWidth: "540px",
                  fontWeight: 400,
                }}
              >
                From Tiruppur&apos;s textile heartland to homes across India,
                Esteem Innerwear has spent over three decades redefining
                everyday comfort with organic cotton, precision craftsmanship,
                and unwavering consistency.
              </p>
            </div>
          </div>
        </section>

        {/* ── FOUNDING STORY ────────────────────────────────────────────── */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "140px 48px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "100px",
              alignItems: "flex-start",
              flexWrap: "wrap",
              marginBottom: "80px",
            }}
          >
            {/* Timeline */}
            <div style={{ flex: "0 0 320px" }}>
              <Reveal direction="left">
                <div style={{ paddingTop: "20px" }}>
                  {[
                    {
                      year: "1993",
                      event: "Krishnaswamy P founds textile mill in Tiruppur",
                    },
                    {
                      year: "2005",
                      event: "Transition to innerwear specialization",
                    },
                    {
                      year: "2013",
                      event:
                        "Launch on Amazon, Flipkart and Meesho as online retailer",
                    },
                    {
                      year: "2015",
                      event: "1 Lakh+ products delivered milestone",
                    },
                    {
                      year: "2021",
                      event: "5 Lakh+ happy customers",
                    },
                    {
                      year: "2024",
                      event: "1 Lakh+ customer reviews milestone",
                    },
                    {
                      year: "2026",
                      event: "10 Lakh+ happy customers and is still improving",
                    },
                  ].map((item, i) => (
                    <div
                      key={item.year}
                      className="timeline-item"
                      style={{ marginBottom: i < 4 ? "60px" : 0 }}
                    >
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          color: "#c9a96e",
                          textTransform: "uppercase",
                          marginBottom: "4px",
                        }}
                      >
                        {item.year}
                      </div>
                      <div
                        style={{
                          fontSize: "15px",
                          color: "#5a5a5a",
                          lineHeight: 1.6,
                          fontWeight: 500,
                        }}
                      >
                        {item.event}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: "280px" }}>
              <Reveal direction="right" delay={0.1}>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "52px",
                    fontWeight: 800,
                    color: "#1a1a1a",
                    letterSpacing: "-0.02em",
                    marginBottom: "28px",
                    lineHeight: 1.08,
                  }}
                >
                  The Esteem
                  <br />
                  <em
                    style={{
                      fontStyle: "italic",
                      color: "#8a7a6a",
                      fontWeight: 700,
                    }}
                  >
                    Story
                  </em>
                </h2>
              </Reveal>

              <Reveal direction="right" delay={0.2}>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#6b6b6b",
                    lineHeight: 1.85,
                    marginBottom: "20px",
                  }}
                >
                  Krishnaswamy P , with over 40 years of garment
                  manufacturing expertise, established Esteem with a singular
                  vision: deliver comfort that every Indian family deserves,
                  without compromise on quality or affordability.
                </p>
              </Reveal>

              <Reveal direction="right" delay={0.3}>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#6b6b6b",
                    lineHeight: 1.85,
                    marginBottom: "20px",
                  }}
                >
                  Starting from Tiruppur &mdash; India&apos;s textile capital
                  &mdash; Esteem grew organically by mastering the craft of
                  innerwear. The brand focused obsessively on three pillars:
                  100% organic cotton, skin-safe dyes, and consistent sizing.
                </p>
              </Reveal>

              <Reveal direction="right" delay={0.4}>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#6b6b6b",
                    lineHeight: 1.85,
                  }}
                >
                  When e-commerce arrived, Esteem was ready. Within a decade
                  online, the brand achieved Prime Seller status on Amazon,
                  Golden Seller on Flipkart, and Top Seller on Meesho &mdash;
                  each badge earned through thousands of customer reviews and a
                  consistent 4.1+ rating.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── THE FOUNDER ───────────────────────────────────────────────── */}
        <section
          style={{
            background: "#f5f0e8",
            padding: "100px 48px",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <Reveal direction="up">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
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
                  }}
                >
                  Leadership
                </span>
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
                  marginBottom: "56px",
                }}
              >
                Krishnaswamy P 
              </h2>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "60px",
                alignItems: "start",
              }}
            >
              <Reveal direction="left" delay={0.2}>
                <div
                  style={{
                    background: "#1a1a1a",
                    borderRadius: "4px",
                    padding: "48px 40px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Corner accent */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "80px",
                      height: "80px",
                      borderBottom: "1px solid rgba(201,169,110,0.2)",
                      borderLeft: "1px solid rgba(201,169,110,0.2)",
                    }}
                  />

                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#c9a96e",
                      marginBottom: "24px",
                    }}
                  >
                    Founder & Director
                  </div>

                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "56px",
                      fontWeight: 800,
                      color: "#c9a96e",
                      lineHeight: 1,
                      marginBottom: "8px",
                    }}
                  >
                    40+
                  </div>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "13px",
                      marginBottom: "40px",
                    }}
                  >
                    Years in garment manufacturing
                  </p>

                  <div
                    style={{
                      paddingTop: "32px",
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#fff",
                        marginBottom: "4px",
                      }}
                    >
                      M. Krishnaswamy P
                    </div>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.35)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        margin: 0,
                      }}
                    >
                      Founder & Visionary Leader
                    </p>
                  </div>

                  <div
                    style={{
                      marginTop: "32px",
                      paddingTop: "32px",
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.5)",
                        lineHeight: 1.7,
                        fontStyle: "italic",
                        margin: 0,
                      }}
                    >
                      &ldquo;Quality is never an accident. It&apos;s a
                      discipline, a choice, and a responsibility we make every
                      single day.&rdquo;
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.3}>
                <div>
                  <h3
                    style={{
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#1a1a1a",
                      marginBottom: "20px",
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    A Craftsman&apos;s Philosophy
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "15px",
                        color: "#6b6b6b",
                        lineHeight: 1.85,
                        margin: 0,
                      }}
                    >
                      Krishnaswamy P&apos;s journey in textiles began in the
                      early 1980s, when Tiruppur was transforming into a global
                      manufacturing hub. While others chased volume, he pursued
                      mastery.
                    </p>

                    <p
                      style={{
                        fontSize: "15px",
                        color: "#6b6b6b",
                        lineHeight: 1.85,
                        margin: 0,
                      }}
                    >
                      For two decades, he built reputation through institutional
                      clients and private labels. But a question lingered: what
                      if he could serve families directly, with the same rigor
                      he&apos;d applied to bulk orders?
                    </p>

                    <p
                      style={{
                        fontSize: "15px",
                        color: "#6b6b6b",
                        lineHeight: 1.85,
                        margin: 0,
                      }}
                    >
                      Esteem was born from that conviction. Not as a quick play
                      at scale, but as a deliberate commitment to one promise:
                      comfort that lasts, quality you trust, at a price that
                      makes sense.
                    </p>

                    <p
                      style={{
                        fontSize: "15px",
                        color: "#6b6b6b",
                        lineHeight: 1.85,
                        margin: 0,
                      }}
                    >
                      Today, with his son and a dedicated team, Krishnaswamy
                      oversees every aspect of the operation &mdash; from cotton
                      sourcing to final dispatch. That hands-on philosophy,
                      unchanged for decades, is why every piece bears his stamp
                      of care.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── CORE VALUES ───────────────────────────────────────────────── */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "140px 48px",
          }}
        >
          <Reveal direction="up">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{ width: "40px", height: "1px", background: "#c9a96e" }}
              />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#c9a96e",
                }}
              >
                Philosophy
              </span>
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
                marginBottom: "72px",
              }}
            >
              Simplicity. Quality. Consistency.
            </h2>
          </Reveal>

          <div
            className="three-col"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {[
              {
                title: "100% Organic Cotton",
                desc: "We don&apos;t compromise on material. Every thread is certified organic, breathable, and designed for year-round comfort across India&apos;s diverse climate.",
              },
              {
                title: "Skin-Safe Dyes",
                desc: "Hypoallergenic, dermatologist-approved dyes that won&apos;t fade or irritate. Testing standards exceed industry requirements by 2x.",
              },
              {
                title: "Precision Craftsmanship",
                desc: "Decades of expertise distilled into every stitch. Our quality control process ensures zero tolerance for defects.",
              },
              {
                title: "Family-First Design",
                desc: "Innerwear for ages 2 to 80. Every size, every fit, every fabric choice is informed by real family feedback.",
              },
              {
                title: "Consistent Supply",
                desc: "Strong operational backbone ensures regular stock, fast fulfillment, and no backorders. Reliability is our promise.",
              },
              {
                title: "Affordable Pricing",
                desc: "Premium quality shouldn&apos;t require a premium budget. We maintain thin margins to make comfort accessible to every household.",
              },
            ].map((val, i) => (
              <Reveal key={val.title} direction="up" delay={i * 0.08}>
                <div className="value-card">
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#1a1a1a",
                      marginBottom: "12px",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {val.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#7a7a7a",
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {val.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── OPERATIONS ────────────────────────────────────────────────── */}
        <section
          style={{
            background: "#f5f0e8",
            padding: "100px 48px",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <Reveal direction="up">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
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
                  }}
                >
                  How We Work
                </span>
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
                  marginBottom: "56px",
                }}
              >
                From Cotton to Your Door
              </h2>
            </Reveal>

            <div
              className="three-col"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
              }}
            >
              {[
                {
                  step: "01",
                  title: "Sourcing",
                  desc: "We partner with certified organic cotton farms across India, ensuring traceability from seed to fabric.",
                },
                {
                  step: "02",
                  title: "Dyeing & Finishing",
                  desc: "Our in-house facility applies skin-safe dyes using proprietary processes. Every batch is tested for color fastness and safety.",
                },
                {
                  step: "03",
                  title: "Cutting & Sewing",
                  desc: "Precision patterns ensure consistent fit across all sizes. Master tailors oversee quality at every station.",
                },
                {
                  step: "04",
                  title: "Quality Check",
                  desc: "Three-stage inspection: fabric, construction, and final. Less than 0.5% defect rate across all products.",
                },
                {
                  step: "05",
                  title: "Packaging",
                  desc: "Eco-friendly packaging materials that protect the product while minimizing environmental impact.",
                },
                {
                  step: "06",
                  title: "Fulfillment",
                  desc: "Partnership with Amazon, Flipkart, and Meesho ensures fast, reliable delivery to your doorstep.",
                },
              ].map((item, i) => (
                <Reveal key={item.step} direction="up" delay={i * 0.08}>
                  <div className="value-card">
                    <div
                      style={{
                        fontSize: "32px",
                        fontWeight: 800,
                        color: "#c9a96e",
                        fontFamily: "'Playfair Display', serif",
                        marginBottom: "12px",
                      }}
                    >
                      {item.step}
                    </div>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#1a1a1a",
                        marginBottom: "8px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#7a7a7a",
                        lineHeight: 1.75,
                        margin: 0,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PLATFORMS ────────────────────────────────────────────────── */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "140px 48px",
          }}
        >
          <Reveal direction="up">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{ width: "40px", height: "1px", background: "#c9a96e" }}
              />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#c9a96e",
                }}
              >
                Where to Shop
              </span>
              <div
                style={{ width: "40px", height: "1px", background: "#c9a96e" }}
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
                textAlign: "center",
                marginBottom: "24px",
              }}
            >
              Available on All Major Platforms
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <p
              style={{
                fontSize: "15px",
                color: "#7a7a7a",
                textAlign: "center",
                maxWidth: "520px",
                margin: "0 auto 72px",
                lineHeight: 1.8,
              }}
            >
              Shop Esteem on your preferred marketplace. Every platform offers
              the same quality, same pricing, and same 24/7 customer support.
            </p>
          </Reveal>

          <div
            className="three-col"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {[
              {
                name: "Amazon",
                badge: "Prime Seller",
                color: "#FF9900",
                desc: "Fast 2-day shipping with Prime. Best for quick reorders.",
              },
              {
                name: "Flipkart",
                badge: "Golden Seller",
                color: "#2874F0",
                desc: "Flipkart Plus benefits. Free returns on all Esteem products.",
              },
              {
                name: "Meesho",
                badge: "Top Seller",
                color: "#9B30D9",
                desc: "Exclusive Meesho deals. Referral discounts available.",
              },
            ].map((p, i) => (
              <Reveal key={p.name} direction="up" delay={i * 0.12}>
                <div
                  style={{
                    padding: "40px",
                    background: "#fafaf7",
                    border: "1px solid #e8e2d9",
                    borderRadius: "4px",
                    transition: "all 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      p.color;
                    (e.currentTarget as HTMLDivElement).style.transform =
                      "translateY(-6px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      `0 20px 60px rgba(0,0,0,0.08)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "#e8e2d9";
                    (e.currentTarget as HTMLDivElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "none";
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
                      fontSize: "22px",
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
                      margin: 0,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── SUSTAINABILITY ────────────────────────────────────────────── */}
        <section
          style={{
            background: "#f5f0e8",
            padding: "100px 48px",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <Reveal direction="up">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
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
                  }}
                >
                  Responsibility
                </span>
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
                  marginBottom: "56px",
                }}
              >
                Committed to the Planet
              </h2>
            </Reveal>

            <div
              className="two-col"
              style={{
                display: "flex",
                gap: "60px",
                alignItems: "start",
              }}
            >
              <Reveal direction="left" delay={0.2}>
                <div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#1a1a1a",
                      marginBottom: "20px",
                    }}
                  >
                    Organic Cotton Only
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#7a7a7a",
                      lineHeight: 1.8,
                      marginBottom: "20px",
                      margin: 0,
                    }}
                  >
                    No synthetic pesticides or fertilizers. Every cotton bale is
                    certified by third-party auditors. This protects both farmer
                    health and soil quality.
                  </p>

                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#1a1a1a",
                      marginBottom: "20px",
                      marginTop: "40px",
                    }}
                  >
                    Water-Conscious Dyeing
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#7a7a7a",
                      lineHeight: 1.8,
                      marginBottom: "20px",
                      margin: 0,
                    }}
                  >
                    Our facility recycles 85% of water used in the dyeing
                    process. Chemical runoff is treated before release into
                    local water systems.
                  </p>

                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#1a1a1a",
                      marginBottom: "20px",
                      marginTop: "40px",
                    }}
                  >
                    Zero Landfill Commitment
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#7a7a7a",
                      lineHeight: 1.8,
                      margin: 0,
                    }}
                  >
                    Fabric offcuts are donated to local communities for reuse.
                    Packaging uses 100% recyclable and biodegradable materials.
                  </p>
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.3}>
                <div
                  style={{
                    background: "#1a1a1a",
                    borderRadius: "4px",
                    padding: "48px 40px",
                    height: "100%",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: "36px",
                    }}
                  >
                    Environmental Impact (Annual)
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "28px",
                    }}
                  >
                    {[
                      { metric: "85%", desc: "Water Recycled in Production" },
                      { metric: "100%", desc: "Organic Cotton Sourcing" },
                      { metric: "Zero", desc: "Landfill Waste" },
                      {
                        metric: "3.2M",
                        desc: "Sq. Meters Organic Farms Supported",
                      },
                    ].map((item) => (
                      <div key={item.desc}>
                        <div
                          style={{
                            fontSize: "28px",
                            fontWeight: 800,
                            color: "#c9a96e",
                            fontFamily: "'Playfair Display', serif",
                          }}
                        >
                          {item.metric}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.4)",
                            marginTop: "4px",
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                          }}
                        >
                          {item.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────────────────── */}
        <section
          style={{
            background: "#141414",
            padding: "100px 48px",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <Reveal direction="up">
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "48px",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  textAlign: "center",
                  marginBottom: "64px",
                }}
              >
                By the Numbers
              </h2>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "24px",
              }}
            >
              {[
                { value: "30+", label: "Years in Textiles" },
                { value: "10+", label: "Years Online" },
                { value: "100K+", label: "Customer Reviews" },
                { value: "4.1", label: "Average Rating" },
                { value: "25+", label: "SKUs" },
              ].map((stat, i) => (
                <Reveal key={stat.label} direction="up" delay={i * 0.08}>
                  <div
                    style={{
                      padding: "36px",
                      border: "1px solid rgba(201,169,110,0.15)",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "44px",
                        fontWeight: 800,
                        color: "#c9a96e",
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.4)",
                        marginTop: "12px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── VISION ────────────────────────────────────────────────────── */}
        <section
          style={{
            background:
              "linear-gradient(150deg, #141414 0%, #1e1a16 60%, #241e18 100%)",
            padding: "140px 48px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
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
          </div>

          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              textAlign: "center",
              position: "relative",
            }}
          >
            <Reveal direction="up">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
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
                  }}
                >
                  Looking Ahead
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
                Our Vision
                <br />
                <em style={{ fontStyle: "italic", color: "#c9a96e" }}>
                  for Tomorrow
                </em>
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p
                style={{
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.85,
                  marginBottom: "48px",
                }}
              >
                Esteem will expand its product range beyond innerwear into
                everyday essentials &mdash; all guided by the same principles of
                organic materials, ethical production, and family-first design.
                We&apos;re exploring direct-to-consumer channels while
                strengthening partnerships with e-commerce platforms. Most
                importantly, we remain committed to the craftspeople, farmers,
                and families who&apos;ve trusted us with their comfort.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <Link href="/catalogue" className="cta-primary">
                Explore Collection
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── CONTACT CTA ───────────────────────────────────────────────── */}
        <section
          style={{
            background: "#fafaf7",
            padding: "100px 48px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <Reveal direction="up">
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "48px",
                  fontWeight: 800,
                  color: "#1a1a1a",
                  letterSpacing: "-0.02em",
                  marginBottom: "20px",
                }}
              >
                Questions?
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <p
                style={{
                  fontSize: "15px",
                  color: "#7a7a7a",
                  lineHeight: 1.85,
                  marginBottom: "36px",
                }}
              >
                Reach out to our customer care team at
                ashclothing@gmail.com or visit our FAQ section. We&apos;re
                here to help, Monday to Saturday, 9 AM to 6 PM IST.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <a
                href="mailto:ashclothing@gmail.com"
                className="cta-primary"
              >
                Get in Touch
              </a>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
