const livrosRoutes = require('./livrosRoutes')
const baseRoutes = require('./baseRoutes')

module.exports = (app) => {
    baseRoutes(app);
    livrosRoutes(app); 
}