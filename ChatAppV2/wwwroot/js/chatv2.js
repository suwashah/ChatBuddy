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

jQuery(document).ready(function () {

    $(".chat-list a").click(function () {
        $(".chatbox").addClass('showbox');
        return false;
    });

    $(".chat-icon").click(function () {
        $(".chatbox").removeClass('showbox');
    });


});
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
    chatList.className = isCurrentUserMessage ? "reply" : "sender";;
    
    var currentdate = new Date();        
    let when = document.createElement('span');
    when.className = "time";
    var uname=
    when.innerHTML = (currentdate.getMonth() + 1) + "/"
        + currentdate.getDate() + "/"
        + currentdate.getFullYear() + " "
        + currentdate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    let text = document.createElement('p');
    text.className = "text-left";
    text.innerHTML = message.text;

      chatList.appendChild(text);
    chatList.appendChild(when);
    chat.appendChild(chatList);

}
