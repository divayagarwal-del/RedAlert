import React from "react";
import landing from "../assets/landingg.webp"
export default function LandingPage() {
  return (
    <div className="h-screen flex flex-col font-sans">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-red-600 text-2xl font-bold">RedAlert</h1>
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg">
          👤
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Section (40%) */}
        <div className="w-2/5 flex flex-col justify-center items-center px-6">
          <h2 className="text-3xl font-bold mb-8">Welcome to RedAlert Hotel</h2>
          <div className="flex gap-4 w-full">
            <button className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              Button 1
            </button>
            <button className="flex-1 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
              Button 2
            </button>
          </div>
        </div>

        {/* Right Section (60%) */}
        <div className="w-3/5 bg-gray-100 flex items-center justify-center">
  <img
    src={landing}
    alt="Hotel"
    className="w-full h-full object-cover"
  />
</div>
      </div>
    </div>
  );
}
