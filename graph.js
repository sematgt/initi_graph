import data from './data';


class Model {
    constructor(data) {
        this.state = data;
    }
}

class View {
    constructor() {
        // The root element
        this.app = this.getElement('#graph');

        this.card = this.createElement('article', {
            'class': 'card',
        });


    }

    // helper functions
    getElement(selector) {
        return document.getElementById(selector);
    }
    // creating an element and setting an attributes from object
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