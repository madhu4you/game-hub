# Game Hub

A modern web-based gaming platform featuring multiple interactive games including Spelling Bee, Sudoku, and Tic-Tac-Toe. Game Hub provides a cohesive gaming experience with user profiles, achievements, and leaderboards.

## Features

- **Multiple Games**
  - Spelling Bee
  - Sudoku
  - Tic-Tac-Toe

- **User Experience**
  - User authentication and profiles
  - Achievements tracking
  - Global leaderboards
  - Responsive design for mobile and desktop

- **Modern UI**
  - Material UI components
  - Smooth animations with Framer Motion
  - Interactive sound effects

## Technology Stack

- **Frontend**
  - React 19
  - TanStack Router
  - Material UI 7
  - Formik & Yup for form validation
  - Framer Motion for animations
  - React Howler for sound effects

- **Build Tools**
  - Vite 6
  - ESLint 9
  - Prettier 3
  - Babel 7

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [your-repository-url]
cd game-hub
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier
- `npm run prepare-deploy` - Prepare for deployment (build + lint + format)
- `npm run deploy` - Deploy to cloud (requires additional setup)

## Project Structure

```
src/
├── App.jsx              # Application entry point
├── components/          # Reusable UI components
│   ├── common/          # Layout components (Header, Sidebar, etc.)
│   └── games/           # Game-specific components
├── context/             # React context providers
├── data/                # Static data and game configurations
├── hooks/               # Custom React hooks
├── routes/              # Page components and routing configuration
│   └── games/           # Game-specific pages
├── services/            # API and external service integrations
├── themes/              # UI theming and styling
└── utils/               # Utility functions and helpers
```


## Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [Vite](https://vitejs.dev/)
- UI components from [Material UI](https://mui.com/)
- Routing with [TanStack Router](https://tanstack.com/router)
