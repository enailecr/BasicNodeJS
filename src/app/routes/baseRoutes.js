const BaseController = require('../controllers/baseController');
const baseController = new BaseController();

module.exports = (app) => {
    app.get('/', baseController.home());
    app.get('/login', baseController.login());
    app.post('/login', baseController.doLogin());
}