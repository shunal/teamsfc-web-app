# TEAMS FC Chatbot - Upgrade Guide

## Current Implementation

The chatbot currently uses a rule-based AI system with keyword matching and contextual responses. It handles:
- Training questions
- App features
- Download information
- Pricing inquiries
- General FAQs

## Upgrade to OpenAI API (Recommended)

To use real AI (GPT-4, Claude, etc.), update the `getAIResponse()` method in `chatbot.js`:

### Option 1: OpenAI API

```javascript
async getAIResponse(userMessage) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant for TEAMS FC, a soccer training app. You help users with training tips, app features, downloads, and pricing. Be friendly, concise, and use lowercase text style matching the brand.'
                    },
                    {
                        role: 'user',
                        content: userMessage
                    }
                ],
                max_tokens: 150,
                temperature: 0.7
            })
        });
        
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('AI Error:', error);
        return "sorry, i'm having trouble right now. please try again or visit our contact page.";
    }
}
```

### Option 2: Anthropic Claude API

```javascript
async getAIResponse(userMessage) {
    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'YOUR_ANTHROPIC_API_KEY',
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-sonnet-20240229',
                max_tokens: 200,
                messages: [{
                    role: 'user',
                    content: `You are a helpful assistant for TEAMS FC soccer training app. ${userMessage}`
                }]
            })
        });
        
        const data = await response.json();
        return data.content[0].text;
    } catch (error) {
        return "sorry, i'm having trouble right now.";
    }
}
```

## Security Notes

⚠️ **IMPORTANT**: Never expose API keys in client-side code!

1. **Use a Backend Proxy**: Create an API endpoint on your server that handles AI requests
2. **Environment Variables**: Store API keys server-side only
3. **Rate Limiting**: Implement rate limiting to prevent abuse
4. **Cost Monitoring**: Set up usage alerts for API costs

### Example Backend Proxy (Node.js/Express)

```javascript
// server.js
app.post('/api/chatbot', async (req, res) => {
    const { message } = req.body;
    
    // Add rate limiting, authentication, etc.
    
    const aiResponse = await callOpenAI(message);
    res.json({ response: aiResponse });
});
```

Then update `chatbot.js`:
```javascript
async getAIResponse(userMessage) {
    const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
    });
    const data = await response.json();
    return data.response;
}
```

## Alternative: Free AI Services

- **Hugging Face Inference API**: Free tier available
- **Cohere API**: Generous free tier
- **Google Gemini**: Free tier available

## Customization

### Add More Training Knowledge

Update the `getTrainingResponse()` method with more specific soccer training advice:

```javascript
getTrainingResponse(message) {
    // Add position-specific advice
    if (message.includes('goalkeeper')) {
        return "for goalkeepers, focus on reaction time and positioning...";
    }
    // Add skill-specific advice
    if (message.includes('dribbling')) {
        return "dribbling requires close ball control...";
    }
}
```

### Add Analytics

Track chatbot interactions:

```javascript
handleSendMessage() {
    // ... existing code ...
    
    // Track analytics
    if (window.gtag) {
        gtag('event', 'chatbot_message', {
            'message_length': message.length
        });
    }
}
```

### Add Lead Capture

Capture emails for follow-up:

```javascript
// Add to chatbot input container
if (userMessage.includes('email') || userMessage.includes('contact')) {
    this.showEmailCapture();
}
```

## Features to Add

- [ ] Conversation history persistence
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] File upload (for training video questions)
- [ ] Integration with app user accounts
- [ ] Scheduled follow-ups
- [ ] A/B testing different AI models

