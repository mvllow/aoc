// Day 2: Rock Paper Scissors
// https://adventofcode.com/2022/day/2

// Rock     (A) is worth 1 point
// Paper    (B) is worth 2 points
// Scissors (C) is worth 3 points
const shapesKey: { [key: string]: number } = { A: 1, B: 2, C: 3 };

const winAgainst = (shape: number) => {
	if (shape === 1) return 2;
	if (shape === 2) return 3;
	if (shape === 3) return 1;
	return 0;
};

const loseAgainst = (shape: number) => {
	if (shape === 1) return 3;
	if (shape === 2) return 1;
	if (shape === 3) return 2;
	return 0;
};

const drawAgainst = (shape: number) => shape;

const possibleMoves: { [key: string]: (shape: number) => number } = {
	X: loseAgainst,
	Y: drawAgainst,
	Z: winAgainst,
};

const getMoves = (instructions: string) => {
	const [player1Shape, desiredResult] = instructions.split(" ");
	const player1Move = shapesKey[player1Shape];
	const player2Move = possibleMoves[desiredResult](player1Move);

	return [player1Move, player2Move];
};

function playRound(round: string) {
	const [player1Move, player2Move] = getMoves(round);
	const moveDifference = player1Move - player2Move;

	// Initialise points with shape values
	let player1Points = player1Move;
	let player2Points = player2Move;

	// Draw
	if (moveDifference === 0) {
		player1Points += 3;
		player2Points += 3;
	}

	// Player 1 wins
	if (moveDifference == 1 || moveDifference == -2) {
		player1Points += 6;
	}

	// Player 2 wins
	if (moveDifference == 2 || moveDifference == -1) {
		player2Points += 6;
	}

	return [player1Points, player2Points];
}

function playGame(guide: string) {
	let player1TotalPoints = 0;
	let player2TotalPoints = 0;

	guide.split("\n").map((round) => {
		if (!round) return;

		const [player1Points, player2Points] = playRound(round);
		player1TotalPoints += player1Points;
		player2TotalPoints += player2Points;
	});

	console.log({ player1TotalPoints, player2TotalPoints });
}

const input = await Deno.readTextFile("input.txt");

playGame(input);
