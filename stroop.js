const collist = ['green', 'blue', 'yellow', 'red', 'purple', 'orange', 'pink'];
let counter = 0;
let timerStart = null;
let timerInterval = null;
let timerElapsed = 0;

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor(ms % 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function updateTimerDisplay() {
    const elapsed = timerStart === null
        ? timerElapsed
        : timerElapsed + (performance.now() - timerStart);
    document.getElementById("timer").innerHTML = formatTime(elapsed);
}

function startTimer() {
    if (timerInterval !== null) {
        return;
    }
    timerStart = performance.now();
    timerInterval = setInterval(updateTimerDisplay, 10);
}

function resetTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    timerStart = null;
    timerElapsed = 0;
    updateTimerDisplay();
}

function stopTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    if (timerStart !== null) {
        timerElapsed += performance.now() - timerStart;
        timerStart = null;
    }
    updateTimerDisplay();
}

/* Random Number Generator, for convenience */
function createRndNr() {
    return Math.floor(Math.random()*7);
}

/* Gives the header a colour and text that does not match */
function headerFormat() {

    /* sets the header title text and colour */
    document.getElementById("stroop-title").innerHTML = collist[createRndNr()];
    document.getElementById("stroop-title").style.color = collist[createRndNr()];

    let headertxt =  document.getElementById("stroop-title").innerHTML;
    let headerclr = document.getElementById("stroop-title").style.color;

    /* Makes sure they're not the same */
    if (headerclr == headertxt) {
        headerFormat();
    }
}

/* Creates list of unique colours */
function createClrList() {

    let btnclrs = [];
    
    headertxt = document.getElementById("stroop-title").innerHTML;
    headerclr = document.getElementById("stroop-title").style.color;

    while (btnclrs.length < 4 ) {
        
        let rndclr = collist[createRndNr()];

        /* Makes sure the list only has unique values */
        if (!(btnclrs.includes(rndclr))) {
            btnclrs.push(rndclr);
        }

        /* Makes sure that both the text and colour of the header is in the list */
        if (btnclrs.length == 4) {
            if (!(btnclrs.includes(headertxt))) {
                btnclrs = [];
            } else if (!(btnclrs.includes(headerclr))) {
                btnclrs = [];
            } else {
                return btnclrs;
            }
        }
    }
}

/* Loads a new colour and text every page-load */
function setBtnClrs( clrlist ) {

    /* list of button elements */
    const buttons = document.getElementsByClassName("clrbutton");

    /* assigns colours to the buttons */
    for(let i = 0; i < clrlist.length; i++) {
        buttons[i].style.backgroundColor = clrlist[i];
    }
}

/* 
Adds 1 to counter for every correct choice
Sets counter to 0 when incorrect
*/
function chooseColour(btn) {

    headertxt = document.getElementById("stroop-title").innerHTML;

    /* If you guess correctly */
    if (btn.style.backgroundColor == headertxt) {

        if (counter === 0) {
            startTimer();
        }
        counter++;
        initialize();

        if (counter == 30) {
            stopTimer();
            victory();
        }

    /* if you guess wrong */
    } else {
        counter = 0;
        resetTimer();
        initialize();
    }
}

/* Assigns the chooseColour-function to the buttons */
function buttonClickSetup() {
	const buttons = ["btn1", "btn2", "btn3", "btn4"];
	for (const button of buttons) {
		const btnEl = document.getElementById(button);
		btnEl.addEventListener("click", (e) => {
			chooseColour(e.target);
		});
	}
}

/* Fetches and displays the flag on a black screen */
function victory() {    

    document.getElementById("overlay").style.display = "block";

    document.getElementById("congratulations").innerHTML = "Congratulations! You have conquered the Stroop effect!"
    document.getElementById("congratulations").style.color = "white"

}

/* Runs initialization of the game. */
function initialize() {
	headerFormat();
	createClrList();
	setBtnClrs(createClrList());

	document.getElementById("counter").innerHTML = counter;
}

/* Main function */
document.addEventListener("DOMContentLoaded", () => {
	initialize();	
	buttonClickSetup();
});