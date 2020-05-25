/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 /**
  * Phrase class
  */
 class Phrase {
     constructor(phrase) {
        this.phrase= phrase.toLowerCase();
     }

     /**
     * addPhraseToDisplay <li class="hide letter h">h</li> or <li class="space"> </li> several times depending
     * randomly selected phrase
     */
    addPhraseToDisplay = () => {
       
       let letterArr = this.phrase.split('');
       let ulEl = document.querySelector('div#phrase ul');
       for(let i = 0; i < letterArr.length; i+= 1) {
           let li = document.createElement('li');
           if(letterArr[i] !== ' ') {
               li.className = `hide letter ${letterArr[i]}`;
               li.textContent = letterArr[i];
           } else {
               li.className = 'space';
               li.textContent = ' ';
           }

           ulEl.appendChild(li);
       }
    }

    /**
     * checkLetter checks to see if the letter selected by the player matches a letter in the phrase
     * and applied matchedletter dom manipulation
     * @param {string} letter The string to check.
     * @returns {boolean}
     */
    checkLetter = (letter) => {
        const foundIndexes = this.phrase.split('').reduce((acc, el, i) => {
            if(el === letter) {
                acc.push(i);
            }
            return acc;
        }, []);

        if(foundIndexes.length === 0) {
            return false;
        } 

        this.showMatchedLetter(foundIndexes);

        return true;
    }

    /**
     * showMatchedLetter replaces hide to show for matched letters
     * @param {Array} matches The array of matched letters
     */
    showMatchedLetter = (matches) => {

       const lettersOnBoard = document.querySelectorAll('div#phrase ul li');
       for(let i=0; i < matches.length; i+= 1) {
        lettersOnBoard[matches[i]].classList.replace("hide", "show");
       }

    }
 }