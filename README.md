# AI Chef Assistant 🧑‍🍳

AI Chef Assistant is a modern web application that helps you create delicious recipes from your available ingredients. Using advanced AI, it generates detailed recipes complete with preparation methods and nutritional information.

## Features ✨

- **Ingredient-Based Recipe Generation**: Turn your available ingredients into complete recipes
- **Detailed Instructions**: Get step-by-step preparation methods
- **Nutritional Information**: View comprehensive nutritional details for each recipe
- **Modern UI**: Clean, responsive interface with smooth animations
- **Real-Time Generation**: Instant recipe creation using Groq AI

## Getting Started 🚀

### Prerequisites

- Node.js 18.0.0 or later
- npm (comes with Node.js)
- A Groq API key (get one at [https://console.groq.com](https://console.groq.com))

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ai-chef-next
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Groq API key:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to use the application.

## Usage 💡

1. Enter your available ingredients in the text area, separated by commas
   - Example: "chicken breast, spinach, garlic, olive oil"

2. Click the "Create Recipe" button

3. The AI will generate:
   - A suitable recipe name
   - Detailed preparation instructions
   - Comprehensive nutritional information

## Technology Stack 🛠️

- **Frontend**: Next.js 14, React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **API**: Groq AI
- **Language**: TypeScript

## Development 👩‍💻

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
ai-chef-next/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── recipe/
│   │   │       └── route.ts    # API endpoint
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx           # Main page
│   │   └── globals.css        # Global styles
│   └── components/            # React components
├── public/                    # Static files
└── ...config files
```

## Environment Variables 🔑

Required environment variables:

- `GROQ_API_KEY`: Your Groq API key for recipe generation

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Powered by Groq AI
- Built with Next.js
- Styled with Tailwind CSS
- Animated with Framer Motion 