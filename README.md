
# DevAI Learning Platform

A modern, accessible learning platform built with React and TypeScript. This application provides an interactive dashboard, personalized learning paths, and AI-powered recommendations to help users enhance their skills and achieve their learning goals.

## 🔗 Live Demo

[View Live Demo](https://bb84cd2a-8d80-4971-887b-076692b64f52.lovableproject.com) 

## ✨ Features

### Core Learning Experience
- **Personalized Learning Dashboard**: Track progress, view recommendations, and manage daily goals
- **AI-Powered Study Assistant**: Get real-time help and smart content recommendations 
- **Code Review Tool**: Submit code snippets for automated review and feedback
- **Progress Tracking**: Visualize learning progress with interactive charts and statistics
- **Gamification Elements**: Achievement badges and streak tracking to maintain motivation
- **Collaborative Learning**: Join study groups and share resources with peers

### User Experience & Interface
- **Enhanced Loading States**: Skeleton screens and improved loading indicators
- **Smart Feedback System**: Toast notifications with contextual messaging
- **Sticky CTA Bar**: Persistent call-to-action with dismissible functionality
- **Empty State Components**: Engaging placeholders for empty data scenarios
- **Enhanced Onboarding**: Progressive disclosure and guided tour system

### Design & Accessibility
- **Fully Responsive Design**: Optimized for all devices from mobile to desktop
- **Accessibility-First Approach**: WCAG 2.1 AA compliant with robust keyboard navigation
- **Dark Mode Support**: Seamless theme switching with system preference detection
- **High Contrast Mode**: Enhanced visibility options for users with visual impairments
- **RTL Language Support**: Ready for right-to-left language implementations

### Security & Performance
- **Enterprise-Grade Security**: Input sanitization, CSRF protection, and rate limiting
- **Content Security Policy**: Comprehensive CSP implementation with iframe compatibility
- **Performance Optimized**: Code splitting, lazy loading, and optimized bundle sizes
- **Error Boundaries**: Graceful error handling with user-friendly fallbacks

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
│   │   ├── enhanced-loading.tsx     # Advanced loading states
│   │   ├── enhanced-empty-state.tsx # Rich empty state components
│   │   ├── enhanced-feedback.tsx    # Toast and form feedback system
│   │   └── ...
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

### Frontend Framework
- **React 18** with TypeScript for type safety and modern development
- **Vite** for fast development and optimized builds
- **React Router** for client-side routing with code splitting

### Styling & UI
- **Tailwind CSS** with custom design system
- **shadcn/ui** component library with Radix UI primitives
- **Lucide React** for consistent iconography
- **Framer Motion** for smooth animations and transitions

### State Management & Data
- **React Query** (@tanstack/react-query) for server state management
- **React Context** for global application state
- **React Hook Form** with Zod validation for form handling

### Development & Testing
- **TypeScript** for static type checking
- **Jest** and **Testing Library** for unit and integration testing
- **jest-axe** for automated accessibility testing
- **ESLint** and **Prettier** for code quality

### Additional Features
- **React Helmet Async** for dynamic meta tags and SEO
- **Sonner** for toast notifications
- **Recharts** for data visualization
- **DOMPurify** for XSS protection

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance
- **Keyboard Navigation**: Full keyboard accessibility with focus management
- **Screen Reader Support**: Comprehensive ARIA attributes and announcements
- **Color Contrast**: High contrast ratios meeting accessibility standards
- **Focus Management**: Visible focus indicators and logical tab order

### Enhanced User Options
- **Text Size Adjustment**: User-controlled font size scaling
- **High Contrast Mode**: Enhanced visibility for users with visual impairments
- **Reduced Motion**: Respects user's motion preferences
- **Skip Navigation**: Quick access to main content areas

### Form Accessibility
- **Clear Error Messaging**: Descriptive error messages with ARIA associations
- **Required Field Indicators**: Visual and programmatic indication of required fields
- **Input Validation**: Real-time validation with accessible feedback

## 🔒 Security Measures

### Content Security
- **Input Sanitization**: DOMPurify integration for XSS prevention
- **Content Security Policy**: Comprehensive CSP headers
- **CSRF Protection**: Token-based CSRF protection for forms

### Performance Security
- **Rate Limiting**: API request throttling to prevent abuse
- **Secure Headers**: HSTS, X-Frame-Options, and other security headers
- **iframe Compatibility**: Smart security policies for embedded environments

## 🎨 Design Principles

### User-Centered Design
- **Progressive Disclosure**: Information revealed progressively to reduce cognitive load
- **Contextual Help**: In-context assistance and guidance
- **Consistent Patterns**: Unified interaction patterns across the platform

### Visual Hierarchy
- **Clear Typography**: Readable fonts with appropriate size scaling
- **Meaningful Color**: Color used purposefully to convey information
- **Whitespace Usage**: Strategic spacing for improved readability

### Responsive Design
- **Mobile-First**: Designed and optimized for mobile devices first
- **Touch-Friendly**: Appropriate touch targets and interactions
- **Flexible Layouts**: Adapts gracefully to different screen sizes

## 🧪 Testing Strategy

### Automated Testing
- **Unit Tests**: Component-level testing with React Testing Library
- **Integration Tests**: Feature workflow testing
- **Accessibility Tests**: Automated a11y testing with jest-axe

### Manual Testing Checklist
- **Keyboard Navigation**: Verify all functionality is keyboard accessible
- **Screen Reader Testing**: Test with NVDA, JAWS, or VoiceOver
- **Color Contrast**: Verify contrast ratios meet WCAG standards
- **Responsive Testing**: Test across different devices and screen sizes

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production with optimizations |
| `npm run preview` | Preview production build locally |
| `npm test` | Run all tests with Jest |
| `npm test -- --coverage` | Generate test coverage report |
| `npm run lint` | Run ESLint for code quality |
| `npm run format` | Format code with Prettier |

## 🔧 Environment Configuration

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=your_api_url_here
VITE_API_KEY=your_api_key_here

# Authentication
VITE_AUTH_DOMAIN=your_auth_domain_here

# Feature Flags
VITE_ENABLE_AI_FEATURES=true
VITE_ENABLE_ANALYTICS=true

# Security
VITE_CSP_REPORT_URI=your_csp_report_endpoint
```

## 🚀 Deployment Guide

### Production Checklist
- [ ] Environment variables configured
- [ ] CSP headers properly set
- [ ] HTTPS enabled
- [ ] Performance monitoring in place
- [ ] Error tracking configured
- [ ] Accessibility audit completed

### Performance Optimization
- **Code Splitting**: Routes and components are lazy-loaded
- **Asset Optimization**: Images and static assets are optimized
- **Caching Strategy**: Appropriate cache headers for static assets
- **Bundle Analysis**: Regular analysis of bundle size and dependencies

## 🤝 Contributing

This project follows industry best practices for development:

### Code Standards
- **TypeScript**: All new code must be properly typed
- **ESLint/Prettier**: Code must pass linting and formatting checks
- **Testing**: New features require corresponding tests
- **Accessibility**: All UI changes must maintain accessibility standards

### Git Workflow
- **Feature Branches**: All development on feature branches
- **Commit Messages**: Conventional commit format
- **Code Review**: All changes require review before merging

## 📄 License

**This project is proprietary software.**

© 2025 DevAI Learning Platform. All rights reserved.

This software is not open source. It may not be copied, distributed, or reused without express written consent from the creators.

## 🙏 Acknowledgements

### Open Source Libraries
- [React](https://reactjs.org/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Radix UI](https://www.radix-ui.com/) - Headless UI primitives
- [React Query](https://tanstack.com/query) - Data fetching and state management

### Accessibility Resources
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards
- [WebAIM](https://webaim.org/) - Accessibility testing tools
- [A11y Project](https://www.a11yproject.com/) - Accessibility checklist

---

**Built with ❤️ for accessible, inclusive learning**

*For technical support or accessibility concerns, please contact our development team.*

**© 2025 DevAI Learning Platform. All rights reserved.**
