let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if (!started) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);
    
    gameSeq.forEach((color, index) => {
        setTimeout(() => {
            let btn = document.querySelector(`.${color}`);
            btnFlash(btn);
        }, (index + 1) * 600); // Flash sequence with a delay
    });
}

function btnPress() {
    let btn = this;
    let color = btn.classList[1]; // Get the color class
    userSeq.push(color);
    btnFlash(btn); // Flash the button when clicked

    if (!checkSequence()) {
        gameOver();
    } else if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 1000);
    }
}


function checkSequence() {
    for (let i = 0; i < userSeq.length; i++) {
        if (userSeq[i] !== gameSeq[i]) {
            return false;
        }
    }
    return true;
}

function gameOver() {
    h2.innerText = "Game Over! Press any key to restart.";
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
