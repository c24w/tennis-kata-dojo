var assert = require('chai').assert;

function loveScore() {
	return { toString: function () { return 'love'; } };
}

function fifteenScore() {
	return { toString: function () { return '15'; } };
}

function thirtyScore() {
	return { toString: function () { return '30'; } };
}

function fortyScore() {
	return { toString: function () { return '40'; } };
}

function deuceScore() {
	return { toString: function () { return 'deuce'; } };
}

var scoreValues = [ loveScore(), fifteenScore(), thirtyScore(), fortyScore() ];

function playerScore() {
	var value = 0;
	return {
		increment: function () { ++value; },
		toString: function () {
			return scoreValues[value].toString();
		},
		equals: function (score) {
			return this.toString() === score.toString();
		}
	};
}

function scoreDivider() { return { toString: function () { return '-'; } }; }

function gameScore(player1Score, player2Score) {
	return {
		toString: function () {
			var score1IsForty = player1Score.equals(fortyScore());
			var score2IsForty = player2Score.equals(fortyScore());

			if (score1IsForty && score2IsForty) {
				return deuceScore().toString();
			}

			return player1Score + scoreDivider() + player2Score;
		}
	};
}

function TennisGame() {
	var player1Score = playerScore();
	var player2Score = playerScore();

	this.showScore = function () {
		return gameScore(player1Score, player2Score);
	};
	this.scorePlayer1 = function () {
		player1Score.increment();
	};
	this.scorePlayer2 = function () {
		player2Score.increment();
	};
}

describe('tennis scoring', function () {

	it('returns love-love', function () {
		var game = new TennisGame();
		assert.equal(game.showScore(), 'love-love');
	});

	it('returns 15-love', function () {
		var game = new TennisGame();
		game.scorePlayer1();
		assert.equal(game.showScore(), '15-love');
	});

	it('returns 30-love', function () {
		var game = new TennisGame();
		game.scorePlayer1();
		game.scorePlayer1();
		assert.equal(game.showScore(), '30-love');
	});

	it('returns 40-love', function () {
		var game = new TennisGame();
		game.scorePlayer1();
		game.scorePlayer1();
		game.scorePlayer1();
		assert.equal(game.showScore(), '40-love');
	});

	it('returns 15-15', function () {
		var game = new TennisGame();
		game.scorePlayer1();
		game.scorePlayer2();
		assert.equal(game.showScore(), '15-15');
	});

	it('returns 30-30', function () {
		var game = new TennisGame();
		game.scorePlayer1();
		game.scorePlayer1();
		game.scorePlayer2();
		game.scorePlayer2();
		assert.equal(game.showScore(), '30-30');
	});

	it('returns deuce', function () {
		var game = new TennisGame();
		game.scorePlayer1();
		game.scorePlayer1();
		game.scorePlayer1();
		game.scorePlayer2();
		game.scorePlayer2();
		game.scorePlayer2();
		assert.equal(game.showScore(), 'deuce');
	});

});
