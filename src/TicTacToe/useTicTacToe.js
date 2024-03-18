import { useCallback, useEffect, useState } from "react";
import { EMPTY_CELL, PLAYER_O, PLAYER_X } from "./constant";
import { resolveTicTacToe } from "./resolveTicTacToe";

const onlyFreeCell = (oneCell) => oneCell !== EMPTY_CELL;

const generateEmptyBoard = (boardSize) =>
  [...new Array(boardSize ** 2)].map(() => EMPTY_CELL);

export const useTicTacToe = (boardSize = 3) => {
  const [cells, setCells] = useState(() => generateEmptyBoard(boardSize));

  const [activePlayer, setActivePlayer] = useState(() => PLAYER_X);

  const playerSelectCell = useCallback(
    (cellOffset) => {
      setCells((previousCells) => {
        if (previousCells[cellOffset] !== EMPTY_CELL) {
          console.error(
            `The cell is already own by player "${previousCells[cellOffset]}"`,
          );
          return previousCells;
        }

        const newCells = [...previousCells];
        newCells[cellOffset] = activePlayer;

        return newCells;
      });
    },
    [activePlayer],
  );

  const [gameResult, setGameResult] = useState({ winner: null });

  useEffect(() => {
    if (cells.filter(onlyFreeCell).length % 2 === 0) {
      setActivePlayer(PLAYER_X);
    } else {
      setActivePlayer(PLAYER_O);
    }
  }, [cells]);

  useEffect(() => {
    const { winner } = resolveTicTacToe(cells, boardSize);
    if (winner) {
      setGameResult({ winner });
    }
  }, [cells, boardSize]);

  useEffect(() => {
    setCells(generateEmptyBoard(boardSize));
  }, [boardSize]);

  return {
    cells,
    playerSelectCell,
    gameResult,
    activePlayer,
    boardSize,
  };
};
