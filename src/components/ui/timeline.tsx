"use client";

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-[#0a0a0f] font-sans px-4 md:px-8 lg:px-12"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto pt-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-white font-audiowide  text-center">
          Our Journey
        </h2>
        <p className="text-neutral-400 text-sm md:text-base text-center">
          A timeline of our key milestones and achievements.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-6 md:pt-40 md:gap-10"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-16 md:top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[#0a0a0f] flex items-center justify-center">
                <motion.div 
                  className="h-4 w-4 rounded-full bg-neutral-800 border border-neutral-700 p-2"
                  animate={{
                    boxShadow: activeIndex === index 
                      ? "0 0 20px 8px rgba(56, 189, 248, 0.8), 0 0 30px 12px rgba(37, 99, 235, 0.6), 0 0 40px 16px rgba(20, 184, 166, 0.4)"
                      : "none",
                    backgroundColor: activeIndex === index ? "#38bdf8" : "#262626",
                    borderColor: activeIndex === index ? "#06b6d4" : "#404040",
                    scale: activeIndex === index ? 1.5 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                />
              </div>
              <motion.h3 
                className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold"
                animate={{
                  color: activeIndex === index ? "#38bdf8" : "#737373",
                  textShadow: activeIndex === index 
                    ? "0 0 20px rgba(56, 189, 248, 0.6), 0 0 40px rgba(56, 189, 248, 0.3)"
                    : "none"
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut"
                }}
              >
                {item.title}
              </motion.h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <motion.h3 
                className="md:hidden block text-base sm:text-lg mb-3 text-left font-bold"
                animate={{
                  color: activeIndex === index ? "#38bdf8" : "#737373",
                  textShadow: activeIndex === index 
                    ? "0 0 20px rgba(56, 189, 248, 0.6), 0 0 40px rgba(56, 189, 248, 0.3)"
                    : "none"
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut"
                }}
              >
                {item.title}
              </motion.h3>
              <div className="md:max-h-none max-h-[280px] overflow-hidden">
                {item.content}
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-cyan-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
