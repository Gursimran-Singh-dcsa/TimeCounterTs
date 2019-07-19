class timeDiffgetter {
  startTime: any = '';
  endTime: any = '';
  liveCurrentTime: boolean = true;
  currentTimeInterval;
  liveCalculatorInterval;

  currentTimeFillMethod():void {
   this.liveCurrentTime = true;
   this.currentTimeInterval = setInterval(function(){
      if(timeDiffObj.liveCurrentTime) {
        timeDiffObj.setInput("startTime", timeDiffObj.currentTime());
      } else {
        return;
      }
    },1000);
  }

  reset() {
    this.resetCurrentTimer();
    this.resetDiffString();
    this.setInput("endTime", "");
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
      this.setInnerHTML("timediffer", "please enter time first");
      clearInterval(this.liveCalculatorInterval);
      return;
    } else {
      this.setInnerHTML("timediffer", '');
      var startHour, startMin, startSec, endHour, endMin, endSec;
      [startHour, startMin, startSec] = this.timeBreaker(this.startTime);
      [endHour, endMin, endSec] = this.timeBreaker(this.endTime);
      var ValidateResult = this.validateTime(startHour, startMin, startSec, endHour, endMin, endSec);
      if(!ValidateResult) {
        this.setInnerHTML("timediffer", 'incorrect timings, Starting Time cannot be greater than end time');
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
    this.setInnerHTML("timediffer", "time differnce is " + hourDiff + " hours and " + minDiff + " minutes " + secDiff + " seconds" )
  }

  validateTime(startHour:number, startMin:number, startSec:number, endHour:number, endMin:number, endSec:number): boolean {
    var timeIsValid = true;
    if ((startHour > endHour) || (startHour == endHour && startMin > endMin) || (startHour == endHour && startMin == endMin && startSec > endSec)) {
      timeIsValid = false;
      return timeIsValid;
    }

    return timeIsValid;
  }

  timeBreaker(time:string)
  {
    return ([parseInt(time.slice(0,2)), parseInt(time.slice(3,5)), parseInt((time.slice(6,8) == "") ? "0" : time.slice(6,8))])
  }

  resetCurrentTimer() {
    this.liveCurrentTime = false;
    clearInterval(this.currentTimeInterval);
    this.setInput("startTime", "");
  }

  resetDiffString() {
    this.setInnerHTML("timediffer", "");
  }

  currentTime() {
    var today = new Date();
    return (((today.getHours() < 10) ? "0" : "") + today.getHours() + ":" + ((today.getMinutes() < 10) ? "0" : "") + today.getMinutes()+ ':' + ((today.getSeconds() < 10) ? "0" : "") + today.getSeconds());
  }

  setInnerHTML(typeValue: string, value: string, type: string = "id") {
    switch(type) {
      case 'id': 
        document.getElementById(typeValue).innerHTML = value;
        break;
    }
  }

  setInput(typeValue: string, value: string, type: string = "id") {
    switch(type) {
      case 'id': 
        (<HTMLInputElement>document.getElementById(typeValue)).value = value;
        break;
    }
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