const LivroDAO = require('../infra/livro-DAO');
const db = require('../../config/database');

module.exports = (app) => {

    app.get('/', (req, res) => {
        html = `
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                <h1> Casa do Código </h1>
            </body> 
        </html>
        `;
        res.send(html)
    });
    
    app.get('/livros', (req, res) => {
        const livroDAO = new LivroDAO(db);
        livroDAO.list()
            .then(livros => res.marko(
                require('../views/livros/lista/lista.marko'),
                {
                    livros,
                }
            ))
            .catch(error => console.log(error));
    }); 

    app.get('/livros/form', (req, res) => {
        res.marko( require('../views/livros/form/form.marko'), { livro: {} });
    });

    app.post('/livros', (req, res) => {
        const livroDAO = new LivroDAO(db);
        livroDAO.add(req.body)
            .then(res.redirect('/livros'))
            .catch(error => console.log(error));
    });

    app.delete('/livros/:id', (req, res) => {
        const { id } = req.params;

        const livroDAO = new LivroDAO(db);
        livroDAO.remove(id)
            .then(() => res.status(200).end())
            .catch(erro => console.log(erro))
    });

    app.get('/livros/form/:id', function(req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDAO(db);
    
        livroDao.searchById(id)
            .then(livro => 
                resp.marko(
                    require('../views/livros/form/form.marko'),
                    { livro }
                )
            )
            .catch(erro => console.log(erro));
    
    });

    app.put('/livros', (req, res) => {
        const livroDAO = new LivroDAO(db);
        livroDAO.edit( req.body)
            .then(res.redirect('/livros'))
            .catch(error => console.log(error));
    });
}