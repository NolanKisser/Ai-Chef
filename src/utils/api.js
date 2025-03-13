const API_URL = 'http://localhost:3001/api/gpt';

export async function fetchRecipes(ingredients) {
  if (!ingredients.trim()) {
    throw new Error('Please enter ingredients');
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    const data = await response.json();
    
    if (!data || !Array.isArray(data.recipes)) {
      throw new Error('Invalid response format');
    }

    return data.recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
} 