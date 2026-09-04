import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// PROJECT DATA
// ============================================================

const projectsData = [
  {
    title: "AWS Observability Pipeline",
    category: "CLOUD & OBSERVABILITY",
    description:
      "Built an end-to-end AWS metrics observability pipeline using OpenTelemetry, AWS services, ClickHouse, and Grafana for collecting, storing, and visualizing infrastructure metrics.",
    tags: ["AWS", "OpenTelemetry", "Grafana", "ClickHouse"],
    match: "98%",
    episode: "S01 E01"
  },
  {
    title: "OpenTelemetry Metrics Platform",
    category: "OBSERVABILITY",
    description:
      "Developed a push-based metrics pipeline using OpenTelemetry Python SDK and OTLP, integrating the OTel Collector with ClickHouse.",
    tags: ["Python", "OTel", "OTLP", "ClickHouse"],
    match: "97%",
    episode: "S01 E02"
  },
  {
    title: "Grafana Monitoring Dashboard",
    category: "MONITORING",
    description:
      "Created monitoring dashboards for infrastructure and application metrics using Grafana and Prometheus.",
    tags: ["Grafana", "Prometheus", "Docker", "Monitoring"],
    match: "96%",
    episode: "S01 E03"
  },
  {
    title: "WordPress Web Development",
    category: "WEB DEVELOPMENT",
    description:
      "Developed and customized responsive WordPress websites using Elementor, themes, plugins, custom CSS, forms and menus.",
    tags: ["WordPress", "Elementor", "CSS", "JavaScript"],
    match: "95%",
    episode: "S01 E04"
  },
  {
    title: "Kong API Observability",
    category: "API & DISTRIBUTED TRACING",
    description:
      "Worked with Kong API Gateway and OpenTelemetry to build distributed tracing and observability for API-based services.",
    tags: ["Kong", "OpenTelemetry", "Tracing", "APIs"],
    match: "94%",
    episode: "S01 E05"
  }
];

// ============================================================
// PROJECTS COMPONENT
// ============================================================

const Projects = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileCarouselRef = useRef(null);

  // ============================================================
  // GRID POSITION
  // ============================================================

  const getGridPos = (index) => {
    let row;
    let col;

    if (index < 3) {
      row = 0;
      col = index;
    } else if (index === 3) {
      row = 1;
      col = 0;
    } else if (index === 4) {
      row = 1;
      col = 2;
    } else {
      row = 2;
      col = index - 5;
    }

    return { row, col };
  };

  // ============================================================
  // GSAP ANIMATIONS
  // ============================================================

  useEffect(() => {
    let ctx = gsap.context(() => {

      // --------------------------------------------------------
      // INITIAL CARD STATE
      // --------------------------------------------------------

      cardsRef.current.forEach((card) => {
        if (!card) return;

        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0
        });
      });

      // --------------------------------------------------------
      // RESPONSIVE ANIMATIONS
      // --------------------------------------------------------

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)"
        },
        (context) => {
          const { isDesktop, isMobile } = context.conditions;

          // ======================================================
          // DESKTOP
          // ======================================================

          if (isDesktop) {
            let floatTween;

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 50%",
                end: "bottom 50%",
                toggleActions: "play reverse play reverse",

                onEnter: () => {
                  if (floatTween) floatTween.kill();
                },

                onEnterBack: () => {
                  if (floatTween) floatTween.kill();
                },

                onLeave: () => {
                  if (floatTween) floatTween.kill();
                },

                onLeaveBack: () => {
                  if (floatTween) floatTween.kill();
                }
              },

              onComplete: () => {
                floatTween = gsap.to(cardsRef.current, {
                  y: "+=12",
                  rotation: "+=1",
                  duration: 3.5,
                  yoyo: true,
                  repeat: -1,
                  ease: "sine.inOut",
                  stagger: {
                    amount: 1.5,
                    from: "random"
                  }
                });
              }
            });

            // ----------------------------------------------------
            // STEP 1 - CARDS RISE
            // ----------------------------------------------------

            tl.to(cardsRef.current, {
              y: -140,
              scale: 0.9,
              zIndex: 70,
              duration: 0.6,
              stagger: 0.04,
              ease: "back.out(1.2)"
            });

            // ----------------------------------------------------
            // STEP 2 - CARDS SPREAD INTO GRID
            // ----------------------------------------------------

            tl.to(
              cardsRef.current,
              {
                x: (i) => {
                  const widths = cardsRef.current.map(
                    (card) => card?.offsetWidth || 0
                  );

                  const w = Math.max(...widths) || 360;
                  const gap = 40;

                  const { col } = getGridPos(i);

                  return (col - 1) * (w + gap);
                },

                y: (i) => {
                  const heights = cardsRef.current.map(
                    (card) => card?.offsetHeight || 0
                  );

                  const h = Math.max(...heights) || 240;
                  const gap = 40;

                  const { row } = getGridPos(i);

                  return (row - 1) * (h + gap);
                },

                rotation: () => gsap.utils.random(-3, 3),
                scale: 1,

                duration: 1.4,

                stagger: {
                  amount: 0.4,
                  from: "center"
                },

                ease: "expo.out"
              },
              "-=0.2"
            );
          }

          // ======================================================
          // MOBILE
          // ======================================================

          if (isMobile) {
            const cardW = window.innerWidth * 0.8;
            const gap = 20;

            mobileCardsRef.current.forEach((card, i) => {
              if (!card) return;

              gsap.set(card, {
                x: -(i * (cardW + gap)),
                y: 0,
                scale: 0.4,
                opacity: 0,
                rotation: gsap.utils.random(-15, 15)
              });
            });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%"
              }
            });

            // ----------------------------------------------------
            // MOBILE CARDS APPEAR
            // ----------------------------------------------------

            tl.to(mobileCardsRef.current, {
              y: -100,
              opacity: 1,
              scale: 0.85,
              duration: 0.6,
              stagger: 0.05,
              ease: "back.out(1.2)"
            });

            // ----------------------------------------------------
            // MOBILE CAROUSEL
            // ----------------------------------------------------

            tl.to(
              mobileCardsRef.current,
              {
                x: 0,
                y: 0,

                rotation: 0,

                scale: (i) => {
                  return i === 0 ? 1 : 0.92;
                },

                opacity: (i) => {
                  return i === 0 ? 1 : 0.5;
                },

                duration: 0.8,

                stagger: 0.08,

                ease: "expo.out",

                onComplete: () => {
                  if (mobileCarouselRef.current) {
                    mobileCarouselRef.current.style.overflowX = "auto";
                    mobileCarouselRef.current.style.pointerEvents = "auto";
                  }
                }
              },
              "-=0.2"
            );
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ============================================================
  // JSX
  // ============================================================

  return (
    <section
      id="projects"
      ref={containerRef}
      className="
        bg-[#0b0b0b]
        min-h-[100svh]
        md:min-h-[170vh]
        relative
        font-sans
        overflow-x-clip
        text-white
        w-full
        flex
        items-center
        justify-center
        py-24
        md:py-40
        select-none
      "
    >

      {/* ======================================================
          BACKGROUND TITLE
      ====================================================== */}

      <div
        className="
          absolute
          top-10
          left-0
          w-full
          flex
          items-start
          justify-center
          pointer-events-none
          z-0
        "
      >
        <h1
          className="
            text-[14vw]
            sm:text-[17vw]
            md:text-[20vw]
            font-black
            text-white/[0.03]
            tracking-tighter
            leading-none
            whitespace-nowrap
            uppercase
          "
        >
          ORIGINALS
        </h1>
      </div>

      {/* ======================================================
          AMBIENT RED GLOW
      ====================================================== */}

      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[55vw]
          h-[55vw]
          bg-red-600/15
          rounded-full
          blur-[160px]
          pointer-events-none
          z-0
        "
      />

      {/* ======================================================
          DESKTOP PROJECT GRID
      ====================================================== */}

      <div
        className="
          relative
          w-full
          max-w-7xl
          h-full
          flex
          items-center
          justify-center
          perspective-[2000px]
          z-10
        "
      >

        {/* Origin point for desktop card animation */}

        <div
          className="
            relative
            w-0
            h-0
            transform-style-3d
          "
        >

          {/* ==================================================
              DESKTOP PROJECT CARDS
          ================================================== */}

          {projectsData.map((project, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="
                hidden
                md:block
                absolute
                w-[80vw]
                md:w-[33vw]
                max-w-[380px]
                aspect-[16/10]
                will-change-transform
              "
              style={{
                zIndex: 10 + i
              }}
            >

              <div
                className="
                  w-full
                  h-full
                  rounded-[24px]
                  overflow-hidden
                  border
                  border-white/15
                  bg-[#141414]/95
                  backdrop-blur-2xl
                  shadow-[0_25px_50px_rgba(0,0,0,0.9)]
                  transition-all
                  duration-500
                  group
                  hover:scale-[1.04]
                  hover:border-red-600
                  hover:shadow-[0_35px_80px_rgba(229,9,20,0.35)]
                  hover:-translate-y-2
                  cursor-pointer
                  relative
                  z-10
                  p-7
                  flex
                  flex-col
                  justify-between
                "
              >

                {/* ============================================
                    CARD HEADER
                ============================================ */}

                <div className="flex items-center justify-between">

                  <span
                    className="
                      text-[10px]
                      font-mono
                      font-bold
                      tracking-widest
                      uppercase
                      text-red-500
                      bg-red-600/10
                      px-2.5
                      py-1
                      rounded
                      border
                      border-red-600/20
                    "
                  >
                    {project.episode}
                  </span>

                  <div className="flex items-center gap-2">

                    <span
                      className="
                        text-xs
                        font-mono
                        text-red-400
                        font-bold
                      "
                    >
                      {project.match} Match
                    </span>

                    <span
                      className="
                        text-[10px]
                        font-mono
                        border
                        border-white/30
                        px-1
                        text-white/70
                      "
                    >
                      HD
                    </span>

                  </div>

                </div>

                {/* ============================================
                    CARD CONTENT
                ============================================ */}

                <div className="space-y-2 my-auto">

                  <div
                    className="
                      text-[11px]
                      font-mono
                      uppercase
                      tracking-widest
                      text-white/40
                    "
                  >
                    {project.category}
                  </div>

                  <h3
                    className="
                      text-2xl
                      font-black
                      text-white
                      tracking-tight
                      group-hover:text-red-500
                      transition-colors
                      duration-300
                    "
                  >
                    {project.title}
                  </h3>

                  <p
                    className="
                      text-xs
                      text-white/70
                      font-light
                      leading-relaxed
                      line-clamp-2
                    "
                  >
                    {project.description}
                  </p>

                </div>

                {/* ============================================
                    TECHNOLOGY TAGS
                ============================================ */}

                <div
                  className="
                    flex
                    flex-wrap
                    gap-1.5
                    pt-3
                    border-t
                    border-white/10
                  "
                >

                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="
                        text-[10px]
                        font-mono
                        text-white/70
                        bg-white/5
                        px-2
                        py-0.5
                        rounded
                        group-hover:border-red-600/30
                        transition-colors
                      "
                    >
                      {tag}
                    </span>
                  ))}

                </div>

                {/* ============================================
                    RED CORNER ACCENT
                ============================================ */}

                <div
                  className="
                    absolute
                    bottom-4
                    right-4
                    w-2
                    h-2
                    rounded-full
                    bg-red-600
                    group-hover:shadow-[0_0_15px_#E50914]
                    transition-all
                  "
                />

              </div>

            </div>
          ))}

        </div>
      </div>

      {/* ======================================================
          MOBILE PROJECT CAROUSEL
      ====================================================== */}

      <div
        ref={mobileCarouselRef}
        className="
          md:hidden
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-screen
          h-auto
          py-12
          flex
          items-center
          gap-6
          px-[12.5vw]
          pointer-events-none
          z-[100]
          snap-x
          snap-mandatory
          overflow-x-hidden
          hide-scrollbar
        "
      >

        {/* Hide scrollbar */}

        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        {/* ==================================================
            MOBILE PROJECT CARDS
        ================================================== */}

        {projectsData.map((project, i) => (
          <div
            key={`mob-${i}`}
            ref={(el) => {
              mobileCardsRef.current[i] = el;
            }}
            className="
              shrink-0
              w-[78vw]
              aspect-[16/11]
              snap-center
              will-change-transform
              relative
              z-10
            "
          >

            <div
              className="
                w-full
                h-full
                rounded-[24px]
                overflow-hidden
                border
                border-white/15
                bg-[#141414]
                p-6
                flex
                flex-col
                justify-between
                shadow-[0_20px_40px_rgba(0,0,0,0.9)]
              "
            >

              {/* ============================================
                  MOBILE CARD HEADER
              ============================================ */}

              <div className="flex items-center justify-between">

                <span
                  className="
                    text-[10px]
                    font-mono
                    font-bold
                    tracking-widest
                    text-red-500
                    bg-red-600/10
                    px-2
                    py-0.5
                    rounded
                  "
                >
                  {project.episode}
                </span>

                <span
                  className="
                    text-xs
                    font-mono
                    text-red-400
                    font-bold
                  "
                >
                  {project.match} Match
                </span>

              </div>

              {/* ============================================
                  MOBILE CARD CONTENT
              ============================================ */}

              <div className="space-y-2">

                <h3
                  className="
                    text-xl
                    font-black
                    text-white
                  "
                >
                  {project.title}
                </h3>

                <p
                  className="
                    text-xs
                    text-white/70
                    font-light
                    line-clamp-2
                  "
                >
                  {project.description}
                </p>

              </div>

              {/* ============================================
                  MOBILE TECHNOLOGY TAGS
              ============================================ */}

              <div
                className="
                  flex
                  flex-wrap
                  gap-1
                  pt-2
                  border-t
                  border-white/10
                "
              >

                {project.tags.slice(0, 3).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="
                      text-[10px]
                      font-mono
                      text-white/60
                      bg-white/5
                      px-2
                      py-0.5
                      rounded
                    "
                  >
                    {tag}
                  </span>
                ))}

              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Projects;