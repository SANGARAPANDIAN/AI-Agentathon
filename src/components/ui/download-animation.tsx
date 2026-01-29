import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Check } from 'lucide-react';

interface DownloadButtonProps {
  onDownload?: () => void;
  pdfUrl?: string;
  fileName?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  onDownload,
  pdfUrl = '/brochure.pdf',
  fileName = 'AI-Agentathon-Brochure.pdf'
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { width } = (e.target as HTMLElement)?.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;

      spanRef.current!.animate({ left }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      spanRef.current!.animate(
        { left: "50%" },
        { duration: 100, fill: "forwards" }
      );
    };

    btnRef?.current?.addEventListener("mousemove", handleMouseMove);
    btnRef?.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btnRef?.current?.removeEventListener("mousemove", handleMouseMove);
      btnRef?.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleDownloadClick = () => {
    if (isDownloading || isComplete) return;

    setIsDownloading(true);
    
    // Trigger PDF download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Call custom handler if provided
    onDownload?.();

    // Show completion state
    setTimeout(() => {
      setIsDownloading(false);
      setIsComplete(true);
      
      // Reset after showing complete state
      setTimeout(() => {
        setIsComplete(false);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="flex justify-start items-center w-full">
      <motion.button
        ref={btnRef}
        onClick={handleDownloadClick}
        disabled={isDownloading || isComplete}
        className={`
          relative overflow-hidden rounded-full 
          bg-black px-4 py-2 sm:px-6 sm:py-3
          font-medium text-sm sm:text-base
          ${isDownloading || isComplete ? 'cursor-wait' : 'cursor-pointer'}
        `}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 3 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Spotlight effect */}
        <span
          ref={spanRef}
          className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-white"
        />

        {/* Content */}
        <span className="pointer-events-none relative z-10 mix-blend-difference flex items-center justify-center gap-2 text-white">
          <AnimatePresence mode="wait">
            {isComplete ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <Check className="w-5 h-5 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="download"
                animate={isDownloading ? {
                  y: [0, -3, 0],
                  transition: {
                    duration: 0.6,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }
                } : {}}
              >
                <Download className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {isComplete ? (
              <motion.span
                key="downloaded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-white font-medium whitespace-nowrap"
              >
                Downloaded!
              </motion.span>
            ) : isDownloading ? (
              <motion.span
                key="downloading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-white font-medium whitespace-nowrap"
              >
                Downloading...
              </motion.span>
            ) : (
              <motion.span
                key="download"
                className="text-white font-medium whitespace-nowrap"
              >
                Download Brochure
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.button>
    </div>
  );
};
