
class ChatSupport {
    constructor() {
        this.widget = document.querySelector('.chat-widget');
        this.trigger = document.querySelector('.chat-trigger');
        this.closeBtn = document.querySelector('.chat-close');
        this.input = document.querySelector('.chat-input');
        this.sendBtn = document.querySelector('.chat-send');
        this.messagesContainer = document.querySelector('.chat-messages');
        this.badge = document.querySelector('.chat-badge');
        
        this.isOpen = false;
        this.responses = {
            'hello': 'Hi there! Welcome to The Amassah Lodge. How can I help you today?',
            'rooms': 'We have Luxury Suites, Deluxe Rooms, and Family Suites available. Would you like to know more about any specific room?',
            'booking': 'You can book a room through our website or call us at +233 555-555-555. Would you like me to help you with the booking process?',
            'location': 'We are located near St. Paul\'s Catholic Parish. Would you like directions?',
            'price': 'Our room rates start from $100 per night. We also have special offers available. Would you like to know more?',
            'default': 'Thank you for your message. Let me help you with that. Could you please provide more details?'
        };

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.trigger.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.toggleChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Close chat if clicked outside
        document.addEventListener('click', (e) => {
            if (!this.widget.contains(e.target) && 
                !this.trigger.contains(e.target) && 
                this.isOpen) {
                this.toggleChat();
            }
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.widget.classList.toggle('active');
        this.trigger.style.display = this.isOpen ? 'none' : 'flex';
        
        if (this.isOpen) {
            this.input.focus();
            this.badge.style.display = 'none';
        }
    }

    sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, true);
        this.input.value = '';

        // Generate and add bot response
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, false);
        }, 500);
    }

    addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = text;
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();

        // Add typing animation for bot messages
        if (!isUser) {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                messageDiv.style.opacity = '1';
            }, 100);
        }
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for keywords in the message
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return this.responses.hello;
        } else if (lowerMessage.includes('room') || lowerMessage.includes('suite')) {
            return this.responses.rooms;
        } else if (lowerMessage.includes('book') || lowerMessage.includes('reservation')) {
            return this.responses.booking;
        } else if (lowerMessage.includes('where') || lowerMessage.includes('location')) {
            return this.responses.location;
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            return this.responses.price;
        }
        
        return this.responses.default;
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize chat support when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const chatSupport = new ChatSupport();
});
