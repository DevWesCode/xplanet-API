const express = require('express')

class app {
    constructor(parameters) {
        this.app = express()

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json())
    }

    routes() {}
}

module.exports = new app().app