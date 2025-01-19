import '../stylesheet.scss';
const timer = document.getElementById("timer");


const paragraphs = [
    "A long time ago in a galaxy far, far away... Rebel spaceships, battered and few, are manoeuvring a desperate last stand against the mighty Imperial Starfleet. An ancient weapon, the Death Star, capable of destroying a planet, is now fully operational and under construction. The fate of the rebellion lies with a small band of brave fighters who have only one chance to strike from the shadows."
]

if(!timer) {
    throw new Error("Some elements can not be found")
}





let timerLength = 60;
const timerFunc = () => {
    if (timerLength > 0) {
        timerLength--;
        timer.innerHTML = " " + timerLength;
    } // else display the score
}; setInterval(timerFunc, 1000);

