function compareTime(compareTimeBy, compareTimeTo, difference){
    const compareBy = new Date(compareTimeBy)
    const compareTo = new Date(compareTimeTo)
    if (compareBy.getFullYear()<compareTo.getFullYear)

    compareBy.setUTCHours(compareBy.getUTCHours() + parseInt(difference));

    if (compareBy.getUTCHours()<=compareTo.getUTCHours()){
        return true
    }
    else{
        return false
    }


}

// const temp=new Date()
// console.log(temp.getUTCHours())
// temp.setUTCHours(temp.getUTCHours() + 12);
// console.log(temp);
// console.log(temp.getUTCHours())
console.log(compareTime("2024-02-26T17:16:06.849Z","2024-02-18T12:00:36.638Z",24));
console.log(compareTime("2024-02-26T17:16:06.849Z", "2024-02-28T17:16:06.849Z", 24));
