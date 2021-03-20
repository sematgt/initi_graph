const data = {
    "AAPL": {
        "meta": {
            "symbol": "AAPL",
            "currency": "USD",
        },
        "values": getRandomValues(1500),
    },
    "MSFT": {
        "meta": {
            "symbol": "MSFT",
            "currency": "USD",
        },
        "values": getRandomValues(1500),
    },
    "NKE": {
        "meta": {
            "symbol": "NKE",
            "currency": "USD",
        },
        "values": getRandomValues(1500),
    },
}

function getRandomValues(n) {
    
    const formatDate = date => date.toISOString().slice(0,-5).split("T").join(" "); // format to "YYYY-MM-DD HH:MM:SS";

    let date = new Date();
    let values = [{
        "datetime": formatDate(date),
        "value": +(Math.random() * 100).toFixed(2), // random initial value, toFixed(2) is used to get rid of accuracy loss
    }];

    for (let i = 1; i < n; i++) {
        date.setMinutes(date.getMinutes() + 1); // increment datetime by 1 minute
        let sign = Math.random() > 0.5 ? 'plus' : 'minus'; // random sign

        values.push({
            "datetime": formatDate(date),
            "value": sign === 'plus' 
            ? +(values[i - 1].value + Math.random()).toFixed(2) 
            : +(values[i - 1].value - Math.random()).toFixed(2) // previous value plus random value with random sign
        });
    }
    
    return values;
}

export default data;