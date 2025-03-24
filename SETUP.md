# SkyPay - Setup Instructions

This document contains detailed setup instructions for running the SkyPay flight booking application.

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## Installation Steps

1. **Clone the repository**
   
   ```bash
   git clone https://github.com/yourusername/skypay.git
   cd skypay
   ```

2. **Install dependencies**
   
   ```bash
   npm install
   ```

3. **Environment Variables**
   
   Create a `.env.local` file in the root of the project with the following variables:
   
   ```
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=https://api.example.com
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_mock_key
   ```

4. **Start the development server**
   
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Build for Production

```bash
npm run build
npm start
```

## Testing

```bash
# Run all tests
npm test

# Run specific component tests
npm test -- -t "ComponentName"
```

## Project Structure

- `src/app`: Next.js App Router pages
- `src/components`: React components
- `src/context`: React Context providers
- `src/hooks`: Custom React hooks
- `src/lib`: Utility libraries
- `src/styles`: Global styles
- `src/types`: TypeScript type definitions
- `src/utils`: Utility functions

## Available Accounts for Testing

For testing the application, you can use the following credentials:

- **Email**: test@example.com
- **Password**: password

## Stripe Test Payment

For testing payments, use these test card details:

- **Card Number**: 4242 4242 4242 4242
- **Expiry Date**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits

## Troubleshooting

### Common Issues

1. **Port already in use**
   
   If port 3000 is already in use, you can specify a different port:
   
   ```bash
   npm run dev -- -p 3001
   ```

2. **TypeScript errors**
   
   If you encounter TypeScript errors during development, make sure all dependencies are installed correctly:
   
   ```bash
   npm install
   ```

3. **Styling issues**
   
   If styles are not being applied correctly, try rebuilding the Tailwind CSS styles:
   
   ```bash
   npm run build:css
   ```

## Contact and Support

For any issues or questions, please open an issue on the GitHub repository or contact the maintainer at your.email@example.com.