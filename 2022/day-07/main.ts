const input = await Deno.readTextFile("input.txt");

const sizes: Record<string, number> = {};
const path: string[] = [];

input
	.trim()
	.split("\n")
	.map((line) => {
		const statement = line.split(" ");

		if (statement[0] === "dir") return;
		if (statement[1] === "ls") return;

		if (statement[1] === "cd") {
			if (statement[2] == "..") {
				path.pop();
			} else {
				path.push(statement[2]);
			}
		} else {
			const size = parseInt(statement[0]);

			for (let i = 0; i < path.length; i++) {
				const fullPath = path.slice(0, path.length - i).join("/");

				if (sizes[fullPath]) {
					sizes[fullPath] += size;
				} else {
					sizes[fullPath] = size;
				}
			}
		}
	});

const sumUnder100k = Object.entries(sizes)
	.filter(([_, size]) => size <= 100_000)
	.reduce((sum, [_, size]) => sum + size, 0);

const neededSpace = 30_000_000 - (70_000_000 - sizes["/"]);

const sizeOfdirectoryToDelete = Math.min(
	...Object.entries(sizes)
		.filter(([_, size]) => size >= neededSpace)
		.map(([_, size]) => size),
);

console.log({ part1: sumUnder100k, part2: sizeOfdirectoryToDelete });
