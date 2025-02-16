let gameSeq =[];
let userSeq = [];


//press sound
let btnaudio = new Audio("assets/clickSound.mp3");
let levelUpaudio = new Audio("assets/levelUp.mp3");
let failAudio = new Audio("assets/fail.mp3");
// let btnColor= ["red", "green", "purple","yellow"];
let btns= document.getElementsByClassName("btn");
let body= document.querySelector("body");
// console.log(btns);
//just storing the colors in a array

let level = 0 ; 

let started = false ; 


// accessing h3 : 
let h2 = document.querySelector("h2");

document.addEventListener("keyup",function(){
    if(started==false){
        console.log("Game started");
        started=true;
        //caling of level up   
        levelUp();
    }
});



// display level : 
function levelUp(){
    level++;

    h2.innerText =`Level ${level}`;

    //chosing the index for random color : 
    let randomColorbtn = btns[Math.floor(Math.random()*4)];
    console.log(randomColorbtn);

    //holds the game sequence of colors : 
    gameSeq=gameSeq.concat(randomColorbtn.classList[1]);
    console.log(gameSeq);
    btnFlash(randomColorbtn);
    // btnPress(randomColorbtn);


}



// flash the button 
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{btn.classList.remove("flash")},250);
}

//event for button press
for(btn of btns){
    btn.addEventListener("click",btnPress);
    
}


// button user has passed : 
function btnPress(event){
    // console.log(event);
   
    btnaudio.play();
    userSeq = userSeq.concat(event.target.classList[1]);
    console.log(userSeq);
    console.log("Button was Pressed");
//---------------------------------start-----------------------------
    // let currentIndex = userSeq.length-1;//get the latest index
    // //check if user pressed correctly so far 
    
    // if(userSeq[currentIndex] !==gameSeq[currentIndex]){
    //     console.log("X Game Over! Wrong Sequence.");
    //     h2.innerText = "Game Over ! Press Any Key to Restart";
    //     resetGame();
    //     return;
    // }

    // //Step 2 : check if user has completed the full sequence 
    // if(userSeq.length === gameSeq.length){
    //     console.log(" Correct ! Moving to next level...");
    //     setTimeout(levelUp,1000);
    //     userSeq = [];//Reset user Sequence for the next round
    // }
//---------------end-----------------------------

if(userSeq.length==gameSeq.length){
    for(i=0 ;i<=gameSeq.length ;i++){
        if(userSeq[i]==gameSeq[i]){
            if(i==gameSeq.length-1){
            setTimeout(levelUp,1000);
                userSeq=[];
                levelUpaudio.play();
            }
        }
        else{
            console.log("X Game Over! Wrong Sequence.");
        h2.innerHTML = `Game Over ! <br>
        Scrore : ${level-1} <br>
        [Press Restart]`;
        body.style.backgroundColor = "red";
        failAudio.play();
        //replay button
        let resetBt = document.createElement("button");
        resetBt.innerText="Replay!";
        resetBt.style.padding="10px";
        body.append(resetBt);
        resetBt.addEventListener("click",()=>{
            location.reload();
            //location  is an inbuil window object
        })
resetGame();
        }
    }
}


}


function resetGame(){
    gameSeq = [];
    userSeq=[];
    level=0;
    start = false;
}


