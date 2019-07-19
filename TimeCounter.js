var externalModule;
(function (externalModule) {
    var externalFunctions = /** @class */ (function () {
        function externalFunctions() {
        }
        externalFunctions.prototype.timeBreaker = function (time) {
            return ([parseInt(time.slice(0, 2)), parseInt(time.slice(3, 5)), parseInt((time.slice(6, 8) == "") ? "0" : time.slice(6, 8))]);
        };
        externalFunctions.prototype.currentTime = function () {
            var today = new Date();
            return (((today.getHours() < 10) ? "0" : "") + today.getHours() + ":" + ((today.getMinutes() < 10) ? "0" : "") + today.getMinutes() + ':' + ((today.getSeconds() < 10) ? "0" : "") + today.getSeconds());
        };
        externalFunctions.prototype.setInnerHTML = function (typeValue, value, type) {
            if (type === void 0) { type = "id"; }
            switch (type) {
                case 'id':
                    document.getElementById(typeValue).innerHTML = value;
                    break;
            }
        };
        externalFunctions.prototype.setInput = function (typeValue, value, type) {
            if (type === void 0) { type = "id"; }
            switch (type) {
                case 'id':
                    document.getElementById(typeValue).value = value;
                    break;
            }
        };
        externalFunctions.prototype.validateTime = function (startHour, startMin, startSec, endHour, endMin, endSec) {
            var timeIsValid = true;
            if ((startHour > endHour) || (startHour == endHour && startMin > endMin) || (startHour == endHour && startMin == endMin && startSec > endSec)) {
                timeIsValid = false;
                return timeIsValid;
            }
            return timeIsValid;
        };
        return externalFunctions;
    }());
    externalModule.externalFunctions = externalFunctions;
})(externalModule || (externalModule = {}));
///<reference path = "./externalModule.ts" />
var timeDiffgetter = /** @class */ (function () {
    function timeDiffgetter() {
        this.startTime = '';
        this.endTime = '';
        this.liveCurrentTime = true;
        this.ExtModule = new externalModule.externalFunctions();
    }
    timeDiffgetter.prototype.currentTimeFillMethod = function () {
        this.liveCurrentTime = true;
        this.currentTimeInterval = setInterval(function () {
            if (timeDiffObj.liveCurrentTime) {
                timeDiffObj.ExtModule.setInput("startTime", timeDiffObj.ExtModule.currentTime());
            }
            else {
                return;
            }
        }, 1000);
    };
    timeDiffgetter.prototype.reset = function () {
        this.resetCurrentTimer();
        this.ExtModule.setInnerHTML("timediffer", "");
        this.ExtModule.setInput("endTime", "");
        clearInterval(this.liveCalculatorInterval);
    };
    timeDiffgetter.prototype.timeDiff = function () {
        clearInterval(this.liveCalculatorInterval);
        if (this.liveCurrentTime) {
            this.liveCalculatorInterval = setInterval(function () {
                timeDiffObj.timeDiffMethod();
            }, 1000);
        }
        else {
            this.timeDiffMethod();
        }
    };
    timeDiffgetter.prototype.timeDiffMethod = function () {
        var _a, _b;
        this.startTime = document.getElementById("startTime").value;
        this.endTime = document.getElementById("endTime").value;
        if (this.startTime.trim() == '' || this.endTime.trim() == '') {
            this.ExtModule.setInnerHTML("timediffer", "please enter time first");
            clearInterval(this.liveCalculatorInterval);
            return;
        }
        else {
            this.ExtModule.setInnerHTML("timediffer", '');
            var startHour, startMin, startSec, endHour, endMin, endSec;
            _a = this.ExtModule.timeBreaker(this.startTime), startHour = _a[0], startMin = _a[1], startSec = _a[2];
            _b = this.ExtModule.timeBreaker(this.endTime), endHour = _b[0], endMin = _b[1], endSec = _b[2];
            var ValidateResult = this.ExtModule.validateTime(startHour, startMin, startSec, endHour, endMin, endSec);
            if (!ValidateResult) {
                this.ExtModule.setInnerHTML("timediffer", 'incorrect timings, Starting Time cannot be greater than end time');
                clearInterval(this.liveCalculatorInterval);
                return;
            }
            this.getTimeDiff(startHour, startMin, startSec, endHour, endMin, endSec);
        }
    };
    timeDiffgetter.prototype.getTimeDiff = function (startHour, startMin, startSec, endHour, endMin, endSec) {
        var totalStartSec = (startHour * 3600) + (startMin * 60) + startSec;
        var totalEndSec = (endHour * 3600) + (endMin * 60) + endSec;
        var timeDiffInSec = totalEndSec - totalStartSec;
        var hourDiff = Math.floor(timeDiffInSec / 3600);
        var minDiff = timeDiffInSec % 3600;
        minDiff = Math.floor(minDiff / 60);
        var secDiff = (timeDiffInSec % 60);
        this.ExtModule.setInnerHTML("timediffer", "time differnce is " + hourDiff + " hours and " + minDiff + " minutes " + secDiff + " seconds");
    };
    timeDiffgetter.prototype.resetCurrentTimer = function () {
        this.liveCurrentTime = false;
        clearInterval(this.currentTimeInterval);
        this.ExtModule.setInput("startTime", "");
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
