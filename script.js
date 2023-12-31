const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

let w = canvas.width = document.body.offsetWidth;
let h = canvas.height = document.body.offsetHeight;
let cols = Math.floor(w / 20) + 1;
let ypos = Array(cols).fill(0);
let intervalId;

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, w, h);

function matrix() {
    ctx.fillStyle = '#0001';
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#0f0';
    ctx.font = '15px monospace';

    ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 20;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + 20;
    });
}


function startMatrixAnimation() {
    intervalId = setInterval(matrix, 50);
}

function restartMatrixAnimation() {
    clearInterval(intervalId);
    w = canvas.width = document.body.offsetWidth;
    h = canvas.height = document.body.offsetHeight;
    cols = Math.floor(w / 20) + 1;
    ypos = Array(cols).fill(0);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, w, h);
    startMatrixAnimation();
}

// Initial start of matrix animation
startMatrixAnimation();

// Add event listener for window resize
window.addEventListener('resize', restartMatrixAnimation);

document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('console-input');
    const typingSound = document.getElementById('typing-sound');
    const backspaceSound = document.getElementById('backspace-sound');
    const enterSound = document.getElementById('enter-sound');

    window.autosize(inputField);

    const textToType = "Hello,\nI'm Stan, web engineer and this is my Matrix.";
    let index = 0;

    function inputOnFocusHandler() {
        typeText()

        inputField.removeEventListener('click', inputOnFocusHandler)
    }

    inputField.addEventListener('click', inputOnFocusHandler);


    function simulateKeyPress(key) {
        const event = new KeyboardEvent('keydown', {
            key: key,
            bubbles: true,
            cancelable: true,
        });

        inputField.dispatchEvent(event);
    }

    function typeText() {
        inputField.value += textToType[index];
        index++;


        if(['\n'].includes(textToType[index])) setTimeout(() => typeKey(textToType[index]), 1000)
        else typeKey(textToType[index])


    }

    function typeKey(key) {
        simulateKeyPress(key)

        if (index < textToType.length) {
            setTimeout(typeText, 100); // Adjust the delay (in milliseconds) as needed
        }
    }

    inputField.addEventListener('keydown', function (event) {
        if (event.key === 'Backspace') {
            backspaceSound.currentTime = 0;
            backspaceSound.muted = true;
            backspaceSound.play();
        } else if (event.key === 'Enter') {
            enterSound.currentTime = 0;
            enterSound.muted = true;
            enterSound.play();
        } else {
            typingSound.currentTime = 0;
            typingSound.muted = true;
            typingSound.muted = false;
            typingSound.play();
        }
    });
});




