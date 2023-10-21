var ta = {
    singleTicker: async function(tickerList, tInput='') {
        let bars, index, ticker = 'AAPL'
        if(tInput!='') ticker=tInput
        else {
          let t = prompt("Enter Ticker (AAPL): ")
          if(t!='') ticker=t
          console.clear()
        }
  
          let element = tickerList.find(e=>e.ticker==ticker.toUpperCase())
          if(element) {
          bars = element.bars
          index = element.index
          }
          else {
            bars = await funcsAlpaca.getBars(alpaca=alpacaR, ticker, {})
            if(bars) console.log(bars.length)
            else console.log("'bars' is not defined")
            index='None'
          }
          let json = toolsTA.getStockJson(bars, ticker, {override:true, index:index, optimize:false})
    
          // console.log({bars: bars.slice(0,-(14)).slice(-14).map(b=>b.Timestamp), nextdays : bars.slice(-(14)).map(b=>b.Timestamp)})
          console.log(json)
  
          if(element) a.actions.selectedActions(json, bars)
          else a.actions.menuLoop(tickerList)
      },
}