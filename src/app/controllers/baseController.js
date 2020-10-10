const templates = require('../views/templates');

class BaseController {
    home() {
        return (req, resp) => {
            resp.marko(
                templates.base.home
            );
        };
    }
}

module.exports = BaseController;