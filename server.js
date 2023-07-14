const express = require("express");
const app = express();

// Creating server vie express
const http = require("http").createServer(app)
http.listen(3000, ()=>{
    console.log("Lisning on port 3000" );
})

// In order to tell express where our files present
app.use(express.static(__dirname + "/public"))

// Home page
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})


// Stablizing Socket

const io = require("socket.io")(http)

// When someone connect on "127.0.0.1:3000"
io.on("connection",(socket)=>{

    // Receving user-name comes from client
    socket.on("username",(name)=>{

        // Sending username to client
        socket.broadcast.emit("user",name)
    })

    // Receving message comes from client
    socket.on("messsage01",(msg)=>{

        // We need to brodcast this message to everyone expect me in all devices which is connect to this server
        socket.broadcast.emit("message02",msg)
    })
})