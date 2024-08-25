const { log } = require('console')
const express = require('express')
const app = express()
const path = require('path')
const { Socket } = require('socket.io')
const PORT = process.env.PORT || 4000
const server = app.listen(PORT,() => console.log(`chat server on port ${PORT}`))

//express ke shat socket io ko attach
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname,'public')));

//io socket handle
let socketsconected = new Set()

//SOCKET.IO CONNECTION



//socket enent 
io.on('connection',onConnected)

function onConnected(socket){
    console.log(socket.id);
    socketsconected.add(socket.id)

    io.emit('clients-total',socketsconected.size)


    socket.on('disconnect',()=>{
        console.log('Socket disconnected',socket.id)
        socketsconected.delete(socket.id)
        io.emit('clients-total',socketsconected.size)

    })

    socket.on('message',(data)=>{
        console.log(data);
        socket.broadcast.emit('chat-message',data)
    })
}