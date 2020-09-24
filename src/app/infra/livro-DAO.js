class LivroDAO {
    constructor(db) {
        this._db = db;
    }

    list() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM LIVROS',
                (error, result) => {
                    if (error) return reject('Unsuccessfull');
                    return resolve(result);
                }
            )

        });
    }

    add(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO LIVROS (
                    titulo,
                    preco,
                    descricao
                ) values (?, ?, ?)
            `,
            [
                livro.titulo,
                livro.preco,
                livro.descricao
            ],
            (error) => {
                if (error) {
                    console.log(err);
                    return reject('Não foi possível adicionar o livro!');
                }
                resolve();
            })
        })
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                DELETE FROM LIVROS
                WHERE
                    ID = ?
                `,
                [id],
                (error) => {
                    if (error) {
                        console.log(err);
                        return reject('Não foi possível remover o livro!');
                    }
                    resolve();
                }
            )
        });
    }

    edit(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE LIVROS SET
                    titulo = ?,
                    preco = ?,
                    descricao = ?
                WHERE
                    id = ?
            `,
            [
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ],
            (error) => {
                if (error) {
                    console.log(err);
                    return reject('Não foi possível editar o livro!');
                }
                resolve();
            })
        })
    }

    searchById(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                'SELECT * FROM LIVROS WHERE ID = ?',
                [id],
                (error, result) => {
                    if (error) return reject('Unsuccessfull');
                    return resolve(result);
                }
            )

        });
    }
}

module.exports = LivroDAO;