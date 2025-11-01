"use client";

import { type Cell } from "@/lib/minesweeper";
import { cn } from "@/lib/utils";
import { BombIcon } from "../icons/bomb-icon";
import { FlagIcon } from "../icons/flag-icon";

interface GameCellProps {
  cell: Cell;
  onClick: (row: number, col: number) => void;
  onContextMenu: (row: number, col: number) => void;
  isGameOver: boolean;
}

const numberColors = [
  "text-blue-500",    // 1
  "text-green-600",   // 2
  "text-red-500",     // 3
  "text-purple-700",  // 4
  "text-orange-500",  // 5
  "text-cyan-500",    // 6
  "text-black",       // 7
  "text-gray-500",    // 8
];

export function GameCell({ cell, onClick, onContextMenu, isGameOver }: GameCellProps) {
  const { row, col, isRevealed, isMine, isFlagged, adjacentMines } = cell;

  const handleClick = () => {
    if (!isFlagged && !isRevealed && !isGameOver) {
      onClick(row, col);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isRevealed && !isGameOver) {
      onContextMenu(row, col);
    }
  };

  const renderContent = () => {
    if (isFlagged) {
      return <FlagIcon className="w-4 h-4 sm:w-6 sm:h-6" />;
    }
    if (isRevealed) {
      if (isMine) {
        return <BombIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />;
      }
      if (adjacentMines > 0) {
        return (
          <span
            className={cn(
              "font-bold text-lg sm:text-xl",
              numberColors[adjacentMines - 1]
            )}
          >
            {adjacentMines}
          </span>
        );
      }
    }
    return null;
  };

  return (
    <button
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      aria-label={`Cell at row ${row + 1}, column ${col + 1}`}
      className={cn(
        "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center rounded-sm font-mono transition-all duration-100 ease-in-out transform",
        {
          "bg-primary hover:bg-green-800 shadow-md border-2 border-green-500/50 border-t-green-400/80 border-l-green-400/80 active:scale-95 active:shadow-inner": !isRevealed && !isFlagged,
          "bg-primary shadow-md border-2 border-green-500/50 border-t-green-400/80 border-l-green-400/80": isFlagged,
          "bg-muted border border-accent": isRevealed && !isMine,
          "bg-destructive border border-red-700 animate-pulse": isRevealed && isMine,
          "bg-destructive": isGameOver && isMine && !isRevealed,
        }
      )}
    >
      {renderContent()}
    </button>
  );
}
