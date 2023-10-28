const tools = require('../../methods/tools/tools');
const toolsKNN = require('../../methods/tools/toolsKNN');
const toolsTA = require('../../methods/tools/toolsTA');

var trend = {
    preSet1: function (tickerList) {
        let resList = []
        for (let t of tickerList) {
            let bars = t.bars, sym = t.ticker;
            if(bars.length <= 200) continue;
            let closes = bars.map(b=>b.ClosePrice)
            let ema = {
                _20: toolsTA.getEMA(closes, 20),
                _50: toolsTA.getEMA(closes, 50),
                _100: toolsTA.getEMA(closes, 100),
                _200: toolsTA.getEMA(closes, 200)
            }

            if(this.preSet1Filter(bars, ema)) {
                let trend = bars[bars.length-1]>ema._200? "Bullish" : "Bearish"
                resList.push({sym, trend})
            }
        }
        for(r of resList) console.log(r)
    },

    preSet1Filter: (bars, ema) => {
        let close = bars[bars.length-1].ClosePrice
        let closes = bars.map(b=>b.ClosePrice)
        let isBuySignal = (close>ema._200)

        let bullish = (close>ema._20 && close>ema._50 && close>ema._100 && close>ema._200) 
        let bearish = (close<ema._20 && close<ema._50 && close<ema._100 && close<ema._200)
        if(!bullish && !bearish) return false;

        const filterVolatility = toolsTA.volatilityBreak(bars.map(b=>b.HighPrice), bars.map(b=>b.LowPrice), bars.map(b=>b.ClosePrice), 1, 10);
        if(!filterVolatility) return false;

        const filterVolume = toolsTA.volumeBreak(bars.map(b=>b.Volume), 49);
        if(!filterVolume) return false;

        let emaFilter = toolsKNN.emaFilter(bars, isBuySignal ? "Bullish" : "Bearish")
        if(!emaFilter) return false;

        let sidewaysFilter = toolsKNN.filter(bars)
        if(sidewaysFilter) return false;

        let monthChange = tools.pDiff(bars[bars.length-22].ClosePrice, close)
        let weekChange = tools.pDiff(bars[bars.length-6].ClosePrice, close)

        let movement = (bullish && monthChange > 20 &&weekChange>5) ||
        (bearish && monthChange < -20 &&weekChange <-5)
        if(!movement) return false;



        let steps=0
        for(let i=1; i<40; i++) {
            if(bullish && closes[closes.length-i]> closes[closes.length-(i+1)]) steps++
            if(bearish && closes[closes.length-i]< closes[closes.length-(i+1)]) steps++
        }

        if(steps<24) return false;


        return true
    }
}

module.exports=trend