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
            'hello': 'Hi there! How can I help you today?',
            'rooms': 'We have Luxury Suites, Deluxe Rooms, and Family Suites available.',
            'booking': 'You can book a room through our website or call us at +233 555-555-555.',
            'location': 'We are located near St. Paul\'s Catholic Parish.',
            'price': 'Our room rates start from $100 per night.',
            'default': 'Thank you for your message. How can I assist you further?'
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

        this.addMessage(message, true);
        this.input.value = '';

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
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) return this.responses.hello;
        if (lowerMessage.includes('rooms') || lowerMessage.includes('suite')) return this.responses.rooms;
        if (lowerMessage.includes('book')) return this.responses.booking;
        if (lowerMessage.includes('where') || lowerMessage.includes('location')) return this.responses.location;
        if (lowerMessage.includes('price') || lowerMessage.includes('cost')) return this.responses.price;
        return this.responses.default;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ChatSupport();
});