"use client";

import React, { useState, useEffect, useRef } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = () => {
  const targetDate = new Date('2026-02-04T00:00:00').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const prevTimeRef = useRef<TimeLeft>(timeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      prevTimeRef.current = timeLeft;
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const AnimatedDigit = ({ digit, prevDigit }: { digit: string; prevDigit?: string }) => {

    const digitPatterns: { [key: string]: number[] } = {
      '0': [1, 2, 3, 4, 6, 7, 9, 10, 12, 13, 14, 15],
      '1': [3, 6, 9, 12, 15],
      '2': [1, 2, 3, 6, 7, 8, 9, 10, 13, 14, 15],
      '3': [1, 2, 3, 6, 7, 8, 9, 12, 13, 14, 15],
      '4': [1, 4, 6, 7, 8, 9, 12, 15],
      '5': [1, 2, 3, 4, 7, 8, 9, 12, 13, 14, 15],
      '6': [1, 2, 3, 4, 7, 8, 9, 10, 12, 13, 14, 15],
      '7': [1, 2, 3, 6, 9, 12, 15],
      '8': [1, 2, 3, 4, 6, 7, 8, 9, 10, 12, 13, 14, 15],
      '9': [1, 2, 3, 4, 6, 7, 8, 9, 12, 13, 14, 15],
    };

    const activeSegments = digitPatterns[digit] || [];
    const hasChanged = prevDigit !== undefined && digit !== prevDigit;

    return (
      <div 
        key={digit} 
        className={`grid grid-cols-3 grid-rows-5 gap-0.5 sm:gap-1 md:gap-1.5 w-8 h-14 sm:w-10 sm:h-16 md:w-12 md:h-20 ${hasChanged ? 'animate-flip-in' : ''}`}
      >
        {Array.from({ length: 15 }, (_, i) => i + 1).map((segment) => {
          const isActive = activeSegments.includes(segment);
          const animationDelay = `${(segment % 5) * 50}ms`;
          
          return (
            <div
              key={segment}
              style={{ animationDelay }}
              className={`rounded-sm transition-all duration-500 ${
                isActive
                  ? 'bg-gradient-to-br from-cyan-200 via-blue-300 to-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.8)] animate-pulse-glow scale-100'
                  : 'bg-gray-800/30 scale-95'
              }`}
            />
          );
        })}
      </div>
    );
  };

  const TimeUnit = ({ value, label, prevValue }: { value: number; label: string; prevValue?: number }) => {
    const digits = value.toString().padStart(2, '0').split('');
    const prevDigits = prevValue?.toString().padStart(2, '0').split('');
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-sky-500 rounded-lg blur-md opacity-30 group-hover:opacity-50 transition duration-500"></div>
          
          {/* Counter box */}
          <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-sky-400/40 rounded-lg px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 shadow-[0_0_20px_rgba(56,189,248,0.4)]">
            <div className="flex gap-1 sm:gap-2 md:gap-3">
              <AnimatedDigit digit={digits[0]} prevDigit={prevDigits?.[0]} />
              <AnimatedDigit digit={digits[1]} prevDigit={prevDigits?.[1]} />
            </div>
          </div>
        </div>
        
        {/* Label */}
        <span className="text-xs md:text-sm text-neutral-400 mt-3 uppercase tracking-wider font-medium">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center w-full mt-8">
      {/* Title Text */}
      <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-sky-500 mb-6 sm:mb-8 tracking-tighter animate-in">
        Final round begins in:
      </h2>
      
      {/* Countdown Timer */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 w-full">
      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        @keyframes flip-in {
          0% {
            transform: rotateX(-90deg);
            opacity: 0;
          }
          50% {
            transform: rotateX(-45deg);
          }
          100% {
            transform: rotateX(0deg);
            opacity: 1;
          }
        }
        .animate-flip-in {
          animation: flip-in 0.4s ease-out;
          transform-origin: center;
        }
      `}</style>
      <TimeUnit value={timeLeft.days} label="Days" prevValue={prevTimeRef.current.days} />
      <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-sky-400/60 mb-8 flex-shrink-0">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" prevValue={prevTimeRef.current.hours} />
      <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-sky-400/60 mb-8 flex-shrink-0">:</span>
      <TimeUnit value={timeLeft.minutes} label="Mins" prevValue={prevTimeRef.current.minutes} />
      <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-sky-400/60 mb-8 flex-shrink-0">:</span>
      <TimeUnit value={timeLeft.seconds} label="Secs" prevValue={prevTimeRef.current.seconds} />
      </div>
    </div>
  );
};

export default Countdown;