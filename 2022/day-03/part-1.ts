const getSackCompartments = (sack: string): [string, string] => [
	sack.slice(0, sack.length / 2),
	sack.slice(sack.length / 2, sack.length),
];

const atoi = (a: string) => parseInt(a, 36) - 9;

const getItemPriority = (item: string): number =>
	item.toUpperCase() === item ? atoi(item) + 26 : atoi(item);

let totalPriority = 0;

const input = await Deno.readTextFile("input.txt");
input.split("\n").map((sack) => {
	if (!sack) return;

	const [compartment1, compartment2] = getSackCompartments(sack);

	for (const itemType of compartment1) {
		if (compartment2.includes(itemType)) {
			return (totalPriority += getItemPriority(itemType));
		}
	}
});

console.log({ totalPriority });
