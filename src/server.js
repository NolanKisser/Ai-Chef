import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

const API_KEY = process.env.GROQ_API_KEY;

app.post('/api/gpt', async (req, res) => {
  try {
    if (!API_KEY) {
      throw new Error('API key not configured');
    }

    const { ingredients } = req.body;
    console.log('Received ingredients:', ingredients);

    if (!ingredients) {
      throw new Error('No ingredients provided');
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [{
          role: "system",
          content: "You are a professional chef and nutritionist. Generate recipes based on provided ingredients. Include the recipe name, detailed preparation methods, and comprehensive nutritional information."
        },
        {
          role: "user",
          content: `Please create a recipe using these ingredients: ${ingredients}. 
          Format the response exactly as follows:
          Recipe Name: [Name of the dish]
          
          Preparation Method:
          [Detailed step-by-step instructions]
          
          Nutritional Information:
          [Detailed nutritional breakdown including calories, protein, carbs, fats, vitamins, and minerals]`
        }]
      })
    });

    console.log('API Response Status:', response.status);
    const data = await response.json();
    console.log('API Response:', data);

    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your Groq API key.');
    }

    if (data.error) {
      throw new Error(data.error.message || 'API Error');
    }

    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      throw new Error('Invalid API response format');
    }

    const recipeText = data.choices[0].message.content;
    console.log('Recipe Text:', recipeText);

    const nameMatch = recipeText.match(/Recipe Name:\s*([^\n]+)/);
    const prepMatch = recipeText.match(/Preparation Method:\s*([\s\S]*?)(?=\n\s*Nutritional Information:|$)/);
    const nutriMatch = recipeText.match(/Nutritional Information:\s*([\s\S]*?)$/);

    if (!nameMatch || !prepMatch || !nutriMatch) {
      console.error('Failed to parse recipe sections');
      throw new Error('Failed to parse recipe format');
    }

    const structuredResponse = {
      name: nameMatch[1].trim(),
      preparationMethod: prepMatch[1].trim(),
      nutritionalInformation: nutriMatch[1].trim()
    };

    console.log('Sending response:', structuredResponse);
    res.json(structuredResponse);
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ error: error.message || 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
