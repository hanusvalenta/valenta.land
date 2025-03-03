document.addEventListener('DOMContentLoaded', function () { 
    const countDownDate = new Date("2025-05-25T00:00:00").getTime();
    const countdownElement = document.getElementById("countdown");
    
    let rotationAngle = 0;
    let direction = 1; // 1 for right, -1 for left
    let lastTimestamp = 0;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance >= 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            // Adjust font size dynamically (smaller when far, bigger when close)
            let remainingDays = distance / (1000 * 60 * 60 * 24);
            let fontSize = Math.max(20, 80 - remainingDays * 1); // More subtle scaling
            countdownElement.style.fontSize = `${fontSize}px`;
            
            // Smooth back-and-forth rotation effect
            rotationAngle += direction * 0.1; // Slow down the rotation
            if (rotationAngle > 5 || rotationAngle < -5) { // Reduce max angle for subtle effect
                direction *= -1;
            }
            countdownElement.style.transform = `rotate(${rotationAngle}deg)`;
            
            requestAnimationFrame(updateCountdown); // Smoother animation
        } else {
            countdownElement.innerHTML = "EXPIRED";
            countdownElement.style.transform = "rotate(0deg)"; // Reset rotation
        }
    }

    requestAnimationFrame(updateCountdown); // Start smooth animation

    fetch('DailyCopypastaStatus.txt')
        .then(response => response.text())
        .then(text => {
            countdownElement.innerHTML += `<br>${text}`;
        })
        .catch(error => console.error('Error fetching DailyCopypastaStatus.txt:', error));
});
