var timeDiffgetter = /** @class */ (function () {
    function timeDiffgetter() {
        this.startTime = '';
        this.endTime = '';
        this.liveCurrentTime = true;
    }
    timeDiffgetter.prototype.currentTimeFillMethod = function () {
        this.liveCurrentTime = true;
        this.currentTimeInterval = setInterval(function () {
            if (timeDiffObj.liveCurrentTime) {
                timeDiffObj.setInput("startTime", timeDiffObj.currentTime());
            }
            else {
                return;
            }
        }, 1000);
    };
    timeDiffgetter.prototype.reset = function () {
        this.resetCurrentTimer();
        this.resetDiffString();
        this.setInput("endTime", "");
    };
    timeDiffgetter.prototype.timeDiff = function () {
        var _a, _b;
        this.startTime = document.getElementById("startTime").value;
        this.endTime = document.getElementById("endTime").value;
        if (this.startTime.trim() == '' || this.endTime.trim() == '') {
            this.setInnerHTML("timediffer", "please enter time first");
        }
        else {
            this.setInnerHTML("timediffer", '');
            var startHour, startMin, startSec, endHour, endMin, endSec;
            console.log(this.endTime.length);
            _a = this.timeBreaker(this.startTime), startHour = _a[0], startMin = _a[1], startSec = _a[2];
            _b = this.timeBreaker(this.endTime), endHour = _b[0], endMin = _b[1], endSec = _b[2];
            var ValidateResult = this.validateTime(startHour, startMin, startSec, endHour, endMin, endSec);
            if (!ValidateResult) {
                this.setInnerHTML("timediffer", 'incorrect timings, Starting Time cannot be greater than end time');
                return;
            }
            this.getTimeDiff(startHour, startMin, startSec, endHour, endMin, endSec);
        }
    };
    timeDiffgetter.prototype.getTimeDiff = function (startHour, startMin, startSec, endHour, endMin, endSec) {
        console.log(startHour, startMin, startSec, endHour, endMin, endSec);
        var totalStartSec = (startHour * 3600) + (startMin * 60) + startSec;
        var totalEndSec = (endHour * 3600) + (endMin * 60) + endSec;
        var timeDiffInSec = totalEndSec - totalStartSec;
        var hourDiff = Math.floor(timeDiffInSec / 3600);
        var minDiff = timeDiffInSec % 3600;
        minDiff = Math.floor(minDiff / 60);
        var secDiff = (timeDiffInSec % 60);
        console.log(hourDiff, minDiff, secDiff);
        this.setInnerHTML("timediffer", "time differnce is " + hourDiff + " hours and " + minDiff + " minutes " + secDiff + " seconds");
    };
    timeDiffgetter.prototype.validateTime = function (startHour, startMin, startSec, endHour, endMin, endSec) {
        var timeIsValid = true;
        if ((startHour > endHour) || (startHour == endHour && startMin > endMin) || (startHour == endHour && startMin == endMin && startSec > endSec)) {
            timeIsValid = false;
            return timeIsValid;
        }
        return timeIsValid;
    };
    timeDiffgetter.prototype.timeBreaker = function (time) {
        return ([parseInt(time.slice(0, 2)), parseInt(time.slice(3, 5)), parseInt((time.slice(6, 8) == "") ? "0" : time.slice(6, 8))]);
    };
    timeDiffgetter.prototype.resetCurrentTimer = function () {
        this.liveCurrentTime = false;
        clearInterval(this.currentTimeInterval);
        this.setInput("startTime", "");
    };
    timeDiffgetter.prototype.resetDiffString = function () {
        this.setInnerHTML("timediffer", "");
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
    timeDiffObj.timeDiff();
};
var reset = function () {
    timeDiffObj.reset();
};
