const express = require('express');
const path = require('path');
const compress = require('compression');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const socketListener = require('./socketlistener');

const app = express();
const server = createServer(app);
const io = new Server(server);


io.on("connection", socketListener)

app.set('port', process.env.PORT || 8080)
app.set('bind-address', process.env.BIND_ADDRESS || 'localhost')
app.set('views', path.join(__dirname, '/views'))


app.use(compress())






// app.get('/',(req, res) => {
//     res.end("Hello")
// })


app.use(express.static(path.resolve(__dirname, './client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});


io.on('connection', socketListener);

// app.use(serveStatic(path.join(__dirname, '/public')))


server.listen({port: app.get('port'),
               host: app.get('bind-address')}, () => {
    console.log('Express server listening on port ' + app.get('port'))
    console.log('on bind address:', app.get('bind-address'))
  });