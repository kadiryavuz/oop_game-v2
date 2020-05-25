/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

/**
 * Game class
 */
class Game {
    constructor() {
        this.missed = 0;
        this.phrases = new Array("car washing", "cinema", "Library", "cell", "Tree of Life");
        this.activePhrase = null;

        //extra property not to handle 5 tries - instead of hardcoded checks
        this.heartsToLive = 5;

    }

    /**
     * startGame starts game
     * @returns {string}
     */
    startGame = () => {
        const overlayEl = document.getElementById('overlay');
        overlayEl.style.display = 'none';
        this.activePhrase = new Phrase(this.getRandomPhrase());
        this.activePhrase.addPhraseToDisplay();
    }

    /**
     * getRandomPhrase returns the randomly selected phrase
     * @returns {string}
     */
    getRandomPhrase = () => {
        const retIndex = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[retIndex];
    }

    /**
     * handleInteraction handles interaction with keyup and click events sent by the app interface
     * @param {HTMLElement} target Button element to handle
     */
    handleInteraction = (target) => {

        const chosenLetter = target.textContent;

        target.disabled = true;
        if (this.activePhrase.checkLetter(chosenLetter)) {
            target.classList.add('chosen');
            const completedWithVictory = this.checkForWin();
            if (completedWithVictory) {
                setTimeout(() => { this.gameOver(true); }, 300);
            }

        } else {
            target.classList.add('wrong');
            this.removeLife();
        }
    }

    /**
     * removeLife removes a life from the scoreboard by replacing liveHeart image to lostHeart image
     */
    removeLife = () => {

        let liveHearts = document.querySelectorAll("li.tries img[src='images/liveHeart.png'");
        console.log("hearts: ", liveHearts);
        if(liveHearts[0]) {
            liveHearts[liveHearts.length - 1].src = 'images/lostHeart.png';
            
            this.missed += 1;
            if (this.missed === this.heartsToLive) {
                setTimeout(() => { this.gameOver(false); }, 300);
            }
        }
    }

    /**
     * checkForWin checks if there is a win already
     * @returns {boolean}
     */
    checkForWin = () => {
        let allDisplayed = true;
        const lettersOnBoard = document.querySelectorAll('div#phrase ul li');
        for (let i = 0; i < lettersOnBoard.length; i += 1) {
            if (lettersOnBoard[i].classList.contains('hide')) {
                allDisplayed = false;
                break;
            } else {
                continue;
            }
        }

        return allDisplayed;
    }

    /**
     * gameOver applies game over with win or lose scenario by displaying overlay and sending user the message
     * @param {boolean} isWin The status to check if game is over with win or lose
     */
    gameOver = (isWin) => {
       
        const overlayControl = document.getElementById('overlay');
        overlayControl.style.display = 'block';
        const gameResult = document.getElementById('game-over-message');
        if (!isWin) {
            //lose
            overlayControl.className = 'lose';
            gameResult.textContent = 'Lose! Try again';
        } else {
            //win

            overlayControl.className = 'win';
            let liveHearts = document.querySelectorAll("li.tries img[src='images/liveHeart.png'");
            const remainingHearts = liveHearts.length;
            if(remainingHearts === this.heartsToLive) {
                gameResult.textContent = 'Win! Excellent performance 🚀';
            } else if(remainingHearts >= 3 && remainingHearts < this.heartsToLive) {
                gameResult.textContent = "Win! Way to go 🦅";
            } else {
                gameResult.textContent = "Win! You had better days 🤗"
            }
        }
    }
}