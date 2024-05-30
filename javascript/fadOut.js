
/* handle the transition and redirection to the index.html page*/
function fadeOutAndRedirect(url) {
    // apply fade out from style.css to the body
    document.body.classList.add('fade-out');
    
    // delay redirection to the url
    setTimeout(function() {
        window.location.href = url;}, 600); 
}