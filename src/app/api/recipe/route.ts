import { NextResponse } from 'next/server';

const API_KEY = process.env.GROQ_API_KEY;

export async function POST(request: Request) {
  try {
    const { ingredients } = await request.json();

    if (!API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    if (!ingredients) {
      return NextResponse.json(
        { error: 'No ingredients provided' },
        { status: 400 }
      );
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

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to generate recipe' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      return NextResponse.json(
        { error: 'Invalid API response format' },
        { status: 500 }
      );
    }

    const recipeText = data.choices[0].message.content;
    
    const nameMatch = recipeText.match(/Recipe Name:\s*([^\n]+)/);
    const prepMatch = recipeText.match(/Preparation Method:\s*([\s\S]*?)(?=\n\s*Nutritional Information:|$)/);
    const nutriMatch = recipeText.match(/Nutritional Information:\s*([\s\S]*?)$/);

    if (!nameMatch || !prepMatch || !nutriMatch) {
      return NextResponse.json(
        { error: 'Failed to parse recipe format' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      name: nameMatch[1].trim(),
      preparationMethod: prepMatch[1].trim(),
      nutritionalInformation: nutriMatch[1].trim()
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 