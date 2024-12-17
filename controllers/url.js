const shortid = require("shortid");
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    
    if (!body.url) return res.status(400).json({ error: 'URL is required' });

    try {
        // Enhanced URL validation
        const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
        if (!urlPattern.test(body.url)) {
            return res.status(400).json({ error: 'Invalid URL format' });
        }

        // Attempt to create unique short URL with multiple tries
        let attempts = 0;
        const maxAttempts = 5;

        while (attempts < maxAttempts) {
            const shortId = shortid.generate();

            try {
                const newURL = new URL({
                    shortId: shortId,
                    redirectURL: body.url,
                    visitHistory: []
                });

                await newURL.save();

                return res.status(201).json({ 
                    id: shortId, 
                    shortURL: `http://localhost:8001/${shortId}` 
                });
            } catch (saveError) {
                // If it's not a duplicate key error, throw
                if (saveError.code !== 11000) {
                    throw saveError;
                }
                attempts++;
            }
        }

        // If we've exhausted our attempts
        return res.status(500).json({ 
            error: "Unable to generate a unique short URL after multiple attempts" 
        });

    } catch (error) {
        console.error("URL Generation Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    handleGenerateNewShortURL,
};