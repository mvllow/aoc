const getAssignedSections = (assignment: string) => {
	const [first, last] = assignment.split("-").map(Number);
	const sections = [];
	for (let i = first; i <= last; i++) {
		sections.push(i);
	}
	return sections;
};

const findOverlaps = ([a, b]: number[]) => {
	let numberOfOverlaps = 0;
	if (
		a.some((section) => b.includes(section)) ||
		b.some((section) => a.includes(section))
	) {
		numberOfOverlaps += 1;
	}
	return numberOfOverlaps;
};

let result = 0;
const input = await Deno.readTextFile("input.txt");
input.split("\n").map((line) => {
	if (!line) return;
	result += findOverlaps(line.split(",").map(getAssignedSections));
});

console.log({ result });
