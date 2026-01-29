"use client";

import { Users, FileText, Trophy, Calendar, Code, Shield } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

export default function Guidlines() {
  return (
    <div className="w-full bg-[#0a0a0f] px-4 md:px-8 lg:px-12 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg md:text-4xl mb-4 text-white text-center font-audiowide">
          SELECTED TEAMS
        </h2>
        <p className="text-neutral-400 text-sm md:text-base text-center mb-12">
          Congratulations to the selected teams for the AI Agentathon 2026
        </p>
        
        <ul className="flex flex-row flex-wrap gap-4">
          <GridItem
            area=""
            icon={1}
            title="OG Goblins"
          />
          <GridItem
            area=""
            icon={2}
            title="Ethic Hackers"
            
          />
          <GridItem
            area=""
            icon={3}
            title="TECKEYS"
            
          />
          <GridItem
            area=""
            icon={4}
            title="Codex Innovate"
            
          />
          <GridItem
            area=""
            icon={5}
            title="Think Thank"
            
          />
          <GridItem
            area=""
            icon={6}
            title="Inven Tech"
            
          />
          <GridItem
            area=""
            icon={7}
            title="Code X"
            
          />
          <GridItem
            area=""
            icon={8}
            title="sod 001"
            
          />
          <GridItem
            area=""
            icon={9}
            title="Cyber Knights"
            
          />
          <GridItem
            area=""
            icon={10}
            title="Brain Box"
            
          />
          <GridItem
            area=""
            icon={11}
            title="HUSTLERS"
            
          />
          <GridItem
            area=""
            icon={12}
            title="Code comets"
            
          />
          <GridItem
            area=""
            icon={13}
            title="The Green Agents"
            
          />
          <GridItem
            area=""
            icon={14}
            title="The Coffee Overflow"
            
          />
          <GridItem
            area=""
            icon={15}
            title="VYRA"
            
          />
          <GridItem
            area=""
            icon={16}
            title="notateam"
            
          />
          <GridItem
            area=""
            icon={17}
            title="Zenith"
            
          />
          <GridItem
            area=""
            icon={18}
            title="Six Legends"
            
          />
          <GridItem
            area=""
            icon={19}
            title="0 Variance"
            
          />
          <GridItem
            area=""
            icon={20}
            title="Clowns in Clouds"
            
          />
          <GridItem
            area=""
            icon={21}
            title="Byte Force"
            
          />
          <GridItem
            area=""
            icon={22}
            title="AlgoX"
            
          />
          <GridItem
            area=""
            icon={23}
            title="BreachCodes"
            
          />
          <GridItem
            area=""
            icon={24}
            title="InnovaTech"
            
          />
          <GridItem
            area=""
            icon={25}
            title="MediBytes"
            
          />

        </ul>
      </div>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  
}

const GridItem = ({ area, icon, title }: GridItemProps) => {
  return (
    <li className={cn("min-h-[10rem] list-none", area)}>
      <div className="relative rounded-[1.25rem] border-[0.75px] border-neutral-800 p-2 md:rounded-[1.5rem] md:p-3 w-[300px]">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex  gap-4 overflow-hidden rounded-xl border-[0.75px] bg-[#0a0a0f] p-4 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-4">
          <div className="relative flex gap-3  items-center">
            <div className="w-fit font-extrabold rounded-lg border-[0.75px] border-neutral-800 bg-neutral-900 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white">
                {title}
              </h3>             
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};