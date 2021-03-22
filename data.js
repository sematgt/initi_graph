const data = {
    "CPU1": getRandomValues(1500),
    "CPU2": getRandomValues(1500),
    "CPU3": getRandomValues(1500),
    "CPU4": getRandomValues(1500),
};

function getRandomValues(n) {
    
    const formatDate = date => date.toISOString().slice(0,-5).split("T").join(" "); // format to "YYYY-MM-DD HH:MM:SS";

    let date = new Date();
    let newDate = new Date(date);
    let values = [{
        "datetime": date,
        "value": +(Math.random() * 100).toFixed(2), // random initial value, toFixed(2) is used to get rid of accuracy loss
    }];

    for (let i = 1; i < n; i++) {
        newDate = new Date(newDate - 1000*60); // decrement datetime by 1 minute
        let sign = Math.random() > 0.5 ? 'plus' : 'minus'; // random sign

        values.push({
            "datetime": newDate,
            "value": sign === 'plus' 
            ? +(values[i - 1].value + Math.random()).toFixed(2) 
            : +(values[i - 1].value - Math.random()).toFixed(2) // previous value plus random value with random sign
        });
    }
    
    return values;
}

export default data;