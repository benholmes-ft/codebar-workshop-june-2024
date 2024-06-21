const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
app.use(express.static('public'));
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle socket.io events here
    socket.on('newMessage', (data) => {
        // Do something with the received message
        console.log('Received message:', data);
        io.emit('dispenseMessage', data);
    });

    socket.on('disconnect', () => {
        // Handle user disconnection
        console.log('A user disconnected');
    });
});

app.get('/', (req, res) => {
    // Send the HTML file as the response
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});