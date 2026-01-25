const axios = require('axios');

const SYSTEM_PROMPT = `You are an expert Unix shell engineer.

Your task is to translate a user's natural language request into a Bash command.

Rules:
- Output ONLY the Bash command.
- Do NOT add explanations or comments.
- Do NOT execute anything.
- Do NOT use sudo.
- Do NOT delete or overwrite files.
- Assume the user is a non-root user.
- Assume a Linux environment.
- Prefer simple, readable, standard utilities.

If the request is destructive, unsafe, or ambiguous, output EXACTLY:
⚠️ Unsafe command – not generated.`;

const HF_API_URL = 'https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-7B-Instruct';

async function translateToBash(englishInput) {
  const HF_API_TOKEN = process.env.HF_API_TOKEN;

  if (!HF_API_TOKEN) {
    throw new Error('HF_API_TOKEN environment variable not set');
  }

  try {
    const response = await axios.post(
      HF_API_URL,
      {
        inputs: `<|im_start|>system
${SYSTEM_PROMPT}<|im_end|>
<|im_start|>user
${englishInput}<|im_end|>
<|im_start|>assistant
`,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.1,
          return_full_text: false,
          do_sample: true
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${HF_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000
      }
    );

    if (response.data && response.data[0] && response.data[0].generated_text) {
      let generatedCommand = response.data[0].generated_text.trim();
      
      // Clean up the response
      generatedCommand = generatedCommand
        .replace(/^`+|`+$/g, '') // Remove backticks
        .replace(/^[#\s]*bash\s*/i, '') // Remove bash prefix
        .replace(/^\$+\s*/, '') // Remove $ prompt
        .trim();

      return generatedCommand;
    } else {
      throw new Error('Invalid response from AI model');
    }
  } catch (error) {
    console.error('Hugging Face API error:', error.response?.data || error.message);
    
    if (error.response?.status === 429) {
      throw new Error('API quota exceeded. Please try again later.');
    } else if (error.response?.status === 401) {
      throw new Error('Invalid API token');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    } else {
      throw new Error('AI service temporarily unavailable');
    }
  }
}

module.exports = { translateToBash };
