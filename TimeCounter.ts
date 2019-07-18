class timeDiffgetter {
  startTime: string = '';
  endTime: string = '';
  liveCurrentTime: boolean = true;
  currentTimeInterval;

 public currentTimeFillMethod():void {
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
  }
  resetCurrentTimer() {
    this.liveCurrentTime = false;
    clearInterval(this.currentTimeInterval);
    this.setInput("startTime", "");
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
  console.log("timeDiff");
}

const reset = () => {
  timeDiffObj.reset();
}