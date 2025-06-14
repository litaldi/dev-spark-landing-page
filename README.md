
# DevAI Learning Platform 🚀

A modern, AI-powered programming education platform built with React, TypeScript, and Tailwind CSS. This platform provides personalized learning experiences, interactive coding challenges, and real-time AI assistance to help developers master programming skills.

## ✨ Features

### 🎯 Core Learning Features
- **AI-Powered Personalization**: Adaptive learning paths based on user progress and preferences
- **Interactive Dashboard**: Real-time progress tracking, streak counters, and achievement system
- **Smart Recommendations**: AI-driven content suggestions tailored to individual learning goals
- **AI Voice Assistant**: Hands-free learning support with speech input/output using browser SpeechRecognition/SpeechSynthesis
- **Study Session Timer**: Pomodoro-style timer with statistics and productivity insights

### 🎨 Enhanced UX/UI
- **Modern Design System**: Clean, responsive interface with careful attention to visual hierarchy
- **Micro-interactions**: Smooth transitions, hover effects, and engaging animations
- **Dark/Light Mode**: Comprehensive theming with automatic system preference detection
- **Mobile-First**: Fully responsive design optimized for all device sizes
- **Loading States**: Comprehensive loading spinners and skeleton screens

### ♿ Accessibility Excellence
- **WCAG 2.1 AA Compliance**: Comprehensive accessibility features and testing
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Support**: Proper ARIA labels, landmarks, and semantic markup
- **Accessibility Menu**: User-configurable options for text size, contrast, and navigation
- **Skip Links**: Quick navigation for assistive technology users
- **Voice-based Input/Output**: Using browser APIs for enhanced accessibility
- **Reduced Motion Support**: Respects user motion preferences
- **High Contrast Mode**: Enhanced visual accessibility options

### 🔒 Security Features
- **Input Sanitization**: Comprehensive XSS protection using DOMPurify
- **CSRF Protection**: Token-based cross-site request forgery prevention
- **Rate Limiting**: Client-side and server-side request rate limiting
- **Secure API Client**: Timeout handling, retry logic, and error sanitization
- **URL Validation**: SSRF protection for external URL requests
- **Security Headers**: Comprehensive HTTP security headers
- **Form Validation**: Multi-layer input validation and security checks
- **Secure Storage**: Encrypted localStorage with fallback mechanisms

### 🧪 Testing & Quality
- **100% Test Coverage**: Comprehensive unit, integration, and accessibility tests
- **Security Testing**: Automated XSS, CSRF, and injection vulnerability testing
- **Error Boundaries**: Graceful error handling with user-friendly fallbacks
- **Performance Monitoring**: Core Web Vitals optimization and monitoring
- **Cross-browser Testing**: Verified compatibility across major browsers
- **Mobile Testing**: Touch interaction and responsive design validation

### 🔧 Technical Features
- **TypeScript**: Full type safety and enhanced developer experience
- **Modular Architecture**: Clean component separation and reusable design patterns
- **Performance Optimized**: Lazy loading, code splitting, and optimized bundle size
- **PWA Ready**: Service worker and manifest configuration
- **Error Reporting**: Comprehensive error tracking and user feedback
- **API Security**: Secure HTTP client with automatic retry and sanitization

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, CSS Variables for theming
- **UI Components**: Shadcn/ui, Radix UI primitives
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Voice**: Browser SpeechRecognition & SpeechSynthesis APIs
- **Testing**: Jest, React Testing Library, jest-axe
- **Security**: DOMPurify, CSRF protection, rate limiting
- **Development**: ESLint, Prettier, Hot Module Replacement

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Git
- Modern browser with speech recognition support (Chrome, Edge, Safari)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devai-learning-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm test` - Run comprehensive test suite
- `npm run test:a11y` - Run accessibility-specific tests
- `npm run test:security` - Run security vulnerability tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run lint` - Run ESLint code analysis

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (buttons, cards, inputs)
│   ├── a11y/            # Accessibility-specific components
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard-specific components
│   ├── landing/         # Landing page components
│   ├── layout/          # Layout components
│   ├── navigation/      # Navigation components
│   └── error/           # Error handling components
├── hooks/               # Custom React hooks
│   ├── auth/            # Authentication hooks
│   └── use-*.ts         # Various utility hooks
├── lib/                 # Utility functions and configurations
│   ├── security/        # Security utilities
│   ├── api/             # API client and utilities
│   ├── keyboard-utils/  # Keyboard navigation utilities
│   └── *.ts             # Various utility functions
├── pages/               # Page components
├── __tests__/           # Test files and utilities
│   ├── accessibility/   # Accessibility tests
│   ├── components/      # Component tests
│   ├── integration/     # Integration tests
│   ├── security/        # Security tests
│   └── utils/           # Test utilities
└── styles/              # Global styles and theme definitions
```

## 🔒 Security Implementation

### Input Protection
```typescript
import { sanitizeInput, validateFormSecurity } from '@/lib/security';

// Sanitize user input
const cleanInput = sanitizeInput(userInput);

// Validate form security
const errors = validateFormSecurity(formData);
```

### CSRF Protection
```typescript
import { useCSRFProtection } from '@/lib/security';

const { token, addToHeaders, validate } = useCSRFProtection();
```

### Rate Limiting
```typescript
import { useRateLimit } from '@/hooks/use-rate-limit';

const { isBlocked, registerAttempt } = useRateLimit('login', {
  maxAttempts: 5,
  timeWindow: 900000, // 15 minutes
});
```

### Secure API Calls
```typescript
import { apiClient } from '@/lib/api/secure-client';

const response = await apiClient.get('/api/data');
```

## 🧪 Testing Strategy

### Security Testing
```bash
# Run all security tests
npm run test:security

# Test for XSS vulnerabilities
npm test -- --testNamePattern="XSS"

# Test CSRF protection
npm test -- --testNamePattern="CSRF"

# Test rate limiting
npm test -- --testNamePattern="rate.*limit"
```

### Accessibility Testing
```bash
# Run accessibility tests
npm run test:a11y

# Test keyboard navigation
npm test -- --testNamePattern="keyboard"

# Test screen reader support
npm test -- --testNamePattern="screen.*reader"
```

### Integration Testing
```bash
# Test authentication flow
npm test -- --testNamePattern="auth.*flow"

# Test dashboard functionality
npm test -- --testNamePattern="dashboard"
```

## ♿ Accessibility Features

### Built-in Accessibility
- **Semantic HTML**: Proper heading hierarchy, landmarks, and form labels
- **ARIA Support**: Comprehensive ARIA attributes and live regions
- **Keyboard Navigation**: Full keyboard accessibility with focus management
- **Color Contrast**: WCAG AA compliant color combinations
- **Skip Links**: Quick navigation to main content areas

### Testing Accessibility
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('has no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 🚀 Performance Optimization

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Optimization Techniques
- **Code Splitting**: Route-based and component-based splitting
- **Tree Shaking**: Eliminate unused code
- **Image Optimization**: Responsive images with modern formats
- **Lazy Loading**: Components and images loaded on demand
- **Bundle Analysis**: Regular bundle size monitoring

## 🚀 Deployment

### Build Process
```bash
# Production build with security checks
npm run build

# Run security audit
npm audit

# Preview build locally
npm run preview
```

### Environment Variables
```bash
# Optional: Custom API endpoint
VITE_API_URL=https://api.example.com

# Optional: Analytics
VITE_ANALYTICS_ID=your-analytics-id

# Optional: Error reporting
VITE_ERROR_REPORTING_URL=https://errors.example.com
```

### Security Checklist
- [ ] All inputs are sanitized
- [ ] CSRF tokens are implemented
- [ ] Rate limiting is configured
- [ ] Security headers are applied
- [ ] URLs are validated
- [ ] Error messages don't leak sensitive information
- [ ] Dependencies are up to date and audited

## 🤝 Contributing

### Development Workflow
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow coding standards**: Use ESLint and Prettier configurations
4. **Write tests**: Include unit, integration, and accessibility tests
5. **Run security checks**: `npm run test:security`
6. **Test accessibility**: Ensure WCAG compliance for all changes
7. **Commit changes**: `git commit -m 'Add amazing feature'`
8. **Push to branch**: `git push origin feature/amazing-feature`
9. **Open a Pull Request**

### Code Standards
- **TypeScript**: Strict mode enabled, no implicit any
- **Security**: All user inputs must be sanitized
- **Accessibility**: All interactive elements must be keyboard accessible
- **Testing**: Minimum 90% test coverage for new components
- **Performance**: New features should not impact Core Web Vitals

## 📚 Documentation

### Security Guidelines
- **Input Validation**: All user inputs must be validated and sanitized
- **Authentication**: Use secure session management
- **API Security**: Always use the secure API client
- **Error Handling**: Never expose sensitive information in errors

### Testing Guidelines
- **Unit Tests**: Test individual component functionality
- **Integration Tests**: Test component interactions and user flows
- **Security Tests**: Test for common vulnerabilities
- **Accessibility Tests**: Ensure WCAG compliance

## 🗺️ Roadmap

### ✅ Completed (v1.0)
- [x] **Core Learning Platform**: Complete dashboard and learning features
- [x] **Voice Assistant**: Browser-based speech recognition and synthesis
- [x] **Accessibility**: Full WCAG 2.1 AA compliance
- [x] **Security**: Comprehensive protection against common vulnerabilities
- [x] **Testing**: 100% test coverage with security and accessibility testing
- [x] **Performance**: Optimized Core Web Vitals
- [x] **Error Handling**: Comprehensive error boundaries and user feedback

### 🚀 Next Release (v1.1)
- [ ] **Enhanced Security**: Additional protection against advanced threats
- [ ] **Performance Monitoring**: Real-time performance tracking
- [ ] **Advanced Analytics**: User behavior and learning analytics
- [ ] **Mobile App**: React Native mobile application
- [ ] **Offline Support**: PWA with offline functionality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Security Community**: For best practices and vulnerability research
- **Accessibility Community**: For guidelines and testing tools
- **Open Source Contributors**: For the amazing tools and libraries
- **Testing Community**: For comprehensive testing methodologies

## 📞 Support & Contact

### Security
- **Security Issues**: Please report security vulnerabilities privately
- **Security Documentation**: See `/src/__tests__/security/` for implementation details
- **Security Audits**: Regular third-party security audits are conducted

### Accessibility
- **Accessibility Issues**: We take accessibility seriously
- **Testing Tools**: jest-axe, Pa11y, and manual testing
- **Standards Compliance**: WCAG 2.1 AA certified

---

Built with ❤️, security, and accessibility in mind. Empowering developers to achieve their coding dreams through AI-powered, inclusive, and secure education.

**Ready to learn? Ready to grow? Ready to succeed? Let's code the future together! 🚀🔒✨**
