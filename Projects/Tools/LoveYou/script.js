document.addEventListener('DOMContentLoaded', function() {
    var reasons = [
        "You make me smile every moment from when I met you.",
        "You understand me like no one else does.",
        "You're my best friend.",
        "You always have time for me.",
        "Every moment with you is wonderfull.",
        "You look like a godess even after a long day at school.",
        "You play Valorant like a god.",
        "You're the person I wanna spend my life with.",
        "You gave me the best kisses on chrismas.",
        "You always forgive even my dummest mistakes.",
        "You have beatifull eyes full of kindness.",
        "You're always kind.",
        "You always find a way to cheer me up.",
        "You laughing makes me feel joy.",
        "You make me feel alive like I've never been before.",
        "You're dirty minded but not too much... just the right amount.",
        "You give the best kisses.",
        "You always find time on me even when playing Valo or D&D.",
        "You're my favourite little nugget",
        "We share so much in common.",
        "You deserve to be pampered, and I'll give it to you.",
        "You make beatiful art.",
        "You make my mind go numb.",
        "You're cute even when tired.",
        "You're so hot when you go mad at someone.",
        "You also don't like paying taxes",
        "You make me smile even from thousands kilometers away.",
        "You've got the rizz.",
        "You're the best french kisser.",
        "You are beatifull even on photos.",
        "You're the best valentine.",
        "You are always there.",
        "You've showed me new ways of living and thinking.",
        "You're able to wait for the best of me.",
        "We've always setteled everything together."
    ];

    function updateReason() {
        var randomIndex = Math.floor(Math.random() * reasons.length);
        document.getElementById("current-reason").textContent = reasons[randomIndex];
    }

    updateReason();

    setInterval(updateReason, 3000); // Updates every 3 seconds

    var countDownDate = new Date("June 10 2024 17:00:00").getTime();

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
