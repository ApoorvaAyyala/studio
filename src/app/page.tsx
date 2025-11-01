import { MinesweeperGame } from '@/components/minesweeper/minesweeper-game';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline mb-6 sm:mb-8 text-center bg-gradient-to-r from-primary via-green-400 to-primary-foreground bg-clip-text text-transparent">
          Minesweeper Mayhem
        </h1>
        <MinesweeperGame />
      </div>
    </main>
  );
}
