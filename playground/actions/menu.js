const prompt = require('prompt-sync')();
const l = require('./loop')
const trend = require('../methods/trend');


menu = {
    trends: function(tickerList) {
        console.log("Select Alert... \n\n1. preSet 1  \n") // collects tickers over a set dollar amount
        let act = prompt("Select Menu: ")
        console.clear()


        switch (act) {
            case "1" : trend.preSet1(tickerList); break;
            default: {console.log("Not a valid action"); l.loop()}
        }
    },


   
}

module.exports=menu