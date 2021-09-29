//app.js
const express = require("express")
const app = express()
const server = require("http").Server(app)

//Socket.io
const io = require("socket.io")(server)
let onlineUsers = {}
//Save the channels in this object.
let channels = { General: [] }

io.on("connection", (socket) => {
  // Make sure to send the channels to our chat file
  require("./sockets/chat.js")(io, socket, onlineUsers, channels)
})

//handlebars
const exphbs = require("express-handlebars")
app.engine("handlebars", exphbs())
app.set("view engine", "handlebars")

app.use("/public", express.static("public"))

app.get("/", (req, res) => {
  res.render("index")
})

server.listen("3000", () => {
  console.log("Server listening on Port 3000")
})
