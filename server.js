const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Your provided API Key
const genAI = new GoogleGenerativeAI("AIzaSyC8l2vvmhCA7r5Kj1k2yF6bmWTJceTmSrU");

const SYSTEM_PROMPT = `
You are the Mourish AI Assistant. Your purpose is to help users understand Mourish Developers.
Website context: https://mourishdevelopers.veecel.app/
Knowledge: 
- Mourish Developers builds high-end websites in 7 days and apps in 30 days.
- Pricing starts at ₹3,000 for simple sites and ₹10,000 for apps.
- Technologies: Three.js, React, Firebase, GSAP, WebGL.
- Tone: Professional, tech-savvy, helpful, and concise.
Always analyze queries based on this website's services.
`;

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // Combining system prompt with user message for context
        const prompt = `${SYSTEM_PROMPT}\n\nUser Question: ${message}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to connect to Mourish AI" });
    }
});

app.listen(3000, () => console.log('Mourish Backend running on port 3000'));
