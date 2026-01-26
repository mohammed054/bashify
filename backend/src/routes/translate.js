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

    // Input sanitization
    const sanitizedInput = input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/[\x00-\x1f\x7f]/g, '') // Remove control characters
      .substring(0, 1000); // Enforce length limit

    if (sanitizedInput.length === 0) {
      return res.status(400).json({ 
        error: 'Input cannot be empty or contain only invalid characters' 
      });
    }

    if (input.length > 1000) {
      return res.status(400).json({ 
        error: 'Input too long (max 1000 characters)' 
      });
    }

    // Translate English to Bash
    const bashCommand = await translateToBash(sanitizedInput);

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
