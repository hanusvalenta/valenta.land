document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.stars span');
    const ratingMessage = document.getElementById('rating-message');
    let selectedRating = localStorage.getItem('userRating') || 0;

    highlightStars(selectedRating);

    stars.forEach(star => {
        star.addEventListener('mouseover', function () {
            const value = this.getAttribute('data-value');
            highlightStars(value);
        });

        star.addEventListener('mouseout', function () {
            highlightStars(selectedRating);
        });

        star.addEventListener('click', function () {
            selectedRating = this.getAttribute('data-value');
            localStorage.setItem('userRating', selectedRating);
            highlightStars(selectedRating);
            ratingMessage.textContent = `Díky za hodnocení: ${selectedRating} hvězdiček!`;
        });
    });

    function highlightStars(value) {
        stars.forEach(star => {
            if (star.getAttribute('data-value') <= value) {
                star.classList.add('highlighted');
            } else {
                star.classList.remove('highlighted');
            }
        });
    }
});