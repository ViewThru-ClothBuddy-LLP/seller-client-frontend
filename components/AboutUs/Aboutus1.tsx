"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [counterKey, setCounterKey] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(true);

  // Shape refs with descriptive names
  const topRightDonutRef = useRef(null);
  const topLeftCubeRef = useRef(null);
  const bottomRightSphereRef = useRef(null);
  const bottomLeftCircleRef = useRef(null);
  const centerPyramidRef = useRef(null);
  const midRightStarRef = useRef(null);
  const midLeftHexagonRef = useRef(null);
  const topCenterRingRef = useRef(null);
  const bottomCenterSquareRef = useRef(null);
  const cornerTriangleRef = useRef(null);

  // Other refs
  const textRef = useRef<HTMLHeadingElement>(null);
  const rightFadeRef = useRef(null);
  const leftFadeRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const secondImageRef = useRef(null);
  const secondTextRef = useRef(null);

  const phrases = [
    "Instant Access",
    "Personalized Picks",
    "Effortless Discovery",
    "Local Shopping",
    "Community Driven",
    "Curated Collections",
    "Sustainable Fashion",
    "Small Business Growth",
    "Eco-Friendly.",
  ];
  let phraseIndex = 0;

  // Handle scroll button visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollButton(scrollTop < window.innerHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCounterKey((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animations setup
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // Hero section animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        }
      );
    }

    // Primary floating shapes (larger movement)
    [
      topRightDonutRef,
      bottomLeftCircleRef,
      midRightStarRef,
      cornerTriangleRef,
    ].forEach((ref) => {
      if (ref.current) {
        gsap.to(ref.current, {
          y: -30,
          x: gsap.utils.random(-20, 20),
          rotation: gsap.utils.random(-15, 15),
          duration: gsap.utils.random(2, 3),
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    });

    // Secondary floating shapes (subtle movement)
    [topLeftCubeRef, bottomRightSphereRef, centerPyramidRef].forEach((ref) => {
      if (ref.current) {
        gsap.to(ref.current, {
          y: -20,
          rotation: gsap.utils.random(-10, 10),
          duration: gsap.utils.random(3, 4),
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    });

    // Tertiary floating shapes (minimal movement)
    [midLeftHexagonRef, topCenterRingRef, bottomCenterSquareRef].forEach(
      (ref) => {
        if (ref.current) {
          gsap.to(ref.current, {
            y: -15,
            scale: 1.05,
            duration: gsap.utils.random(4, 5),
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      }
    );

    // Content section animations
    const scrollElements = [
      { ref: leftFadeRef, x: isMobile ? 0 : -50 },
      { ref: rightFadeRef, x: isMobile ? 0 : 50 },
      { ref: secondImageRef, x: isMobile ? 0 : -50 },
      { ref: secondTextRef, x: isMobile ? 0 : 50 },
    ];

    scrollElements.forEach(({ ref, x }) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, x },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              end: "top 50%",
              scrub: isMobile ? false : 1,
              once: isMobile,
            },
          }
        );
      }
    });

    // Stats animation
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
  }, []);

  // Text animation
  useEffect(() => {
    const textAnimation = () => {
      if (!textRef.current) return;

      gsap.to(textRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        onComplete: () => {
          phraseIndex = (phraseIndex + 1) % phrases.length;
          if (textRef.current) {
            textRef.current.innerText = phrases[phraseIndex];
            gsap.to(textRef.current, { opacity: 1, y: 0, duration: 0.3 });
          }
        },
      });
    };

    const interval = setInterval(textAnimation, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-background to-secondary">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top section shapes */}
        <div
          ref={topRightDonutRef}
          className="absolute right-10 top-20 w-32 lg:w-48"
        >
          <img
            src="/shapes/donut.png"
            alt="Donut"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div
          ref={topLeftCubeRef}
          className="absolute left-20 top-40 w-24 lg:w-36"
        >
          <img
            src="/shapes/cube.png"
            alt="Cube"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div
          ref={topCenterRingRef}
          className="absolute left-1/2 top-32 w-16 lg:w-24"
        >
          <img
            src="/shapes/circle.png"
            alt="Ring"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        {/* Middle section shapes */}
        <div
          ref={centerPyramidRef}
          className="absolute left-1/3 top-1/2 w-20 lg:w-32"
        >
          <img
            src="/shapes/frok.png"
            alt="Pyramid"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div
          ref={midRightStarRef}
          className="absolute right-1/4 top-1/3 w-16 lg:w-24"
        >
          <img
            src="/shapes/press.png"
            alt="Star"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div
          ref={midLeftHexagonRef}
          className="absolute left-1/4 top-2/3 w-24 lg:w-36"
        >
          <img
            src="/shapes/swe.png"
            alt="Hexagon"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        {/* Bottom section shapes */}
        <div
          ref={bottomRightSphereRef}
          className="absolute right-32 bottom-40 w-20 lg:w-32"
        >
          <img
            src="/shapes/wear.png"
            alt="Sphere"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div
          ref={bottomLeftCircleRef}
          className="absolute bottom-20 left-20 w-20 lg:w-32"
        >
          <img
            src="/shapes/circle.png"
            alt="Circle"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div
          ref={bottomCenterSquareRef}
          className="absolute left-10 bottom-1/4 w-16 lg:w-24"
        >
          <img
            src="/shapes/cube.png"
            alt="Square"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div
          ref={cornerTriangleRef}
          className="absolute right-10 bottom-10 w-24 lg:w-36"
        >
          <img
            src="/shapes/cube.png"
            alt="Triangle"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
      </div>

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center"
      >
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 poppins tracking-wider linespacing">
            Revolutionizing Local Shopping with{" "}
            <span
              ref={textRef}
              className="text-[#FF4545] leading-none tracking-tight"
            >
              {phrases[0]}
            </span>
          </h1>
          <p className="text-lg mb-8 text-muted-foreground sour-gummy">
            Connecting consumers with trusted neighborhood vendors for an
            effortless shopping experience.
          </p>
          <button className="inline-flex items-center gap-2 text-black px-8 py-4 rounded-lg border-4 border-black transition-all hover:scale-105">
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Scroll Down Button */}
        {showScrollButton && (
          <button
            onClick={handleScroll}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer z-50"
          >
            <span className="text-sm font-medium">More Inside</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </button>
        )}
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          <div className="space-y-6" ref={leftFadeRef}>
            <h2 className="text-3xl font-bold nunito">What We Offer</h2>
            <ul className="text-lg text-muted-foreground custom-para1 list-disc pl-5">
              <li>
                Shop from Local Stores – Browse and order products directly from
                nearby vendors.
              </li>
              <li>
                Virtual Try-On – Get a realistic preview of clothing before
                making a purchase.
              </li>
              <li>
                Personalized Shopping – Receive outfit suggestions based on your
                style, body type, and preferences.
              </li>
              <li>
                Compare Prices – Find the best deals from different local
                stores.
              </li>
              <li>
                Fast & Reliable Delivery – Enjoy quick order fulfillment from
                nearby vendors.
              </li>
              <li>
                Support Small Businesses – Help local vendors expand their
                reach.
              </li>
              <li>
                Sustainable Fashion – Promote eco-friendly brands and reduce
                waste.
              </li>
            </ul>
          </div>
          <div
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
            ref={rightFadeRef}
          >
            <img
              src="/homeimage.png"
              alt="Shopping Experience"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Second Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          <div
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1"
            ref={secondImageRef}
          >
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
              alt="Sustainable Fashion"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6 order-1 lg:order-2" ref={secondTextRef}>
            <h2 className="text-3xl font-bold nunito">Why Choose Us?</h2>
            <ul className="text-lg text-muted-foreground custom-para1 list-disc pl-5">
              <li>Convenience – Shop from the comfort of your home.</li>
              <li>
                Confidence – Make informed choices with virtual fitting and
                recommendations.
              </li>
              <li>
                Community Support – Strengthen local businesses and promote
                sustainability.
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-20 bg-gray-100 rounded-2xl mb-20"
        >
          {[
            { number: 1000, suffix: "+", label: "Vendors Listed" },
            { number: 124222, suffix: "+", label: "Orders Daily" },
            { number: 50, suffix: "+", label: "Big Brands" },
            { number: 99, suffix: "%", label: "User Satisfied" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-black mb-2">
                <CountUp
                  key={counterKey}
                  start={0}
                  end={stat.number}
                  duration={2.5}
                  separator=","
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
