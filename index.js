const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    socket.on('set-data',(data)=>{
        io.emit('get-data', data)
    })
})
app.get('/', (req, res)=>{
    res.status(200).send('hello worldss')
})
console.log('connected')
// io.listen(5505, ()=>{
//     console.log('server running')
// })
server.listen(3000, ()=>{
    console.log('server running')

})