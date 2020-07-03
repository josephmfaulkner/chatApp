const roomRouter = require('./roomRestRoutes');

exports.setupRestRoutes = function(app){
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    app.use('/room', roomRouter);
}
