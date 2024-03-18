import { useTicTacToe } from "./useTicTacToe";
import { Board } from "./Board";
import { Cell } from "./Cell";

export const TicTacToe = () => {
  const { cells, playerSelectCell, gameResult, activePlayer, boardSize } =
    useTicTacToe(3);

  return (
    <>
      <Board size={boardSize}>
        {cells.map((cellValue, cellOffset) => (
          <Cell
            key={cellOffset}
            value={cellValue}
            clickable={gameResult.winner === null}
            onClick={() => playerSelectCell(cellOffset)}
          />
        ))}
      </Board>

      {gameResult.winner !== null ? (
        <p>
          <span role="img" aria-label="Une coupe">
            🏆
          </span>{" "}
          Le joueur{" "}
          <code style={{ textTransform: "uppercase" }}>
            {gameResult.winner}
          </code>{" "}
          a gagné!{" "}
          <span role="img" aria-label="Une coupe">
            🏆
          </span>
        </p>
      ) : (
        <p>
          C'est au tour du joueur{" "}
          <code style={{ textTransform: "uppercase" }}>{activePlayer}</code>
        </p>
      )}
    </>
  );
};
