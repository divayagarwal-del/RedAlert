import Silk from "./Silk";
import ShinyText from "./Shiny"
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
  color="#8F1E24"
  noiseIntensity={2}
  rotation={2.98}
/>


      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        {/* <h1 className="text-5xl md:text-7xl font-bold">RedAlert</h1> */}

         <img
          src="/animal.png"
          alt="RedAlert Logo"
          className="w-64 h-auto mx-auto mb-4"
        />
        <ShinyText text="RedAlert" className="shiny-text text-4xl font-bold font-lobster" />

      
        <p className="mt-4 font-bold text-lg md:text-2xl">Stay at Reddoorz</p>
        
        <div className="mt-8 flex space-x-4">
          <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors">
            Dashboard
          </button>
          <button  onClick={() => navigate('/datatable')} className="px-6 py-3 bg-transparent border border-white hover:bg-white hover:text-black rounded-lg font-medium transition-colors">
            Tables
          </button>
        </div>
      </div>
    </div>
  );
}
