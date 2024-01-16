
let playerTurn = 1;
let tempScore = 0;

document.querySelector(".btn1").addEventListener("click", () => {
        document.querySelector(`#player${playerTurn}side`).classList.add("myTurn");
        document.querySelector("img").classList.remove("hide");
        document.querySelector("img").setAttribute("src",`./images/dice6.png`);
        document.querySelectorAll(".btn").forEach((btn) => {
            btn.addEventListener("click", function () {
                getBtn(this.innerHTML.slice(4,(this.innerHTML.length - 5)))
            });
        });
    },{ once: true }
);

function getBtn (btn) {
    switch (btn){
        case "New game" :
            newGame();
            break;
        case "Role dice" :
            roleDice();
            break;
        case "Hold" :
            hold();
    }
}

function roleDice (){
    let rndDice = Math.floor(Math.random()*6 + 1);
    document.querySelector("img").setAttribute("src",`./images/dice${rndDice}.png`);
    if (rndDice != 1){
        tempScore += rndDice;
        setPlayer(playerTurn, tempScore, null);
    } else {
        setPlayer(playerTurn, 0, null);
        tempScore = 0;
        playerSwitch(playerTurn === 1 ? 2 : 1);
    }
}

function hold (){
    setPlayer(playerTurn, 0 , Number(document.querySelector(`#player${playerTurn}side .total-score p`).innerHTML) + tempScore);
    tempScore = 0;
    playerSwitch(playerTurn === 1 ? 2 : 1);
}

function newGame(){
    for (let i=1; i< 3; i++){
        setPlayer( i ,0 , 0);
        document.querySelector("img").setAttribute("src",`./images/dice6.png`);
        playerSwitch(1);
    }
}

function playerSwitch(turn){
    document.querySelector(`#player${turn}side`).classList.add("myTurn");
    document.querySelector(`#player${turn === 1 ?  2 :  1}side`).classList.remove("myTurn");
    playerTurn = turn;
}

function setPlayer (player, temp, current){
    document.querySelector(`#player${player}side p`).innerHTML = temp;
    current === null ? console.log("current null") :document.querySelector(`#player${player}side .total-score p`).innerHTML = (current === 0 ? 0 : Number(document.querySelector(`#player${playerTurn}side .total-score p`).innerHTML) + tempScore);
}