
import React from "react";

interface AuraLogoProps {
  className?: string;
}

const AuraLogo: React.FC<AuraLogoProps> = ({ className }) => {
  return (
    <div className={className}>
      <svg 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Colorful Gradient Background */}
        <defs>
          <linearGradient id="auraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#D946EF" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
        
        {/* Simplified 'A' Shape */}
        <path 
          d="M50 10 L20 90 L35 90 L40 75 L60 75 L65 90 L80 90 L50 10 Z M50 35 L55 60 L45 60 L50 35 Z" 
          fill="url(#auraGradient)"
          stroke="white"
          strokeWidth="1"
        />
        
        {/* Abstract Accent */}
        <circle cx="50" cy="20" r="5" fill="#33C3F0" />
      </svg>
    </div>
  );
};

export default AuraLogo;
