const getAssignedSections = (assignment: string) => {
	const [first, last] = assignment.split("-").map(Number);
	const sections: number[] = [];
	for (let i = first; i <= last; i++) {
		sections.push(i);
	}
	return sections;
};

const findOverlaps = ([a, b]: number[][], partial = false) => {
	const match = partial
		? (
			a.some((section) => b.includes(section)) ||
			b.some((section) => a.includes(section))
		)
		: (
			a.every((section) => b.includes(section)) ||
			b.every((section) => a.includes(section))
		);

	return match ? 1 : 0;
};

const input = await Deno.readTextFile("input.txt");

const total = input.trim().split("\n").reduce((numberOfOverlaps, line) => {
	const assignments = line.split(",").map(getAssignedSections);
	return numberOfOverlaps + findOverlaps(assignments);
}, 0);

const partialTotal = input.trim().split("\n").reduce(
	(numberOfOverlaps, line) => {
		const assignments = line.split(",").map(getAssignedSections);
		return numberOfOverlaps + findOverlaps(assignments, true);
	},
	0,
);

console.log({ total, partialTotal });
