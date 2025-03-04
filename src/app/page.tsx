'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Recipe {
  name: string;
  preparationMethod: string;
  nutritionalInformation: string;
}

export default function Home() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateRecipe = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate recipe');
      }

      const data = await response.json();
      setRecipe(data);
    } catch (err) {
      setError('Failed to generate recipe. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            AI Chef Assistant
          </h1>
          <p className="text-lg text-gray-600">
            Transform your ingredients into culinary masterpieces
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow-xl rounded-2xl p-8 backdrop-blur-sm bg-opacity-95"
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="ingredients"
                className="block text-lg font-semibold text-gray-800 mb-3"
              >
                What ingredients do you have?
              </label>
              <textarea
                id="ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter your ingredients separated by commas (e.g., chicken breast, spinach, garlic...)"
                className="w-full min-h-[150px] p-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>

            <button
              onClick={generateRecipe}
              disabled={loading || !ingredients.trim()}
              className="w-full py-4 px-6 rounded-xl bg-emerald-600 text-white font-semibold
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:bg-emerald-700 transform transition-all duration-200
                       hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Creating your recipe...
                </span>
              ) : (
                'Create Recipe'
              )}
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl"
            >
              <p className="text-red-700 font-medium">{error}</p>
            </motion.div>
          )}

          {recipe && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 space-y-6"
            >
              <div className="border-b border-gray-100 pb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {recipe.name}
                </h2>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Preparation Method
                </h3>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {recipe.preparationMethod}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Nutritional Information
                </h3>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {recipe.nutritionalInformation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
} 