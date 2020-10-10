const LivrosController = require('../controllers/livrosController');
const livrosController = new LivrosController();
const Livro = require('../models/livro');

module.exports = (app) => {
    app.get(LivrosController.routes().lista, livrosController.list()); 
    app.route(LivrosController.routes().cadastro)
        .get(livrosController.form())
        .post(Livro.validation(), livrosController.add())
        .put(livrosController.edit());
    app.delete(LivrosController.routes().delecao, livrosController.delete());
    app.get(LivrosController.routes().edicao, livrosController.get());
}