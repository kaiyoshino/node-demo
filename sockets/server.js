/*
    server.js
    main server script for the socket.io chat demo
*/

var net = require('net');

var server = net.createServer();

server.on('connection', function(socket) {
    var name;

    function broadcast(name, message) {
        clients.forEach(function(client) {
            if (client != socket) {
                client.write('[' + name + '] ' + message);
            }
        })
    };

    clients.push(socket);

    console.log('new connection');

    socket.write('WHO ARE YOU\n')

    socket.write('GIVE ME YOUR IDENTITY\n')

    socket.on('data', function(data) {
        if (!name) {
            name = data.toString();
            socket.write('HELLO' + name + '\n');
        }
        else {
            broadcast(name, data.toString());
        }
    });

    socket.on('close', function() {
        console.log('connection closed');
    })

    socket.end();
})

server.on('listening', function() {
    console.log('server listening...');
})

server.listen(3000);