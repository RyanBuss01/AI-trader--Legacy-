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

      getRSIS: function (closePrices, period) {
        let gain = 0, loss = 0;
        let rsis = [0]; // Assuming RSI is 0 for the first data point
        for (let i = 1; i < closePrices.length; i++) {
          const difference = closePrices[i] - closePrices[i - 1];
          if (difference >= 0) {
            gain = (gain * (period - 1) + difference) / period;
            loss = loss * (period - 1) / period;
          } else {
            gain = gain * (period - 1) / period;
            loss = (loss * (period - 1) - difference) / period;
          }
          const rs = gain / loss;
          const rsi = 100 - (100 / (1 + rs));
          rsis.push(rsi);
        }
        return rsis;
      },

      calculateATR: function (highPrices, lowPrices, closePrices, period) {
        let atr = [0];
        for (let i = 1; i < closePrices.length; i++) {
          const high = highPrices[i];
          const low = lowPrices[i];
          const closePrev = closePrices[i - 1];
          const tr = Math.max(high - low, Math.abs(high - closePrev), Math.abs(low - closePrev));
          const atrValue = ((atr[atr.length - 1] * (period - 1)) + tr) / period;
          atr.push(atrValue);
        }
        return atr;
      },
}

module.exports=toolsTA