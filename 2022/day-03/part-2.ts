const atoi = (a: string) => parseInt(a, 36) - 9;

const getItemPriority = (item: string): number =>
	item.toUpperCase() === item ? atoi(item) + 26 : atoi(item);

const findSharedItem = ([a, b, c]: string[]): string =>
	[...a].find((item) => b.includes(item) && c.includes(item))!;

let totalPriority = 0;
let groupsOfSacks: string[] = [];

const input = await Deno.readTextFile("input.txt");
input.split("\n").map((sack, i) => {
	if (!sack) return;

	groupsOfSacks[i % 3] = sack;
	if (i % 3 === 2) {
		totalPriority += getItemPriority(findSharedItem(groupsOfSacks));
		groupsOfSacks = [];
	}
});

console.log({ totalPriority });
