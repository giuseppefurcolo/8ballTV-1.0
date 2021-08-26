//var linker = "./content/"; Change to content server URL
var linker = "http://giuseppefurcolo.com/delivery/";

function stripdate() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "7sun";
    weekday[1] = "1mon";
    weekday[2] = "2tue";
    weekday[3] = "3wed";
    weekday[4] = "4thu";
    weekday[5] = "5fri";
    weekday[6] = "6sat";
    var h = d.getHours();
    var gap = 0;
    var m = d.getMinutes() + gap;
    var mins = m * 60;
    var s = d.getSeconds();
    var dotw3 = weekday[d.getDay()].toString().substr(1, 4);
    var timecode = s + mins;
    return {
        m: m,
        h: h,
        dotw3: dotw3,
        timecode: timecode
    };
}
function begin() {
    if (AUDIOMUTE == false) {
        setTimeout(function() {
            UNMUTE();
        }, 2000);
    }

    var combo = stripdate();

    var m = combo.m;

    if (combo.h < 10) {
        h = "0" + combo.h;
    } else {
        var h = combo.h;
    };

    var dotw3 = combo.dotw3;


    var timecode = combo.timecode;

    if (m < 15) {
        var quarter = "q1";
        var line = eval(dotw3 + "_" + h + "_" + quarter);


    } else if (m >= 15 && m < 30) {

        var quarter = "q2";
        var prequarter1 = "q1";
        var line = eval(dotw3 + "_" + h + "_" + quarter);
        var preline1 = eval(dotw3 + "_" + h + "_" + prequarter1);
        timecode = timecode - 900;

        if (line == "") {
            line = preline1;
            timecode = timecode + 900;
        };

    } else if (m >= 30 && m < 44) {
        var quarter = "q3";
        var prequarter1 = "q2";
        var prequarter2 = "q1";
        var line = eval(dotw3 + "_" + h + "_" + quarter);
        var preline1 = eval(dotw3 + "_" + h + "_" + prequarter1);
        var preline2 = eval(dotw3 + "_" + h + "_" + prequarter2);
        timecode = timecode - 1800;

        if (line == "") {
            line = preline1;
            timecode = timecode + 900;
            if (line == "") {
                line = preline2;
                timecode = timecode + 900;
            };
        };
    } else if (m >= 45) {
        var quarter = "q4";
        var prequarter1 = "q3";
        var prequarter2 = "q2";
        var prequarter3 = "q1";
        var line = eval(dotw3 + "_" + h + "_" + quarter);
        var preline1 = eval(dotw3 + "_" + h + "_" + prequarter1);
        var preline2 = eval(dotw3 + "_" + h + "_" + prequarter2);
        var preline3 = eval(dotw3 + "_" + h + "_" + prequarter3);
        timecode = timecode - 2700;
        if (line == "") {
            line = preline1;
            timecode = timecode + 900;
            if (line == "") {
                line = preline2;
                timecode = timecode + 900;
                if (line == "") {
                    line = preline3;
                    timecode = timecode + 900;
                };
            };
        };
    };
    var streamer = linker + line["file"] + "#t=" + timecode;
    document.getElementById("title").innerHTML = line["title"];
    document.getElementById("mp4_src").src = streamer;
    document.getElementById("tv").load();
};

begin();

function gotoday() {
    var combo = stripdate();

    var m = combo.m;
    var h = combo.h;
    var dotw3 = combo.dotw3;
    var timecode = combo.timecode;

    h = h - 2;

    if (h < 10) {
        h = "0" + h
    };

    var annamo = "scheduler.html?theday=" + dotw3 + "#h" + h + "_00";

    window.open(annamo, "_self");

}

document.getElementById("tv").onended = function() {
    begin();
};

document.getElementById("tv").addEventListener("error", myError, true);

function myError() {
    document.getElementById("title").innerHTML = "ERROR";
};



var checkgap = 1000 * 60 * 5;


function timecheck() {
    begin();
    //console.log("checked at " + checkgap)
    setTimeout(timecheck, checkgap);
}

var unmuter = document.getElementById("soundon");
var muter = document.getElementById("soundoff");

function UNMUTE() {
    unmuter.style.display = 'none';
    muter.style.display = 'inline';
    AUDIOMUTE = false;
    checkAUDIO(false)
}

function MUTE() {
    muter.style.display = 'none';
    unmuter.style.display = 'inline';
    AUDIOMUTE = true;
    checkAUDIO(true)
}

function checkAUDIO(stato) {
    document.getElementById("tv").muted = stato;
}

var AUDIOMUTE = true;

if (AUDIOMUTE) {
    checkAUDIO(true);
    unmuter.style.display = 'inline';
    muter.style.display = 'none';
} else {
    checkAUDIO(false)
    unmuter.style.display = 'none';
    muter.style.display = 'inline';
};



var requestFullscreen = function (ele) {
    if (ele.requestFullscreen) {
        ele.requestFullscreen();
    } else if (ele.webkitRequestFullscreen) {
        ele.webkitRequestFullscreen();
    } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
    } else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen();
    } else {
        console.log('Fullscreen API is not supported.');
    }
};

var exitFullscreen = function () {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else {
        console.log('Fullscreen API is not supported.');
    }
};

var gofs = document.getElementById('go-fs');
var exitfs = document.getElementById('exit-fs');

gofs.addEventListener('click', function(e) {
    e.preventDefault();
    requestFullscreen(document.documentElement);

     exitfs.style.display = 'inline';
    gofs.style.display = 'none';
});

exitfs.addEventListener('click', function(e) {
    e.preventDefault();
    exitFullscreen();

        exitfs.style.display = 'none';
    gofs.style.display = 'inline';
});
