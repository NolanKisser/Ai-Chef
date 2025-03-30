import { useState } from 'react';
import RecipeCard from './components/RecipeCard';
import { fetchRecipes } from './utils/api';
import './App.css';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleGetRecipes = async () => {
    setLoading(true);
    setError('');
    setRecipes([]);
    setSelectedRecipe(null);

    try {
      const newRecipes = await fetchRecipes(ingredients);
      setRecipes(newRecipes);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          AI Chef
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Enter ingredients (e.g., chicken, rice, tomatoes)"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <button
              onClick={handleGetRecipes}
              disabled={loading || !ingredients.trim()}
              className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
                loading || !ingredients.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {loading ? 'Generating...' : 'Get Recipes'}
            </button>
          </div>

          {error && (
            <p className="mt-4 text-red-600 text-center">{error}</p>
          )}
        </div>

        {recipes.length > 0 && (
          <div className="grid gap-6 md:grid-cols-3">
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                index={index}
                selectedRecipe={selectedRecipe}
                onSelect={setSelectedRecipe}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 