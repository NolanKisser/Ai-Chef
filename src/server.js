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

    const prompt = `Using ONLY these ingredients: ${ingredients}, create 3 COMPLETELY DIFFERENT recipes.
    Each recipe must:
    1. Use a different cooking method (e.g., baking, frying, grilling)
    2. Result in a different type of dish (e.g., if one is a pasta dish, another should be a different category)
    3. Use the ingredients in unique combinations
    
    For each recipe provide:
    - name: A descriptive name of the dish
    - preparationMethod: Detailed step-by-step cooking instructions
    - nutritionalInformation: Estimated nutritional values per serving
    
    Format the response as a JSON array of 3 objects, each with the fields: name, preparationMethod, and nutritionalInformation.
    
    Example format:
    [
      {
        "name": "Recipe 1 Name",
        "preparationMethod": "Step by step instructions...",
        "nutritionalInformation": "Nutritional details..."
      },
      // ... 2 more recipes
    ]`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a creative chef who specializes in creating diverse recipes from the same ingredients. Always ensure each recipe is distinctly different from the others in terms of cooking method, final dish type, and flavor profile.'
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.9,
      max_tokens: 2048,
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response from AI');
    }

    let recipes;
    try {
      recipes = JSON.parse(response);
      
      // Validate that we have exactly 3 different recipes
      if (!Array.isArray(recipes) || recipes.length !== 3) {
        throw new Error('Invalid number of recipes received');
      }

      // Validate each recipe has required fields
      recipes.forEach((recipe, index) => {
        if (!recipe.name || !recipe.preparationMethod || !recipe.nutritionalInformation) {
          throw new Error(`Recipe ${index + 1} is missing required fields`);
        }
      });

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