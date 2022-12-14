// Day 2: Rock Paper Scissors
// https://adventofcode.com/2022/day/2

// Rock     (A, X) is worth 1 point
// Paper    (B, Y) is worth 2 point
// Scissors (C, Z) is worth 3 point
const key: { [key: string]: number } = {
	A: 1,
	B: 2,
	C: 3,
	X: 1,
	Y: 2,
	Z: 3,
};

const decipherMoves = (move: string) => [key[move[0]], key[move[2]]];

function playRound(round: string) {
	const [player1Move, player2Move] = decipherMoves(round);
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
