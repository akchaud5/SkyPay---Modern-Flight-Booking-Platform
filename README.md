# SkyPay - Flight Booking Application

![SkyPay Logo](public/images/skypay-logo.png)

SkyPay is a modern flight booking and payment application built with Next.js, TypeScript, and Tailwind CSS. This comprehensive frontend project demonstrates advanced React concepts and best practices for building complex web applications.

## Features

- ✈️ **Flight Search**: Search for flights with advanced filters
- 👥 **User Authentication**: Register, login, and profile management
- 🗓️ **Booking Flow**: Multi-step passenger information collection
- 💳 **Payment Processing**: Secure payment integration
- 📱 **Responsive Design**: Full mobile and desktop support
- 🌓 **Dark Mode**: Complete dark mode support
- 🌐 **Accessibility**: WCAG compliant components
- 🔒 **Form Validation**: Comprehensive form validation with Zod

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form + Zod
- **State Management**: React Context API
- **Icons**: React Icons
- **UI Components**: Custom component library
- **Animations**: Framer Motion
- **Date Handling**: date-fns
- **Testing**: Jest + React Testing Library

## Project Structure

```
src/
  ├── app/              # Next.js App Router pages
  ├── components/       # React components
  │   ├── auth/         # Authentication components
  │   ├── booking/      # Booking flow components
  │   ├── common/       # Reusable UI components
  │   ├── flights/      # Flight search components
  │   ├── layout/       # Layout components
  │   └── payment/      # Payment components
  ├── context/          # React Context providers
  ├── hooks/            # Custom React hooks
  ├── lib/              # Utility libraries
  ├── styles/           # Global styles
  ├── types/            # TypeScript type definitions
  └── utils/            # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/skypay.git
   cd skypay
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build and Deploy

```bash
# Build for production
npm run build

# Run production build
npm start
```

## Testing

```bash
# Run all tests
npm test

# Run specific component tests
npm test -- -t "ComponentName"
```

## Deployment

This application is configured for easy deployment on Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fskypay)

## Development Standards

- **Commits**: Follow conventional commits standard
- **Code Style**: ESLint and Prettier configured
- **Accessibility**: All components should be WCAG 2.1 AA compliant
- **Testing**: All components should have unit tests

## Project Highlights

- **Advanced Form Handling**: Multi-step forms with validation
- **Complex UI Components**: Custom datepickers, modals, dropdowns
- **Optimized Rendering**: Memoization and code-splitting
- **Responsive Design Patterns**: Mobile-first approach with Tailwind
- **Type Safety**: Comprehensive TypeScript typing
- **Authentication Flow**: Complete auth process with protected routes
- **State Management**: Context API with reducer pattern
- **Custom Hooks**: Reusable logic abstraction

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)
- [Framer Motion](https://www.framer.com/motion/)
- [date-fns](https://date-fns.org/)
