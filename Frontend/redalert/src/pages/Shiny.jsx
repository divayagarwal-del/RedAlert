import ShinyText from './ShinyText';

export default function App() {
  return (
    <div className="flex items-center justify-center ">
      <ShinyText 
        text="RedAlert" 
        speed={16} 
        className="text-[120px] font-bold" 
      />
    </div>
  );
}
