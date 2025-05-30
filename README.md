
# DevAI Learning Platform

A modern, accessible learning platform built with React and TypeScript. This application provides an interactive dashboard, personalized learning paths, and AI-powered recommendations to help users enhance their skills and achieve their learning goals.

## 🔗 Live Demo

[View Live Demo](https://bb84cd2a-8d80-4971-887b-076692b64f52.lovableproject.com) 

## ✨ Features

- **Personalized Learning Dashboard**: Track progress, view recommendations, and manage daily goals
- **AI-Powered Study Assistant**: Get real-time help and smart content recommendations 
- **Code Review Tool**: Submit code snippets for automated review and feedback
- **Progress Tracking**: Visualize learning progress with interactive charts and statistics
- **Gamification Elements**: Achievement badges and streak tracking to maintain motivation
- **Collaborative Learning**: Join study groups and share resources with peers
- **Fully Responsive Design**: Optimized for all devices from mobile to desktop
- **Accessibility-First Approach**: WCAG compliant with robust keyboard navigation support
- **Enterprise-Grade Security**: Input sanitization, CSRF protection, and rate limiting

## 🚀 Installation

Follow these steps to set up the project locally:

```bash
# Clone the repository
git clone https://github.com/your-username/devai-learning-platform.git

# Navigate to project directory
cd devai-learning-platform

# Install dependencies
npm install

# Start the development server
npm run dev
```

Your app should now be running on [http://localhost:5173](http://localhost:5173)

## 📁 Folder Structure

```
src/
├── components/     # UI components organized by feature
│   ├── a11y/       # Accessibility-specific components
│   ├── auth/       # Authentication components
│   ├── dashboard/  # Dashboard-related components
│   ├── landing/    # Landing page components
│   ├── ui/         # Generic UI components (shadcn/ui)
│   └── ...
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and modules
│   ├── keyboard-utils/  # Keyboard navigation utilities
│   ├── security/   # Security-related utilities
│   └── ...
├── pages/          # Main application pages
├── __tests__/      # Test files organized by type
├── main.tsx        # Application entry point
└── ...
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query and React Context
- **Routing**: React Router
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: 
  - Radix UI primitives
  - shadcn/ui component system
  - Lucide React for icons
- **Testing**: Jest, Testing Library, and jest-axe for accessibility testing
- **Data Visualization**: Recharts
- **Toast Notifications**: Sonner
- **Animations**: Framer Motion
- **Build Tool**: Vite

## ♿ Accessibility & Security

### Accessibility Features

- WCAG 2.1 AA compliance
- Keyboard navigation and focus management
- Screen reader announcements
- Skip navigation links
- High contrast mode option
- Text size adjustment controls
- Robust ARIA attributes throughout
- Accessible forms with clear error handling

### Security Measures

- Input sanitization and validation using DOMPurify
- CSRF protection for form submissions
- Rate limiting to prevent brute force attacks
- Strong password requirements
- Content security policies
- Prevention of common security vulnerabilities (XSS, CSRF)

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```
# API Configuration
VITE_API_URL=your_api_url_here
VITE_API_KEY=your_api_key_here

# Authentication
VITE_AUTH_DOMAIN=your_auth_domain_here

# Feature Flags
VITE_ENABLE_AI_FEATURES=true
```

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm test` | Run tests |
| `npm test -- --coverage` | Run tests with coverage report |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## 🧪 Testing

This project uses Jest and React Testing Library for testing. All tests are located in the `src/__tests__` directory.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- src/__tests__/components/ui/Input.test.tsx

# Generate test coverage report
npm test -- --coverage
```

The project includes:
- Unit tests for components
- Integration tests for feature workflows
- Accessibility tests with jest-axe
- Hook tests with @testing-library/react-hooks

## 🤝 Contributing

This is proprietary software. Contributions are only accepted from authorized team members. Please contact the development team for access and contribution guidelines.

## 📄 License

**This project is proprietary software.**

© 2025 DevAI Learning Platform. All rights reserved.

This software is not open source. It may not be copied, distributed, or reused without express written consent from the creators. No part of this application may be copied, reproduced, or redistributed without express written permission.

## 🧩 Third-Party Libraries

This project uses the following open-source libraries under their respective licenses:
- React (MIT License)
- TypeScript (Apache 2.0 License)
- Tailwind CSS (MIT License)
- shadcn/ui (MIT License)
- Radix UI (MIT License)
- Lucide Icons (ISC License)

All third-party libraries are used in compliance with their respective licenses for commercial use.

## 👏 Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/)

---

*For support or questions, please contact the development team.*

**© 2025 DevAI Learning Platform. All rights reserved.**
