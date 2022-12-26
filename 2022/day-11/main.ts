const input = await Deno.readTextFile("input.txt");
const monkeyExpression =
	/Monkey (\d+):\n\s+Starting items: ((?:\d+(?:, )?)+)\n\s+Operation: new = (.*?)\n\s+Test: divisible by (\d+)\n\s+If true: throw to monkey (\d+)\n\s+If false: throw to monkey (\d+)/;

interface Monkey {
	index: number;
	items: number[];
	operation: string;
	divisor: number;
	throwToWhenTrue: number;
	throwToWhenFalse: number;
	inspectedCount: number;
}

const parse = (data: string): Monkey[] => {
	return data.split("\n\n").map((group) => {
		const [
			index,
			itemList,
			operationStr,
			divisorStr,
			trueIndexStr,
			falseIndexStr,
		] = group.match(monkeyExpression)!.slice(1);

		return {
			index: Number(index),
			items: itemList.split(",").map(Number),
			operation: operationStr.trim(),
			divisor: Number(divisorStr),
			throwToWhenTrue: Number(trueIndexStr),
			throwToWhenFalse: Number(falseIndexStr),
			inspectedCount: 0,
		};
	});
};

const simulate = (
	monkeys: Monkey[],
	rounds: number,
	manageFrustration: (frustration: number) => number,
) => {
	for (let round = 0; round < rounds; round++) {
		for (const monkey of [...monkeys]) {
			while (monkey.items.length) {
				monkey.inspectedCount++;

				const worry = manageFrustration(
					eval(
						monkey.operation.replace(/old/g, monkey.items.shift()!.toString()),
					),
				);

				const nextMonkey = worry % monkey.divisor === 0
					? monkey.throwToWhenTrue
					: monkey.throwToWhenFalse;

				monkeys[nextMonkey].items.push(worry);
			}
		}
	}

	return monkeys
		.sort((a, b) => b.inspectedCount - a.inspectedCount)
		.slice(0, 2)
		.reduce((a, b) => a * b.inspectedCount, 1);
};

// PART 1
console.log(simulate(parse(input), 20, (v) => Math.floor(v / 3)));

// PART 2
const mod = parse(input).reduce((a, b) => a * b.divisor, 1);
console.log(simulate(parse(input), 10000, (v) => v % mod));
