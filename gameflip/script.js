<script>
    document.addEventListener('DOMContentLoaded', function () {
    const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

    const memoryGame = document.querySelector('.memory-game');
    let flippedCards = [];
    let matchedPairs = 0;

    // Shuffle the array using Fisher-Yates algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Initialize the game
    function initGame() {
        shuffleArray(cardValues);
        renderCards();
    }

    // Render cards on the game board
    function renderCards() {
        memoryGame.innerHTML = '';
        cardValues.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.textContent = value;
            card.addEventListener('click', flipCard);
            memoryGame.appendChild(card);
        });
    }

    // Handle card flipping logic
    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 800);
            }
        }
    }

    // Check if the flipped cards are a match
    function checkMatch() {
        const [card1, card2] = flippedCards;
        const value1 = card1.textContent;
        const value2 = card2.textContent;

        if (value1 === value2) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;

            if (matchedPairs === cardValues.length / 2) {
                alert('Congratulations! You matched all pairs.');
                resetGame();
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        flippedCards = [];
    }

    // Reset the game
    function resetGame() {
        matchedPairs = 0;
        flippedCards = [];
        initGame();
    }

    // Initialize the game when the page loads
    initGame();
});

</script>