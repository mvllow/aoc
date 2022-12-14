// const input = await Deno.readTextFile("input.txt");
const sampleInput = `30373
25512
65332
33549
35390`;

const grid: number[][] = [];

sampleInput
	.trim()
	.split("\n")
	.map((line, i) => {
		[...line].map((digit) => {
			if (!grid[i]) {
				grid[i] = [];
			}
			grid[i].push(Number(digit));
		});
	});

// Max per direction, starting at -1
// Down, Right, Up, Left
const directionMax: number[][] = [
	new Array(grid[0].length).fill(-1),
	new Array(grid.length).fill(-1),
	new Array(grid[0].length).fill(-1),
	new Array(grid.length).fill(-1),
];

console.log({ directionMax });

const visible: boolean[][] = new Array(grid.length).fill([]);

for (let i = 0; i < visible.length; i++) {
	visible[i] = new Array(grid[0].length).fill(false);
}

let totalVisible = 0;

const go = (
	row: number,
	column: number,
	max: number,
	maxRow: number,
	maxColumn: number,
) => {
	if (grid[row][column] > max) {
		directionMax[maxRow][maxColumn] = grid[row][column];

		if (!visible[row][column]) {
			visible[row][column] = true;
			totalVisible++;
		}
	}
};

for (let row = 0; row < grid.length; row++) {
	const down = row;
	const up = grid.length - 1 - down;

	for (let column = 0; column < grid[row].length; column++) {
		const right = column;
		const left = grid[0].length - 1 - right;

		go(down, right, directionMax[0][right], 0, right);
		go(down, right, directionMax[1][down], 1, down);
		go(up, left, directionMax[2][left], 2, left);
		go(up, left, directionMax[3][up], 3, up);
	}
}

console.log({ totalVisible });
