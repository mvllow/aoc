const input = await Deno.readTextFile("input.txt");
const signal = input.trim();

// packet: jpqm
// marker: 7
// const signal = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

// packet: vwbj
// marker: 5
// const signal = `bvwbjplbgvbhsrlpgdmjqwftvncz`;

// packet: zqfr
// marker: 11
// const signal = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`;

// Find start-of-packet marker; first set of four unique characters
const findStartOfPacket = (signal: string, markerLength: number) => {
	const previousCharacters: string[] = [];

	for (let i = 0; i < signal.length; i++) {
		const character = signal[i];

		while (previousCharacters.includes(character)) {
			previousCharacters.shift();
		}

		previousCharacters.push(character);

		if (previousCharacters.length === markerLength) return i + 1;
	}
};

console.log({
	part1: findStartOfPacket(signal, 4),
	part2: findStartOfPacket(signal, 14),
});
