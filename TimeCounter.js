var timeDiffgetter = /** @class */ (function () {
    function timeDiffgetter() {
        this.startTime = '';
        this.endTime = '';
        this.liveCurrentTime = true;
    }
    timeDiffgetter.prototype.currentTimeFillMethod = function () {
        if (timeDiffObj.liveCurrentTime) {
            setInterval(function () {
                timeDiffObj.setInput("startTime", timeDiffObj.currentTime());
            }, 1000);
        }
    };
    timeDiffgetter.prototype.currentTime = function () {
        var today = new Date();
        return (((today.getHours() < 10) ? "0" : "") + today.getHours() + ":" + ((today.getMinutes() < 10) ? "0" : "") + today.getMinutes() + ':' + ((today.getSeconds() < 10) ? "0" : "") + today.getSeconds());
    };
    timeDiffgetter.prototype.setInnerHTML = function (typeValue, value, type) {
        if (type === void 0) { type = "id"; }
        switch (type) {
            case 'id':
                document.getElementById(typeValue).innerHTML = value;
                break;
        }
    };
    timeDiffgetter.prototype.setInput = function (typeValue, value, type) {
        if (type === void 0) { type = "id"; }
        switch (type) {
            case 'id':
                document.getElementById(typeValue).value = value;
                break;
        }
    };
    return timeDiffgetter;
}());
var timeDiffObj = new timeDiffgetter();
var currentTimeFill = function () {
    timeDiffObj.currentTimeFillMethod();
};
var timeDiff = function () {
    console.log("timeDiff");
};
var reset = function () {
    console.log("reset");
};
