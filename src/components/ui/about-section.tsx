"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import {VerticalCutReveal} from "@/components/ui/vertical-cut-reveal";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import CollegeVideo from "@/assets/videoplayback.mp4";

export default function AboutSection3() {
  const heroRef = useRef<HTMLDivElement>(null);
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.4,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };
  const scaleVariants = {
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.4,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };
  return (
    <section id="about" className="py-16 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-black via-gray-900 to-black" ref={heroRef}>
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-semibold mt-8 mb-8 text-center font-audiowide" >ABOUT US</h2>
        <div className="relative">
          {/* Header with social icons */}
          <div className="flex justify-between items-center mb-8 w-[85%] absolute lg:top-4 md:top-0 sm:-top-2 -top-3 z-10">
            <div className="flex items-center gap-2  text-xl">
              <span className="text-cyan-500 animate-spin">✱</span>
              <TimelineContent
                as="span"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-sm font-medium text-gray-400"
              >
                SRI ESHWAR COLLEGE OF ENGINEERING
              </TimelineContent>
            </div>
            
          </div>

          <TimelineContent
            as="figure"
            animationNum={4}
            timelineRef={heroRef}
            customVariants={scaleVariants}
            className="relative group"
          >
            <svg
              className="w-full"
              width={"100%"}
              height={"100%"}
              viewBox="0 0 100 40"
            >
              <defs>
                <clipPath
                  id="clip-inverted"
                  clipPathUnits={"objectBoundingBox"}
                >
                  <path
                    d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                    fill="#D9D9D9"
                  />
                </clipPath>
              </defs>
              <foreignObject
                clipPath="url(#clip-inverted)"
                width={"100%"}
                height={"100%"}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ objectFit: 'cover' }}
                >
                  <source src={CollegeVideo} type="video/mp4" />
                </video>
              </foreignObject>
            </svg>
          </TimelineContent>

          {/* Stats */}
          <div className="flex flex-wrap lg:justify-start justify-between items-center py-3 text-sm">
            <TimelineContent
              as="div"
              animationNum={5}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="flex gap-4"
            >
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-cyan-500 font-bold">180+</span>
                <span className="text-gray-400">Activities & Events</span>
                <span className="text-gray-600">|</span>
              </div>
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-purple-500 font-bold">8</span>
                <span className="text-gray-400">Hackathons</span>
              </div>
            </TimelineContent>
            <div className="lg:absolute right-0 bottom-16 flex lg:flex-col flex-row-reverse lg:gap-0 gap-4">
              {/* <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex lg:text-4xl sm:text-3xl text-2xl items-center gap-2 mb-2"
              >
                <span className="text-cyan-500 font-semibold">35+</span>
                <span className="text-gray-300 uppercase">Workshops & Master Classes</span>
              </TimelineContent> */}
              <TimelineContent
                as="div"
                animationNum={7}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex items-center gap-2 mb-2 sm:text-base text-xs"
              >
                <span className="text-purple-500 font-bold">3 Days</span>
                <span className="text-gray-400">National-Level Fest</span>
                <span className="text-gray-600 lg:hidden block">|</span>
              </TimelineContent>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="sm:text-4xl text-white md:text-5xl text-2xl !leading-[110%] font-semibold bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-8">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                staggerFrom="first"
                reverse={true}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  delay: 1,
                }}
              >
                Thiran 2026 is on its way! Yay!
              </VerticalCutReveal>
            </h1>

            <TimelineContent
              as="div"
              animationNum={9}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="grid md:grid-cols-2 gap-8 text-gray-400"
            >
              <TimelineContent
                as="div"
                animationNum={10}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-xs"
              >
                <p className="leading-relaxed text-justify">
                  Sri Eshwar College of Engineering, Coimbatore, presents Thiran 2026, a three-day 
                  national-level techno-cultural-sports fest scheduled for 4th, 5th & 6th February 2026. 
                  The event will feature 180+ activities including 8 hackathons, 35 workshops and master 
                  classes, project expos, paper presentations, leadership talks, youth summit, tech talks, 
                  start-up stories, pitch fest, and an international education expo.
                </p>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={11}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-xs"
              >
                <p className="leading-relaxed text-justify">
                  Providing a robust platform for innovation and experiential learning, Thiran 2026 
                  complements the technical events with cultural performances, two days of mega celebrity 
                  shows, and a sports fest. Join us for an unforgettable experience of learning, networking, 
                  and entertainment at one of South India's most anticipated collegiate events.
                </p>
              </TimelineContent>
            </TimelineContent>
          </div>

          <div className="md:col-span-1">
            <div className="text-right">
              <TimelineContent
                as="div"
                animationNum={12}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-cyan-500 text-2xl font-bold mb-2"
              >THIRAN 2026
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={13}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-gray-400 text-sm mb-8"
              >
                4th, 5th & 6th February 2026
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={14}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-6"
              >
                <p className="text-gray-200 font-medium mb-4">
                  Ready to be part of South India's biggest techno-cultural fest?
                </p>
              </TimelineContent>

              <TimelineContent
                as="button"
                animationNum={15}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 hover:from-cyan-600 hover:via-purple-600 hover:to-blue-600 shadow-lg shadow-cyan-500/20 flex w-fit ml-auto gap-2 hover:gap-4 transition-all duration-300 ease-in-out text-white px-5 py-3 rounded-lg cursor-pointer font-semibold"
                onClick={() => window.location.href = 'https://unstop.com/p/round-1-ai-agentathon-sri-eshwar-college-of-engineering-sece-tamil-nadu-1608466'}
              >
                REGISTER NOW <ArrowRight className="" />
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
