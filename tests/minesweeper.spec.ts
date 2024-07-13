import { describe, expect, test } from "vitest";
import { minesweeper } from "../src";

// Specs
// The goal of the game is to find all the mines within an MxN field.

// * : bomb
// . : neutral
// 1 : hint

// *...
// ....
// .*..
// ....

// *100
// 2210
// 1*10
// 1110

type FieldCell = "." | "*";
type FieldRow = FieldCell[];
type Field = FieldRow[];

type SolutionCell = number | "*";
type SolutionRow = SolutionCell[];
type Solution = SolutionRow[];

describe("Minesweeper", () => {
  test("Acceptance", () => {
    expect(
      minesweeper([
        ["*", ".", ".", "."],
        [".", ".", ".", "."],
        [".", "*", ".", "."],
        [".", ".", ".", "."],
      ])
    ).toEqual([
      ["*", 1, 0, 0],
      [2, 2, 1, 0],
      [1, "*", 1, 0],
      [1, 1, 1, 0],
    ]);
  });
  describe("single column", () => {
    const stuff: { field: Field; solution: Solution }[] = [
      { field: [["."], ["."]], solution: [[0], [0]] },
      { field: [["*"], ["."]], solution: [["*"], [1]] },
      { field: [["."], ["*"]], solution: [[1], ["*"]] },
      { field: [["*"], ["*"]], solution: [["*"], ["*"]] },
    ];
    test.each(stuff)("$field -> $solution", ({ field, solution }) => {
      expect(minesweeper(field)).toEqual(solution);
    });
  });
  describe("single row", () => {
    const stuff: { field: Field; solution: Solution }[] = [
      { field: [["."]], solution: [[0]] },
      { field: [["*"]], solution: [["*"]] },
      { field: [[".", "."]], solution: [[0, 0]] },
      { field: [["*", "."]], solution: [["*", 1]] },
      { field: [["*", ".", "*"]], solution: [["*", 2, "*"]] },
      { field: [["*", "*", "."]], solution: [["*", "*", 1]] },
      { field: [[".", "*", "*"]], solution: [[1, "*", "*"]] },
      {
        field: [["*", ".", "*", ".", ".", ".", "*", "*"]],
        solution: [["*", 2, "*", 1, 0, 1, "*", "*"]],
      },
    ];
    test.each(stuff)("$field -> $solution", ({ field, solution }) => {
      expect(minesweeper(field)).toEqual(solution);
    });
  });
});
