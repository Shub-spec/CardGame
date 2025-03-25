$(document).ready(function() {
    const symbols = ['🌸', '🍭', '🐰', '🌈', '🎀', '🍩', '🐻', '🎈'];
    const gameBoard = $('.game-board');
    let flippedCards = [];
    let score = 0;
    let canClick = true;

    // Shuffle symbols and create card elements
    const gameCards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

    gameCards.forEach(symbol => {
        gameBoard.append(`
            <div class="card">
                <div class="card-inner">
                    <div class="card-front">${symbol}</div>
                    <div class="card-back"></div>
                </div>
            </div>
        `);
    });

    // Handle card click event
    $('.card').click(function() {
        if (!canClick || $(this).hasClass('flipped') || flippedCards.length >= 2) return;

        $(this).addClass('flipped');
        flippedCards.push($(this));

        if (flippedCards.length === 2) {
            canClick = false;
            let [card1, card2] = flippedCards;
            let match = card1.find('.card-front').text() === card2.find('.card-front').text();

            setTimeout(() => {
                if (match) {
                    card1.add(card2).addClass('matched');
                    score += 10;
                    $('#score').text(score);
                } else {
                    card1.add(card2).removeClass('flipped');
                }

                flippedCards = [];
                canClick = true;

                // Check for win condition
                if ($('.matched').length === gameCards.length) {
                    setTimeout(() => {
                        alert(`🎉 Congratulations! Final Score: ${score}`);
                    }, 500);
                }
            }, 800);
        }
    });

    // Create floating symbols for animated background
    for (let i = 0; i < 20; i++) {
        let randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        let randomLeft = Math.random() * 100;
        let randomDelay = -Math.random() * 10;

        $('.floating-background').append(`
            <div class="floating-symbol" 
                 style="left:${randomLeft}%; animation-delay:${randomDelay}s">
                 ${randomSymbol}
            </div>
        `);
    }
});
