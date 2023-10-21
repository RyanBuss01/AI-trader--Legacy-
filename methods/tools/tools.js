var tools = {

    pDiff: function (a, b) {
        var difference = Number(b) - Number(a);
        var percentage = (difference / Number(a)) * 100;
        return Number(percentage.toFixed(2));
    },

    isString: function (str) {
        return /^[a-zA-Z]+$/.test(str);
    },

}

module.exports=tools