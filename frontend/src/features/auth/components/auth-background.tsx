export function AuthBackground() {
  return (
    <div className="hidden lg:flex flex-1 items-center justify-center relative group/brand cursor-default select-none">
      {/* Siatka logistyczna — subtelny drift animation */}
      <div
        className="absolute inset-0 opacity-[0.04] animate-grid-drift"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient glow — powiększa się on hover */}
      <div className="absolute w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] transition-all duration-700 ease-out group-hover/brand:w-[600px] group-hover/brand:h-[600px] group-hover/brand:bg-violet-500/15" />

      {/* Dekoracyjne kółka/particles */}
      <div className="absolute top-[20%] left-[15%] w-1.5 h-1.5 rounded-full bg-violet-400/20 animate-float" />
      <div className="absolute top-[65%] left-[25%] w-1 h-1 rounded-full bg-violet-400/30 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[30%] right-[20%] w-2 h-2 rounded-full bg-violet-400/15 animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-[25%] right-[30%] w-1.5 h-1.5 rounded-full bg-violet-400/20 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-[45%] left-[10%] w-1 h-1 rounded-full bg-violet-400/25 animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute top-[15%] right-[35%] w-1 h-1 rounded-full bg-violet-400/15 animate-float" style={{ animationDelay: '5s' }} />
      <div className="absolute bottom-[15%] left-[40%] w-2 h-2 rounded-full bg-violet-400/10 animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-[75%] right-[15%] w-1.5 h-1.5 rounded-full bg-violet-400/20 animate-float" style={{ animationDelay: '3.5s' }} />
      <div className="absolute top-[50%] right-[40%] w-1 h-1 rounded-full bg-violet-300/10 animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-[40%] left-[30%] w-1.5 h-1.5 rounded-full bg-violet-400/15 animate-float" style={{ animationDelay: '4.5s' }} />

      {/* Logo i nazwa */}
      <div className="relative z-10 text-center space-y-6 transition-transform duration-500 group-hover/brand:-translate-y-2">
        {/* Ikona — pulsująca obwódka + float */}
        <div className="mx-auto w-24 h-24 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center backdrop-blur-sm animate-pulse-ring transition-all duration-500 group-hover/brand:bg-violet-500/15 group-hover/brand:border-violet-500/35 group-hover/brand:scale-110 group-hover/brand:-translate-y-3">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-violet-300 transition-colors duration-500 group-hover/brand:text-violet-400">
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
        </div>

        <div className="text-violet-300">
          <h1 className="font-heading text-4xl font-bold tracking-tight transition-colors duration-500 group-hover/brand:text-violet-400">
            WindyWMS <span className="text-[1.2rem] text-violet-400">DEMO</span>
          </h1>
          <p className="text-violet-300/60 mt-2 text-sm tracking-wide">
            System Zarządzania Magazynem
          </p>
        </div>
      </div>
    </div>
  );
}