// Log events:

document.onwebkitfullscreenchange = function() {
    console.log('onwebkitfullscreenchange');
};

document.onwebkitfullscreenerror = function() {
    console.log('onwebkitfullscreenerror');
};

// Button handlers:

$('input').keypress(function(e){
    if (e.keyCode == 13) {
        $(this).addClass('hidden');
        $('webview').css('opacity', 1).get(0).setAttribute('src', $(this).val());
    }
}).focus();

$(document).dblclick(function(){
    document.webkitExitFullscreen();
});

/*
// Attempt fullscreen on window creation.
// It will fail, but hopefully some day it won't:
// http://code.google.com/p/chromium/issues/detail?id=164624
document.body.webkitRequestFullscreen();
*/