import React, { useEffect } from 'react'
import { StackedCards } from '@/components/ui/glass-cards'
import { AnimatedBackButton } from '@/components/ui/animated-back-button'
import { AnimatedText } from '@/components/ui/animated-shiny-text'

const civicTechCards = [
  {
    id: 1,
    title: "AIAG04: Agentic Hyperlocal Public Works Complaint Resolution Network",
    context: "Municipal complaints often involve multiple departments—water, electricity, roads, sanitation—yet current systems forward the issue one department at a time. This sequential approach leads to long delays, lost information, and an average resolution time of 22 days",
    challenge: "Build an agentic coordination platform that automatically identifies all relevant departments for a complaint, forms a virtual cross-department team, and continuously tracks progress to ensure fast and transparent resolution.",
    participants: "Participants can build a multi-agent complaint management engine where classifier agents map issue types to responsible departments, coordination agents assign tasks across teams simultaneously, and monitoring agents detect bottlenecks and delays. A unified citizen dashboard can demonstrate real-time status, escalations, and improved resolution timelines.",
    color: "rgba(5, 150, 105, 0.8)" // dark green-600
  },
  {
    id: 2,
    title: "AIAG05: Agentic AI–Enabled Pothole Repair Accountability System",
    context: "Cities frequently receive repeated reports for the same potholes because citizens cannot track repair progress and contractors are not held accountable for delays or low-quality repairs. This leads to inefficiency, duplicate work orders, and poor road quality.",
    challenge: "Develop an AI-powered agent network that tracks each pothole from detection to closure, scores contractor performance based on repair speed and durability, and publishes repair timelines for transparency.",
    participants: "Participants can design a lifecycle management platform where repair agents track pothole status, performance agents analyze contractor response quality, and timeline agents publish updates for public visibility. The final prototype may include a geospatial map showing open issues, repair stages, and contractor scorecards.",
    color: "rgba(37, 99, 235, 0.8)" // dark blue-600
  },
  {
    id: 3,
    title: "AIAG06: Agentic Tree-Lifecycle Stewardship and Community Engagement Network",
    context: "Cities experience only about 47% survival of newly planted trees because post-planting care is inconsistent, understaffed, and poorly monitored. Community involvement exists but lacks structure, leaving trees vulnerable during their most critical early years.",
    challenge: "Create an agentic network that monitors tree health, assigns caretakers from the local community, predicts risks, and provides easy ways for citizens to participate in long-term stewardship.",
    participants: "Participants can develop a system where tree-health agents analyze environmental and sensor inputs, stewardship agents match each tree with residents or businesses, and engagement agents track caretaker activity and reward participation. A visual dashboard can showcase tree health trends, caretaker assignments, and predicted survival outcomes.",
    color: "rgba(124, 58, 237, 0.8)" // dark purple-600
  }
];

const CivicTech = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackButton />
      <div className="pt-[140px] sm:pt-36 md:pt-40" style={{ paddingTop: 'max(140px, env(safe-area-inset-top) + 100px)' }}>
        <div className="flex justify-center items-center py-4 sm:py-8 md:py-10 px-4 sm:px-6">
          <h1 className="text-[1.75rem] xs:text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-bold text-white text-center leading-tight break-words max-w-[90vw]">
            CivicTech Solutions
          </h1>
        </div>
        <StackedCards 
          title=""
          subtitle=""
          cards={civicTechCards}
        />
      </div>
    </div>
  )
}

export default CivicTech