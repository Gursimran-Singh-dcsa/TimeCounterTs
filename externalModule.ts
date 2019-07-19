namespace externalModule {
  export class externalFunctions {
    timeBreaker(time:string)
    {
      return ([parseInt(time.slice(0,2)), parseInt(time.slice(3,5)), parseInt((time.slice(6,8) == "") ? "0" : time.slice(6,8))])
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

    validateTime(startHour:number, startMin:number, startSec:number, endHour:number, endMin:number, endSec:number): boolean {
      var timeIsValid = true;
      if ((startHour > endHour) || (startHour == endHour && startMin > endMin) || (startHour == endHour && startMin == endMin && startSec > endSec)) {
        timeIsValid = false;
        return timeIsValid;
      }
      return timeIsValid;
    }

  }
}