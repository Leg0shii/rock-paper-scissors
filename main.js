function getComputerChoice() {
    // determine value between 1 and 3 (including 1 and 3)
    let randomValue = Math.floor(Math.random()*3)+1;

    // get mapping for the values
    if (randomValue == 1) return 'rock';
    if (randomValue == 2) return 'paper';
    return 'scissor';
}

function validatePlayerSelection(message) {
    if (!message) return false;
    if (message != 'rock' && message != 'scissor' && message != 'paper') return false;
    return true;
}

function playRound(playerSelection, computerSelection) {
    let parsedPlayerSelection = playerSelection.toLowerCase();

    // player=rock he wins if computer has scissors
    if (parsedPlayerSelection == 'rock') {
        if (computerSelection == 'rock') return [1, 'A tie!']; 
        else if (computerSelection == 'paper') return [0, 'You Lose! Paper beats Rock'];
        else return [2, 'You Win! Rock beats Scissor'];
    }
    // player=paper he wins if computer has rock
    if (parsedPlayerSelection == 'paper') {
        if (computerSelection == 'paper') return [1, 'A tie!']; 
        else if (computerSelection == 'scissor') return [0, 'You Lose! Scissor beats Paper'];
        else return [2, 'You Win! Paper beats Rock'];
    }
    // player=scissors he wins if computer has paper
    if (parsedPlayerSelection == 'scissor') {
        if (computerSelection == 'scissor') return [1, 'A tie!']; 
        else if (computerSelection == 'rock') return [0, 'You Lose! Rock beats Scissor'];
        else return [2, 'You Win! Scissor beats Paper'];
    }
}

function game() {
    let playerScore = 0;
    let computerScore = 0;

    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const playerSelection = btn.id;
            const computerSelection = getComputerChoice();

            let result = playRound(playerSelection, computerSelection);
            let winnerResult = result[0];
            let messageResult = result[1];

            playerScore = playerScore + winnerResult;
            computerScore = computerScore + (2-winnerResult);

            const resultDiv = document.getElementById("result");
            const finalResultDiv = document.getElementById("final-result");
            const playerDiv = document.getElementById("player-score");
            const compterDiv = document.getElementById("computer-score");

            let parsedPlayerScore = Number.parseInt(Math.floor(playerScore/2));
            let parsedComputerScore = Number.parseInt(Math.floor(computerScore/2));

            resultDiv.textContent = messageResult;
            playerDiv.textContent = "Player: " + parsedPlayerScore;
            compterDiv.textContent = "Computer: " + parsedComputerScore;

            if (parsedPlayerScore != 5 && parsedComputerScore != 5) return;
        
            if (playerScore == 5) finalResultDiv.textContent = "It's a Tie! :|";
            if (playerScore < 5) finalResultDiv.textContent = "You have Lost with a total of " + parsedPlayerScore + "/5 points! :(";
            if (playerScore > 5) finalResultDiv.textContent = "You have Won with a total of " + parsedPlayerScore + "/5 points! :)";

            playerScore = 0;
            computerScore = 0;
            
        });
    });

    /*playerScore = playerScore + winnerResult;
    console.log('Round ' + (i+1) + '. ' + messageResult);

    if (playerScore == 5) console.log("It's a Tie! :|");
    if (playerScore < 5) console.log("You have Lost with a total of " + playerScore + "/10 points! :(");
    if (playerScore > 5) console.log("You have Won with a total of " + playerScore + "/10 points! :)");*/
}

