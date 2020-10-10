const BaseController = require('../controllers/baseController');
const baseController = new BaseController();

module.exports = (app) => {
    app.get('/', baseController.home());
}