// io function comes from index.html file
const socket = io();

// Until we don't have user-name
let name;
do {
    name = prompt("Your name ? ")
} while (!name)
socket.emit("username",name)

// Selecting buttons and text-area
let submit_Btn = document.querySelector("#submitbtn")
let message_area = document.querySelector(".message_area")

// When you click on button and press enter
submit_Btn.addEventListener("click", (event) => {

    // Prevent reloding, when you click on button
    event.preventDefault();

    // Getting message from input box
    let textarea = document.getElementById("textarea");
    let message = textarea.value;

    // Cheacking message is it in or not
    if (!message) {
        return
    } else {

        // Send message
        sendMessage(message)
    }
})

function sendMessage(msg){
    let message = {
        user : name,
        message : msg
    };

    // Append message 
    appendMessage(message, "outgoing")
    scrollToBottom();

    // Send to the server vie websocket connection and we have to lisnen this on server
    // For broadcast message to everyone
    socket.emit("messsage01",message)
}

function appendMessage(msg,type){

    // Creating div
    let mainDiv = document.createElement("div");

    // Adding classes on the div
    mainDiv.classList.add(type,"message")

    // Adding tags on div
    let markUp = `<h4>${msg.user}</h4> <p>${msg.message}</p>`
    mainDiv.innerHTML = markUp;

    // It's time to append this
    message_area.appendChild(mainDiv)

    // Clearing text-area when message has been send
    textarea.value = ""

}


// Receive messaage comes from server 
socket.on("message02",(msg)=>{
    appendMessage(msg,"incoming");
    scrollToBottom();;
})

// Receive messaage comes from server 
socket.on("user",(name)=>{
    let main = document.createElement("p");
    main.classList.add("join")
    main.innerHTML = `${name} Joined chat!`

    message_area.appendChild(main)
})


function scrollToBottom(){
    message_area.scrollTop = message_area.scrollHeight;
};