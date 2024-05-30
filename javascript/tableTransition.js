function showSchedule(gender, button) {
    const menSchedule = document.getElementById('men-schedule');
    const womenSchedule = document.getElementById('women-schedule');
    
    //get the navigation button
    const buttons = document.querySelectorAll('.switch-buttons .nav-button');
    
    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to the clicked button
    button.classList.add('active');
    
    if (gender === 'men') {
        // Hide women active table
        womenSchedule.classList.remove('active');
        setTimeout(() => womenSchedule.classList.add('hidden'), 200); // Delay hiding to allow transition
        
        // Show men schedule after hiding finishes
        menSchedule.classList.add('active');
        setTimeout(() => menSchedule.classList.remove('hidden'), 400); // Delay showing to allow transition
    } else {
        // Hide men active table
        menSchedule.classList.remove('active');
        setTimeout(() => menSchedule.classList.add('hidden'), 200);
        
        //  Show women schedule after hiding finishes
        womenSchedule.classList.add('active');
        setTimeout(() => womenSchedule.classList.remove('hidden'), 400); 
    }
}

function showPlayers(gender, button) {
    const menPlayers = document.getElementById('men-players');
    const womenPlayers = document.getElementById('women-players');
    const buttons = document.querySelectorAll('.switch-buttons .nav-button');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    
    button.classList.add('active');
    
    if (gender === 'men') {
        womenPlayers.classList.remove('active');
        setTimeout(() => womenPlayers.classList.add('hidden'), 200);
        menPlayers.classList.add('active');
        setTimeout(() => menPlayers.classList.remove('hidden'), 400); 
    } else {
        menPlayers.classList.remove('active');
        setTimeout(() => menPlayers.classList.add('hidden'), 200); 
        
        womenPlayers.classList.add('active');
        setTimeout(() => womenPlayers.classList.remove('hidden'), 400);
    }
}


/* Video size adjustment  --> force to keep the 16:9 ratio*/
function adjustVideoSize() {
    var videoFrame = document.getElementById("videoFrame");
    var wrapperWidth = document.querySelector(".video-wrapper").offsetWidth;
    var height = wrapperWidth * 9 / 16; 
    videoFrame.style.height = height + "px";
}
adjustVideoSize();
window.addEventListener("resize", adjustVideoSize); //adjuste when the window is resized

