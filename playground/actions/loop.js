let masterBars = require('../../public/bars.json');
const masterBars2 = require('../../public/bars2.json');
const prompt = require('prompt-sync')();
const menu = require('../actions/menu')


masterBars.push(...masterBars2)


    var loop = async function (tickerList=masterBars) {

        console.log("\n-------------LOOP-------------\n")
        console.log(`Bars length: ${tickerList.length ?? 0}, Last update: ${tickerList.length>1? tickerList[0].bars.slice(-1)[0].Timestamp : ''}`)
        console.log("\n\nSelect menu or enter ticker symbol....\n\n0. End program \n1. Trends\n\n")
        let act = prompt("Select Menu: ")
        console.clear()
    
        switch (act) {
            case "0":  break;
            case "1": menu.trends(tickerList); break;
            // case "99" : tester.test(tickerList); break;
            default: {console.log("Not a valid action"); loop(tickerList)}
        }
    }

exports.loop=loop;