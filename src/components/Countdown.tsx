"use client";

import React, { useState, useEffect, useRef } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = () => {
  const targetDate = new Date(2026, 1, 4, 16, 0, 0, 0).getTime();

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
  const [prevTimeLeft, setPrevTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevTimeLeft(timeLeft);
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const FlipDigit = ({ value, prevValue }: { value: string; prevValue?: string }) => {
    const hasChanged = prevValue !== undefined && value !== prevValue;
    
    return (
      <div className="relative w-[30px] h-[50px] sm:w-[40px] sm:h-[65px] md:w-[50px] md:h-[80px] perspective-1000">
        {/* Current number */}
        <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] border border-cyan-500/30 ${hasChanged ? 'animate-flip' : ''}`}>
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-cyan-100">
            {value}
          </span>
          {/* Divider line */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/50"></div>
        </div>
      </div>
    );
  };

  const TimeUnit = ({ value, label, prevValue }: { value: number; label: string; prevValue?: number }) => {
    const digits = value.toString().padStart(2, '0').split('');
    const prevDigits = prevValue?.toString().padStart(2, '0').split('');
    
    return (
      <div className="flex flex-col items-center gap-3">
        {/* Flip cards container */}
        <div className="flex gap-1 sm:gap-2">
          <FlipDigit value={digits[0]} prevValue={prevDigits?.[0]} />
          <FlipDigit value={digits[1]} prevValue={prevDigits?.[1]} />
        </div>
        
        {/* Label */}
        <span className="text-xs sm:text-sm md:text-base text-cyan-300 uppercase tracking-[0.2em] font-bold">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center w-full mt-10">
      <style>{`
        @keyframes flip {
          0% {
            transform: rotateX(0deg);
          }
          50% {
            transform: rotateX(-90deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }
        .animate-flip {
          animation: flip 0.6s ease-in-out;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
      
      {/* Title Text */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 mb-2 tracking-wider uppercase drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
          Final Round Ends In
        </h2>
        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"></div>
      </div>
      
      {/* Countdown Timer */}
      <div className="flex items-start justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 w-full">
        <TimeUnit value={timeLeft.days} label="Days" prevValue={prevTimeLeft.days} />
        <div className="text-3xl sm:text-4xl md:text-5xl text-cyan-400 font-bold self-start mt-3 sm:mt-4 md:mt-5">:</div>
        <TimeUnit value={timeLeft.hours} label="Hours" prevValue={prevTimeLeft.hours} />
        <div className="text-3xl sm:text-4xl md:text-5xl text-cyan-400 font-bold self-start mt-3 sm:mt-4 md:mt-5">:</div>
        <TimeUnit value={timeLeft.minutes} label="Minutes" prevValue={prevTimeLeft.minutes} />
        <div className="text-3xl sm:text-4xl md:text-5xl text-cyan-400 font-bold self-start mt-3 sm:mt-4 md:mt-5">:</div>
        <TimeUnit value={timeLeft.seconds} label="Seconds" prevValue={prevTimeLeft.seconds} />
      </div>
    </div>
  );
};

export default Countdown;