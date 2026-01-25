const express = require('express');
const { translateToBash } = require('../services/huggingface');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { input } = req.body;

    // Input validation
    if (!input || typeof input !== 'string') {
      return res.status(400).json({ 
        error: 'Valid text input is required' 
      });
    }

    if (input.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Input cannot be empty' 
      });
    }

    if (input.length > 1000) {
      return res.status(400).json({ 
        error: 'Input too long (max 1000 characters)' 
      });
    }

    // Translate English to Bash
    const bashCommand = await translateToBash(input.trim());

    res.json({ command: bashCommand });

  } catch (error) {
    console.error('Translation error:', error);
    
    if (error.message.includes('API key')) {
      res.status(500).json({ error: 'Server configuration error' });
    } else if (error.message.includes('quota')) {
      res.status(429).json({ error: 'API quota exceeded' });
    } else {
      res.status(500).json({ error: 'Translation service unavailable' });
    }
  }
});

module.exports = router;
