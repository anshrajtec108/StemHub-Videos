function compareTime(compareTimeBy, compareTimeTo, difference){
    const compareBy = new Date(compareTimeBy)
    const compareTo = new Date(compareTimeTo)
    compareBy.setUTCHours(compareBy.getUTCHours() + parseInt(difference));
    if (((compareBy.getUTCHours()) > (compareTo.getUTCHours()))){
        return true
    }
    else{
        return false
    }
}

// console.log(compareTime("2024-02-26T17:16:06.849Z","2024-02-26T16:15:06.849Z",24));
export{
    compareTime
}