/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */


/**
 * App class
 */
class App {
    constructor() {
        this.game = new Game();
        this.startControl = document.getElementById('btn__reset');
        this.letterControl = document.getElementById('qwerty');
    }

    /**
     * starter resets first and then starts game interacting with game instance
     */
    starter = () => {
        this.resetter();
        this.game.startGame();

    }

    /**
     * resetter fully resets for clearing the manipulations of previous play
     */
    resetter = () => {
        //1. Remove all li elements from the Phrase ul element.
        const phraseLiItems = document.querySelector('div#phrase ul');
        phraseLiItems.innerHTML = '';

        //2. Enable all of the onscreen keyboard buttons and update each to use the key CSS class, and not use the chosen or wrong CSS classes.
        const keyButtonItems = document.querySelectorAll('div#qwerty button');
        for (let i = 0; i < keyButtonItems.length; i += 1) {
            keyButtonItems[i].disabled = false;
            keyButtonItems[i].className = 'key';
        }


        //3.Reset all of the heart images (i.e. the player's lives) in the scoreboard at the bottom of the gameboard to display the liveHeart.png image.
        let heartsContainer = document.querySelector('div#scoreboard ol');
        heartsContainer.innerHTML = '';

        for (let i = 0; i < this.game.heartsToLive; i += 1) {
            let li = document.createElement('li');
            li.className = 'tries';

            let img = document.createElement('img');
            img.src = 'images/liveHeart.png';
            img.alt = 'Heart Icon';
            img.height = 35;
            img.width = 30;
            li.appendChild(img);
            heartsContainer.appendChild(li);
        }

        //4. resetting missed prop to default 0
        this.game.missed = 0;
    }

   /**
     * handleLetter handles interaction for the letter user clicked or typed from the keyboard
     * @param {HTMLElement || string} value The value to convert to regarding html element if needed
     * @param {boolean} onKey If it is interacted with keyup event
     */
    handleLetter = (value, onKey) => {
        let target;
        if (onKey) {
            const keyButtonItems = document.querySelectorAll('div#qwerty button');
            const buttonIndex = [...keyButtonItems].findIndex(s => s.textContent === value);
            if(buttonIndex === -1) {
                return;
            } else {
                target = keyButtonItems[buttonIndex];
            }
            
        } else {
            target = value;
        }
        if(this.game.missed > this.game.heartsToLive) {
            return;
        } else {
            this.game.handleInteraction(target);
        }
        
    }
}

/**
 * Event registrations via App class when everything on the page parsed by the DOM
 */
document.addEventListener("DOMContentLoaded", (e) => {

    window.gameApp = new App();
    gameApp.startControl.addEventListener('click', () => {
        gameApp.starter();
    });

    gameApp.letterControl.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            gameApp.handleLetter(e.target);
        }
    });

    document.addEventListener('keyup', (e) => {
        gameApp.handleLetter(e.key, true);
    })
});