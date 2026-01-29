import React from 'react';

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ children, className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Aurora Background */}
      <div className="absolute inset-0">
        {/* Base aurora layer */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900/50 via-gray-900/40 to-zinc-900/50"></div>
        </div>
        
        {/* Animated aurora waves */}
        <div className="absolute inset-0">
          {/* Wave 1 */}
          <div 
            className="absolute inset-0 opacity-25 animate-aurora1"
            style={{
              background: 'radial-gradient(ellipse 800px 600px at 50% 20%, rgba(30, 41, 59, 0.3) 0%, transparent 50%)'
            }}
          ></div>
          
          {/* Wave 2 */}
          <div 
            className="absolute inset-0 opacity-20 animate-aurora2"
            style={{
              background: 'radial-gradient(ellipse 600px 400px at 80% 30%, rgba(51, 65, 85, 0.25) 0%, transparent 50%)'
            }}
          ></div>
          
          {/* Wave 3 */}
          <div 
            className="absolute inset-0 opacity-18 animate-aurora3"
            style={{
              background: 'radial-gradient(ellipse 700px 500px at 20% 60%, rgba(71, 85, 105, 0.2) 0%, transparent 50%)'
            }}
          ></div>
          
          {/* Wave 4 */}
          <div 
            className="absolute inset-0 opacity-15 animate-aurora4"
            style={{
              background: 'radial-gradient(ellipse 900px 300px at 60% 80%, rgba(55, 65, 81, 0.15) 0%, transparent 50%)'
            }}
          ></div>
        </div>
        
        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-black/15"></div>
      </div>
      
      {/* Content */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
};

export default AuroraBackground;
