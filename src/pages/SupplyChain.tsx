import React, { useEffect } from 'react'
import { StackedCards } from '@/components/ui/glass-cards'
import { AnimatedBackButton } from '@/components/ui/animated-back-button'
import { AnimatedText } from '@/components/ui/animated-shiny-text'

const supplyChainCards = [
  {
    id: 1,
    title: "AIAG01: Agentic AI–Enabled Multi-Tier Manufacturing Phantom Stock Management",
    context: "Manufacturers have strong visibility into Tier-1 suppliers but almost no real-time insight into Tier-2 and Tier-3 operations. When lower-tier suppliers face disruptions—machine breakdowns, labor shortages, local incidents—manufacturers continue planning based on inaccurate data, creating “phantom stock,” where inventory exists in the system but not on the ground.",
    challenge: "Build a multi-agent AI system that continuously verifies supplier inventory and production capacity across multiple tiers, detects inconsistencies between reported vs. predicted stock, and generates early risk alerts before disruptions propagate upstream.",
    participants: "Participants can build a simulation-driven multi-agent platform where autonomous supply agents monitor each supplier node, validation agents compare real-time signals with expected performance, and risk agents predict potential shortages or delivery failures. The final prototype can demonstrate a dynamic dashboard visualizing stock accuracy, disruption probability, and inter-tier risk propagation.",
    color: "rgba(5, 150, 105, 0.8)" // dark green-600
  },
  {
    id: 2,
    title: "AIAG02: Agentic AI–Enabled Dynamic Carbon Footprint Optimization for Global Logistics",
    context: "Most companies calculate logistics carbon footprints only once a year, using static averages that do not account for real-time conditions like carbon taxes, fuel price changes, port congestion, or vessel speed variation. As a result, shipping decisions optimize only for time and cost, not emissions impact.",
    challenge: "Create an agent-based system that evaluates multiple routing options in real time and recommends the best path based on a balanced score of cost, delivery deadline, and carbon emissions, dynamically adjusting as conditions change.",
    participants: "Participants can build a routing intelligence engine where shipment agents monitor environmental and logistical variables, carbon agents estimate route-level emissions on the fly, and optimization agents compute the most sustainable and economical option. The final solution may include a live simulation that shows how recommendations shift when carbon prices, transport speed, or weather patterns change.",
    color: "rgba(37, 99, 235, 0.8)" // dark blue-600
  },
  {
    id: 3,
    title: "AIAG03: Agentic AI–Enabled Counterfeit Parts Detection in After-Sales Networks",
    context: "Industries such as automotive, aviation, electronics, and medical devices suffer up to 20% counterfeit parts infiltration in independent service networks. These parts compromise safety, lead to equipment failures, and cause major financial losses, while current detection workflows rely heavily on manual inspection and incomplete documentation.",
    challenge: "Design an AI agentic system that authenticates each part using digital identities, detects anomalies in the supply chain, and prevents counterfeit components from entering or circulating within the market.",
    participants: "Participants can create a verification engine where scan agents read QR/NFC tags, digital-twin agents validate provenance through a cryptographically secured identity, and anomaly agents analyze installation patterns to flag suspicious behaviors. The prototype can include a mobile scanning interface and a real-time provenance dashboard showing detection events and risk clusters.",
    color: "rgba(124, 58, 237, 0.8)" // dark purple-600
  }
];

const SupplyChain = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackButton />
      <div className="pt-[140px] sm:pt-36 md:pt-40" style={{ paddingTop: 'max(140px, env(safe-area-inset-top) + 100px)' }}>
        <div className="flex justify-center items-center py-4 sm:py-8 md:py-10 px-4 sm:px-6">
          <h1 className="text-[1.75rem] xs:text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-bold text-white text-center leading-tight break-words max-w-[90vw]">
            Supply Chain Innovation
          </h1>
        </div>
        <StackedCards 
          title=""
          subtitle=""
          cards={supplyChainCards}
        />
      </div>
    </div>
  )
}

export default SupplyChain