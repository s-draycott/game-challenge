import './stylesheet.css';
import { buttonClick, keyPress, gameOverSound } from './sounds';

const timer = document.querySelector("#timer");
const paragraphText = document.querySelector("#paragraphText");
const scoreDisplay = document.querySelector<HTMLDivElement>("#scorePopUp");
const inputText = document.querySelector<HTMLInputElement>(".game__input");
const reset = document.querySelector<HTMLButtonElement>("#reset");
const playAgain = document.querySelector<HTMLButtonElement>(".playAgain");
const start = document.querySelector<HTMLButtonElement>("#start");
const mistakeCounter = document.querySelector<HTMLSpanElement>('#mistakes');
const mistakeOutput = document.querySelector<HTMLSpanElement>("#outputMistakes");
const outputCharPerMin = document.querySelector<HTMLSpanElement>("#outputCpm");
const outputWordPerMin = document.querySelector<HTMLSpanElement>("#outputWpm");
const paragraphs: string[] = [
    "A long time ago in a galaxy far, far away... Rebel spaceships, battered and few, are manoeuvring a desperate last stand against the mighty Imperial Starfleet. An ancient weapon, the Death Star, capable of destroying a planet, is now fully operational and under construction. The fate of the rebellion lies with a small band of brave fighters who have only one chance to strike from the shadows.",
    "There, peeping among the cloud-wrack above a dark tor high up in the mountains, Sam saw a white star twinkle for a while. The beauty of it smote his heart, as he looked up out of the forsaken land, and hope returned to him. For like a shaft, clear and cold, the thought pierced him that in the end the Shadow was only a small and passing thing: there was light and high beauty for ever beyond its reach.",
    "What they do not comprehend is mans helplessness. I am weak, small, and of no consequence to the universe. It does not notice me; I live on unseen. But why is that bad? Is it not better that way? Whom the gods notice they destroy. But small...and you will escape the jealousy of the great.",
    "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me. And when it has gone past I will turn the inner eye to see its path. Where the fear has gone there will be nothing. Only I will remain.",
    "I have neither the time nor the inclination to explain myself to a man who rises and sleeps under the blanket of the very freedom that I provide, and then questions the manner in which I provide it. I would rather you just said thank you, and went on your way, otherwise, I suggest you pick up a weapon, and stand a post. Either way, I don't give a damn what you think you are entitled to.",
    "I see in your eyes the same fear that would take the heart of me. A day may come when the courage of men fails, when we forsake our friends and break all bonds of fellowship, but it is not this day. An hour of wolves and shattered shields, when the age of men comes crashing down, but it is not this day! This day we fight! By all that you hold dear on this good Earth, I bid you  stand, Men of the West!",
    "We don\’t read and write poetry because it\’s cute. We read and write poetry because we are members of the human race And the human race is filled with passion. And medicine, law, business, engineering, these are noble pursuits and necessary to sustain life. But poetry, beauty, romance, love, these are what we stay alive for.",


];

if(!timer || !paragraphText || !scoreDisplay|| !reset || !playAgain || !start || !inputText || !mistakeCounter || !mistakeOutput || !outputCharPerMin || !outputWordPerMin) {
    throw new Error("Some elements can not be found")
};


// ---------------------------
// FUNCTION TO LOAD PARAGRAPHS
// ---------------------------

const loadPara = () => {
    let randomParaIndex: number = Math.floor(Math.random() * paragraphs.length); //math.random creates random decimals between 0 and 1 (inclusive of 0). Multiply by array length to get values within the range of the array and then math.floor to get whole numbers between 0 and array length to produce an array index value
    let randomPara: string = paragraphs[randomParaIndex]; //picks out whichever random index has been chosen from the paragraphs array
    paragraphText.innerHTML = "";
    randomPara.split('').forEach(character => { //getting each chcaracter creating a span for it and sets inner text to character
        const characterSpan = document.createElement("span");
        characterSpan.innerHTML = character;
        paragraphText.appendChild(characterSpan);
    })
};

// ---------------------------
// FUNCTION TO CHECK CHARACTER INPUT
// ---------------------------

inputText.disabled = true;
let countMistakes: number = 0;
let charCounter: number = 0;
let charactersChecked: number = 0;

const checkInput = () => {
    const paragraphArray = paragraphText.querySelectorAll("span"); //gets all created spans in paragraph text
    const inputCharacterArray: string[] = inputText.value.split(""); //turns input charcters into character array
    let completedGame: boolean = true; //setting up boolean for if game is done

    for (let i: number = charactersChecked; i < paragraphArray.length; i++) {
        const inputCharacter: string = inputCharacterArray[i];
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
            outputCharPerMin.innerHTML = ` ${charCounter}`;
            outputWordPerMin.innerHTML = ` ${wordsPerMin}`;
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
        scoreDisplay.style.display = "block";
    }
};

// ---------------------------
//TIMERS AND BUTTONS
// ---------------------------

let timerLength: number = 60;

const timerFunc = () => {
    if (timerLength > 0) {
        timerLength--;
        timer.innerHTML = " " + timerLength;
        scoreDisplay.style.display = "none";
        inputText.disabled = false;
        inputText.focus();
    } else if (timerLength === 0) {
        scoreDisplay.style.display = "block";
        timer.innerHTML = " " + timerLength;
        inputText.disabled = true;
        timerLength = -1; //stops sound replaying
        gameOverSound.play();
    } 
}; 

const resetFunc = () => {
    charactersChecked = 0;
    countMistakes = 0;
    charCounter = 0;
    mistakeOutput.innerHTML = "";
    outputWordPerMin.innerHTML = " ";
    outputCharPerMin.innerHTML = " ";
    mistakeCounter.innerHTML= "0";
    scoreDisplay.style.display = "none"; 
    inputText.value = ""; 
    timerLength = 60;
};

const playAgainFunc = () =>{
    loadPara(); 
    charactersChecked = 0;
    countMistakes = 0;
    charCounter = 0;
    mistakeOutput.innerHTML = "";
    outputWordPerMin.innerHTML = " ";
    outputCharPerMin.innerHTML = " ";
    mistakeCounter.innerHTML= "0";
    scoreDisplay.style.display = "none"; 
    inputText.value = ""; 
    timerLength = 60;
}

// ---------------------------
// SOUND FUNCTIONS
// ---------------------------

const playSound = () => {
    buttonClick.autoplay = false;
    start || reset || playAgain;
    buttonClick.play();
}

const playSound2 = () => {
    keyPress.autoplay = false;
    inputText;
    keyPress.play();
}


// ---------------------------
// EVENT LISTENERS
// ---------------------------

start.addEventListener("click", () => {setInterval(timerFunc, 1000)});
start.addEventListener("click", playSound);
start.addEventListener("click", loadPara);

playAgain.addEventListener("click", playAgainFunc);
playAgain.addEventListener("click", playSound);

reset.addEventListener("click", resetFunc);
reset.addEventListener("click", playSound);

inputText.addEventListener("input", checkInput);
inputText.addEventListener("keypress", playSound2);



