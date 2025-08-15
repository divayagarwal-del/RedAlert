import Silk from "./Silk";
import ShinyText from "./Shiny";
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <Silk
          speed={3}
          scale={1.1}
          color="#AF8FE9"
          noiseIntensity={2}
          rotation={2.98}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <img
          src="/violet.png"
          alt="RedAlert Logo"
          className="w-64 h-auto mx-auto mb-4"
        />
        <ShinyText text="Wisteria" className="shiny-text text-4xl font-bold font-lobster" />

        <p className="mt-4 font-bold text-lg md:text-2xl">Stay at Reddoorz</p>

        <div className="mt-10 flex space-x-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-10 py-5 text-lg md:text-xl bg-[#864eee] hover:bg-[#AF8FE9] rounded-xl font-semibold transition-colors shadow-lg"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('/datatable')}
            className="px-10 py-5 text-lg md:text-xl bg-transparent border-2 border-white hover:bg-white hover:text-black rounded-xl font-semibold transition-colors shadow-lg"
          >
            Tables
          </button>
        </div>
      </div>
    </div>
  );
}
