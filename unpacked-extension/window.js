var app = {};

app.webkitFullScreen = false;

app.init = function() {
    app.loadSettings(function(){
        app.restoreLastWindow();
        app.setupWindowOnBoundsChanged();
        app.setupInput();
        app.setupFullScreenEvents();
    });
};

app.loadSettings = function(callback) {
    var initialWindowWidth = Math.max(400, Math.min(800, screen.width)),
        initialWindowHeight = Math.max(400, Math.min(800, initialWindowWidth * (screen.height / screen.width))),
        initialWindowLeft = (screen.width - initialWindowWidth) / 2,
        initialWindowTop = (screen.height - initialWindowHeight) / 2
    ;

    app.defaultSettings = {
        window: {
            url: false,
            left: initialWindowLeft,
            top: initialWindowTop,
            width: initialWindowWidth,
            height: initialWindowHeight
        }
    };

    chrome.storage.sync.get(null, function(settings){
        app.settings = $.extend(true, {}, app.defaultSettings, settings);
        callback();
    });

    // chrome.runtime.onSuspend.addListener(function(){
    //     app.saveSettings();
    // });
};

app.saveSettings = function() {
    chrome.storage.sync.set(app.settings);
};

app.restoreLastWindow = function() {
    var currentWindow = chrome.app.window.current();
    currentWindow.resizeTo(app.settings.window.width, app.settings.window.height);
    currentWindow.moveTo(app.settings.window.left, app.settings.window.top);
    currentWindow.show();
};

app.setupWindowOnBoundsChanged = function() {
    chrome.app.window.current().onBoundsChanged = {
        dispatch: function() {
            var currentWindow = chrome.app.window.current();
            $.extend(app.settings.window, currentWindow.getBounds());
            app.saveSettings();
        }
    };
};

app.setupInput = function() {
    $('input').keypress(function(e){
        var $input = $(this),
            url = $input.val()
        ;
        if (e.keyCode === 13 && url) {
            app.window.navigate(url);
        }
    });

    if (app.settings.window.url) {
        $('input').val(app.settings.window.url);
        app.window.navigate(app.settings.window.url);
    }

    setTimeout(function(){
        $('input').focus();
    }, 300);
};

app.setupFullScreenEvents = function() {
    $(document).dblclick(function(){
        var currentWindow = chrome.app.window.current();
        if (app.webkitFullScreen) {
            currentWindow.maximize();
        } else {
            currentWindow.restore();
        }
        app.webkitFullScreen = !app.webkitFullScreen;
    });
};

app.window = {};

app.window.navigate = function(url) {
    if (!/https?:\/\//.test(url)) {
        url = 'http://' + url;
    }
    $('input').addClass('hidden');
    $('webview').css('opacity', 1).get(0).setAttribute('src', url);
    app.settings.window.url = url;
    app.saveSettings();
};

app.init();