"use client";

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  /** Optional sketch/blueprint image rendered over the final media.
   *  Crossfades to 0 as scroll progresses — used for the
   *  "sketch → finished house" transformation. */
  sketchSrc?: string;
  posterSrc?: string;
  bgImageSrc: string;
  /** Optional sketch background that crossfades to bgImageSrc. */
  sketchBgSrc?: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  sketchSrc,
  posterSrc,
  bgImageSrc,
  sketchBgSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1,
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        // Increase sensitivity for mobile, especially when scrolling back
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005; // Higher sensitivity for scrolling back
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1,
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("wheel", handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener("scroll", handleScroll as EventListener);
    window.addEventListener(
      "touchstart",
      handleTouchStart as unknown as EventListener,
      { passive: false },
    );
    window.addEventListener(
      "touchmove",
      handleTouchMove as unknown as EventListener,
      { passive: false },
    );
    window.addEventListener("touchend", handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel as unknown as EventListener,
      );
      window.removeEventListener("scroll", handleScroll as EventListener);
      window.removeEventListener(
        "touchstart",
        handleTouchStart as unknown as EventListener,
      );
      window.removeEventListener(
        "touchmove",
        handleTouchMove as unknown as EventListener,
      );
      window.removeEventListener("touchend", handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Fixed media box — no expansion.
  const mediaWidth = isMobileState ? 950 : 1550;
  const mediaHeight = isMobileState ? 600 : 800;

  return (
    <div
      ref={sectionRef}
      className="transition-colors duration-700 ease-in-out overflow-x-hidden"
    >
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          {/* Final background — fades in as user scrolls */}
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: sketchBgSrc ? scrollProgress : 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt="Background"
              width={1920}
              height={1080}
              className="w-screen h-screen"
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>

          {/* Sketch background — fades out as user scrolls */}
          {sketchBgSrc && (
            <motion.div
              className="absolute inset-0 z-0 h-full"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 - scrollProgress }}
              transition={{ duration: 0.1 }}
            >
              <Image
                src={sketchBgSrc}
                alt="Sketch background"
                width={1920}
                height={1080}
                className="w-screen h-screen"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  filter: "grayscale(1) contrast(1.15)",
                }}
                priority
              />
              <div className="absolute inset-0 bg-cream/30" />
            </motion.div>
          )}

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              <div
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.3)",
                }}
              >
                {mediaType === "video" ? (
                  mediaSrc.includes("youtube.com") ? (
                    <div className="relative w-full h-full pointer-events-none">
                      <iframe
                        width="100%"
                        height="100%"
                        src={
                          mediaSrc.includes("embed")
                            ? mediaSrc +
                              (mediaSrc.includes("?") ? "&" : "?") +
                              "autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1"
                            : mediaSrc.replace("watch?v=", "embed/") +
                              "?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=" +
                              mediaSrc.split("v=")[1]
                        }
                        className="w-full h-full rounded-xl"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div
                        className="absolute inset-0 z-10"
                        style={{ pointerEvents: "none" }}
                      ></div>

                      <motion.div
                        className="absolute inset-0 bg-black/30 rounded-xl"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-full pointer-events-none">
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover rounded-xl"
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div
                        className="absolute inset-0 z-10"
                        style={{ pointerEvents: "none" }}
                      ></div>

                      <motion.div
                        className="absolute inset-0 bg-black/30 rounded-xl"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className="relative w-full h-full">
                    {/* Finished house photo */}
                    <Image
                      src={mediaSrc}
                      alt={title || "Media content"}
                      width={1280}
                      height={720}
                      className="w-full h-full object-cover rounded-xl"
                    />

                    {/* Drawn-line house — strokes animate in over the first 40% of scroll */}
                    {sketchSrc && (
                      <svg
                        viewBox="0 0 100 60"
                        preserveAspectRatio="xMidYMid meet"
                        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
                        style={{ opacity: Math.max(0, 1 - scrollProgress * 1.4) }}
                      >
                        {(() => {
                          const draw = Math.min(1, scrollProgress / 0.4);
                          const dash = (delay: number, duration = 0.25) => {
                            const local = Math.min(
                              1,
                              Math.max(0, (draw - delay) / duration),
                            );
                            return {
                              pathLength: 1,
                              strokeDasharray: 1,
                              strokeDashoffset: 1 - local,
                              fill: "none" as const,
                              stroke: "#f3ead8",
                              strokeWidth: 0.25,
                              strokeLinecap: "round" as const,
                              strokeLinejoin: "round" as const,
                              vectorEffect: "non-scaling-stroke" as const,
                            };
                          };
                          return (
                            <>
                              {/* ground */}
                              <line x1="15" y1="50" x2="85" y2="50" {...dash(0)} />
                              {/* left wall */}
                              <line x1="25" y1="50" x2="25" y2="28" {...dash(0.15)} />
                              {/* right wall */}
                              <line x1="75" y1="50" x2="75" y2="28" {...dash(0.15)} />
                              {/* roof */}
                              <polyline points="22,30 50,12 78,30" {...dash(0.3)} />
                              {/* door */}
                              <rect x="46" y="38" width="8" height="12" {...dash(0.5)} />
                              {/* left window */}
                              <rect x="31" y="34" width="8" height="8" {...dash(0.6)} />
                              <line x1="35" y1="34" x2="35" y2="42" {...dash(0.65)} />
                              <line x1="31" y1="38" x2="39" y2="38" {...dash(0.65)} />
                              {/* right window */}
                              <rect x="61" y="34" width="8" height="8" {...dash(0.6)} />
                              <line x1="65" y1="34" x2="65" y2="42" {...dash(0.65)} />
                              <line x1="61" y1="38" x2="69" y2="38" {...dash(0.65)} />
                            </>
                          );
                        })()}
                      </svg>
                    )}

                    {/* Sketch overlay — crossfades to finished as scroll progresses */}
                    {sketchSrc && (
                      <motion.div
                        className="absolute inset-0 rounded-xl overflow-hidden"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 - scrollProgress }}
                        transition={{ duration: 0.1 }}
                      >
                        <Image
                          src={sketchSrc}
                          alt="Sketch"
                          width={1280}
                          height={720}
                          className="w-full h-full object-cover rounded-xl"
                          style={{
                            filter:
                              "grayscale(1) contrast(1.25) brightness(1.05)",
                          }}
                        />
                        <div className="absolute inset-0 bg-cream/20 mix-blend-screen rounded-xl" />
                      </motion.div>
                    )}

                    <motion.div
                      className="absolute inset-0 bg-black/50 rounded-xl"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.5 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className="flex flex-col items-center text-center relative z-10 mt-4">
                  {date && <p className="text-2xl text-cream/80">{date}</p>}
                  {scrollToExpand && (
                    <p className="text-cream/80 font-medium text-center">
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              {title && (
                <h2
                  className={`text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] text-cream text-center w-full relative z-10 flex flex-wrap justify-center gap-x-[0.3em] ${
                    textBlend ? "mix-blend-difference" : "mix-blend-normal"
                  }`}
                  aria-label={title}
                >
                  {title.split(" ").map((word, i) => (
                    <span
                      key={`${word}-${i}`}
                      aria-hidden
                      className="inline-block overflow-hidden leading-[1.15] py-[0.05em]"
                    >
                      <motion.span
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{
                          duration: 1,
                          ease: [0.455, 0.03, 0.515, 0.955],
                          delay: 0.15 + i * 0.09,
                        }}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </h2>
              )}
            </div>

            <motion.section
              className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
