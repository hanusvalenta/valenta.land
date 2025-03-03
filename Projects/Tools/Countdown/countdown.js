document.addEventListener('DOMContentLoaded', function () { 
    const countDownDate = new Date("2025-05-25T00:00:00").getTime();
    const countdownElement = document.getElementById("countdown");
    
    let rotationAngle = 0;
    let direction = 1;
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

            let remainingDays = distance / (1000 * 60 * 60 * 24);
            let fontSize = Math.max(20, 110 - remainingDays * 1);
            countdownElement.style.fontSize = `${fontSize}px`;
            
            rotationAngle += direction * 0.1;
            if (rotationAngle > 5 || rotationAngle < -5) {
                direction *= -1;
            }
            countdownElement.style.transform = `rotate(${rotationAngle}deg)`;
            
            requestAnimationFrame(updateCountdown);
        } else {
            countdownElement.innerHTML = "EXPIRED";
            countdownElement.style.transform = "rotate(0deg)";
        }
    }

    requestAnimationFrame(updateCountdown);

    fetch('DailyCopypastaStatus.txt')
        .then(response => response.text())
        .then(text => {
            countdownElement.innerHTML += `<br>${text}`;
        })
        .catch(error => console.error('Error fetching DailyCopypastaStatus.txt:', error));
});
