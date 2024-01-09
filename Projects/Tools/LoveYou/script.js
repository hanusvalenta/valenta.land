document.addEventListener('DOMContentLoaded', function() {
    var reasons = [
        "You make me smile every day.",
        "You understand me like no one else.",
        "You're my best friend and soulmate.",
        "Your love is my greatest treasure.",
        "Every moment with you is a blessing."
    ];

    var reasonIndex = 0;

    function updateReason() {
        document.getElementById("current-reason").textContent = reasons[reasonIndex];
        reasonIndex = (reasonIndex + 1) % reasons.length; // Loop through the reasons
    }

    updateReason();

    setInterval(updateReason, 1000);

    var countDownDate = new Date("January 21, 2024 11:56:04").getTime();

    var x = setInterval(function() {
      
        var now = new Date().getTime();
        var distance = countDownDate - now;
        
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "We are together now!";
        }
    }, 1000);
});
