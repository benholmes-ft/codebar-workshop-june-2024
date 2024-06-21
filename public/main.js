// init socket.io
const socket = io();
 
// Get the inputs and button elements
const messageInput = document.querySelector('#message');
const button = document.querySelector('button');
const nameInput = document.querySelector('#name');

// Function to handle sending a message
function sendMessage() {
    // Get the message text from the input
    const message = messageInput.value;   

    socket.emit('newMessage', {
        sender: nameInput.value,
        message: message
    });

    // Clear the input field
    messageInput.value = '';
}

function createNewMessage(data) {
    // Create a new message element
    const { sender, message } = data;
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = sender + ': ' + message;

    // Append the new message element to the chat container
    const chatContainer = document.querySelector('.message-container');
    chatContainer.appendChild(messageElement);
}

// Add event listener to the button for sending a message
button.addEventListener('click', sendMessage);

// Add event listener to the input for sending a message when Enter key is pressed
messageInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

socket.on('dispenseMessage', (data) => {   
    createNewMessage(data)
});