# Game Challenge

## Game Concept

A Touch typing test game that will display a paragraph of text. The player will have 1 minute to retype out the paragraph. Coorect letter will be highlighted green, mistakes will be highlihgted red and counted. The game will return a score of characters/words typed per minute once the timer has run out.

A potenital add on will be that the paragraph changes once the game is started again.

Another potential add on will be to add levels but I think this is beyond my scope currently.

## HTML

-   [ ] Container to display the paragraph of text
-   [ ] A set of buttons/counters for game controls/scores
    -   [ ] Time counter
    -   [ ] mistakes counter
    -   [ ] words per minute score (this will display at the end)
    -   [ ] characters per minute score (this will display at the end)
    -   [ ] Start or Restart button (could change from start to restart once the timer has started??? Or maybe just have separate buttons)
-   [ ] An input box to type into

## SCSS

-   [ ] The paragraph of text will display in its own box
-   [ ] Below that there will be the buttons/counters
-   [ ] Appropriate styling applied
    -   [ ] Background design etc.

## Typescript Logic

-   Paragraph:
    -   [ ] Need to create something to input the paragraph of text. Maybe have 10 set paragraphs that it will cycle through each time the test is restarted
    -   [ ] Needs to recognise characters inputted and match them to the character in the displayed paragraph box
        -   [ ] If matched turn green
        -   [ ] If not matched then turn red AND add 1 count to error counter
-   [ ] Add timer function to timer button. Count down from 60 seconds once the Start button has been initated. When timer finishes then display score
-   [ ] Start / restart funcitonality needs to be added
    -   [ ] Start - initiates timer
    -   [ ] Restart - resets timer and clears all attempted text
