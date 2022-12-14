// Stacks of crates, from bottom to top
const stacks = [
	["N", "C", "R", "T", "M", "Z", "P"],
	["D", "N", "T", "S", "B", "Z"],
	["M", "H", "Q", "R", "F", "C", "T", "G"],
	["G", "R", "Z"],
	["Z", "N", "R", "H"],
	["F", "H", "S", "W", "P", "Z", "L", "D"],
	["W", "D", "Z", "R", "C", "G", "M"],
	["S", "J", "F", "L", "H", "W", "Z", "Q"],
	["S", "Q", "P", "W", "N"],
];

const getInstructions = (instruction: string): number[] =>
	/.*?(\d+).*?(\d+).*?(\d+)/.exec(instruction)?.splice(1).map(
		Number,
	) as number[];

const moveCrate = ([count, from, to]: number[]) => {
	for (let i = 0; i < count; i++) {
		stacks[to - 1].push(stacks[from - 1].at(-1) ?? "");
		stacks[from - 1].pop();
	}
};

const getTopCrates = (): string =>
	stacks.reduce((acc, sum) => acc + sum.at(-1), "");

const input = await Deno.readTextFile("input.txt");

input
	.trim()
	.split("\n")
	// Remove drawing of starting stacks of crates. Ideally we would parse this
	// as part of our solution
	.splice(10)
	.map((instruction) => moveCrate(getInstructions(instruction)));

console.log(getTopCrates());
