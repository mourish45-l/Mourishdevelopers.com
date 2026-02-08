const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());

app.post('/ask', async (req, res) => {
    try {
        const { question } = req.body;
        const companyUrl = process.env.WEBSITE_URL; // Uses mourishdevelopers.vercel.app

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        // System instruction telling the AI to refer to your specific website
        const prompt = `You are the official AI assistant for Mourish Developers. 
        Your primary source of information is ${companyUrl}. 
        Please answer the following user doubt professionally based on this company's context: ${question}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ answer: response.text() });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
