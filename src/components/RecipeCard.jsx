function RecipeCard({ recipe, index, selectedRecipe, onSelect }) {
  return (
    <div 
      className={`transform transition-all duration-200 ${
        selectedRecipe === index ? 'scale-100' : 'hover:scale-105'
      }`}
    >
      <button
        onClick={() => onSelect(selectedRecipe === index ? null : index)}
        className={`w-full text-left rounded-lg border-2 transition-all duration-200 overflow-hidden ${
          selectedRecipe === index
            ? 'border-emerald-500 bg-white shadow-lg'
            : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {recipe.name}
            </h2>
            <svg
              className={`w-5 h-5 text-emerald-600 transform transition-transform ${
                selectedRecipe === index ? 'rotate-180' : ''
              }`}
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
          </div>
        </div>
      </button>

      {selectedRecipe === index && (
        <div className="mt-4 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-emerald-600"
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
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {recipe.preparationMethod}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-emerald-600"
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
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {recipe.nutritionalInformation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeCard; 