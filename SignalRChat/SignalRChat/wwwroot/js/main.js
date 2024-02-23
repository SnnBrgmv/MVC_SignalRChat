let connection = new signalR.HubConnectionBuilder().withUrl("/chathub").build();
let send = document.querySelector(".send");

connection.start().then(function () {
    console.log("SignalR Connected");
}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("ReceiveMessage", function (user, message) {
    var encodedMessage = user + ": " + message;
    var li = document.createElement("li");
    li.textContent = encodedMessage;
    document.getElementById("messagesList").appendChild(li);
});

function sendMessage() {
    var user = document.getElementById("userInput").value;
    var messageInput = document.getElementById("messageInput");

    var message = messageInput.value.trim();

    if (!message) {
        console.error("Message is empty or contains only whitespaces");
        return;
    }

    connection.invoke("SendMessage", user, message).catch(function (err) {
        console.error(err.toString());
    });


    messageInput.value = '';
}

send.addEventListener("click", sendMessage)