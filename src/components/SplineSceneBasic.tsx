'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { MouseSpotlight } from "@/components/ui/mouse-spotlight"
import  Navbar  from "@/components/Navbar";
import BlurText from "@/components/ui/blurtext";
import  Countdown  from "@/components/Countdown";
import { DownloadButton } from "@/components/ui/download-animation";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


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
    <div className="w-full py-3 bg-gradient-to-r from-lime-400 via-green-400 to-emerald-500 flex items-center justify-center shadow-lg relative z-50 animate-pulse">
      <BlurText
        text="🏆 RESULTS ARE OUT NOW! SCROLL DOWN!!! 🏆"
        delay={150}
        animateBy="words"
        direction="top"
        className="text-base sm:text-lg md:text-xl font-bold text-white"
      />
    </div>
    <Navbar />
    <Card className="w-full h-screen border-none bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden px-4 md:px-8 lg:px-12">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <MouseSpotlight size={300} className="blur-xl bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,rgba(255,255,255,0.9)_15%,rgba(255,255,255,0.6)_35%,rgba(255,255,255,0.2)_55%,transparent_75%)]" />
      
      <div className="flex h-full flex-col md:flex-row ">
        {/* Left content */}
        <div className="flex-1 px-4 md:px-8 lg:px-12 relative z-10 flex flex-col justify-center mt-20 sm:mt-32 md:mb-80">
          
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
          <button className="
            
            relative
            cursor-not-allowed
            px-4 py-2 sm:px-6 sm:py-3
            mt-6 sm:mt-10
            w-full sm:w-[220px]
            min-h-[44px]
            text-white font-medium
            rounded-md
            transition-all duration-[800ms]
            bg-[length:280%_auto]
            bg-gradient-to-br
            from-[#3A7DE9]
            via-[#47B8FF]
            to-[#3A7DE9]
            shadow-[0_0_20px_rgba(71,184,255,0.5),0_5px_5px_-1px_rgba(58,125,233,0.25),inset_4px_4px_8px_rgba(175,230,255,0.5),inset_-4px_-4px_8px_rgba(19,95,216,0.35)]
            hover:bg-[position:right_top]
            focus:outline-none
            focus:ring-2
            focus:ring-white
            focus:ring-offset-2
            focus:ring-offset-[#3A7DE9]
            
          "
          disabled
          onClick={handleRegister}
          >
            Register Now
          </button>
        </div>

        {/* Right content - Hidden on mobile */}
        <div className="flex-1 relative hidden md:block">
          {shouldLoadSpline && (
            <>
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full ml-20"
                onLoad={onLoad}
              />
              
              {/* Download button positioned near robot's right ear */}
              <div className="absolute top-[25%] right-[40%] z-20 transform -translate-x-1/2">
                <DownloadButton 
                  pdfUrl="/b1.pdf"
                  fileName="AI-Agentathon-Brochure.pdf"
                  onDownload={() => {
                    console.log('Download initiated');
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
    </>
  )
}
