// Assuming this is the current content of server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable for PORT
const { analyzeWebsite } = require('./analyzer'); // Assuming you have an analyzer module

app.use(express.json()); // Middleware to parse JSON bodies

// Example existing endpoint
app.get('/', (req, res) => {
    res.send('Welcome to Mourishdevelopers.com');
});

// New /analyze endpoint
app.post('/analyze', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }
        const analysisResult = await analyzeWebsite(url); // Call to analyzeWebsite function
        res.json(analysisResult);
    } catch (error) {
        console.error('Error during analysis:', error);
        res.status(500).json({ error: 'An error occurred during analysis' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
