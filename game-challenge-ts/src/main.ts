import '../stylesheet.scss';
const timer = document.getElementById("timer");

// POTENITAL PARAGRAPHS
// What they do not comprehend is man’s helplessness. I am weak, small, and of no consequence to the universe.  It does not notice me; I live on unseen.  But why is that bad?  Isn’t it better that way?  Whom the gods notice they destroy.  But small...and you will escape the jealousy of the great.
// A long time ago in a galaxy far, far away... Rebel spaceships, battered and few, are manoeuvring a desperate last stand against the mighty Imperial Starfleet. An ancient weapon, the Death Star, capable of destroying a planet, is now fully operational and under construction. The fate of the rebellion lies with a small band of brave fighters who have only one chance to strike from the shadows.
// 'There, peeping among the cloud-wrack above a dark tor high up in the mountains, Sam saw a white star twinkle for a while. The beauty of it smote his heart, as he looked up out of the forsaken land, and hope returned to him. For like a shaft, clear and cold, the thought pierced him that in the end the Shadow was only a small and passing thing: there was light and high beauty for ever beyond its reach.'
// They picked a way among the trees, and their ponies plodded along, carefully avoiding the many writhing and interlacing roots. There was no undergrowth. The ground was rising steadily, and as they went forward it seemed that the trees became taller, darker, and thicker. There was no sound, except an occasional drip of moisture falling through the still leaves. For the moment there was no whispering or movement among the branches; but they all got an uncomfortable feeling that they were being watched with disapproval, deepening to dislike and even enmity. The feeling steadily grew, until they found themselves looking up quickly, or glancing back over their shoulders, as if they expected a sudden blow.


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

