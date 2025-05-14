
import React from "react";

interface AuraLogoProps {
  className?: string;
}

const AuraLogo: React.FC<AuraLogoProps> = ({ className }) => {
  return (
    <img 
      src="/lovable-uploads/27d207c7-a4de-4d38-9a73-fe2f8bfe5bfc.png" 
      alt="Aura AI" 
      className={className} 
    />
  );
};

export default AuraLogo;
