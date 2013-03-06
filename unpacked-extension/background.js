chrome.app.runtime.onLaunched.addListener(function() {
    console.log(chrome.app.window);
    chrome.app.window.create('window.html', {
        width: screen.width,
        height: screen.height
    });
});