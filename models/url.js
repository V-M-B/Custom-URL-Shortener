const mongoose = require('mongoose');

// Drop the existing collection first (optional, but helpful for cleanup)
mongoose.connection.dropCollection('urls').catch(() => {});

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    redirectURL: {
        type: String,
        required: true,
        trim: true
    },
    visitHistory: [{
        timestamp: {
            type: Number,
            default: Date.now
        }
    }]
}, { 
    timestamps: true,
    collection: 'urls'  // Explicitly set collection name
});

// Ensure unique index is created correctly
urlSchema.index({ shortId: 1 }, { unique: true });

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;