import data from './data';
import './timeSeries.css';

class Model {
    constructor(data) {
        this.state = data;
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
        ['1m', '5m', '15m', '1H', '4H', '1D', '1W'].forEach(timeStep => {
            const link = this.createElement('a', {
                'class': 'timeStep',
                'id': timeStep,
            });
            link.innerText = timeStep;
            this.timeStepNav.append(link);
        });
        this.scaleNav = this.createElement('div', {'class': 'scaleNav'});
        ['-', '+', '<', '>'].forEach(symbol => {
            const link = this.createElement('button', {
                'class': 'scaleNav',
                'id': symbol,
            });
            link.innerText = symbol;
            this.scaleNav.append(link);
        });

        // diagrams
        this.navigation.append(this.timeStepNav, this.scaleNav);
        this.card.append(this.header, this.navigation);
        this.app.append(this.card);
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
    }
}

const app = new Controller(new Model(data), new View());

console.log(app.model.state);