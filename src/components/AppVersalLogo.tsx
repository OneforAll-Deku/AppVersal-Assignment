import React from 'react';
import logoSrc from '../assets/appversal-logo.jpg';

export const AppVersalLogo: React.FC<{ className?: string; iconSize?: number }> = ({
  className = '',
  iconSize = 34,
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <img
        src={logoSrc}
        alt="AppVersal"
        width={iconSize}
        height={iconSize}
        className="shrink-0 rounded-lg object-contain"
      />
      <span className="font-black text-xl tracking-tight text-[#dc2626]">
        AppVersal
      </span>
    </div>
  );
};
