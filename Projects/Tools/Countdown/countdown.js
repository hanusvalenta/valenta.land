document.addEventListener('DOMContentLoaded', function () {
    const countDownDate = new Date("December 10, 2024 23:59:59").getTime();

    const x = setInterval(function () {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance >= 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "EXPIRED";
        }
    }, 1000);

    fetch('DailyCopypastaStatus.txt')
        .then(response => response.text())
        .then(text => {
            document.getElementById("countdown").innerHTML += `<br>${text}`;
        })
        .catch(error => console.error('Error fetching DailyCopypastaStatus.txt:', error));
});
