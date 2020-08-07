const express=require('express');
const app=express();const server=require('http').Server(app)
const io=require('socket.io')(server)
const {v4:uuidV4} = require('uuid')

app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.redirect(`/${uuidV4()}`)
    //8bf63bc1 - 857f - 4ac1 - 93cc - be86138746d0
  //  a2d5504a-ac19-4a9c-8a84-ef3fd6ad0475
})

app.get('/:room',(req,res)=>{
    res.render('room',{roomId:req.params.room})
})

io.on('connection',socket=>{
    socket.on('join-room',(roomId,userId)=>{
       // console.log(roomId,userId);
       socket.join(roomId)
       socket.to(roomId).broadcast.emit('user-connected',userId)

       socket.on('disconnect',()=>{
           socket.to(roomId).broadcast.emit('user-disconnected',userId)
       })
    })
})

server.listen(3000)