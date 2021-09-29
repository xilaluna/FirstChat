$(document).ready(() => {
  const socket = io.connect()

  let currentUser

  $("#create-user-btn").click((e) => {
    e.preventDefault()
    if ($("#username-input").val().length > 0) {
      socket.emit("new user", $("#username-input").val())

      //set current user to username input
      currentUser = $("#username-input").val()

      $(".username-form").remove()
      // Have the main page visible
      $(".main-container").css("display", "flex")
    }
  })

  $("#send-chat-btn").click((e) => {
    e.preventDefault()
    let message = $("#chat-input").val()
    if (message.length > 0) {
      socket.emit("new message", {
        sender: currentUser,
        message: message,
      })
      $("#chat-input").val("")
    }
  })

  //socket listeners
  socket.on("new user", (username) => {
    console.log(`${username} has joined the chat`)
    // Add the new user to the online users div
    $(".users-online").append(`<div class="user-online">${username}</div>`)
  })

  socket.on("new message", (data) => {
    console.log(`📥 ${data.sender}: ${data.message}`)
    $(".message-container").append(`
    <div class="message">
      <p class="message-user">${data.sender}: </p>
      <p class="message-text">${data.message}</p>
    </div>`)
  })
})
