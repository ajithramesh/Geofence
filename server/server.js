const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ajithbabu:subathra15@cluster0.edne8.mongodb.net/truss?retryWrites=true&w=majority')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

const userController = require('./controller/user.controller')

server = app.listen(process.env.PORT || 4000)
const socket = require('socket.io')
io = socket(server)

let userNameToSocketId = {}

io.on('connection', (socket) => {
    socket.on("JOINING", (data) => {
        userNameToSocketId[data] = socket.id
        // alert system controller here
    })

    userController(app, io);
})