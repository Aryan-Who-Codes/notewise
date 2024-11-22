import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

const Tooltip = ({ children, tooltip, isVisible }) => {
  const { theme } = useTheme();

  if (!isVisible) return children;

  return (
    <div className="group relative inline-flex">
      {children}
      <div
        className="absolute bottom-full left-0 mb-2 z-[9999]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${theme === 'dark'
          ? 'bg-dark-card text-dark-text-primary border border-dark-border'
          : 'bg-gray-900 text-white'
          } text-xs md:text-sm rounded-lg px-3 py-1.5 whitespace-nowrap shadow-lg backdrop-blur-sm`}>
          {tooltip}
          <div className="absolute left-4 top-full">
            <div className={`border-4 border-transparent ${theme === 'dark'
                ? 'border-t-dark-card'
                : 'border-t-gray-900'
              }`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
