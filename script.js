import data from './data';

class Model {
    constructor(data) {
        this.state = data;
    }
}

class View {
    constructor() {}
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
}

const model = new Model(data);

const app = new Controller(new Model(), new View());


console.log(model.state);