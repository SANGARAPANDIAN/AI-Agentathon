import React, { useEffect } from 'react'
import { StackedCards } from '@/components/ui/glass-cards'
import { AnimatedBackButton } from '@/components/ui/animated-back-button'
import { AnimatedText } from '@/components/ui/animated-shiny-text'

const finTechCards = [
  {
    id: 1,
    title: "AIAG07: Intelligent Loan Structuring for Irregular-Income Workers",
    context: "Gig workers, freelancers, delivery partners, and informal earners experience volatile monthly income, making it impossible for them to commit to fixed EMI schedules. Traditional lenders either reject them or provide rigid loans that quickly become delinquent, pushing them toward predatory platforms.",
    challenge: "Build a multi-agent loan-structuring system that predicts real user cashflows, adjusts repayment schedules dynamically, and continuously evaluates risk as income fluctuates.",
    participants: "Participants can build a financial AI engine where cashflow-forecasting agents analyse historical earning patterns, risk agents evaluate repayment probability, and structuring agents generate adaptive loan contracts with flexible EMIs. The prototype may simulate income volatility and demonstrate how repayment terms evolve in real time to maintain financial stability and reduce defaults.",
    color: "rgba(5, 150, 105, 0.8)" // dark green-600
  },
  {
    id: 2,
    title: "AIAG08: Real-Time Spending Anomaly Detection & Fraud Prevention Engine",
    context: "Users in India lose ₹2,000–₹5,000 every year to unrecognized or fraudulent transactions because most bank fraud systems work on static rules and detect anomalies after 24–48 hours. Modern fraud requires sub-second behavioural analysis and pattern recognition.",
    challenge: "Challenge for card 2",
    participants: "Users in India lose ₹2,000–₹5,000 every year to unrecognized or fraudulent transactions because most bank fraud systems work on static rules and detect anomalies after 24–48 hours. Modern fraud requires sub-second behavioural analysis and pattern recognition.",
    color: "rgba(37, 99, 235, 0.8)" // dark blue-600
  },
  {
    id: 3,
    title: "AIAG09: Agentic Intelligent Investment Recommendation Engine (DRL-Powered)",
    context: "95% of Indian retail investors rely on gut feeling or social media tips rather than structured financial strategies. Existing robo-advisors provide generic allocations that do not adapt to market shifts, user behaviour, or life events, leading to suboptimal long-term returns.",
    challenge: "Build a reinforcement-learning-based investment advisor that continuously adapts to user profile, risk appetite, market signals, and financial goals using a coordinated set of AI agents.",
    participants: "Participants can create an investment simulation platform where market agents track live or synthetic price data, risk agents compute exposure and downside probability, behavioural agents monitor user tendencies, and a DRL policy agent learns optimal portfolio actions. The final prototype may include a performance dashboard comparing static vs. adaptive strategies to highlight return improvements.",
    color: "rgba(124, 58, 237, 0.8)" // dark purple-600
  }
];

const FinWellness = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackButton />
      <div className="pt-[140px] sm:pt-36 md:pt-40" style={{ paddingTop: 'max(140px, env(safe-area-inset-top) + 100px)' }}>
        <div className="flex justify-center items-center py-4 sm:py-8 md:py-10 px-4 sm:px-6">
          <h1 className="text-[1.75rem] xs:text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-bold text-white text-center leading-tight break-words max-w-[90vw]">
            FinTech & Wellness
          </h1>
        </div>
        <StackedCards 
          title=""
          subtitle=""
          cards={finTechCards}
        />
      </div>
    </div>
  )
}

export default FinWellness