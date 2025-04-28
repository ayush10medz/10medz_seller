import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-16 h-16">
        <div className="absolute border-4 border-secondary rounded-full opacity-75 animate-ping w-full h-full"></div>
        <div className="absolute border-4 border-primary rounded-full w-full h-full"></div>
      </div>
    </div>
  );
};

export default Loader;
