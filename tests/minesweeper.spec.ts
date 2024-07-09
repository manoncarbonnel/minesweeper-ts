import { describe, expect, test } from 'vitest';


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

const fieldEquals = (a: Field, b: Field): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
}

function toSolutionCell(cell: string, i: number, row: FieldCell[]): SolutionCell {
  if (cell === "*") {
    return "*";
  }
  const neighbours = [row[i-1], row[i+1]]
  return neighbours.filter(it => it==="*").length;
}

const minesweeper = (input: Field): Solution => {
  return [input[0].map(toSolutionCell)];
};

describe('Minesweeper', () => {
  test('One empty cell', () => {
    expect(minesweeper([["."]])).toEqual([[0]]);
  });
  test('One bomb cell', () => {
    expect(minesweeper([["*"]])).toEqual([["*"]]);
  });
  test('Two empty cells', () => {
    expect(minesweeper([[".", "."]])).toEqual([[0, 0]])
  })
  test('One empty cell and one bomb cell', () => {
    expect(minesweeper([["*", "."]])).toEqual([["*", 1]])
  })
  test('François & Adrien', () => {
    expect(minesweeper([["*", ".", "*"]])).toEqual([["*", 2, "*"]])
  })
});

