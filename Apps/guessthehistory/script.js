let characters = [];
let currentCharacter = null;
let clueIndex = 0;

fetch('/Apps/guessthehistory/historical-characters.json')
    .then(response => response.json())
    .then(data => {
        characters = data;
        startGame();
    })
    .catch(error => console.error('Error loading JSON:', error));

function startGame() {
    currentCharacter = characters[Math.floor(Math.random() * characters.length)];
    clueIndex = 0;
    resetClues();
    updateClue();
    
    document.getElementById('clue-image').src = currentCharacter.image;
}

function resetClues() {
    document.querySelectorAll('.revealed').forEach(span => {
        span.innerText = "?";
    });
}

function updateClue() {
    if (clueIndex < currentCharacter.clues.length) {
        const clueData = currentCharacter.clues[clueIndex];
        
        let clueSpan = document.querySelector(`.revealed[data-clue="${clueIndex + 1}"]`);
        if (clueSpan) {
            clueSpan.innerText = clueData.text;
        }
    }
}

function udapteClueImage() {
    const clueImage = document.getElementById('clue-image');
    
    if (clueIndex === 1) {
        clueImage.style.filter = "blur(30px)";
    }
    if (clueIndex === 2) {
        clueImage.style.filter = "blur(20px)";
    }
    if (clueIndex === 3) {
        clueImage.style.filter = "blur(10px)";
    }
    if (clueIndex === 4) {
        clueImage.style.filter = "blur(0px)";
    }
}

document.getElementById('clue-skip').addEventListener('click', function () {
    clueIndex++;
    if (clueIndex < currentCharacter.clues.length) {
        updateClue();
        udapteClueImage();
    } else {
        document.getElementById('result').innerText = "¡Game Over! El personaje era "
        document.getElementById('result').style.backgroundColor = "rgba(185, 0, 0, 0.692)";
        document.getElementById('result').style.scale = "1";
        document.getElementById('clue-image').style.filter = "blur(0px)";
        document.getElementById('character-revealed').innerText = currentCharacter.name;
    }
});

document.getElementById('submit-guess').addEventListener('click', function () {
    const userGuess = document.getElementById('guess').value.trim().toLowerCase();
    if (userGuess === currentCharacter.name.toLowerCase()) {
        document.getElementById('result').innerText = "¡Correcto! El personaje es "
        document.getElementById('result').style.backgroundColor = "rgba(37, 185, 0, 0.692)";
        document.getElementById('result').style.scale = "1";
        document.getElementById('character-revealed').innerText = currentCharacter.name;
        document.getElementById('clue-image').style.filter = "blur(0px)";
        document.getElementById('guess').style.border = "1px solid green";
    } else {
        clueIndex++;
        if (clueIndex < currentCharacter.clues.length) {
            updateClue();
            udapteClueImage();
            document.getElementById('guess').style.border = "1px solid red";
        } else {
            document.getElementById('result').innerText = "¡Game Over! El personaje era "
            document.getElementById('result').style.backgroundColor = "rgba(185, 0, 0, 0.692)";
            document.getElementById('result').style.scale = "1";
            document.getElementById('character-revealed').innerText = currentCharacter.name;
            document.getElementById('clue-image').style.filter = "blur(0px)";
        }
    }
});

