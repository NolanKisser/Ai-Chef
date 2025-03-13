const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Groq = require('groq-sdk');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configure CORS for production
const allowedOrigins = [
  'http://localhost:3000',
  'https://ai-chef.vercel.app', // Add your frontend domain when deployed
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Basic rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post('/api/gpt', async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients) {
      return res.status(400).json({ error: 'Ingredients are required' });
    }

    const prompt = `Generate 3 unique recipe suggestions using these ingredients: ${ingredients}. 
    For each recipe, provide:
    1. A name
    2. Detailed preparation method
    3. Basic nutritional information
    Format as a JSON array with objects containing 'name', 'preparationMethod', and 'nutritionalInformation' fields.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.8,
      max_tokens: 2048,
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response from AI');
    }

    let recipes;
    try {
      recipes = JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      throw new Error('Invalid response format from AI');
    }

    res.json({ recipes });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate recipes' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 