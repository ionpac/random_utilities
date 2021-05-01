scrollPercentage = 0.5;

document.onkeyup=function(event){
    if (event.shiftKey) {
        if (event.key == "PageDown") {
            scrollBy(0, scrollPercentage * window.innerHeight);
        } else if (event.key == "PageUp") {
            scrollBy(0, -scrollPercentage * window.innerHeight);
        }
    }
}