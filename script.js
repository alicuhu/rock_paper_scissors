const ROCK = "rock"
const PAPER = "paper"
const SCISSORS = "scissors"

const TIE = 0
const PLAYER = 1
const COMPUTER = 2

let playTime = 0
let playerScore = 0
let computerScore = 0
let btnPlay = document.getElementById("playBtn")
resetViews()

function resetViews() {
    playTime = 0
    playerScore = 0
    computerScore = 0
    viewChoice("", "")
    viewScore(playerScore, computerScore)
    document.getElementById("result").textContent = ""
    document.getElementById("winner").textContent = ""
    btnPlay.textContent = "Play"
}

function computerPlay() {
    let randomNum = Math.floor(Math.random() * 3)
    
    let result = ROCK
    if(randomNum === 1) {
        result = PAPER;
    } else if (randomNum === 2) {
        result = SCISSORS;
    }
    console.log(`Computer: ${result}`)
    return result;
}

function playRound(playerSelection, computerSelection) {
    let player = playerSelection.toLowerCase()
    let computer = computerSelection.toLowerCase()

    let result = TIE
    if(player === computer) {
        result = TIE;
    } else if ((player === ROCK && computer === SCISSORS)
                || (player === PAPER && computer === ROCK)
                || (player === SCISSORS && computer === PAPER)) {
                    result = PLAYER;
    } else {
        result = COMPUTER;
    }
    console.log(`Result: ${result}`)
    return result;
}

function getSelection() {
    let selection = prompt("Select your choice: Rock, Paper, Scissors. (Default is Rock)", "")
    if(selection === null) {
        return ROCK;
    }

    let choice = selection.toLowerCase()
    if(choice !== ROCK && choice !== PAPER && choice !== SCISSORS ) {
        choice = ROCK;
    }
    console.log(`Player: ${choice}`)
    return choice;
}

function viewChoice(playerSelection, computerSelection) {
    document.getElementById("playerChoice").textContent = playerSelection
    document.getElementById("computerChoice").textContent = computerSelection;
}

function viewScore(playerScore, computerScore) {
    document.getElementById("playerScore").textContent = playerScore
    document.getElementById("computerScore").textContent = computerScore;
}

function finalizeGame() {
    document.getElementById("result").textContent = ""

    let winner = "CONGRATS!!!. You won this game!"
    if(playerScore < computerScore) {
        winner = ":( You lost this game!";
    } else if (playerScore === computerScore) {
        winner = "No winner!!!";
    }
    document.getElementById("winner").textContent = winner

    playTime = -1;
    btnPlay.textContent = "Play Again"
}

function game() {
    if(playTime === -1) {
        resetViews()
        return;
    }
    playTime += 1

    btnPlay.textContent = "Play Next"

    const playerSelection = getSelection()
    const computerSelection = computerPlay()

    document.getElementById("playerChoice").textContent = playerSelection
    document.getElementById("computerChoice").textContent = computerSelection

    const winner = playRound(playerSelection, computerSelection)

    let resultText = "";
    if(winner === TIE) {
        resultText = "It's a tie!";
    } else if (winner === PLAYER) {
        resultText = "You won!"
        playerScore += 1;
    } else {
        resultText = "You lost!"
        computerScore += 1;
    }
    document.getElementById("result").textContent = resultText

    viewScore(playerScore, computerScore);

    if(playTime >= 5) {
        finalizeGame()
        return;
    }
}

