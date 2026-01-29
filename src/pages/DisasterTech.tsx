import React, { useEffect } from 'react'
import { StackedCards } from '@/components/ui/glass-cards'
import { AnimatedBackButton } from '@/components/ui/animated-back-button'
import { AnimatedText } from '@/components/ui/animated-shiny-text'

const disasterTechCards = [
  {
    id: 1,
    title: "AIAG10: Multi-Agent Drone Search & Rescue Coordination System",
    context: "During floods, earthquakes, and landslides, human search teams cannot cover large or dangerous areas quickly enough, resulting in delayed detection of survivors. Drone fleets can help, but coordinating them efficiently is a complex, multi-variable task requiring perception, planning, and prioritization.",
    challenge: "Build a coordinated multi-agent drone system that performs area scanning, victim detection, task allocation, and path optimization within a simulated disaster zone.",
    participants: "Participants can build a drone simulation where perception agents process thermal or SAR imagery, tasking agents allocate search zones based on urgency or probability of life, and path agents compute optimal, collision free routes. A rescue dashboard can visualize drone movement, detection events, and efficiency improvements over manual coordination.",
    color: "rgba(5, 150, 105, 0.8)" // dark green-600
  },
  {
    id: 2,
    title: "AIAG11: Agentic Rockfall Prediction & Open-Pit Mine Safety Monitoring",
    context: "Open-pit mines routinely face unpredictable slope failures and rockfalls, endangering workers and equipment. Traditional safety monitoring is manual, slow, and unable to detect early weak signals across multiple geotechnical data sources.",
    challenge: "Create a multi-agent prediction system that analyzes sensor streams, drone elevation data, and environmental conditions to forecast slope instability and trigger early warnings.",
    participants: "Participants can develop a safety intelligence network where sensor agents track metrics like tilt, pressure, and moisture, perception agents interpret DEM or drone scans, prediction agents compute rockfall probability, and alert agents notify supervisors instantly. The prototype may include a risk heatmap showing dynamic changes and early-warning accuracy.",
    color: "rgba(37, 99, 235, 0.8)" // dark blue-600
  },
  {
    id: 3,
    title: "AIAG12: Automated Damage Assessment & Insurance Triage Agent System",
    context: "After disasters such as cyclones or earthquakes, insurance claims surge far beyond the capacity of human surveyors. Manual assessments delay payouts, slow recovery, and increase disputes due to subjective evaluations.",
    challenge: "Build an AI-based multi-agent damage assessment system that analyzes imagery, estimates structural and financial damage, and assigns claims to priority categories for human verification.",
    participants: "Participants can create a vision-based triage system where image-analysis agents interpret satellite/drone photos, risk agents quantify severity and financial loss, and audit agents validate outputs for consistency. A claims triage dashboard can demonstrate automated scoring, prioritization, and sample claim decisions, showcasing how human inspectors can be augmented during large-scale disasters ",
    color: "rgba(124, 58, 237, 0.8)" // dark purple-600
  }
];

const DisasterTech = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackButton />
      <div className="pt-[140px] sm:pt-36 md:pt-40" style={{ paddingTop: 'max(140px, env(safe-area-inset-top) + 100px)' }}>
        <div className="flex justify-center items-center py-4 sm:py-8 md:py-10 px-4 sm:px-6">
          <h1 className="text-[1.75rem] xs:text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-bold text-white text-center leading-tight break-words max-w-[90vw]">
            DisasterTech Solutions
          </h1>
        </div>
        <StackedCards 
          title=""
          subtitle=""
          cards={disasterTechCards}
        />
      </div>
    </div>
  )
}

export default DisasterTech