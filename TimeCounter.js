console.log("initialize");
var timeDiffgetter = /** @class */ (function () {
    function timeDiffgetter() {
        this.startTime = '';
        this.endTime = '';
    }
    timeDiffgetter.prototype.currentTimeFillMethod = function () {
        var today = new Date();
        this.startTime = ((today.getHours() < 10) ? "0" : "") + today.getHours() + ":" + ((today.getMinutes() < 10) ? "0" : "") + today.getMinutes() + ':' + ((today.getSeconds() < 10) ? "0" : "") + today.getSeconds();
        this.setInput("startTime", this.startTime);
    };
    timeDiffgetter.prototype.setInnerHTML = function (typeValue, value, type) {
        if (type === void 0) { type = "id"; }
        console.log("i am called", type, typeValue, value);
        switch (type) {
            case 'id':
                document.getElementById(typeValue).innerHTML = value;
                break;
        }
    };
    timeDiffgetter.prototype.setInput = function (typeValue, value, type) {
        if (type === void 0) { type = "id"; }
        console.log("i am called", type, typeValue, value);
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
