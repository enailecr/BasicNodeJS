class BaseController {
    home() {
        return (req, res) => {
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
        }
    }
}

module.exports = BaseController;