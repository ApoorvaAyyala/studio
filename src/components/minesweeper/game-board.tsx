"use client";

import { type Cell as CellType } from "@/lib/minesweeper";
import { GameCell } from "./game-cell";

interface GameBoardProps {
  board: CellType[][];
  onCellClick: (row: number, col: number) => void;
  onCellContextMenu: (row: number, col: number) => void;
  isGameOver: boolean;
}

export function GameBoard({ board, onCellClick, onCellContextMenu, isGameOver }: GameBoardProps) {
  const cols = board[0]?.length || 0;

  return (
    <div
      className="bg-background p-2 sm:p-4 border-4 border-muted inline-block shadow-lg rounded-lg"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GameCell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              onClick={onCellClick}
              onContextMenu={onCellContextMenu}
              isGameOver={isGameOver}
            />
          ))
        )}
      </div>
    </div>
  );
}
