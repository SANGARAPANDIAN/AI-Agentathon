import React from 'react';

interface CardData {
  title: string;
  desc: string;
  gradientFrom: string;
  gradientTo: string;
  emoji?: string;
  amount?: string;
}

interface SkewCardsProps {
  cards: CardData[];
}

export default function SkewCards({ cards }: SkewCardsProps) {
  return (
    <>
      <div className="flex justify-center items-center flex-wrap  min-h-screen">
        {cards.map(({ title, desc, gradientFrom, gradientTo, emoji, amount }, idx) => (
          <div
            key={idx}
            className="group relative w-[280px] h-[360px] sm:w-[320px] sm:h-[400px] m-[20px_15px] sm:m-[40px_30px] transition-all duration-500"
          >
            {/* Skewed gradient panels */}
            <span
              className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
              style={{
                background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
              }}
            />
            <span
              className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] blur-[30px] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
              style={{
                background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
              }}
            />

            {/* Animated blurs */}
            <span className="pointer-events-none absolute inset-0 z-10">
              <span className="absolute top-0 left-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-100 animate-blob group-hover:top-[-50px] group-hover:left-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
              <span className="absolute bottom-0 right-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-500 animate-blob animation-delay-1000 group-hover:bottom-[-50px] group-hover:right-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
            </span>

            {/* Content */}
            <div className="relative z-20 left-0 p-[16px_24px] sm:p-[20px_40px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] shadow-lg rounded-lg text-white transition-all duration-500 group-hover:left-[-25px] group-hover:p-[40px_24px] sm:group-hover:p-[60px_40px]">
              {emoji && (
                <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 text-center">{emoji}</div>
              )}
              <h2 className="text-xl sm:text-2xl mb-2 font-bold font-bebas">{title}</h2>
              {amount && (
                <p className="text-3xl sm:text-4xl font-black mb-2 sm:mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {amount}
                </p>
              )}
              <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-2">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tailwind custom utilities for animation and shadows */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translateY(10px); }
          50% { transform: translate(-10px); }
        }
        .animate-blob { animation: blob 2s ease-in-out infinite; }
        .animation-delay-1000 { animation-delay: -1s; }
        .shadow-[0_5px_15px_rgba(0,0,0,0.08)] { box-shadow: 0 5px 15px rgba(0,0,0,0.08); }
      `}</style>
    </>
  );
}
