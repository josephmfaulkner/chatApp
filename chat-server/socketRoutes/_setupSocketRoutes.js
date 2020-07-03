exports.setupSocketRoutes = function(io)
{   
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('message', (data) => {
            console.log(data);
            socket.emit('new-message', data);
            io.emit('new-message', data);
        });
    });
}