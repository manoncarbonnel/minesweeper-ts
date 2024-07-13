type FieldCell = "." | "*";
type FieldRow = FieldCell[];
type Field = FieldRow[];

type SolutionCell = number | "*";
type SolutionRow = SolutionCell[];
type Solution = SolutionRow[];

function get(field: Field, y: number, x: number) {
  try {
    return field[y][x];
  } catch {}
}

function neighbours(field: Field, y: number, x: number) {
  return [
    get(field, y, x - 1),
    get(field, y, x + 1),
    get(field, y + 1, x),
    get(field, y + 1, x + 1),
    get(field, y + 1, x - 1),
    get(field, y - 1, x),
    get(field, y - 1, x + 1),
    get(field, y - 1, x - 1),
  ].filter((a) => !!a);
}

function isBomb(cell: FieldCell) {
  return cell === "*";
}

function toSolutionCell(x: number, y: number, field: Field): SolutionCell {
  const cell = field[y][x];
  if (isBomb(cell)) return cell;

  return neighbours(field, y, x).filter(isBomb).length;
}

export const minesweeper = (input: Field): Solution => {
  return input.map((row, y) => row.map((_, x) => toSolutionCell(x, y, input)));
};
