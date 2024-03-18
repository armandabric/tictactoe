import { describe, test, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { PLAYER_O, PLAYER_X } from "./constant";
import { useTicTacToe } from "./useTicTacToe";

describe("useTicTacToe", () => {
  test("should cells given a board size", () => {
    const { result } = renderHook(() => useTicTacToe(4));

    expect(result.current.cells.length).toBe(16);
  });

  test("should always start a game with player X", () => {
    const { result } = renderHook(() => useTicTacToe(3));

    expect(result.current.activePlayer).toBe(PLAYER_X);
  });

  test("should change current player each time a player play", () => {
    const { result } = renderHook(() => useTicTacToe(3));

    act(() => result.current.playerSelectCell(0));
    expect(result.current.activePlayer).toBe(PLAYER_O);

    act(() => result.current.playerSelectCell(1));
    expect(result.current.activePlayer).toBe(PLAYER_X);

    act(() => result.current.playerSelectCell(3));
    expect(result.current.activePlayer).toBe(PLAYER_O);
  });

  describe("should detect a winner that fill a row", () => {
    /**
     * XXX
     * OO_
     * ___
     */
    it("first row", () => {
      const { result } = renderHook(() => useTicTacToe(3));

      act(() => result.current.playerSelectCell(0)); // X
      act(() => result.current.playerSelectCell(3)); // O
      act(() => result.current.playerSelectCell(1)); // X
      act(() => result.current.playerSelectCell(4)); // O
      act(() => result.current.playerSelectCell(2)); // X

      expect(result.current.gameResult).toEqual({ winner: PLAYER_X });
    });

    /**
     * 00_
     * XXX
     * ___
     */

    it("second row", () => {
      const { result } = renderHook(() => useTicTacToe(3));

      act(() => result.current.playerSelectCell(3)); // X
      act(() => result.current.playerSelectCell(0)); // O
      act(() => result.current.playerSelectCell(4)); // X
      act(() => result.current.playerSelectCell(1)); // O
      act(() => result.current.playerSelectCell(5)); // X

      expect(result.current.gameResult).toEqual({ winner: PLAYER_X });
    });

    /**
     * 00_
     * ___
     * XXX
     */
    it("third row", () => {
      const { result } = renderHook(() => useTicTacToe(3));

      act(() => result.current.playerSelectCell(6)); // X
      act(() => result.current.playerSelectCell(0)); // O
      act(() => result.current.playerSelectCell(7)); // X
      act(() => result.current.playerSelectCell(1)); // O
      act(() => result.current.playerSelectCell(8)); // X

      expect(result.current.gameResult).toEqual({ winner: PLAYER_X });
    });
  });

  describe("should detect a winner that fill a column", () => {
    /**
     * O_X
     * OXX
     * O__
     */
    it("first column", () => {
      const { result } = renderHook(() => useTicTacToe(3));

      act(() => result.current.playerSelectCell(2)); // X
      act(() => result.current.playerSelectCell(0)); // O
      act(() => result.current.playerSelectCell(4)); // X
      act(() => result.current.playerSelectCell(3)); // O
      act(() => result.current.playerSelectCell(5)); // X
      act(() => result.current.playerSelectCell(6)); // O

      expect(result.current.gameResult).toEqual({ winner: PLAYER_O });
    });

    /**
     * _O_
     * XOX
     * _OX
     */
    it("second column", () => {
      const { result } = renderHook(() => useTicTacToe(3));

      act(() => result.current.playerSelectCell(3)); // X
      act(() => result.current.playerSelectCell(1)); // O
      act(() => result.current.playerSelectCell(5)); // X
      act(() => result.current.playerSelectCell(4)); // O
      act(() => result.current.playerSelectCell(8)); // X
      act(() => result.current.playerSelectCell(7)); // O

      expect(result.current.gameResult).toEqual({ winner: PLAYER_O });
    });

    /**
     * __O
     * _XO
     * XXO
     */
    it("third column", () => {
      const { result } = renderHook(() => useTicTacToe(3));

      act(() => result.current.playerSelectCell(4)); // X
      act(() => result.current.playerSelectCell(2)); // O
      act(() => result.current.playerSelectCell(6)); // X
      act(() => result.current.playerSelectCell(5)); // O
      act(() => result.current.playerSelectCell(7)); // X
      act(() => result.current.playerSelectCell(8)); // O

      expect(result.current.gameResult).toEqual({ winner: PLAYER_O });
    });
  });

  describe("should detect diagonal", () => {
    /**
     * XO_
     * OX_
     * __X
     */
    it.todo("top left to bottom right", () => {
      const { result } = renderHook(() => useTicTacToe(3));

      act(() => result.current.playerSelectCell(0)); // X
      act(() => result.current.playerSelectCell(1)); // O
      act(() => result.current.playerSelectCell(4)); // X
      act(() => result.current.playerSelectCell(3)); // O
      act(() => result.current.playerSelectCell(8)); // X

      expect(result.current.gameResult).toEqual({ winner: PLAYER_X });
    });

    /**
     * _OX
     * OX_
     * X__
     */
    it.todo("top right to bottom left", () => {
      const { result } = renderHook(() => useTicTacToe(3));

      act(() => result.current.playerSelectCell(2)); // X
      act(() => result.current.playerSelectCell(1)); // O
      act(() => result.current.playerSelectCell(4)); // X
      act(() => result.current.playerSelectCell(3)); // O
      act(() => result.current.playerSelectCell(6)); // X

      expect(result.current.gameResult).toEqual({ winner: PLAYER_X });
    });
  });

  /**
   * XXO
   * OXO
   * XOX
   */
  it.todo("should detect a draw", () => {
    const { result } = renderHook(() => useTicTacToe(3));

    act(() => result.current.playerSelectCell(0)); // X
    act(() => result.current.playerSelectCell(2)); // O
    act(() => result.current.playerSelectCell(1)); // X
    act(() => result.current.playerSelectCell(3)); // O
    act(() => result.current.playerSelectCell(4)); // X
    act(() => result.current.playerSelectCell(5)); // O
    act(() => result.current.playerSelectCell(6)); // X
    act(() => result.current.playerSelectCell(7)); // O
    act(() => result.current.playerSelectCell(8)); // X

    expect(result.current.gameResult).toEqual({ winner: "draw" });
  });
});
