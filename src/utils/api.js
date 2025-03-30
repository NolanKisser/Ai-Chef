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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch recipes: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data || !Array.isArray(data.recipes)) {
      throw new Error('Invalid response format from server');
    }

    return data.recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    if (error.message.includes('Failed to connect')) {
      throw new Error('Could not connect to the server. Please make sure the server is running.');
    }
    throw error;
  }
} 