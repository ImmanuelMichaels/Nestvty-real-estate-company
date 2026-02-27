import { useState, useEffect, useRef } from "react";

const PROPERTIES = [
  {
    id: 1,
    name: "Palm Harbor Villa",
    location: "Palm Harbor, FL",
    price: "$2,400/mo",
    beds: 4,
    baths: 3,
    sqft: 2100,
    tag: "For Rent",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
  },
  {
    id: 2,
    name: "Harbor View Estate",
    location: "Palm Harbor, FL",
    price: "$2,900/mo",
    beds: 5,
    baths: 4,
    sqft: 2800,
    tag: "Featured",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
  {
    id: 3,
    name: "Modern City Loft",
    location: "Tampa Bay, FL",
    price: "$1,800/mo",
    beds: 2,
    baths: 2,
    sqft: 1200,
    tag: "New",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
  },
  {
    id: 4,
    name: "Riverside Penthouse",
    location: "Clearwater, FL",
    price: "$4,200/mo",
    beds: 3,
    baths: 3,
    sqft: 2400,
    tag: "Luxury",
    img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80",
  },
  {
    id: 5,
    name: "Garden Terrace Home",
    location: "St. Petersburg, FL",
    price: "$3,100/mo",
    beds: 4,
    baths: 3,
    sqft: 2200,
    tag: "For Sale",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
  },
  {
    id: 6,
    name: "Bayfront Cottage",
    location: "Dunedin, FL",
    price: "$2,200/mo",
    beds: 3,
    baths: 2,
    sqft: 1600,
    tag: "For Rent",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
  },
];

const SERVICES = [
  {
    title: "Property Buying",
    content:
      "Explore a diverse selection of homes, apartments, and properties thoughtfully curated to match your unique lifestyle, preferences, and budget. Whether you're looking for a cozy starter home, a luxurious apartment, or the perfect family space, we have options to suit every need and aspiration.",
  },
  {
    title: "Selling Services",
    content:
      "List your property with confidence. Our expert agents handle everything from professional photography to market analysis, ensuring your home sells quickly and at the best possible price.",
  },
  {
    title: "Rental Solutions",
    content:
      "Find the perfect rental or list your property for rent. We manage the entire process, from tenant screening to lease agreements, making it effortless for both landlords and tenants.",
  },
  {
    title: "Custom Consultations",
    content:
      "Get personalized advice from our seasoned real estate consultants. Whether you're a first-time buyer or an experienced investor, we tailor our guidance to your specific goals.",
  },
  {
    title: "Virtual Tours",
    content:
      "Experience properties from the comfort of your home with our immersive 3D virtual tours. Schedule a live virtual walkthrough with an agent or explore at your own pace.",
  },
];

const FAQS = [
  {
    q: "How do I start my property search?",
    a: "Simply use our search tool to filter properties by your preferred location, price range, and features. You can also explore our Featured Listings, or speak with one of our agents for personalized recommendations.",
  },
  {
    q: "Can I schedule a property tour?",
    a: "Absolutely! Every listing has a 'Schedule a Tour' button. Choose your preferred date and time and one of our agents will confirm within 24 hours.",
  },
  {
    q: "Are there any fees for using your services?",
    a: "Our services are free for buyers and renters. Sellers and landlords pay a competitive commission only upon successful transaction.",
  },
  {
    q: "How can I list my property with you?",
    a: "Click 'List a Property' in the navigation menu, fill out the property details form, and our team will reach out within one business day to complete your listing.",
  },
  {
    q: "Can I schedule a property tour?",
    a: "Yes! Tours can be scheduled online 24/7 or by calling our office directly. We offer both in-person and virtual tour options.",
  },
];

const REVIEWS = [
  {
    name: "Aubrey Simmons",
    role: "Customer",
    text: "Their creative approach and professionalism made the entire process seamless. I highly recommend them for any interior design project.",
    avatar: "AS",
  },
  {
    name: "Marcus Holt",
    role: "Home Buyer",
    text: "Nestvty found us our dream home in just two weeks. Their market knowledge and attentiveness are unparalleled. We couldn't be happier.",
    avatar: "MH",
  },
  {
    name: "Sophia Lane",
    role: "Property Investor",
    text: "As an investor, I need reliable, accurate advice fast. Nestvty delivers every time. My portfolio has grown 30% in the past year with their guidance.",
    avatar: "SL",
  },
];

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function RevealSection({ children, className = "", delay = 0 }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Nestvty() {
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredProperties = PROPERTIES.filter(
    (p) => filterType === "All" || p.tag === filterType
  );

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: "#FAFAF8", color: "#1a1a1a", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --gold: #C9A84C;
          --gold-light: #E8D28A;
          --dark: #111110;
          --cream: #FAFAF8;
          --sand: #F2EDE4;
          --muted: #7a7a72;
        }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        .dm { font-family: 'DM Sans', sans-serif; }
        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1a1a1a;
          text-decoration: none;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: color 0.2s;
          background: none; border: none;
        }
        .nav-link:hover { color: var(--gold); }
        .btn-primary {
          background: var(--dark);
          color: #fff;
          border: none;
          padding: 13px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.25s, transform 0.2s;
        }
        .btn-primary:hover { background: var(--gold); transform: translateY(-1px); }
        .btn-outline {
          background: transparent;
          color: var(--dark);
          border: 1px solid var(--dark);
          padding: 12px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s;
        }
        .btn-outline:hover { background: var(--dark); color: #fff; }
        .btn-gold {
          background: var(--gold);
          color: #fff;
          border: none;
          padding: 13px 32px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.25s;
        }
        .btn-gold:hover { background: #b8943e; }
        .service-item {
          border-bottom: 1px solid #e8e4dc;
          padding: 20px 0;
          cursor: pointer;
          transition: color 0.2s;
        }
        .service-item:hover .service-title { color: var(--gold); }
        .service-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 500;
          transition: color 0.2s;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .faq-item {
          border-bottom: 1px solid #e0dbd1;
          padding: 18px 0;
          cursor: pointer;
        }
        .faq-q {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .prop-card {
          background: #fff;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }
        .prop-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.12); }
        .prop-img { width: 100%; height: 220px; object-fit: cover; transition: transform 0.5s; }
        .prop-card:hover .prop-img { transform: scale(1.04); }
        .tag {
          display: inline-block;
          background: var(--gold);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 10px;
        }
        .review-card {
          background: #fff;
          padding: 36px;
          border-left: 3px solid var(--gold);
          transition: all 0.4s;
        }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px;
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }
        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.65);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-top: 4px;
        }
        .spin-badge {
          width: 90px; height: 90px;
          border-radius: 50%;
          background: var(--dark);
          display: flex; align-items: center; justify-content: center;
          position: absolute; right: 40px; bottom: -20px;
          animation: spinBadge 12s linear infinite;
          cursor: pointer;
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        }
        @keyframes spinBadge {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-badge svg { position: absolute; }
        .spin-inner { color: #fff; font-size: 20px; z-index:1; animation: spinBadge 12s linear infinite reverse; }
        .hero-img {
          width: 100%; height: 420px; object-fit: cover;
          filter: brightness(0.88);
        }
        @media (max-width: 768px) {
          .hero-img { height: 260px; }
          .stat-num { font-size: 36px; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .hide-mobile { display: none !important; }
        }
        .search-modal {
          position: fixed; inset: 0; background: rgba(17,17,16,0.85);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000; backdrop-filter: blur(4px);
        }
        .search-inner {
          background: var(--cream); padding: 48px; width: 90%; max-width: 560px;
        }
        .search-input {
          width: 100%; border: none; border-bottom: 2px solid var(--dark);
          background: transparent; font-family: 'Cormorant Garamond', serif;
          font-size: 28px; padding: 12px 0; outline: none; color: var(--dark);
        }
        .mobile-menu {
          position: fixed; inset: 0; background: var(--dark);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          z-index: 999; gap: 32px;
        }
        .mobile-nav-link {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px; color: #fff; text-decoration: none; cursor: pointer;
          background: none; border: none; letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: var(--gold); }
        .nav-bg {
          transition: background 0.4s, box-shadow 0.4s;
        }
        .underline-anim {
          position: relative; display: inline-block;
        }
        .underline-anim::after {
          content: ''; position: absolute; bottom: -2px; left: 0;
          width: 0; height: 1px; background: var(--gold);
          transition: width 0.3s;
        }
        .underline-anim:hover::after { width: 100%; }
        input, textarea { outline: none; }
        .contact-input {
          width: 100%; border: none; border-bottom: 1px solid #ccc;
          background: transparent; font-family: 'DM Sans', sans-serif;
          font-size: 14px; padding: 12px 0; color: var(--dark);
          transition: border-color 0.2s;
        }
        .contact-input:focus { border-color: var(--gold); }
        ::placeholder { color: #aaa; font-family: 'DM Sans', sans-serif; font-size: 14px; }
      `}</style>

      {/* NAVBAR */}
      <nav
        className="nav-bg"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
          padding: "0 48px",
          background: scrolled ? "rgba(250,250,248,0.96)" : "transparent",
          boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.06)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 22, height: 22, background: "var(--gold)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 10, height: 10, background: "#fff", borderRadius: "50%" }} />
          </div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 20, letterSpacing: "0.04em" }}>Nestvty</span>
        </div>

        <div className="hide-mobile" style={{ display: "flex", gap: 36 }}>
          {["Home","Properties","Services","About Us","Contact"].map((l) => (
            <button key={l} className="nav-link underline-anim" onClick={() => scrollTo(l.toLowerCase().replace(" ",""))}>
              {l}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <button
            onClick={() => setSearchOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#1a1a1a" }}
            className="hide-mobile"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
          <button
            className="btn-primary hide-mobile"
            onClick={() => scrollTo("properties")}
            style={{ fontSize: 12, padding: "10px 22px" }}
          >
            List Property
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5 }}
          >
            <span style={{ display: "block", width: 22, height: 1.5, background: "#1a1a1a" }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: "#1a1a1a" }} />
            <span style={{ display: "block", width: 22, height: 1.5, background: "#1a1a1a" }} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 28, right: 40, background: "none", border: "none", cursor: "pointer", color: "#fff" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          {["Home","Properties","Services","About Us","Contact"].map((l) => (
            <button key={l} className="mobile-nav-link" onClick={() => { scrollTo(l.toLowerCase().replace(" ","")); setMenuOpen(false); }}>
              {l}
            </button>
          ))}
        </div>
      )}

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div className="search-modal" onClick={() => setSearchOpen(false)}>
          <div className="search-inner" onClick={(e) => e.stopPropagation()}>
            <p className="dm" style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 24 }}>Search Properties</p>
            <input
              autoFocus
              className="search-input"
              placeholder="Location, property type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
              <button className="btn-primary" onClick={() => { scrollTo("properties"); setSearchOpen(false); }}>Search</button>
              <button className="btn-outline" onClick={() => setSearchOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{ paddingTop: 72, background: "var(--cream)" }}>
        <div style={{ textAlign: "center", padding: "80px 24px 48px" }}>
          <p className="dm" style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>
            Real Estate Excellence
          </p>
          <h1 style={{ fontSize: "clamp(40px, 7vw, 88px)", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.01em", maxWidth: 820, margin: "0 auto 24px" }}>
            Your Journey to the<br />
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>Perfect Home</em> Starts Here
          </h1>
          <p className="dm" style={{ fontSize: 16, color: "var(--muted)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.75, fontWeight: 300 }}>
            Discover the perfect property that fits your lifestyle and budget. Browse from a wide selection of homes, apartments, and commercial spaces with expert guidance at every step.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => scrollTo("properties")}>Start Exploring</button>
            <button className="btn-outline" onClick={() => scrollTo("contact")}>Schedule a Tour</button>
          </div>
        </div>

        {/* Hero Image */}
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ overflow: "hidden", position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85"
              alt="Modern Architecture"
              className="hero-img"
              style={{ width: "100%", height: "clamp(300px, 45vw, 500px)", objectFit: "cover", display: "block" }}
            />
            <div className="spin-badge" onClick={() => scrollTo("contact")}>
              <svg width="90" height="90" viewBox="0 0 90 90">
                <defs>
                  <path id="circle" d="M 45,45 m -32,0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0" />
                </defs>
                <text fill="#C9A84C" fontSize="9.5" fontFamily="DM Sans, sans-serif" letterSpacing="3">
                  <textPath href="#circle">GET IN TOUCH · GET IN TOUCH · </textPath>
                </text>
              </svg>
              <span className="spin-inner">↓</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ background: "var(--dark)", padding: "40px 48px", display: "flex", justifyContent: "center", gap: "clamp(40px, 8vw, 120px)", flexWrap: "wrap" }}>
          {[
            { num: "100%", label: "Satisfaction\nClients" },
            { num: "250", label: "Employees On\nWorldwide" },
            { num: "3469", label: "Projects Completed\nOn 40 Countries" },
          ].map(({ num, label }) => (
            <div key={num} style={{ textAlign: "center" }}>
              <div className="stat-num">{num}</div>
              <div className="stat-label" style={{ whiteSpace: "pre-line", textAlign: "center" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "100px 24px", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="grid-2">
          <RevealSection>
            <p className="dm" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>Our Services</p>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 500, lineHeight: 1.1, marginBottom: 40 }}>
              Here to Help You
            </h2>
            <div>
              {SERVICES.map((s, i) => (
                <div key={i} className="service-item" onClick={() => setActiveService(activeService === i ? -1 : i)}>
                  <div className="service-title">
                    {s.title}
                    <span style={{ color: "var(--gold)", fontSize: 18 }}>{activeService === i ? "−" : "→"}</span>
                  </div>
                  {activeService === i && (
                    <p className="dm" style={{ fontSize: 14, color: "var(--muted)", marginTop: 14, lineHeight: 1.8, fontWeight: 300 }}>
                      {s.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <p className="dm" style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.8, marginBottom: 32, fontWeight: 300 }}>
              Whether you're buying, selling, or renting, we offer tailored solutions to make your experience smooth and stress-free.
            </p>
            <div style={{ overflow: "hidden", height: 420 }}>
              <img
                src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&q=80"
                alt="Modern Property"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ABOUT */}
      <section id="aboutus" style={{ padding: "100px 24px", background: "var(--sand)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="grid-2">
          <RevealSection>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, height: 460 }}>
              <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80" alt="Architecture" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <img src="https://images.unsplash.com/photo-1616137466211-f939a420be84?w=300&q=80" alt="Interior" style={{ width: "100%", flex: 1, objectFit: "cover" }} />
                <div style={{ background: "var(--dark)", flex: 0.6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center" }}>Since 2008</span>
                </div>
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <p className="dm" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>About Us</p>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 500, lineHeight: 1.1, marginBottom: 28 }}>Who We Are</h2>
            <p className="dm" style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.85, marginBottom: 24, fontWeight: 300 }}>
              At Nestvty, we're passionate about helping you find a place to call home. With years of experience in the real estate industry, we connect buyers, sellers, and renters with properties that perfectly fit their needs.
            </p>
            <p className="dm" style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.85, marginBottom: 36, fontWeight: 300 }}>
              Our mission is to make your property journey seamless, transparent, and enjoyable. We believe every person deserves a place they're proud to call home.
            </p>
            <div style={{ display: "flex", gap: 32, marginBottom: 36, flexWrap: "wrap" }}>
              {[["Expert Guidance", "⭐"], ["Wide Selection", "🏠"], ["Trusted Service", "🤝"]].map(([l, i]) => (
                <div key={l} className="dm" style={{ fontSize: 13, color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
                  <span>{i}</span> {l}
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={() => scrollTo("contact")}>Learn More</button>
          </RevealSection>
        </div>
      </section>

      {/* PROPERTIES */}
      <section id="properties" style={{ padding: "100px 24px", background: "var(--dark)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <RevealSection>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p className="dm" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>Listings</p>
              <h2 style={{ fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 500, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
                Discover Our Top Properties
              </h2>
              <p className="dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto 40px", fontWeight: 300 }}>
                Carefully selected properties across the best locations, curated for every budget and lifestyle.
              </p>
              {/* Filter Tabs */}
              <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                {["All", "For Rent", "For Sale", "Featured", "Luxury", "New"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilterType(f)}
                    className="dm"
                    style={{
                      padding: "8px 20px", border: "1px solid",
                      borderColor: filterType === f ? "var(--gold)" : "rgba(255,255,255,0.2)",
                      background: filterType === f ? "var(--gold)" : "transparent",
                      color: filterType === f ? "#fff" : "rgba(255,255,255,0.6)",
                      cursor: "pointer", fontSize: 12, letterSpacing: "0.08em",
                      textTransform: "uppercase", transition: "all 0.25s",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </RevealSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {filteredProperties.map((p, i) => (
              <RevealSection key={p.id} delay={i * 80}>
                <div className="prop-card">
                  <div style={{ overflow: "hidden", position: "relative" }}>
                    <img src={p.img} alt={p.name} className="prop-img" />
                    <span className="tag" style={{ position: "absolute", top: 16, left: 16 }}>{p.tag}</span>
                  </div>
                  <div style={{ padding: "24px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 500 }}>{p.name}</h3>
                      <span className="dm" style={{ fontSize: 18, fontWeight: 500, color: "var(--gold)", fontFamily: "'DM Sans', sans-serif" }}>{p.price}</span>
                    </div>
                    <p className="dm" style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16, display: "flex", alignItems: "center", gap: 4 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {p.location}
                    </p>
                    <div style={{ display: "flex", gap: 20, paddingTop: 16, borderTop: "1px solid #f0ece4" }}>
                      {[["🛏", `${p.beds} Beds`], ["🚿", `${p.baths} Baths`], ["📐", `${p.sqft} sqft`]].map(([icon, val]) => (
                        <span key={val} className="dm" style={{ fontSize: 12, color: "var(--muted)" }}>{icon} {val}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 56 }}>
            <button className="btn-gold">View All Properties</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "100px 24px", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }} className="grid-2">
          <RevealSection>
            <p className="dm" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>FAQ</p>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 500, lineHeight: 1.15 }}>
              Frequently Asked Questions
            </h2>
          </RevealSection>

          <RevealSection delay={150}>
            {FAQS.map((f, i) => (
              <div key={i} className="faq-item" onClick={() => setActiveFaq(activeFaq === i ? -1 : i)}>
                <div className="faq-q">
                  {f.q}
                  <span style={{ color: "var(--gold)", fontSize: 20, fontWeight: 300 }}>{activeFaq === i ? "−" : "+"}</span>
                </div>
                {activeFaq === i && (
                  <p className="dm" style={{ fontSize: 14, color: "var(--muted)", marginTop: 14, lineHeight: 1.8, fontWeight: 300 }}>
                    {f.a}
                  </p>
                )}
              </div>
            ))}
          </RevealSection>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ padding: "100px 24px", background: "var(--sand)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RevealSection>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p className="dm" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>Testimonials</p>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 500, lineHeight: 1.1 }}>Customer Reviews</h2>
            </div>
          </RevealSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {REVIEWS.map((r, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="review-card">
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, color: "var(--gold)", lineHeight: 0.8, display: "block", marginBottom: 20 }}>"</span>
                  <p className="dm" style={{ fontSize: 15, color: "#444", lineHeight: 1.85, marginBottom: 28, fontWeight: 300 }}>{r.text}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span className="dm" style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>{r.avatar}</span>
                    </div>
                    <div>
                      <p className="dm" style={{ fontSize: 14, fontWeight: 500 }}>{r.name}</p>
                      <p className="dm" style={{ fontSize: 12, color: "var(--muted)" }}>{r.role}</p>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 24px", background: "var(--dark)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }} className="grid-2">
          <RevealSection>
            <p className="dm" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>Contact</p>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 600, color: "#fff", lineHeight: 1.0, marginBottom: 28 }}>
              HomeArt<br />
              <span style={{ fontStyle: "italic", fontWeight: 300 }}>Studio</span>
            </h2>
            <p className="dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 40, fontWeight: 300 }}>
              Ready to find your perfect property? Our team of experts is here to guide you every step of the way. Get in touch today.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[["📧", "hello@nestvty.com"], ["📞", "+1 (555) 234-5678"], ["📍", "123 Harbor Blvd, Palm Harbor, FL"]].map(([icon, val]) => (
                <div key={val} className="dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", display: "flex", gap: 12 }}>
                  <span>{icon}</span> {val}
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <div style={{ background: "rgba(255,255,255,0.04)", padding: "48px 40px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                <input className="contact-input" placeholder="Your Name" style={{ color: "#fff", borderBottomColor: "rgba(255,255,255,0.2)" }} />
                <input className="contact-input" placeholder="Email Address" style={{ color: "#fff", borderBottomColor: "rgba(255,255,255,0.2)" }} />
                <input className="contact-input" placeholder="Phone Number" style={{ color: "#fff", borderBottomColor: "rgba(255,255,255,0.2)" }} />
                <textarea
                  className="contact-input"
                  placeholder="Tell us about your property needs..."
                  rows={4}
                  style={{ color: "#fff", borderBottomColor: "rgba(255,255,255,0.2)", resize: "none" }}
                />
                <button className="btn-gold" style={{ alignSelf: "flex-start" }}>Send Message</button>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0a0a09", padding: "60px 48px 40px", color: "rgba(255,255,255,0.4)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }} className="grid-2">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 20, height: 20, background: "var(--gold)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 8, height: 8, background: "#fff", borderRadius: "50%" }} />
                </div>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#fff", fontWeight: 600 }}>Nestvty</span>
              </div>
              <p className="dm" style={{ fontSize: 13, lineHeight: 1.8, maxWidth: 260, fontWeight: 300 }}>
                Your trusted partner in finding the perfect home. Expert guidance at every step of your property journey.
              </p>
            </div>
            {[
              { title: "Navigate", links: ["Home", "Properties", "Services", "About Us"] },
              { title: "Support", links: ["Help Center", "Privacy Policy", "Terms of Use", "Cookies"] },
              { title: "Connect", links: ["Instagram", "Twitter", "LinkedIn", "Facebook"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <p className="dm" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 20, fontWeight: 500 }}>{title}</p>
                {links.map((l) => (
                  <p key={l} className="dm" style={{ fontSize: 13, marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "var(--gold)"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
                  >{l}</p>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <p className="dm" style={{ fontSize: 12 }}>© 2025 Nestvty. All rights reserved.</p>
            <p className="dm" style={{ fontSize: 12 }}>Crafted with care for your perfect home.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
