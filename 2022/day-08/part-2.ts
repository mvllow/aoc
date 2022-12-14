const input = await Deno.readTextFile("input.txt");
const sampleInput = `30373
25512
65332
33549
35390`;

const grid: number[][] = [];

input
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

let max = 0;

for (let row = 1; row < grid.length - 1; row++) {
	for (let column = 1; column < grid[row].length - 1; column++) {
		let up = row - 1;
		while (up > 0 && grid[up][column] < grid[row][column]) {
			up--;
		}

		let down = row + 1;
		while (down < grid.length - 1 && grid[down][column] < grid[row][column]) {
			down++;
		}

		let left = column - 1;
		while (left > 0 && grid[row][left] < grid[row][column]) {
			left--;
		}

		let right = column + 1;
		while (
			right < grid[row].length - 1 &&
			grid[row][right] < grid[row][column]
		) {
			right++;
		}

		const score = (row - up) * (down - row) * (column - left) *
			(right - column);

		if (score > max) {
			max = score;
		}
	}
}

console.log({ max });
