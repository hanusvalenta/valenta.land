document.addEventListener('DOMContentLoaded', function () { 
    const countDownDate = new Date("2025-05-25T00:00:00").getTime();
    const countdownElement = document.getElementById("countdown");

    const x = setInterval(function () {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        console.log(`countDownDate: ${countDownDate}, now: ${now}, distance: ${distance}`);

        if (distance >= 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            // Adjust font size dynamically (smaller when far, bigger when close)
            let remainingDays = distance / (1000 * 60 * 60 * 24);
            let fontSize = Math.max(16, 100 - remainingDays * 1.5); // Ensures it doesn't get too small

            countdownElement.style.fontSize = `${fontSize}px`;
        } else {
            clearInterval(x);
            countdownElement.innerHTML = "EXPIRED";
        }
    }, 1000);

    fetch('DailyCopypastaStatus.txt')
        .then(response => response.text())
        .then(text => {
            countdownElement.innerHTML += `<br>${text}`;
        })
        .catch(error => console.error('Error fetching DailyCopypastaStatus.txt:', error));
});
