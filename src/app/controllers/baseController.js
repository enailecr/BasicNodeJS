const templates = require('../views/templates');
const LivrosController = require('./livrosController');

class BaseController {
    home() {
        return (req, resp) => {
            resp.marko(
                templates.base.home
            );
        };
    }

    login() {
        return function(req, resp) {
            resp.marko(templates.base.login);
        };
    }

    doLogin() {
        return (req, res, next) => {
            const { passport } = req;
            passport.authenticate('local', (error, user, errorMsg) => {
                if (errorMsg) return res.marko(templates.base.login);
                if (error) return next(error);

                req.login(user, (error) => {
                    if (error) return next(error);

                    return res.redirect(LivrosController.routes().lista);
                });
            })(req, res, next);
        }
    }
}

module.exports = BaseController;