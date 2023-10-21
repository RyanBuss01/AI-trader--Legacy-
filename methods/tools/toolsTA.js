var toolsTA = {
    getEMA : function (data, period) {
        const smoothingFactor = 2 / (period + 1);
      
        // Calculate the initial SMA
        const initialSMA = data.slice(0, period).reduce((sum, price) => sum + price, 0) / period;
      
        // Calculate the initial EMA using SMA
        let previousEMA = initialSMA;
      
        // Calculate EMA for the remaining prices
        for (let i = period; i < data.length; i++) {
          const currentPrice = data[i];
          const ema = (currentPrice * smoothingFactor)  + (previousEMA * (1 -smoothingFactor));
          previousEMA = ema;
        }
      
        return previousEMA;
      },

      volumeBreak: function (volumes, thres) {
        const rsivol = this.getRSIS(volumes, 14);
        const osc = rsivol[rsivol.length - 1];  // Assuming HMA is equal to last RSI value for simplicity
        return osc > thres;
      },
      
      volatilityBreak: function (highPrices, lowPrices, closePrices, volmin, volmax) {
        const atrMin = this.calculateATR(highPrices, lowPrices, closePrices, volmin);
        const atrMax = this.calculateATR(highPrices, lowPrices, closePrices, volmax);
        return atrMin[atrMin.length - 1] > atrMax[atrMax.length - 1];
      },
}

module.exports=toolsTA