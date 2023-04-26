/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
 const createEmployeeRecord = (recordArr) => {
    return {
        firstName: recordArr[0],
        familyName: recordArr[1],
        title: recordArr[2],
        payPerHour: recordArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (recordsArr) => {
    return recordsArr.map(record => createEmployeeRecord(record))
}

const createTimeInEvent = function(dateStamp){
    const [date, hour] = dateStamp.split(' ')
    const inEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    }
    this.timeInEvents.push(inEvent)
    //console.log('this:', this)
    return this
}

const createTimeOutEvent = function(dateStamp){
    const [date, hour] = dateStamp.split(' ');
    const outEvent = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    }
    this.timeOutEvents.push(outEvent)
    //console.log('this :', this)
    return this
}

const hoursWorkedOnDate = function(dateTarget) {
    const inEvent = this.timeInEvents.find(inEvent => inEvent.date === dateTarget)
    const outEvent = this.timeOutEvents.find(outEvent => outEvent.date === dateTarget)
    // console.log("inEvent date:", inEvent)
    // console.log("outEvent date:", outEvent)
    return ((outEvent.hour - inEvent.hour) / 100);
}

const wagesEarnedOnDate = function(dateTarget) {
    return hoursWorkedOnDate.call(this, dateTarget) * this.payPerHour; 
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName)
}

const calculatePayroll = function(recordsArr) {
    return recordsArr.reduce((total, record) => {
        return total + allWagesFor.call(record)
    }, 0)
}