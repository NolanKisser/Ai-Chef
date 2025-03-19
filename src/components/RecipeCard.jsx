import { motion, AnimatePresence } from 'framer-motion';

function RecipeCard({ recipe, index, selectedRecipe, onSelect }) {
  const isSelected = selectedRecipe === index;

  return (
    <motion.div 
      layout
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="space-y-4">
        {/* Recipe Name Dropdown */}
        <button
          onClick={() => onSelect(isSelected ? null : index)}
          className="w-full text-left transition-all duration-300"
        >
          <div className="p-4 rounded-lg border-2 bg-white border-gray-200 hover:border-emerald-300 hover:shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {recipe.name}
              </h2>
              <motion.div
                animate={{ rotate: isSelected ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </div>
          </div>
        </button>

        {/* Ingredients Dropdown */}
        <button
          onClick={() => onSelect(isSelected ? null : index)}
          className="w-full text-left transition-all duration-300"
        >
          <div className="p-4 rounded-lg border-2 bg-white border-gray-200 hover:border-emerald-300 hover:shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Ingredients
              </h2>
              <motion.div
                animate={{ rotate: isSelected ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </div>
          </div>
        </button>

        {/* Nutritional Info Dropdown */}
        <button
          onClick={() => onSelect(isSelected ? null : index)}
          className="w-full text-left transition-all duration-300"
        >
          <div className="p-4 rounded-lg border-2 bg-white border-gray-200 hover:border-emerald-300 hover:shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Nutritional Information
              </h2>
              <motion.div
                animate={{ rotate: isSelected ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </div>
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                  Ingredients
                </h3>
                <div className="prose prose-emerald max-w-none">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {recipe.ingredients}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                <div className="prose prose-emerald max-w-none">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {recipe.preparationMethod}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                <div className="prose prose-emerald max-w-none">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {recipe.nutritionalInformation}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default RecipeCard; 