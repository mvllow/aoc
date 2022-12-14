const input = await Deno.readTextFile("input.txt");
const sampleInput = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

type Direction = "U" | "D" | "R" | "L";
type Knot = { x: number; y: number };
type Knots = Record<number, Knot>;

const move = (knot: Knot, direction: Direction) => ({
	R: (knot: Knot) => knot.x++,
	L: (knot: Knot) => knot.x--,
	U: (knot: Knot) => knot.y++,
	D: (knot: Knot) => knot.y--,
}[direction](knot));

const follow = (knot: Knot, previousKnot: Knot) => {
	const [dX, dY] = [previousKnot.x - knot.x, previousKnot.y - knot.y];

	if (dX >= 2 || (Math.abs(dY) >= 2 && dX >= 1)) move(knot, "R");
	if (dX <= -2 || (Math.abs(dY) >= 2 && dX <= -1)) move(knot, "L");
	if (dY >= 2 || (Math.abs(dX) >= 2 && dY >= 1)) move(knot, "U");
	if (dY <= -2 || (Math.abs(dX) >= 2 && dY <= -1)) move(knot, "D");
};

const parse = (ropeLength: number) => {
	const knots: Knots = {
		0: { x: 0, y: 0 },
	};
	const visited = new Set<string>();

	input.split("\n").map((line) => {
		const [direction, count] = line.split(" ") as [Direction, string];

		for (let i = 0; i < Number(count); i++) {
			move(knots[0], direction);

			for (let j = 1; j <= ropeLength; j++) {
				if (!knots[j]) {
					knots[j] = { x: 0, y: 0 };
				}

				follow(knots[j], knots[j - 1]);
			}

			visited.add(`${knots[ropeLength].x},${knots[ropeLength].y}`);
		}
	});

	return visited.size;
};

console.log({
	part1: parse(1),
	part2: parse(9),
});
