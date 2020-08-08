const { Socket } = require('dgram')
const { emit } = require('process')

const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})

io.on('connection', (socket) => {
    console.log('nova conexão: ', socket.id)
    socket.on('msg', (msg)=> {
        console.log(msg)
        socket.broadcast.emit('msg', msg)
    })
})

http.listen(3355, function(){
    console.log('RODANDO NA PORTA 3355')
})