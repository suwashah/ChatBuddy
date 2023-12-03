class Message {
    constructor(username, text, when) {
        this.userName = username;
        this.text = text;
        this.when = when;
    }
}

// userName is declared in razor page.
const username = userName;
const textInput = document.getElementById('messageText');
const whenInput = document.getElementById('when');
const chat = document.getElementById('chat');
const messagesQueue = [];

document.getElementById('submitButton').addEventListener('click', () => {
    var currentdate = new Date();
    when.innerHTML =
        (currentdate.getMonth() + 1) + "/"
        + currentdate.getDate() + "/"
        + currentdate.getFullYear() + " "
        + currentdate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
});

function clearInputField() {
    messagesQueue.push(textInput.value);
    textInput.value = "";
}

function sendMessage() {
    let text = messagesQueue.shift() || "";
    if (text.trim() === "") return;

    let when = new Date();
    let message = new Message(username, text);
    sendMessageToHub(message);
}

function addMessageToChat(message) {
    let isCurrentUserMessage = message.userName === username;
    let chatList = document.createElement('li');
    chatList.className = "clearfix";
    let container = document.createElement('div');
    container.className = isCurrentUserMessage ? "message-data text-right" : "message-data";
    var currentdate = new Date();
    var wh =
        (currentdate.getMonth() + 1) + "/"
        + currentdate.getDate() + "/"
        + currentdate.getFullYear() + " "
        + currentdate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    let sender = document.createElement('span');
    sender.className = "message-data-time";
    sender.innerHTML = message.userName;

    let text = document.createElement('div');
    text.className = isCurrentUserMessage ? "message other-message float-right" : "message my-message";
    text.innerHTML = message.text;
    let img = document.createElement('img');
    img.src = "https://bootdey.com/img/Content/avatar/avatar7.png";
    img.alt ="avatar"  

    container.appendChild(sender);
    if (isCurrentUserMessage) {
        container.appendChild(img);
    }
    chatList.appendChild(container);
    chatList.appendChild(text);
    chat.appendChild(chatList);

}
