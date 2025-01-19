document.getElementById('toggleButton1').addEventListener('click', function() {
    const container = document.getElementById('cardContainer');
    container.classList.toggle('active');

    if (container.classList.contains('active')) {
        const cards = document.querySelectorAll('.card-contenido');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('active');
            }, index * 100); // Retraso entre cada carta
        });
    } else {
        const cards = document.querySelectorAll('.card-contenido');
        cards.forEach(card => {
            card.classList.remove('active');
        });
    }
});

document.getElementById('toggleButton2').addEventListener('click', function() {
    const container = document.getElementById('cardContainer2');
    container.classList.toggle('active');

    if (container.classList.contains('active')) {
        const cards = document.querySelectorAll('.card-contenido');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('active');
            }, index * 100); // Retraso entre cada carta
        });
    } else {
        const cards = document.querySelectorAll('.card-contenido');
        cards.forEach(card => {
            card.classList.remove('active');
        });
    }
});