
let app = require('express')();
var bodyParser = require('body-parser'); 
var cors = require('cors');
let http = require('http').createServer(app);
let io = require('socket.io')(http);


let config = require('./config');

let setupRest = require('./restRoutes/_setupRestRoutes');
let setupSockets = require('./socketRoutes/_setupSocketRoutes')


app.use(bodyParser.json());
app.use(cors()); 

setupRest.setupRestRoutes(app);
setupSockets.setupSocketRoutes(io);

http.listen(config.socketPort, () => {
  console.log(`listening on *:${config.socketPort}`);
});