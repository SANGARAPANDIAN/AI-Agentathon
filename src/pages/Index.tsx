import { lazy, Suspense, useState } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { VantaBackground } from "@/components/ui/vanta-background";
import ThiranLogo from "@/assets/ThiranLogo.png";

// Lazy load heavy components
const SplineSceneBasic = lazy(() => import("@/components/SplineSceneBasic").then(m => ({ default: m.SplineSceneBasic })));
const About = lazy(() => import("../components/About"));
const Theme = lazy(() => import("@/components/Theme"));
const PS = lazy(() => import("@/components/PS"));
const Timeline = lazy(() => import("@/components/Timeline"));
const Guidlines = lazy(() => import("@/components/Guidlines"));
const Prize = lazy(() => import("@/components/Prize"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading fallback with Thiran logo
const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
    <img 
      src={ThiranLogo} 
      alt="Loading..." 
      className="w-48 h-48 object-contain animate-pulse"
    />
  </div>
);

const Index = () => {
  const [is3DLoaded, setIs3DLoaded] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* Show Thiran logo until 3D scene is fully loaded */}
      {!is3DLoaded && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          <img 
            src={ThiranLogo} 
            alt="Loading..." 
            loading="eager"
            decoding="async"
            className="w-48 h-48 object-contain animate-pulse"
          />
        </div>
      )}
      
      {/* Vanta.js animated network background */}
      {/* <VantaBackground /> */}
      
      {/* Cursor animation */}
      <CursorGlow />
      <Suspense fallback={null}>
        <div className="w-full h-[80%] relative z-10">
          <SplineSceneBasic onLoad={() => setIs3DLoaded(true)} />
        </div>
        <div id="guidelines">
          <Guidlines/>
        </div>
        <div id="about" className="relative z-10">
          <About />
        </div>
        <div id="theme" className="relative z-10">
          <Theme/>
        </div>
        <div id="ps" className="relative z-10">
          <PS/>
        </div>
        <div id="timeline">
          <Timeline/>
        </div>
        <div id="prizes">
          <Prize/>
        </div>
        <div id="faqs">
          <FAQ/>
        </div>
        <div>
          <Footer/>
        </div>
      </Suspense>
    </div>
    
  );
};

export default Index;
