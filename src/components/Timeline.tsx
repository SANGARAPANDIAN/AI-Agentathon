import React from "react";
import { Timeline as TimelineUI } from "@/components/ui/timeline";
import { GradientCard } from "@/components/ui/gradient-card";
import { Calendar, Rocket, Award, Target, Code } from "lucide-react";

export default function TimelineDemo() {
  const data = [
    {
      title: "Dec 20 - Jan 10",
      content: (
        <div className="w-full h-full">
          <GradientCard
            title="Registration Opens"
            description="Team registration begins! Form teams of 3-6 members from your college or across institutions. Multidisciplinary teams are highly encouraged. Register for FREE to participate in Round 1. Choose your problem statement from FinTech & Wellness, CivicTech Solutions, Supply Chain Innovation, or DisasterTech Solutions."
            icon={<Rocket className="w-5 h-5" />}
          />
        </div>
      ),
    },
    {
      title: "Jan 2, 2026",
      content: (
        <div className="w-full h-full">
          <GradientCard
            title="Hackathon Kickoff & Ideation"
            description="Round 1 officially begins! Start working on your idea submission and prototype. Download the official PPT template, analyze problem statements, and design your multi-agent AI solution. This is a FREE round - no event pass required. Focus on innovation, feasibility, and impact."
            icon={<Target className="w-5 h-5" />}
          />
        </div>
      ),
    },
    {
      title: "Jan 11, 2026",
      content: (
        <div className="w-full h-full">
          <GradientCard
            title="Round 1 Submission Deadline"
            description="Submit your complete package: PPT using official template, working prototype (hosted on Vercel/Netlify/Render), 1-2 minute demo video, and GitHub repository with documentation. Late submissions will NOT be accepted. Ensure all deliverables meet the submission requirements."
            icon={<Code className="w-5 h-5" />}
          />
        </div>
      ),
    },
    {
      title: "Jan 21, 2026",
      content: (
        <div className="w-full h-full">
          <GradientCard
            title="Shortlist Announcement"
            description="Shortlisted teams will be notified via the Team Lead's registered email on Jan 21, 2026 at 10:00am. Selected teams must purchase the event pass to participate in the Final Round at Thiran. Prepare for live demonstrations, detailed explanations, and Q&A sessions with industry expert judges."
            icon={<Calendar className="w-5 h-5" />}
          />
        </div>
      ),
    },
    {
      title: "Feb 4, 2026",
      content: (
        <div className="w-full h-full">
          <GradientCard
            title="Final Round at Thiran"
            description="Live presentation and demonstration to judges from 9:30 AM to 5:00 PM. Showcase your AI agent solution's innovation, technical execution, impact, and presentation quality. Winners announced based on problem statements. Total prize pool of ₹5,00,000 plus recognition and networking opportunities await!"
            icon={<Award className="w-5 h-5" />}
          />
        </div>
      ),
    }
  ];

  return (
    <div className="relative w-full overflow-clip bg-[#0a0a0f]">
      <TimelineUI data={data} />
    </div>
  );
}