const input = await Deno.readTextFile("./input.txt");

const sumLines = (lines: string): number =>
	lines.split("\n").reduce((sum, line) => sum + Number(line), 0);

const sumListTops = (list: number[], count = 1) =>
	list.slice(0, count).reduce((sum: number, num: number) => sum + num, 0);

const groups = input.split("\n\n");
const groupSums = groups.map(sumLines);
const sortedSums = [...groupSums].sort((a, b) => a - b);

console.log(sumListTops(sortedSums, 1), sumListTops(sortedSums, 3));
