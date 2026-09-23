import { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { VisualizerPage } from './components/Visualizer/VisualizerPage';
import { PracticePage } from './components/Practice/PracticePage';
import { CheatSheetPage } from './components/Learn/CheatSheetPage';
import { SplashScreen } from './components/SplashScreen';
import { DeveloperTerminal } from './components/DeveloperTerminal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('visualizer');
  const [showSplash, setShowSplash] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');

      // Shift + S to open terminal
      if (e.shiftKey && (e.key === 'S' || e.key === 's' || e.code === 'KeyS')) {
        if (!isInput) {
          e.preventDefault();
          setIsTerminalOpen(true);
        }
      }

      // Shift + D to close terminal
      if (e.shiftKey && (e.key === 'D' || e.key === 'd' || e.code === 'KeyD')) {
        if (!isInput) {
          e.preventDefault();
          setIsTerminalOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <DeveloperTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
      <div className="h-screen h-[100dvh] bg-[#080B16] text-[#F8FAFC] flex flex-col font-sans selection:bg-[#8B5CF6]/30 selection:text-[#c4b5fd] overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Main View Area (only this section scrolls) */}
        <main className="flex-1 overflow-y-auto no-scrollbar pb-12 overscroll-contain">
          {currentPage === 'visualizer' && <VisualizerPage />}
          {currentPage === 'practice' && <PracticePage />}
          {currentPage === 'learn' && <CheatSheetPage />}
        </main>
      </div>
    </>
  );
}
