const { v4: uuid } = require('uuid');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UsuarioDao = require('../app/infra/usuario-dao');
const db = require('./database');

module.exports = (app) => {
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha',
        },
        (email, senha, done) => {
            const usuarioDAO = new UsuarioDao(db);
            usuarioDAO.buscaPorEmail(email)
                .then((user) => {
                    if (!user || senha !== user.senha) {
                        return done(null, false, {
                            msg: 'Login e senha incorretos',
                        })
                    }
                    return done (null, user);
                })
                .catch(error => done(error, false));
        }
    ));
    passport.serializeUser((user, done) => {
        const userSession = {
            name: user.nome_completo,
            email: user.email,
        }
        done(null, userSession);
    });

    passport.deserializeUser((userSession, done) => {
        done(null, userSession);
    });

    app.use(session({
        secret: 'nodeJS training',
        genid: (req) => {
            return uuid();
        },
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        req.passport = passport;
        next();
    })
}