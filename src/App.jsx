import { useState } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function fetchGPTResponse(ingredients) {
  try {
    console.log('Sending request with ingredients:', ingredients);
    
    if (!ingredients.trim()) {
      throw new Error('Please enter some ingredients');
    }
    
    const response = await fetch(`${API_URL}/api/gpt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients })
    });

    const data = await response.json();
    console.log('Response from server:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch recipe');
    }

    if (!data.name || !data.preparationMethod || !data.nutritionalInformation) {
      throw new Error('Invalid recipe format received');
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

function App() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState({
    name: "",
    preparationMethod: "",
    nutritionalInformation: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getRecipe() {
    setLoading(true);
    setError("");
    try {
      const response = await fetchGPTResponse(ingredients);
      setRecipe(response);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setError("Failed to fetch recipe. Please try again later.");
      setRecipe({
        name: "",
        preparationMethod: "",
        nutritionalInformation: ""
      });
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Recipe Generator
        </h1>
        
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="mb-6">
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Your Ingredients
            </label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(ev) => setIngredients(ev.target.value)}
              placeholder="List your ingredients here (e.g., chicken, rice, tomatoes...)"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
            />
          </div>

          <button
            onClick={getRecipe}
            disabled={loading || !ingredients.trim()}
            className={`w-full py-3 px-4 rounded-md text-white font-medium ${
              loading || !ingredients.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 transition-colors'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Recipe...
              </span>
            ) : (
              'Generate Recipe'
            )}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {recipe.name || recipe.preparationMethod || recipe.nutritionalInformation ? (
            <div className="mt-8 space-y-6">
              {recipe.name && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Recipe Name</h2>
                  <p className="text-gray-700">{recipe.name}</p>
                </div>
              )}
              
              {recipe.preparationMethod && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Preparation Method</h2>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700 whitespace-pre-line">{recipe.preparationMethod}</p>
                  </div>
                </div>
              )}

              {recipe.nutritionalInformation && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Nutritional Information</h2>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700 whitespace-pre-line">{recipe.nutritionalInformation}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;