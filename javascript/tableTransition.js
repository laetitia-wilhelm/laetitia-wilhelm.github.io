function showSchedule(gender, button) {
    const menSchedule = document.getElementById('men-schedule');
    const womenSchedule = document.getElementById('women-schedule');
    const buttons = document.querySelectorAll('.toggle-buttons .nav-button');
    
    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to the clicked button
    button.classList.add('active');
    
    if (gender === 'men') {
        // Hide the currently active table
        womenSchedule.classList.remove('active');
        setTimeout(() => womenSchedule.classList.add('hidden'), 200); // Delay hiding to allow transition
        
        // Show the men's schedule table
        menSchedule.classList.add('active');
        setTimeout(() => menSchedule.classList.remove('hidden'), 400); // Delay showing to allow transition
    } else {
        // Hide the currently active table
        menSchedule.classList.remove('active');
        setTimeout(() => menSchedule.classList.add('hidden'), 200); // Delay hiding to allow transition
        
        // Show the women's schedule table
        womenSchedule.classList.add('active');
        setTimeout(() => womenSchedule.classList.remove('hidden'), 400); // Delay showing to allow transition
    }
}

function showPlayers(gender, button) {
    const menPlayers = document.getElementById('men-players');
    const womenPlayers = document.getElementById('women-players');
    const buttons = document.querySelectorAll('.toggle-buttons .nav-button');
    
    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to the clicked button
    button.classList.add('active');
    
    if (gender === 'men') {
        // Hide the currently active table
        womenPlayers.classList.remove('active');
        setTimeout(() => womenPlayers.classList.add('hidden'), 200); // Delay hiding to allow transition
        
        // Show the men's players table
        menPlayers.classList.add('active');
        setTimeout(() => menPlayers.classList.remove('hidden'), 400); // Delay showing to allow transition
    } else {
        // Hide the currently active table
        menPlayers.classList.remove('active');
        setTimeout(() => menPlayers.classList.add('hidden'), 200); // Delay hiding to allow transition
        
        // Show the women's players table
        womenPlayers.classList.add('active');
        setTimeout(() => womenPlayers.classList.remove('hidden'), 400); // Delay showing to allow transition
    }
}


function adjustVideoSize() {
    var videoFrame = document.getElementById("videoFrame");
    var wrapperWidth = document.querySelector(".video-wrapper").offsetWidth;
    var height = wrapperWidth * 9 / 16; // 16:9 aspect ratio
    videoFrame.style.height = height + "px";
}
adjustVideoSize();
window.addEventListener("resize", adjustVideoSize);

