let time=0;
let hitNum=0;
let score=0;


const startButton = document.querySelector('.start-button');
const inputContainer = document.querySelector('.input-container');
const lowerBox = document.querySelector('.box_lower');

startButton.addEventListener('click', () => {
    const gameTimeSelect = document.querySelector('#game-time');
    const selectedTime = parseInt(gameTimeSelect.value);
    
    if (!isNaN(selectedTime) && selectedTime > 0) {
        time = selectedTime;
        document.querySelector(".timer").textContent=time;
        inputContainer.style.display = 'none'; // Hide input container
        runGame(); // Start the game
    } else {
        alert('Please select a valid game time.');
    }
});

function runGame() {
    runTimer();
    makeBubble();
    getNewHit();
}


function makeBubble(){
    var bubbles="";
    let rand_num=0;
    for(var i=1;i<=128;i++){
        rand_num=Math.floor(Math.random()*10);
        bubbles+=`<div class="bubble"><h2>${rand_num}</h2></div>`;
    }
    document.querySelector(".box_lower").innerHTML=bubbles;
}


function getNewHit(){
    hitNum=Math.floor(Math.random()*10);
    document.querySelector(".hit_num").innerHTML=hitNum;
}

function restart(){
    const restartButton = document.querySelector(".restart-button");
        restartButton.addEventListener("click", () => {
            // Reset game state and start a new game
            score = 0;
            time = 20;
            hitNum = 0;
            document.querySelector(".score_txt").innerHTML = score;
            document.querySelector(".timer").textContent = time;
            lower_box.innerHTML = "";
            lower_box.classList.remove("game-over");
            makeBubble();
            getNewHit();
            runTimer();
        });
}


function runTimer(){
    //Set interval function will run after every 1000ms(1s)
    let timer=setInterval(function(){
        if(time>0){
            time--;
            document.querySelector(".timer").textContent=time;
        }
        else{
            clearInterval(timer);
            var lower_box=document.querySelector(".box_lower");
            lower_box.innerHTML = `
                <h1>Game Over</h1>
                <p>Your Score is: ${score}</p>
                <button class="restart-button">Restart</button>
            `;
            lower_box.classList.add("game-over");
            restart();
        }
    },1000);
}

function increaseScore(){
    score+=10;
    document.querySelector(".score_txt").innerHTML=score;
}
function decreaseScore(){
    if(score>0)score-=10;
    document.querySelector(".score_txt").innerHTML=score;
}

let lower_box=document.querySelector(".box_lower");
lower_box.addEventListener("click",(details)=>{
    var clickedNum=Number(details.target.textContent);
    if(clickedNum === hitNum){
        increaseScore();
        makeBubble();
        getNewHit();
        
        //Flashing Green Colour if clicked correct bubble
        if(time>0){
            lower_box.classList.add("correct");
            // Remove the class after a short delay
            setTimeout(() => {
                lower_box.classList.remove("correct");
            }, 200);
        }
    }
    else{
        if(time>0){
            lower_box.classList.add("incorrect");
            decreaseScore();
            // Remove the class after a short delay
            setTimeout(() => {
                lower_box.classList.remove("incorrect");
            }, 200);
        }
    }
});



// makeBubble();
// getNewHit();
// runTimer();