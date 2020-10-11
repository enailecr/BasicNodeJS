const BaseController = require('../controllers/baseController');
const LivrosController = require('../controllers/livrosController');
const livrosController = new LivrosController();
const Livro = require('../models/livro');

module.exports = (app) => {
    const livrosRoutes = LivrosController.routes();

    app.use(livrosRoutes.autenticadas, (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/login');
        }
    })

    app.get(livrosRoutes.lista, livrosController.list()); 
    app.route(livrosRoutes.cadastro)
        .get(livrosController.form())
        .post(Livro.validation(), livrosController.add())
        .put(livrosController.edit());
    app.delete(livrosRoutes.delecao, livrosController.delete());
    app.get(livrosRoutes.edicao, livrosController.get());
}