let startDate, thisDate, timeDiff;
let clockTimer;

function timeToStr(t) {
    let ms = t % 1000;
    t -= ms;
    ms = Math.floor(ms / 10);
    t = Math.floor(t / 1000);
    let s = t % 60;
    t -= s;
    t = Math.floor(t / 60);
    let m = t % 60;
    t -= m;
    t = Math.floor(t / 60);
    let h = t % 60;
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    if (ms < 10) ms = '0' + ms;
    return h + ':' + m + ':' + s + '.' + ms;
}

function startTime() {
    startDate = new Date();
    timeDiff = startDate.getTime() - thisDate.getTime();
    clockTimer = setTimeout(() => { startTime(); }, 10);
}

function endTime() {
    const timeSting = timeToStr(timeDiff);
    clearInterval(clockTimer);

    return {
        time: timeDiff,
        timeSting: timeSting
    };
}
