const { validationResult } = require('express-validator');

const LivroDAO = require('../infra/livro-DAO');
const db = require('../../config/database');

const templates = require('../views/templates');

class LivrosController {

    static routes() {
        return {
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id'
        }
    }

    list() {
        return (req, res) => {
            const livroDAO = new LivroDAO(db);
            livroDAO.list()
                .then(livros => res.marko(
                    templates.livros.list,
                    {
                        livros,
                    }
                ))
                .catch(error => console.log(error));
        }
    }

    add() {
        return (req, res) => {
            const livroDAO = new LivroDAO(db);
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.marko(
                    templates.livros.form,
                    {
                        livro: req.body,
                        errors: errors.array(),
                    }
                );
            }

            livroDAO.add(req.body)
                .then(res.redirect(LivrosController.routes().lista))
                .catch(error => console.log(error));
        }
    }

    delete() {
        return (req, res) => {
            const { id } = req.params;
    
            const livroDAO = new LivroDAO(db);
            livroDAO.remove(id)
                .then(() => res.status(200).end())
                .catch(erro => console.log(erro))
        }
    }

    get() {
        return (req, resp) => {
            const id = req.params.id;
            const livroDao = new LivroDAO(db);
        
            livroDao.searchById(id)
                .then(livro => 
                    resp.marko(
                        templates.livros.form,
                        { livro }
                    )
                )
                .catch(erro => console.log(erro));
        
        }
    }

    edit() {
        return (req, res) => {
            const livroDAO = new LivroDAO(db);
            livroDAO.edit( req.body)
                .then(res.redirect(LivrosController.routes().lista))
                .catch(error => console.log(error));
        }
    }

    form() {
        return (req, res) => {
            res.marko( templates.livros.form, { livro: {} });
        }
    }
}

module.exports = LivrosController;