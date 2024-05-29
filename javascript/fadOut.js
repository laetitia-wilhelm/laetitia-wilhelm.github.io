function fadeOutAndRedirect(url) {
    // Apply fade-out effect to the body or a container wrapping the entire content
    document.body.classList.add('fade-out');
    
    // Redirect to the URL after a short delay
    setTimeout(function() {
        window.location.href = url;
    }, 600); // Match the duration of the fade-out transition
}