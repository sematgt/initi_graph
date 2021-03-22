import data from './data';
import './timeSeries.css';
import deepClone from './helpers';

class Model {
    constructor() {
        this.data = this.fetchData();
    }

    reloadData(from, to) {
        this.data = this.fetchData(from, to);
    }

    fetchData(from, to) {
        if (!from || !to) return data;

        let newData = deepClone(data);
        for (let key of Object.keys(newData)) {
            newData[key] = newData[key].filter(el => el.datetime >= from && el.datetime <= to);
        }

        return newData;
    }

    getMinValue() {
        let min;

        for (let key of Object.keys(this.data)) {
            this.data[key].forEach(el => {
                if (min === undefined) {
                    min = el.value;
                    return;
                } else {
                    if (el.value < min) {
                        min = el.value;
                    }
                }
            })
        }

        return min;
    }

    getMaxValue() {
        let max;

        for (let key of Object.keys(this.data)) {
            this.data[key].forEach(el => {
                if (max === undefined) {
                    max = el.value;
                    return;
                } else {
                    if (el.value > max) {
                        max = el.value;
                    }
                }
            })
        }

        return max;
    }
}

class View {
    constructor() {

        // The root element
        this.app = this.getElement('#timeSeries');

        // wrapper
        this.card = this.createElement('article', {
            'class': 'card',
        });

        // header
        this.header = this.createElement('header');
        this.header.innerText = 'vm01: CPU Temperature All Cores';

        // navigation bar
        this.navigation = this.createElement('nav');
        this.timeStepNav = this.createElement('div', {'class': 'timeStepNav'});
        [['1m', 60], ['5m', 60*5], ['15m', 60*15], ['1H', 60*60], ['4H', 60*60*4], ['1D', 60*60*24], ['1W', 60*60*24*7]]
        .forEach(([timeStep, seconds]) => {
            const link = this.createElement('a', {
                'class': 'timeStep',
                'id': timeStep,
                'seconds': seconds,
            });
            link.innerText = timeStep;
            this.timeStepNav.append(link);
        });
        this.timeStepNav.firstChild.classList.add('active'); // make '1m' timeStep active
        this.scaleNav = this.createElement('div', {'class': 'scaleNav'});
        ['-', '+', '<', '>'].forEach(symbol => {
            const link = this.createElement('button', {
                'class': 'scale',
                'id': symbol,
            });
            link.innerText = symbol;
            this.scaleNav.append(link);
        });

        // Charts
        this.charts = this.createElement('section', {'class': 'timeSeries'});
        this.canvas = this.createElement('canvas', {
            'width': '90%',
            'height': '90%',
        });
        const ctx = this.canvas.getContext('2d');
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(10, 10, 100, 100);

        this.charts.append(this.canvas);

        // footer
        this.footer = this.createElement('footer');
        this.footer.innerText = 'footer';

        this.navigation.append(this.timeStepNav, this.scaleNav);
        this.card.append(this.header, this.navigation, this.charts, this.footer);
        this.app.append(this.card);
    }

    // handlers

    bindTimeStepChange(handler) {
        for (let link of this.timeStepNav.childNodes) {
            link.addEventListener("click", event => {
                for (let el of event.target.parentNode.querySelectorAll('a.timeStep')) {
                    el.classList.remove('active');
                }
                
                event.target.classList.add('active');

                handler(event.target.getAttribute('seconds'));
            })
        }
    }

    bindZoomChange(handler) {
        this.canvas.addEventListener('wheel', event => {
            if (event.deltaY < 0) { // scrolling up
                handler('zoomIn');
            } else if (event.deltaY > 0) { // scrolling down
                handler('zoomOut');
            }
        });
    }

    bindMoveLeft(handler) {

    }

    bindMoveRight(handler) {

    }


    // render

    drawCharts(timeStep, endDateTime, startDateTime, data, minValue, maxValue) {
        console.log('rendering. state is', arguments);
    }

    // helper functions
    getElement(selector) {
        return document.querySelector(selector);
    }
    // creating an element and setting attributes from the object
    createElement(tag, attrs) {
        const element = document.createElement(tag);
        
        if (attrs) {
            for (let attr of Object.keys(attrs)) {
                element.setAttribute(attr, attrs[attr]);
            }
        }

        return element;
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // settings 
        this.settings = {
            MAX_VALUE_CELL_UNITS: 12,
            MIN_VALUE_CELL_UNITS: 8,
            MAX_TIME_CELL_UNITS: 20,
            MIN_TIME_CELL_UNITS: 10,
        };

        // state
        this.timeStep = '60'; // in seconds
        this.endDateTime = new Date();
        this.startDateTime = new Date(this.endDateTime.getTime() - 30 * this.timeStep * 1000),

        this.view.bindTimeStepChange(this.handleTimeStepChange);
        this.view.bindZoomChange(this.handleZoomChange);
    }

    handleTimeStepChange = timeStep => {
        if (this.timeStep === timeStep) return; // no rerender on equal timeStep

        this.timeStep = timeStep;
        this.endDateTime = new Date();
        this.startDateTime = new Date(this.endDateTime.getTime() - 30 * this.timeStep * 1000);
        this.model.reloadData(this.startDateTime, this.endDateTime) // fetch from API
        this.minValue = this.model.getMinValue();
        this.maxValue = this.model.getMaxValue();
        this.view.drawCharts(this.timeStep, this.endDateTime, this.startDateTime, this.model.data, this.minValue, this.maxValue);
    }

    handleZoomChange = (direction) => {
        if (direction === 'zoomIn') {
            // if (this.
        } else if (direction === 'zoomOut') {

        }
    }
}

const app = new Controller(new Model(), new View());


// debug 

console.log(app.model.data);