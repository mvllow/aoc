const input = await Deno.readTextFile("input.txt");

let x = 1;
let cycle = 0;
let signal = 0;
const screen = Array(6).fill("");

const checkSignal = () => cycle % 40 === 20 && (signal += x * cycle);

const draw = () => {
	const row = Math.floor((cycle - 1) / 40);
	const column = (cycle - 1) % 40;
	const pixel = Math.abs(x - column) < 2 ? "#" : ".";

	screen[row] += pixel;
};

const tick = (count: number) => {
	for (let i = 0; i < count; i++) {
		cycle++;
		checkSignal();
		draw();
	}
};

const addx = (value: number) => {
	tick(2);
	x += value;
};

input
	.trim()
	.split("\n")
	.map((line) => {
		const [command, value] = line.split(" ");

		if (command === "noop") tick(1);
		if (command === "addx") addx(Number(value));
	});

// PART 1
console.log(signal);

// PART 2
console.log(screen);
