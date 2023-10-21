const Alpaca = require("@alpacahq/alpaca-trade-api");
const alpaca = new Alpaca({
    keyId: 'PK14W8C1WXHRFGL8WT97', 
    secretKey: 'NGCSxmxzwdOTHCDVvr0Gyl5n6Vl2hrY5ngE5y5V8', 
    paper: true,
  });

  module.exports=alpaca