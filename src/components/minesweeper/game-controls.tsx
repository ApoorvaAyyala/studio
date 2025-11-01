"use client";

import { Button } from "@/components/ui/button";
import { BombIcon } from "../icons/bomb-icon";
import { Clock, Frown, Smile, Sunglasses } from "lucide-react";
import type { GameStatus } from "@/lib/minesweeper";

interface GameControlsProps {
  mineCount: number;
  flagCount: number;
  onReset: () => void;
  gameStatus: GameStatus;
  elapsedTime: number;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

export function GameControls({
  mineCount,
  flagCount,
  onReset,
  gameStatus,
  elapsedTime,
}: GameControlsProps) {
  const remainingMines = mineCount - flagCount;

  const getStatusIcon = () => {
    switch (gameStatus) {
      case "playing":
        return <Smile className="w-8 h-8 text-yellow-400" />;
      case "won":
        return <Sunglasses className="w-8 h-8 text-green-400" />;
      case "lost":
        return <Frown className="w-8 h-8 text-red-500" />;
      case "ready":
      default:
        return <Smile className="w-8 h-8 text-gray-400" />;
    }
  };

  return (
    <div className="w-full bg-muted/50 p-3 rounded-lg border border-border shadow-inner mb-4 flex justify-between items-center">
      <div className="flex items-center gap-2 bg-background text-destructive font-bold font-mono text-2xl p-2 rounded-md border border-border">
        <BombIcon className="w-6 h-6" />
        <span className="min-w-[4ch] text-center">{remainingMines.toString().padStart(3, "0")}</span>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onReset}
        className="w-16 h-16 rounded-full bg-background hover:bg-accent border-2 border-border shadow-lg"
        aria-label="Reset game"
      >
        {getStatusIcon()}
      </Button>
      
      <div className="flex items-center gap-2 bg-background text-foreground font-bold font-mono text-2xl p-2 rounded-md border border-border">
        <Clock className="w-6 h-6" />
        <span className="min-w-[4ch] text-center">{formatTime(elapsedTime)}</span>
      </div>
    </div>
  );
}
