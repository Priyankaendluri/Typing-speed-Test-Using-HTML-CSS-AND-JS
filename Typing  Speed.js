let startTime;
let isTestStarted = false;
let totalWords = 9; // Words in the sample text
let typedWords = 0;

const sampleText = "The quick brown fox jumps over the lazy dog.";
const typedTextArea = document.getElementById("typed-text");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const textSample = document.getElementById("text-sample");

function startTest() {
    if (isTestStarted) return;
    isTestStarted = true;
    startTime = new Date();
    typedTextArea.value = "";
    typedTextArea.disabled = false;
    typedTextArea.focus();
    document.getElementById("start-btn").textContent = "Restart Test";
    textSample.textContent = sampleText;
    updateResult(0, 0, 0);
}

function checkTyping() {
    const typedText = typedTextArea.value;
    const correctText = sampleText.slice(0, typedText.length);
    
    // Check for speed and accuracy only after some text is typed
    const timeElapsed = Math.floor((new Date() - startTime) / 1000);
    const wordsTyped = typedText.split(/\s+/).filter(word => word.length > 0).length;
    
    const accuracy = calculateAccuracy(typedText, sampleText);
    const wpm = calculateWPM(timeElapsed, wordsTyped);

    updateResult(timeElapsed, wpm, accuracy);
    
    if (typedText === sampleText) {
        const finalTime = Math.floor((new Date() - startTime) / 1000);
        alert(`Test complete! Time: ${finalTime} seconds, WPM: ${wpm}, Accuracy: ${accuracy}%`);
        typedTextArea.disabled = true;
    }
}

function updateResult(time, wpm, accuracy) {
    timeDisplay.textContent = time;
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;
}

function calculateWPM(time, words) {
    if (time === 0) return 0;
    return Math.round((words / time) * 60);
}

function calculateAccuracy(typed, original) {
    const correctChars = typed.split('').filter((char, index) => char === original[index]).length;
    return Math.round((correctChars / original.length) * 100);
}

