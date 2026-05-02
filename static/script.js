// Grab all the elements from the HTML
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatWindow = document.getElementById('chat-window');
const closeChatBtn = document.getElementById('close-chat-btn');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

// 1. Open Chat Window
chatToggleBtn.addEventListener('click', () => {
    chatWindow.classList.remove('hidden');
    chatToggleBtn.classList.add('hidden'); // Hide the open button
});

// 2. Close Chat Window
closeChatBtn.addEventListener('click', () => {
    chatWindow.classList.add('hidden');
    chatToggleBtn.classList.remove('hidden'); // Show the open button
});

// Helper function to draw a chat bubble on the screen
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    
    if (sender === 'user') {
        messageDiv.classList.add('user-message');
    } else {
        messageDiv.classList.add('bot-message');
    }
    
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    
    // Auto-scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return messageDiv; // Return it so we can update it later (for "Thinking...")
}

// 3. The main function: Send question to FastAPI backend
async function handleSend() {
    const question = userInput.value.trim();
    if (question === "") return;

    // Show user message in blue
    addMessage(question, 'user');
    userInput.value = ""; // Clear the input box

    // Show a temporary "Thinking..." message
    const botThinkingBubble = addMessage("Thinking...", 'bot');

    try {
        // 4. Use fetch() to POST the data to our FastAPI /ask endpoint
        const response = await fetch('/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Convert our question into the JSON format Pydantic expects
            body: JSON.stringify({ question: question })
        });

        const data = await response.json();
        
        // 5. Replace "Thinking..." with the real answer from the AI
        botThinkingBubble.textContent = data.answer;
        
    } catch (error) {
        botThinkingBubble.textContent = "Sorry, I had an error connecting to the server.";
        console.error(error);
    }
}

// Trigger sending when clicking the Send button
sendBtn.addEventListener('click', handleSend);

// Trigger sending when pressing Enter key in the text box
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSend();
    }
});
