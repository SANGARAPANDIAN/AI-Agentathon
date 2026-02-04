'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { MouseSpotlight } from "@/components/ui/mouse-spotlight"
// import  Navbar  from "@/components/Navbar";
import BlurText from "@/components/ui/blurtext";
import  Countdown  from "@/components/Countdown";
import { DownloadButton } from "@/components/ui/download-animation";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RHInfosLogo from "@/assets/RH-Infos-TM-Logo.webp";


const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

const handleRegister = () => {
  window.location.href = 'https://unstop.com/p/round-1-ai-agentathon-sri-eshwar-college-of-engineering-sece-tamil-nadu-1608466';
};

interface SplineSceneBasicProps {
  onLoad?: () => void;
}

export function SplineSceneBasic({ onLoad }: SplineSceneBasicProps) {
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);



  useEffect(() => {
    // Defer Spline loading until after critical content is rendered
    const timer = setTimeout(() => {
      setShouldLoadSpline(true);
    }, 800); // Load 3D scene after 800ms

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    
    {/* <Navbar /> */}
    <Card className="w-full h-screen border-none bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden px-4 md:px-8 lg:px-12">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <MouseSpotlight size={300} className="blur-xl bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,rgba(255,255,255,0.9)_15%,rgba(255,255,255,0.6)_35%,rgba(255,255,255,0.2)_55%,transparent_75%)]" />
      
      <div className="flex h-full flex-col md:flex-row ">
        {/* Left content */}
        <div className="flex-1 px-4 md:px-8 lg:px-12 relative z-10 flex flex-col justify-center mt-32 sm:mt-40 md:mt-32 md:mb-80">
          
          {/* Sponsor Section */}
          <div className="relative mb-6 mt-40 inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-cyan-400/40 rounded-xl px-4 py-3 sm:px-5 sm:py-4 flex items-center gap-4 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm text-cyan-400/70 uppercase tracking-widest font-medium mb-1">
                  Proudly Sponsored By
                </span>
                <span className="text-lg sm:text-xl md:text-2xl text-white font-bold tracking-wide">
                  RH Infos
                </span>
              </div>
              <div className="h-12 w-[1px] bg-cyan-400/30"></div>
              <img 
                src={RHInfosLogo} 
                alt="RH Infos" 
                className="h-14 sm:h-16 md:h-20 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>

          <BlurText
            text="AI Agentathon"
            delay={650}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold font-audiowide"
          />

          <div className="w-full ">
            <Countdown />
          </div>
        </div>

        {/* Right content - Hidden on mobile */}
        <div className="flex-1 relative hidden md:block -mt-20 -ml-10">
          {shouldLoadSpline && (
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
              onLoad={onLoad}
            />
          )}
        </div>
      </div>
    </Card>
    </>
  )
}
