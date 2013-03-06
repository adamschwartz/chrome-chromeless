chrome.app.runtime.onLaunched.addListener(function() {
    var width = Math.max(400, Math.min(800, screen.width)),
        height = Math.max(400, Math.min(800, width * (screen.height / screen.width)))
    ;
    chrome.app.window.create('window.html', {
        frame: 'none',
        hidden: true,
        width: width,
        height: height
    });
});