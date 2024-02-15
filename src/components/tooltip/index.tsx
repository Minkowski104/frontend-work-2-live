import React from 'react';
import './Tooltip.css'; // You can style your tooltip in this CSS file

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="tooltip-container">
      <span className="tooltip-text">{text}</span>
      {children}
    </div>
  );
};

export default Tooltip;
