// TEAMS FC AI Chatbot
class TeamsFCChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.attachEventListeners();
        this.addWelcomeMessage();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div id="teamsfc-chatbot" class="teamsfc-chatbot">
                <div class="chatbot-toggle" id="chatbot-toggle">
                    <svg class="chatbot-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span class="chatbot-badge" id="chatbot-badge">1</span>
                </div>
                <div class="chatbot-window" id="chatbot-window">
                    <div class="chatbot-header">
                        <div class="chatbot-header-content">
                            <div class="chatbot-avatar">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                                </svg>
                            </div>
                            <div class="chatbot-header-text">
                                <h3>teams fc assistant</h3>
                                <p class="chatbot-status">online</p>
                            </div>
                        </div>
                        <button class="chatbot-close" id="chatbot-close">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div class="chatbot-messages" id="chatbot-messages">
                        <!-- Messages will be inserted here -->
                    </div>
                    <div class="chatbot-input-container">
                        <div class="chatbot-quick-actions" id="chatbot-quick-actions">
                            <button class="quick-action-btn" data-action="download">download app</button>
                            <button class="quick-action-btn" data-action="features">features</button>
                            <button class="quick-action-btn" data-action="pricing">pricing</button>
                        </div>
                        <div class="chatbot-input-wrapper">
                            <input 
                                type="text" 
                                id="chatbot-input" 
                                class="chatbot-input" 
                                placeholder="ask me anything about teams fc..."
                                autocomplete="off"
                            />
                            <button class="chatbot-send" id="chatbot-send">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('chatbot-close');
        const send = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');
        const quickActions = document.querySelectorAll('.quick-action-btn');

        toggle.addEventListener('click', () => this.toggleChatbot());
        close.addEventListener('click', () => this.closeChatbot());
        send.addEventListener('click', () => this.handleSendMessage());
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });

        quickActions.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                this.handleQuickAction(action);
            });
        });
    }

    toggleChatbot() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbot-window');
        const badge = document.getElementById('chatbot-badge');
        
        if (this.isOpen) {
            window.classList.add('open');
            badge.style.display = 'none';
            document.getElementById('chatbot-input').focus();
        } else {
            window.classList.remove('open');
        }
    }

    closeChatbot() {
        this.isOpen = false;
        document.getElementById('chatbot-window').classList.remove('open');
    }

    addWelcomeMessage() {
        const welcomeMsg = "hi! i'm your teams fc assistant. i can help you with training tips, app features, downloads, pricing, and more. what would you like to know?";
        this.addMessage('bot', welcomeMsg);
    }

    addMessage(sender, text, isTyping = false) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender === 'user' ? 'user-message' : 'bot-message'}`;
        
        if (isTyping) {
            messageDiv.classList.add('typing');
            messageDiv.innerHTML = `
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;
        } else {
            messageDiv.textContent = text;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        return messageDiv;
    }

    async handleSendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addMessage('user', message);
        input.value = '';
        
        // Show typing indicator
        const typingMsg = this.addMessage('bot', '', true);
        
        // Simulate AI thinking time
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Remove typing indicator
        typingMsg.remove();
        
        // Get AI response
        const response = await this.getAIResponse(message);
        this.addMessage('bot', response);
    }

    handleQuickAction(action) {
        const actions = {
            'download': 'you can download teams fc from the app store. would you like me to show you the download link?',
            'features': 'teams fc includes ai video verification, weekly leaderboards, collectible cards, and a progression system with 450+ challenges. which feature interests you most?',
            'pricing': 'teams fc offers flexible pricing plans. check out our pricing page for details, or i can help you find the right plan for your needs.'
        };
        
        const input = document.getElementById('chatbot-input');
        input.value = action;
        this.handleSendMessage();
    }

    async getAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Training & Skills Questions
        if (this.matches(message, ['training', 'practice', 'drill', 'exercise', 'skill', 'improve', 'better', 'technique'])) {
            return this.getTrainingResponse(message);
        }
        
        // Download & App Questions
        if (this.matches(message, ['download', 'install', 'get app', 'app store', 'ios', 'android', 'phone'])) {
            return "you can download teams fc from the app store. the app is currently available for ios. just search 'teamsfc' or visit our downloads page. would you like the direct link?";
        }
        
        // Features Questions
        if (this.matches(message, ['feature', 'what can', 'what does', 'ai', 'verification', 'leaderboard', 'card', 'progression'])) {
            return this.getFeatureResponse(message);
        }
        
        // Pricing Questions
        if (this.matches(message, ['price', 'cost', 'free', 'paid', 'subscription', 'plan', 'pricing'])) {
            return "teams fc offers different pricing plans to suit your needs. you can check our pricing page for detailed information, or i can help you understand which plan might work best for you. are you looking for individual or team plans?";
        }
        
        // Challenge Questions
        if (this.matches(message, ['challenge', '450', 'how many', 'difficulty', 'easy', 'medium', 'hard'])) {
            return "teams fc has over 450 challenges across four categories: footskills, first touch, juggling, and fitness. each category has easy, medium, and hard difficulty levels. you start at your level and unlock more challenges as you progress!";
        }
        
        // Leaderboard Questions
        if (this.matches(message, ['leaderboard', 'rank', 'compete', 'competition', 'top', 'best'])) {
            return "our weekly leaderboards rank players globally based on their rep-to-time ratio. compete with players worldwide and climb the ranks! the leaderboards reset weekly, so there's always a chance to be #1.";
        }
        
        // AI Verification Questions
        if (this.matches(message, ['ai', 'verify', 'verification', 'how does', 'machine learning', 'ml'])) {
            return "our proprietary ai/ml model analyzes your training videos in real-time to verify you're completing challenges correctly. it ensures authentic skill development and prevents cheating. the ai gets smarter over time!";
        }
        
        // Cards Questions
        if (this.matches(message, ['card', 'collectible', 'deck', 'collect', 'earn'])) {
            return "complete challenges to earn collectible cards! build powerful decks and compete in tactical matches. each card represents different skills and abilities. the more you train, the more cards you unlock.";
        }
        
        // General Help
        if (this.matches(message, ['help', 'support', 'contact', 'question', 'problem', 'issue'])) {
            return "i'm here to help! you can ask me about training tips, app features, downloads, or anything else about teams fc. for technical support, visit our contact page or reach out on social media.";
        }
        
        // Greetings
        if (this.matches(message, ['hi', 'hello', 'hey', 'sup', 'what\'s up'])) {
            return "hey! 👋 ready to level up your soccer skills? i can help you learn about teams fc, get training tips, or answer any questions. what's on your mind?";
        }
        
        // Default AI Response (can be upgraded to use OpenAI API)
        return this.getSmartResponse(message);
    }

    getTrainingResponse(message) {
        const responses = [
            "great question! for improving your skills, i recommend starting with our easy challenges and building up. consistency is key - even 15 minutes daily makes a huge difference. which skill area do you want to focus on?",
            "the best training approach is progressive. start with fundamentals, master them, then move to advanced techniques. teams fc's progression system guides you through this automatically. what specific skill are you working on?",
            "practice makes perfect! our ai verification ensures you're doing exercises correctly. focus on quality over quantity - proper technique beats speed. would you like tips for a specific skill like footskills or first touch?",
            "training smart is better than training hard. our app breaks down complex moves into manageable challenges. track your progress and see real improvement over time. what's your current skill level?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getFeatureResponse(message) {
        if (this.matches(message, ['ai', 'verification'])) {
            return "ai video verification uses machine learning to analyze your training in real-time. it ensures you're completing challenges correctly and prevents cheating. the system learns and improves over time!";
        }
        if (this.matches(message, ['leaderboard'])) {
            return "weekly leaderboards rank players globally by rep-to-time ratio. compete with players worldwide, climb the ranks, and prove your skills. leaderboards reset every week for fresh competition!";
        }
        if (this.matches(message, ['card', 'collectible'])) {
            return "earn collectible cards by completing challenges. build powerful decks and use them in tactical matches. each card represents different skills - collect them all!";
        }
        if (this.matches(message, ['progression', 'unlock'])) {
            return "our progression system starts you at your level (easy/medium/hard) and unlocks new challenges as you improve. real progression, real rewards. you'll never run out of challenges!";
        }
        return "teams fc includes ai video verification, weekly leaderboards, collectible cards, and a smart progression system with 450+ challenges. which feature would you like to know more about?";
    }

    getSmartResponse(message) {
        // Smart fallback that can be upgraded to OpenAI API
        const contextResponses = [
            "that's interesting! teams fc is all about progressive soccer training. we have 450+ challenges, ai verification, leaderboards, and collectible cards. what specifically would you like to know?",
            "i'd love to help with that! teams fc combines real-world training with competitive gaming. can you tell me more about what you're looking for?",
            "great question! teams fc helps players improve through structured challenges and ai-powered verification. would you like to know about our training system, features, or how to get started?",
            "i'm here to help you learn about teams fc! we offer professional soccer training with 450+ challenges, weekly competitions, and a progression system. what interests you most?"
        ];
        
        // Check for keywords and provide contextual response
        if (message.includes('?')) {
            return "that's a great question! while i might not have all the details, i can definitely help you find the answer. would you like to know about our training challenges, app features, or how to get started?";
        }
        
        return contextResponses[Math.floor(Math.random() * contextResponses.length)];
    }

    matches(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.teamsFCChatbot = new TeamsFCChatbot();
    });
} else {
    window.teamsFCChatbot = new TeamsFCChatbot();
}

