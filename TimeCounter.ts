///<reference path = "./externalModule.ts" />
class timeDiffgetter {
  startTime: any = '';
  endTime: any = '';
  liveCurrentTime: boolean = true;
  currentTimeInterval;
  liveCalculatorInterval;
  ExtModule = new externalModule.externalFunctions();
  currentTimeFillMethod():void {
   this.liveCurrentTime = true;
   this.currentTimeInterval = setInterval(function(){
      if(timeDiffObj.liveCurrentTime) {
        timeDiffObj.ExtModule.setInput("startTime", timeDiffObj.ExtModule.currentTime());
      } else {
        return;
      }
    },1000);
  }

  reset() {
    this.resetCurrentTimer();
    this.ExtModule.setInnerHTML("timediffer", "");
    this.ExtModule.setInput("endTime", "");
    clearInterval(this.liveCalculatorInterval);
  }

  timeDiff() {
    clearInterval(this.liveCalculatorInterval);
    if(this.liveCurrentTime) {
      this.liveCalculatorInterval = setInterval(function() {
        timeDiffObj.timeDiffMethod()
      }, 1000);
    } else {
      this.timeDiffMethod();
    }
  }

  timeDiffMethod() {
    this.startTime = (<HTMLInputElement>document.getElementById("startTime")).value;
    this.endTime = (<HTMLInputElement>document.getElementById("endTime")).value;
    if(this.startTime.trim() == '' || this.endTime.trim() == '') {
      this.ExtModule.setInnerHTML("timediffer", "please enter time first");
      clearInterval(this.liveCalculatorInterval);
      return;
    } else {
      this.ExtModule.setInnerHTML("timediffer", '');
      var startHour, startMin, startSec, endHour, endMin, endSec;
      [startHour, startMin, startSec] = this.ExtModule.timeBreaker(this.startTime);
      [endHour, endMin, endSec] = this.ExtModule.timeBreaker(this.endTime);
      var ValidateResult = this.ExtModule.validateTime(startHour, startMin, startSec, endHour, endMin, endSec);
      if(!ValidateResult) {
        this.ExtModule.setInnerHTML("timediffer", 'incorrect timings, Starting Time cannot be greater than end time');
        clearInterval(this.liveCalculatorInterval);
        return;
      }
      this.getTimeDiff(startHour, startMin, startSec, endHour, endMin, endSec);
    }
  }

  getTimeDiff(startHour:number, startMin:number, startSec:number, endHour:number, endMin:number, endSec:number) {
    var totalStartSec:number = (startHour * 3600) + (startMin * 60) + startSec;
    var totalEndSec:number = (endHour * 3600) + (endMin * 60) + endSec;
    var timeDiffInSec:number = totalEndSec - totalStartSec;
    var hourDiff:number = Math.floor(timeDiffInSec / 3600);
    var minDiff:number = timeDiffInSec % 3600;
    minDiff = Math.floor(minDiff / 60);
    var secDiff:number = (timeDiffInSec % 60);
    this.ExtModule.setInnerHTML("timediffer", "time differnce is " + hourDiff + " hours and " + minDiff + " minutes " + secDiff + " seconds" )
  }

  resetCurrentTimer() {
    this.liveCurrentTime = false;
    clearInterval(this.currentTimeInterval);
    this.ExtModule.setInput("startTime", "");
  }

}

var timeDiffObj = new timeDiffgetter();
const currentTimeFill = () => {
  timeDiffObj.currentTimeFillMethod();
}

const timeDiff = () => {
  timeDiffObj.timeDiff();
}

const reset = () => {
  timeDiffObj.reset();
}