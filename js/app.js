/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */


/**
 * App class
 */
class App {
    constructor() {
        this.game = null;
        this.startControl = document.getElementById('btn__reset');
        this.letterControl = document.getElementById('qwerty');
    }

    /**
     * starter resets first and then starts game interacting with game instance
     */
    starter = () => {
        this.game = new Game();
        this.game.startGame();
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