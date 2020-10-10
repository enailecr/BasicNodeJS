const { check } = require('express-validator');

class Livro {
    static validation() {
        return [
            check('titulo').isLength({ min: 5 }).withMessage('O título precisa de no mínimo 5 caracteres'),
            check('preco').isCurrency().withMessage('Preço precisa ser um valor monetário válido'),
        ]
    }
}

module.exports = Livro;