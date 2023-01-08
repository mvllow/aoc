type Position = [number, number];

function findShortestPathLength(
	grid: number[][],
	start: Position,
	end: Position,
	optimiseStartingPoint = false,
): number {
	const queue = [{ position: start, distance: 0 }];
	const visited = new Map<number, Set<number>>();

	while (queue[0].position[0] !== end[0] || queue[0].position[1] !== end[1]) {
		const { position: [x1, y1], distance } = queue.shift()!;

		if (visited.get(x1)?.has(y1)) continue;
		if (!visited.has(x1)) visited.set(x1, new Set());

		visited.get(x1)!.add(y1);

		const neighbors = [
			[x1 - 1, y1],
			[x1 + 1, y1],
			[x1, y1 - 1],
			[x1, y1 + 1],
		];

		neighbors.map(([x2, y2]) => {
			const outOfBounds = x2 < 0 || y2 < 0 || x2 >= grid.length ||
				y2 >= grid[0].length;

			if (!(outOfBounds || grid[x2][y2] > grid[x1][y1] + 1)) {
				queue.push({
					position: [x2, y2],
					distance: optimiseStartingPoint
						? (y1 === 0 ? 1 : distance + 1)
						: distance + 1,
				});
			}
		});
	}

	return queue[0].distance;
}

function parseElevations(data: string) {
	let start: Position = [0, 0];
	let end: Position = [0, 0];

	const grid = data.trim().split("\n").map((line, x) =>
		line.split("").map((char, y) => {
			if (char === "S") {
				start = [x, y];
				return 1;
			}

			if (char === "E") {
				end = [x, y];
				return 26;
			}

			return parseInt(char, 36) - 9;
		})
	);

	return { grid, start, end };
}

function part1(data: string) {
	const { grid, start, end } = parseElevations(data);
	return findShortestPathLength(grid, start, end);
}

function part2(data: string) {
	const { grid, start, end } = parseElevations(data);
	return findShortestPathLength(grid, start, end, true);
}

const input = await Deno.readTextFile("input.txt");

console.log(part1(input));
console.log(part2(input));
