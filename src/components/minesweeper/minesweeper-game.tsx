"use client";

import { useState, useCallback, useEffect } from "react";
import { createBoard, type Cell, type GameStatus } from "@/lib/minesweeper";
import { GameBoard } from "./game-board";
import { GameControls } from "./game-controls";
import { DifficultySettings, type GameSettings } from "./difficulty-settings";
import { useToast } from "@/hooks/use-toast";
import { produce } from "immer";

const DEFAULT_SETTINGS: GameSettings = { rows: 9, cols: 9, mines: 10 };

export function MinesweeperGame() {
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("ready");
  const [flagCount, setFlagCount] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { toast } = useToast();

  const startGame = useCallback((newSettings: GameSettings) => {
    setSettings(newSettings);
    setBoard(createBoard(newSettings.rows, newSettings.cols, newSettings.mines));
    setGameStatus("playing");
    setFlagCount(0);
    setElapsedTime(0);
  }, []);

  useEffect(() => {
    startGame(settings);
  }, [startGame, settings]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStatus === "playing") {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStatus]);

  const checkWinCondition = (currentBoard: Cell[][]) => {
    const nonMineCells = settings.rows * settings.cols - settings.mines;
    const revealedCount = currentBoard.flat().filter(cell => cell.isRevealed).length;
    if (revealedCount === nonMineCells) {
      setGameStatus("won");
      toast({
        title: "You won!",
        description: `You cleared the board in ${elapsedTime} seconds.`,
      });
      setBoard(produce(draft => {
        draft.flat().filter(cell => cell.isMine).forEach(cell => cell.isFlagged = true);
      }));
      setFlagCount(settings.mines);
    }
  };

  const handleCellClick = useCallback((row: number, col: number) => {
    if (gameStatus !== "playing") return;

    const cell = board[row][col];
    if (cell.isRevealed || cell.isFlagged) return;

    if (cell.isMine) {
      setGameStatus("lost");
      toast({
        title: "Game Over!",
        description: "You hit a mine.",
        variant: "destructive",
      });
      setBoard(produce(draft => {
        draft.flat().forEach(c => { if(c.isMine) c.isRevealed = true });
      }));
      return;
    }
    
    const newBoard = produce(board, draft => {
        const q: [number, number][] = [[row, col]];
        draft[row][col].isRevealed = true;

        while(q.length > 0){
            const [r, c] = q.shift()!;
            
            if (draft[r][c].adjacentMines === 0) {
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        if (dr === 0 && dc === 0) continue;
                        const nr = r + dr;
                        const nc = c + dc;

                        if (nr >= 0 && nr < settings.rows && nc >= 0 && nc < settings.cols) {
                            const neighbor = draft[nr][nc];
                            if (!neighbor.isRevealed && !neighbor.isFlagged) {
                                neighbor.isRevealed = true;
                                if(neighbor.adjacentMines === 0){
                                    q.push([nr, nc]);
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    setBoard(newBoard);
    checkWinCondition(newBoard);

  }, [board, gameStatus, settings, toast, elapsedTime]);

  const handleCellContextMenu = useCallback((row: number, col: number) => {
    if (gameStatus !== "playing") return;
    const cell = board[row][col];
    if (cell.isRevealed) return;
    
    if (!cell.isFlagged && flagCount >= settings.mines) {
        toast({ title: "No more flags", description: "You've used all your flags.", variant: "destructive" });
        return;
    }

    setBoard(produce(draft => {
        draft[row][col].isFlagged = !draft[row][col].isFlagged;
    }));

    setFlagCount(prev => cell.isFlagged ? prev - 1 : prev + 1);

  }, [board, gameStatus, flagCount, settings.mines, toast]);
  
  const handleSettingsChange = (newSettings: GameSettings) => {
    setSettings(newSettings);
  };

  const isGameOver = gameStatus === "won" || gameStatus === "lost";

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="w-full lg:w-auto">
        {board.length > 0 && (
          <>
            <GameControls
              mineCount={settings.mines}
              flagCount={flagCount}
              onReset={() => startGame(settings)}
              gameStatus={gameStatus}
              elapsedTime={elapsedTime}
            />
            <GameBoard
              board={board}
              onCellClick={handleCellClick}
              onCellContextMenu={handleCellContextMenu}
              isGameOver={isGameOver}
            />
          </>
        )}
      </div>
      <div className="w-full max-w-2xl">
        <DifficultySettings onSettingsChange={handleSettingsChange} defaultSettings={settings} />
      </div>
    </div>
  );
}
