import React from "react";

export const LoadingDots: React.FC = () => {
  return (
    <div className="flex items-center space-x-1">
      <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
      <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
      <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-200"></span>
    </div>
  );
};
