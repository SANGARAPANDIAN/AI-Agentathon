'use client';

import React from 'react';
import { InteractiveRobotSpline } from '@/components/ui/interactive-3d-robot';

const Theme = () => {
  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

  return (
    <div className="relative w-full min-h-screen overflow-hidden px-4 md:px-8 lg:px-12 py-20">
      {/* Two column layout: Robot on left, text on right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
        
        {/* Left Column - 3D Robot Animation */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
          <InteractiveRobotSpline
            scene={ROBOT_SCENE_URL}
            className="absolute inset-0 z-0" 
          />
          {/* Gradient overlay to hide Spline watermark */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-gray-900/100 to-transparent z-20 pointer-events-none"></div>
        </div>

        {/* Right Column - Text Content */}
        <div className="text-white space-y-6 z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-audiowide">
            AI Agentathon 2026
          </h2>
          {/* <h3 className="text-2xl md:text-3xl font-semibold text-cyan-400">
            Meet Whobee
          </h3> */}
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Build autonomous AI agents that sense, reason, and act in the real world. Team up for a 48‑hour on‑campus hackathon to solve high‑impact problems in supply chains, cities, finance, and disaster response.
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
              <p className="text-gray-400">4 themes · 12 real-world problem statements</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <p className="text-gray-400">Multi‑agent AI focus – beyond chatbots and simple CRUD apps</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-gray-400">Cash prizes, certificates, and mentorship from faculty and industry</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Theme;