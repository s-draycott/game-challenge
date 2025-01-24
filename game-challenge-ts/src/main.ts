import '../stylesheet.scss';

const timer = document.querySelector("#timer");
const paragraphText = document.querySelector("#paragraph-text");
const scoreDisplay = document.querySelector<HTMLDivElement>("#score-pop-up");
const inputText = document.querySelector<HTMLInputElement>(".game__input");
const reset = document.querySelector<HTMLButtonElement>("#reset");
const playAgain = document.querySelector<HTMLButtonElement>(".playAgain");
const start = document.querySelector<HTMLButtonElement>("#start");
const mistakeCounter = document.querySelector<HTMLSpanElement>('#mistakes');
const mistakeOutput = document.querySelector<HTMLSpanElement>("#output-mistakes")
const outputCharPerMin = document.querySelector<HTMLSpanElement>("#output-cpm")
const outputWordPerMin = document.querySelector<HTMLSpanElement>("#output-wpm")

const paragraphs = [
    "A long time ago in a galaxy far, far away... Rebel spaceships, battered and few, are manoeuvring a desperate last stand against the mighty Imperial Starfleet. An ancient weapon, the Death Star, capable of destroying a planet, is now fully operational and under construction. The fate of the rebellion lies with a small band of brave fighters who have only one chance to strike from the shadows.",
    "They picked a way among the trees, and their ponies plodded along, carefully avoiding the many writhing and interlacing roots. There was no undergrowth. The ground was rising steadily, and as they went forward it seemed that the trees became taller, darker, and thicker. There was no sound, except an occasional drip of moisture falling through the still leaves. For the moment there was no whispering or movement among the branches; but they all got an uncomfortable feeling that they were being watched with disapproval, deepening to dislike and even enmity. The feeling steadily grew, until they found themselves looking up quickly, or glancing back over their shoulders, as if they expected a sudden blow.",
    "There, peeping among the cloud-wrack above a dark tor high up in the mountains, Sam saw a white star twinkle for a while. The beauty of it smote his heart, as he looked up out of the forsaken land, and hope returned to him. For like a shaft, clear and cold, the thought pierced him that in the end the Shadow was only a small and passing thing: there was light and high beauty for ever beyond its reach.",
    "What they do not comprehend is mans helplessness. I am weak, small, and of no consequence to the universe.  It does not notice me; I live on unseen.  But why is that bad?  Isn’t it better that way?  Whom the gods notice they destroy.  But small...and you will escape the jealousy of the great."
]

if(!timer || !paragraphText || !scoreDisplay|| !reset || !playAgain || !start || !inputText || !mistakeCounter || !mistakeOutput || !outputCharPerMin || !outputWordPerMin) {
    throw new Error("Some elements can not be found")
}

// Function to load paragraph onto screen
const loadPara = () => {
    let randomParaIndex = Math.floor(Math.random() * paragraphs.length); //math.random creates random decimals between 0 and 1 (inclusive of 0). Multiply by array length to get values within the range of the array and then math.floor to get whole numbers between 0 and array length to produce an array index value
    let randomPara = paragraphs[randomParaIndex]; //picks out whichever random index has been chosen from the paragraphs array
    paragraphText.innerHTML = "";
    randomPara.split('').forEach(character => { //getting each chcaracter creating a span for it and sets inner text to character
        const characterSpan = document.createElement("span");
        // characterSpan.classList.add("incorrect");
        characterSpan.innerHTML = character;
        paragraphText.appendChild(characterSpan);
    })
} 
loadPara();

// FUNCTION TO CHECK CHARACTER INPUT
// let timers, maxTime = 60, timerLeft = maxTime, charIndex = errors = isTyping = 0;

inputText.disabled = true;
let countMistakes = 0;
let charCounter = 0;
let charactersChecked = 0; // need this variable to let the character checked increment
const checkInput = () => {
    const paragraphArray = paragraphText.querySelectorAll("span"); //gets all created spans in paragraph text
    const inputCharacterArray = inputText.value.split(""); //turns input charcters into character array
    let completedGame = true; //setting up boolean for if game is done
    for (let i = charactersChecked; i < paragraphArray.length; i++) {
        const inputCharacter = inputCharacterArray[i];
        if (inputCharacter == null) { //keeps text at default before any input it typed
            paragraphArray[i].classList.remove('correct');
            paragraphArray[i].classList.remove('incorrect');
            completedGame = false;
        } // if input character matches the paragraph character that is in the inner html then apply classes need to remove other class to avoid classes building up and being correct and incorrect
        else if (inputCharacter === paragraphArray[i].innerHTML) {
            paragraphArray[i].classList.add('correct');
            paragraphArray[i].classList.remove('incorrect');
            charCounter+=1;
            charactersChecked+=1;
            completedGame = true;
            const wordsPerMin = (Math.round(charCounter/5));
            outputCharPerMin.innerHTML = ` ${charCounter}`
            outputWordPerMin.innerHTML = ` ${wordsPerMin}`
        } else {
            paragraphArray[i].classList.remove('correct');
            paragraphArray[i].classList.add('incorrect');
            completedGame = false;
            countMistakes+=1;
            charactersChecked+=1;
            mistakeCounter.innerText = `${countMistakes}`; 
            mistakeOutput.innerHTML = ` ${countMistakes}`;
        }
    }
    if (completedGame) {
        scoreDisplay.style.display = "block"
    }
};

//BUTTONS--------------------------------------------
//start button
let timerLength = 60;
timer.innerHTML = " " + timerLength;

const timerFunc = () => {
    if (timerLength > 0) {
        timerLength--;
        timer.innerHTML = " " + timerLength;
        inputText.disabled = false;
        inputText.focus();
    } else {
        scoreDisplay.style.display = "block";
        let timerLength = 60
        timer.innerHTML = " " + timerLength;
        inputText.disabled = true;
    } 

}; 

const resetFunc = () => {
    loadPara();
    scoreDisplay.style.display = "none";
    let timerLength = 60;
    const startTimer = () => {
    if (timerLength === 0) {
        timerLength--;
        timer.innerHTML = " " + timerLength;
        setInterval(startTimer ,1000);
    } 
}};

// play again
// const playAgainFunc = () =>{
//     let timerLength = 60;
//     loadPara(); //reloads fresh paragraph
//     mistakeCounter.innerHTML= "0";
//     scoreDisplay.style.display = "none"; //gets rid of score display
//     inputText.value = ""; //clears any text in the box
//     inputText.disabled = true;   
// }



reset.addEventListener("click", resetFunc);
// playAgain.addEventListener("click", () => setInterval(playAgainFunc, 1000));
start.addEventListener("click", () => {
    setInterval(timerFunc, 1000)});
inputText.addEventListener("input", checkInput)
// inputText.addEventListener("input", startTimer)



